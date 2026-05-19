import { ProductInput } from "@/lib/types/marketing";
import { runAgent } from "./runAgent";

export async function runStrategistAgent(product: ProductInput): Promise<string> {
  const systemInstruction = `You are a brilliant Chief Marketing Officer (CMO) and Growth Strategist.
Your job is to define the strategic positioning and campaign mechanics.
Provide a detailed report containing:
1. Definitive Market Positioning statement and differentiation plan.
2. Recommended Marketing Funnel structure (ToFU, MoFU, BoFU).
3. Best Channels to distribute this campaign (SEO, social media, paid ads, cold outreach).
4. Concrete Action Plan / checklist for the next 7 days.

Write in the same language as the input brief. Be practical, realistic, and highly actionable.`;

  const userPrompt = `Product Brief:
- Name: ${product.productName}
- Category: ${product.category}
- Price: ${product.price || "Not specified"}
- Target Audience: ${product.targetAudience}
- USP: ${product.usp}
- Campaign Goal: ${product.campaignGoal}`;

  return runAgent("strategistAgent", systemInstruction, userPrompt);
}
