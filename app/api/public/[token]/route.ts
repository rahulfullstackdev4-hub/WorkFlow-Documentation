import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const workflow = await prisma.workflow.findUnique({
    where: { publicToken: token },
    include: { owner: true, comments: { include: { user: true } } },
  });

  if (!workflow || !workflow.isPublic) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(workflow);
}
