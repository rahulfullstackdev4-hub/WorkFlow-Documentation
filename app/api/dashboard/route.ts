import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Get total workflows
    const totalWorkflows = await prisma.workflow.count({
      where: { ownerId: user.id },
    });

    // Get shared workflows (public ones)
    const sharedWorkflows = await prisma.workflow.count({
      where: { ownerId: user.id, isPublic: true },
    });

    // Get total comments on user's workflows
    const totalComments = await prisma.comment.count({
      where: {
        workflow: {
          ownerId: user.id,
        },
      },
    });

    // Get AI suggestions (using version count as proxy)
    const aiSuggestions = await prisma.version.count({
      where: {
        workflow: {
          ownerId: user.id,
        },
      },
    });

    const stats = {
      totalWorkflows,
      sharedWorkflows,
      totalComments,
      aiSuggestions,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("GET dashboard stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
