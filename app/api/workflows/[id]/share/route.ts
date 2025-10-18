import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { randomBytes } from "crypto";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { id } = await params;
  const workflow = await prisma.workflow.findUnique({ where: { id } });
  if (!workflow || workflow.ownerId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const token = randomBytes(16).toString("hex");

  await prisma.workflow.update({
    where: { id },
    data: { isPublic: true, publicToken: token },
  });

  return NextResponse.json({ token });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { id } = await params;
  const workflow = await prisma.workflow.findUnique({ where: { id } });
  if (!workflow || workflow.ownerId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.workflow.update({
    where: { id },
    data: { isPublic: false, publicToken: null },
  });

  return NextResponse.json({ success: true });
}
