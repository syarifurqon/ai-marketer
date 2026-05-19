import { ProductInput } from "@/lib/types/marketing";

export function buildMainMarketingPrompt(product: ProductInput): string {
  return `You are an expert marketing strategist. Based on the product information below, generate a comprehensive marketing report.

## Product Information
- **Product Name**: ${product.productName}
- **Category**: ${product.category}
- **Product Type**: ${product.productType}
- **Price**: ${product.price || "Not specified"}
- **Target Audience**: ${product.targetAudience}
- **Unique Selling Proposition (USP)**: ${product.usp}
- **Problem Being Solved**: ${product.problemSolved}
- **Campaign Goal**: ${product.campaignGoal}
${product.websiteUrl ? `- **Website URL**: ${product.websiteUrl}` : ""}

## Instructions
Return ONLY a single valid JSON object — no markdown, no explanation, no preamble. The JSON must exactly match this structure:

{
  "executiveSummary": "A 2-3 paragraph strategic overview of the marketing opportunity",
  "audiencePersona": "A detailed profile of the ideal customer: demographics, psychographics, pain points, and buying triggers",
  "positioning": "The market positioning statement and differentiation strategy",
  "hooks": [
    "Attention-grabbing headline or hook #1",
    "Attention-grabbing headline or hook #2",
    "Attention-grabbing headline or hook #3",
    "Attention-grabbing headline or hook #4",
    "Attention-grabbing headline or hook #5"
  ],
  "copywriting": "A full marketing copy / ad body text ready to use (2-3 paragraphs)",
  "campaignIdeas": [
    "Campaign idea #1 with channel and tactic",
    "Campaign idea #2 with channel and tactic",
    "Campaign idea #3 with channel and tactic"
  ],
  "landingPageSuggestions": [
    "Landing page section suggestion #1",
    "Landing page section suggestion #2",
    "Landing page section suggestion #3",
    "Landing page section suggestion #4"
  ],
  "nextActions": [
    "Concrete next action #1",
    "Concrete next action #2",
    "Concrete next action #3",
    "Concrete next action #4"
  ]
}

Generate the report in the same language as the product information above. If Indonesian, use Indonesian. If English, use English.`;
}
