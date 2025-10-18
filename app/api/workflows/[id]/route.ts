import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const workflow = await prisma.workflow.findUnique({
    where: { id },
    include: { versions: true, comments: { include: { user: true } }, owner: true },
  });

  if (!workflow) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Allow access if owner or public
  if (workflow.ownerId !== user.id && !workflow.isPublic) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json(workflow);
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const workflow = await prisma.workflow.findUnique({ where: { id } });
  if (!workflow || workflow.ownerId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { title, description, content } = body;

  // Create version snapshot
  await prisma.version.create({
    data: {
      workflowId: id,
      content: workflow.content,
      note: "Auto-saved before update",
    },
  });

  const updated = await prisma.workflow.update({
    where: { id },
    data: { title, description, content },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const workflow = await prisma.workflow.findUnique({ where: { id } });
  if (!workflow || workflow.ownerId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.workflow.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
