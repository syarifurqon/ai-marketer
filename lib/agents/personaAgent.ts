import { ProductInput } from "@/lib/types/marketing";
import { runAgent } from "./runAgent";

export async function runPersonaAgent(product: ProductInput): Promise<string> {
  const systemInstruction = `You are a professional Customer Research Specialist.
Your job is to thoroughly analyze the target audience for a product.
Provide a highly detailed report containing:
1. Target Audience Demographics & Psychographics.
2. Major Pain Points & Emotional Triggers.
3. Desires, Ambitions, and Dreams related to the product.
4. Key Objections & Friction points that stop them from buying.
5. The Tone and Vocabulary best suited to communicate with this audience.

Write in the same language as the input brief. Be concise but deep. No fluff.`;

  const userPrompt = `Product Brief:
- Name: ${product.productName}
- Category: ${product.category}
- Type: ${product.productType}
- Price: ${product.price || "Not specified"}
- Target Audience Input: ${product.targetAudience}
- Problem Solved: ${product.problemSolved}
- USP: ${product.usp}
- Goal: ${product.campaignGoal}`;

  return runAgent("personaAgent", systemInstruction, userPrompt);
}
