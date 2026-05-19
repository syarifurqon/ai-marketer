import { ProductInput } from "@/lib/types/marketing";
import { runAgent } from "./runAgent";

export async function runCopywriterAgent(product: ProductInput): Promise<string> {
  const systemInstruction = `You are an elite, high-converting Direct Response Copywriter.
Your job is to craft persuasive marketing copy and creative hooks.
Provide a detailed report containing:
1. Five (5) distinct, high-impact marketing headlines or hooks (AIDA framework).
2. One (1) full-length ad copywriting / email body text tailored to the campaign goal.
3. Call-to-Action (CTA) recommendations.
4. Suggestion structure for high-converting landing page copywriting.

Write in the same language as the input brief. Keep the tone engaging and compelling.`;

  const userPrompt = `Product Brief:
- Name: ${product.productName}
- Category: ${product.category}
- USP: ${product.usp}
- Problem Solved: ${product.problemSolved}
- Goal: ${product.campaignGoal}`;

  return runAgent("copywriterAgent", systemInstruction, userPrompt);
}
