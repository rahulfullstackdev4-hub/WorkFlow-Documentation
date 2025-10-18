import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const comments = await prisma.comment.findMany({
    where: { workflowId: id },
    include: { user: true },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(comments);
}

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { body: commentBody } = body;

  if (!commentBody) return NextResponse.json({ error: "Missing body" }, { status: 400 });

  // Ensure user exists
  let user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    const clerkUser = await currentUser();
    if (!clerkUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    user = await prisma.user.create({
      data: {
        clerkId: userId,
        email: clerkUser.emailAddresses?.[0]?.emailAddress,
        name: clerkUser.firstName || clerkUser.username,
      },
    });
  }

  const comment = await prisma.comment.create({
    data: {
      workflowId: id,
      userId: user.id,
      body: commentBody,
    },
    include: { user: true },
  });

  return NextResponse.json(comment);
}
