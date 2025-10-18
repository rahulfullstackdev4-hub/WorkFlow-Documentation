import { NextResponse } from "next/server";
import { suggestWorkflowSteps, summarizeWorkflow, generateWorkflowContent } from "@/lib/ai";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = (await auth()) || null;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { action, content, prompt } = await req.json();

  try {
    if (action === "suggest") {
      const steps = await suggestWorkflowSteps(content);
      return NextResponse.json({ text: JSON.stringify(steps) });
    } else if (action === "summarize") {
      const summary = await summarizeWorkflow(content);
      return NextResponse.json({ text: summary });
    } else if (action === "generate") {
      const generated = await generateWorkflowContent(prompt);
      return NextResponse.json({ text: generated });
    }
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("AI API error:", error);
    return NextResponse.json({ error: "AI service error" }, { status: 500 });
  }
}
