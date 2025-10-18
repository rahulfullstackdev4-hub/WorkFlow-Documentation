import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

const MODEL_NAME = "gemini-2.5-flash";

// Validate API key exists
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is required");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function suggestWorkflowSteps(description: string): Promise<string[]> {
  const model: GenerativeModel = genAI.getGenerativeModel({ model: MODEL_NAME });
  const prompt = `You are an assistant that suggests workflow steps given this description:\n\n${description}\n\nReturn ONLY a valid JSON array of concise steps, like ["Step 1: Do this", "Step 2: Do that"]. Do not include any other text, explanations, or formatting outside the JSON array.`;
  const result = await model.generateContent(prompt);
    const response = await result.response;
  const text = response?.text() || "[]";
  try {
    // Clean the text to extract JSON
    const cleanedText = text.trim().replace(/^```json\s*/, '').replace(/\s*```$/, '');
    const parsed = JSON.parse(cleanedText);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function summarizeWorkflow(content: string): Promise<string> {
    const model: GenerativeModel = genAI.getGenerativeModel({ model: MODEL_NAME });
  const prompt = `Summarize the following workflow content in a few sentences:\n\n${content}`;
  const result = await model.generateContent(prompt);
    const response = await result.response;
  return response?.text() || "Summary not available.";
}

export async function generateWorkflowContent(prompt: string): Promise<string> {
    const model: GenerativeModel = genAI.getGenerativeModel({ model: MODEL_NAME });
  const fullPrompt = `Generate detailed workflow content based on this prompt: ${prompt}`;
  const result = await model.generateContent(fullPrompt);
    const response = await result.response;
  return response?.text() || "";
}
