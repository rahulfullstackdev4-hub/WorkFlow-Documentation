import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    // If user doesn't exist, create them
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

    const workflows = await prisma.workflow.findMany({
      where: { ownerId: user.id },
      include: { versions: true, comments: true },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(workflows);
  } catch (error) {
    console.error("GET workflows error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    // If user doesn't exist, create them
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

    const body = await req.json();
    const { title, description, content } = body;

    if (!title || !content) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const workflow = await prisma.workflow.create({
      data: {
        ownerId: user.id,
        title,
        description,
        content,
        publicToken: null,
      },
    });

    return NextResponse.json(workflow);
  } catch (error) {
    console.error("Workflow creation error:", error);
    return NextResponse.json({ error: "Failed to create workflow" }, { status: 500 });
  }
}
