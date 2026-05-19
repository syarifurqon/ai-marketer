import { config } from "@/lib/config";
import { GoogleGenAI } from "@google/genai";

export async function runAgent(
  agentName: string,
  systemInstruction: string,
  contents: string,
  responseMimeType?: string
): Promise<string> {
  if (config.mockAI) {
    await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate AI thinking delay

    switch (agentName) {
      case "personaAgent":
        return `[MOCK PERSONA AGENT RESULT]
Target Audience: High-intent professionals & business owners.
Pain Points: Overwhelmed with marketing strategy, lack of copy skills, low conversion.
Desire: Quick, premium, automated campaigns that drive ROI without micro-managing.
Objections: "Is the AI output generic?", "Will it sound like a robot?".
Language: Professional, direct, action-oriented.`;

      case "copywriterAgent":
        return `[MOCK COPYWRITER AGENT RESULT]
Hooks:
1. Stop wasting thousands on agencies — automate your marketing now.
2. AI-driven marketing that actually sounds like you.
3. Hook #3: Get a custom campaign plan in under 60 seconds.
4. Scale your business with your personal AI Marketing Assistant.
5. USP Hook: Built by top-tier marketers, powered by advanced AI agents.

Ad Copy:
Are you tired of staring at a blank page? Overwhelmed by SEO, social media, and landing pages? Meet the Personal AI Marketing Assistant. A premium, multi-agent AI system designed to craft high-converting strategies in seconds. No prompt engineering required. Start generating today.

CTA: Start for Free / Create Your Report
Landing Page: Hero headline showing USP, feature cards for agents, interactive playground, clear pricing.`;

      case "strategistAgent":
        return `[MOCK STRATEGIST AGENT RESULT]
Positioning: The premium, developer-friendly autonomous marketing copilot.
Campaign Angle: "Your marketing department, condensed into a single AI agent."
Funnel: Top of Funnel (Free report generator) -> Middle of Funnel (Interactive audit tool) -> Bottom of Funnel (Paid Supabase storage & automation features).
Channels: LinkedIn Ads, Product Hunt Launch, Twitter/X Build in Public.
Next Actions:
1. Add Supabase storage to persist reports.
2. Deploy Playwright audit route.
3. Create 3 Twitter hook templates.
4. Launch on Product Hunt.`;

      case "reportComposerAgent":
        return `{
          "executiveSummary": "Marketing report composed by multi-agent system. This MVP assistant automates target audience analysis, high-converting copywriting, and overall marketing strategy.",
          "audiencePersona": "High-intent professionals & business owners who are overwhelmed with marketing strategy, lack copy skills, and seek quick, premium, automated campaigns that drive ROI.",
          "positioning": "The premium, developer-friendly autonomous marketing copilot under the theme: 'Your marketing department, condensed into a single AI agent.'",
          "hooks": [
            "Stop wasting thousands on agencies — automate your marketing now.",
            "AI-driven marketing that actually sounds like you.",
            "Get a custom campaign plan in under 60 seconds.",
            "Scale your business with your personal AI Marketing Assistant.",
            "Built by top-tier marketers, powered by advanced AI agents."
          ],
          "copywriting": "Are you tired of staring at a blank page? Meet the Personal AI Marketing Assistant. A premium, multi-agent AI system designed to craft high-converting strategies in seconds. Start generating today.",
          "campaignIdeas": [
            "Instagram Reels / TikToks — show the before/after of using the AI agent",
            "Google Search Ads targeting high-intent SaaS keywords",
            "LinkedIn thought leadership content focusing on AI productivity"
          ],
          "landingPageSuggestions": [
            "Hero: Bold headline addressing marketing overwhelm",
            "Social proof: Showcase visual report dashboard",
            "Feature section: Highlight the multi-agent specialist approach",
            "CTA: Align with campaign goal"
          ],
          "nextActions": [
            "Configure Supabase storage to persist marketing reports",
            "Deploy Playwright website audit tool",
            "Create initial social media posts using the generated copywriting",
            "Launch Product Hunt campaign"
          ],
          "competitorAnalysis": "The competitor landscape is highly active, with key players focusing on template-based copywriting. However, they lack real-time website audit integration and dynamic persona adjustments, giving our product a unique competitive advantage.",
          "competitorCards": [
            {
              "url": "https://competitor-one.com",
              "title": "CopyBot AI",
              "summary": "Focuses on short-form ad template copywriting with high frequency.",
              "strengths": ["Huge library of pre-built templates", "Fast generations"],
              "opportunities": ["Create deeper marketing strategy reports", "Integrate live website analysis"]
            },
            {
              "url": "https://competitor-two.com",
              "title": "StrategyCraft",
              "summary": "Manual-input heavy marketing planning tool for agencies.",
              "strengths": ["Highly custom reports", "Client portal capabilities"],
              "opportunities": ["Provide fully automated multi-agent outputs", "Lower cost barriers for solo business owners"]
            }
          ]
        }`;

      case "landingPageAgent":
        return `[MOCK LANDING PAGE AUDIT RESULT]

**1. First Impression & Clarity**: The value proposition is moderately clear but could be stronger. The hero section doesn't immediately communicate the core benefit within 5 seconds.

**2. Headline & Copy Quality**: The headline is descriptive but not benefit-driven. Consider replacing generic product descriptions with outcome-focused language (e.g., "Triple your conversions in 30 days" instead of "Marketing Solution").

**3. CTA Effectiveness**: Only one primary CTA found above the fold. The button text "Submit" is weak — replace with action-oriented copy like "Start Free Trial" or "Get My Report Now."

**4. Social Proof & Trust Signals**: No visible testimonials, ratings, or client logos detected. Adding 3–5 social proof elements could significantly increase trust and reduce friction.

**5. SEO & Meta Signals**: Meta description is missing or poorly optimized. Page title is too generic. Integrate primary keywords into both title tags and H1 headings.

**Top 5 Recommended Improvements**:
1. Rewrite hero headline to focus on the #1 customer outcome.
2. Add a trust bar (logos, review stars) immediately below the hero.
3. Create a dedicated CTA button with high-contrast color and action-driven copy.
4. Add a FAQ section to pre-empt major customer objections.
5. Include a meta description that highlights the core USP within 155 characters.`;

      case "competitorAgent":
        return `[MOCK COMPETITOR AGENT RESULT]
Landscape Overview:
The market consists mainly of specialized copywriting tools. However, they operate in silos, requiring manual copy-pasting of target audience information and lacking comprehensive marketing strategy generation.

Competitor Analysis:
1. CopyBot (https://competitor-one.com)
   - Strengths: Extensive copywriting templates.
   - Weaknesses: Lacks contextual intelligence and multi-agent synergy.
2. StrategyCraft (https://competitor-two.com)
   - Strengths: Broad planning reports.
   - Weaknesses: Requires massive manual input; slow and expensive.

Opportunities:
- Focus on end-to-end automated reports.
- Emphasize the live website audit feature to position as a holistic conversion suite.`;

      default:
        return `[MOCK RESULT for ${agentName}]`;
    }
  }

  if (config.aiProvider === "gemini") {
    if (!config.gemini.apiKey) {
      throw new Error(
        "GEMINI_API_KEY belum diisi. Isi .env.local atau aktifkan MOCK_AI=true."
      );
    }
    const client = new GoogleGenAI({ apiKey: config.gemini.apiKey });
    const maxRetries = 3;
    let backoffDelay = 1500; // Start with 1.5 seconds

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await client.models.generateContent({
          model: config.gemini.model,
          contents: contents,
          config: {
            systemInstruction,
            responseMimeType,
          },
        });
        return response.text ?? "";
      } catch (err: unknown) {
        const errObject = err as { message?: string; status?: string } | null;
        const errString = String(err);
        const errMessage = errObject?.message || "";
        const errStatus = errObject?.status || "";
        
        const isTransient =
          errStatus === "UNAVAILABLE" ||
          errStatus === "RESOURCE_EXHAUSTED" ||
          errString.includes("503") ||
          errString.includes("429") ||
          errString.includes("UNAVAILABLE") ||
          errString.includes("RESOURCE_EXHAUSTED") ||
          errMessage.includes("experiencing high demand") ||
          errMessage.includes("rate limit") ||
          errMessage.includes("too many requests");

        if (isTransient && attempt < maxRetries) {
          console.warn(
            `[${agentName}] Attempt ${attempt} failed with transient error. Retrying in ${backoffDelay}ms... (Error: ${errMessage || errString})`
          );
          await new Promise((resolve) => setTimeout(resolve, backoffDelay));
          backoffDelay *= 2; // Exponential backoff
        } else {
          throw err;
        }
      }
    }
  }

  throw new Error(`Unsupported AI_PROVIDER: "${config.aiProvider}"`);
}
