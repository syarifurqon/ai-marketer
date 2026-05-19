import { MarketingReport, ProductInput } from "@/lib/types/marketing";
import { runAgent } from "./runAgent";

export async function runReportComposerAgent(
  product: ProductInput,
  personaReport: string,
  copywriterReport: string,
  strategistReport: string,
  landingPageAudit?: string,
  competitorReport?: string
): Promise<MarketingReport> {
  const landingPageSection = landingPageAudit
    ? `\n\n--- SPECIALIST REPORT 4: LANDING PAGE AUDIT ---\n${landingPageAudit}`
    : "";

  const competitorSection = competitorReport
    ? `\n\n--- SPECIALIST REPORT 5: COMPETITOR ANALYSIS ---\n${competitorReport}`
    : "";

  const landingPageAuditField = landingPageAudit
    ? `  "landingPageAudit": "A concise synthesis of the landing page audit: key strengths, weaknesses, and top 3 priority improvements.",`
    : "";

  const competitorFields = competitorReport
    ? `  "competitorAnalysis": "A 1-2 paragraph overview summarizing the competitive landscape and key gaps/advantages.",
  "competitorCards": [
    {
      "url": "competitor url",
      "title": "competitor site title",
      "summary": "1-2 sentence competitor overview summary",
      "strengths": ["strength 1", "strength 2"],
      "opportunities": ["opportunity 1", "opportunity 2"]
    }
  ],`
    : "";

  const systemInstruction = `You are the Lead Editor and Report Composer Agent.
Your job is to read individual specialist reports and compile them into a single, cohesive, premium JSON structure.
You MUST output ONLY a valid JSON object. No preamble, no postamble, no code fences.

Structure required:
{
  "executiveSummary": "A highly professional, comprehensive 2-3 paragraph strategic marketing overview combining the insights from the strategist and copywriter.",
  "audiencePersona": "A beautifully formatted summary of the persona analysis (demographics, pain points, desire, objections).",
  "positioning": "Clear positioning statement and differentiation strategy.",
  "hooks": [
    "Hook 1 from copywriter report",
    "Hook 2 from copywriter report",
    "Hook 3 from copywriter report",
    "Hook 4 from copywriter report",
    "Hook 5 from copywriter report"
  ],
  "copywriting": "The complete, premium ad copywriting body text.",
  "campaignIdeas": [
    "Campaign idea 1 from strategist/copywriter",
    "Campaign idea 2 from strategist/copywriter",
    "Campaign idea 3 from strategist/copywriter"
  ],
  "landingPageSuggestions": [
    "Landing page suggestion 1",
    "Landing page suggestion 2",
    "Landing page suggestion 3",
    "Landing page suggestion 4"
  ],${landingPageAuditField}
${competitorFields}
  "nextActions": [
    "Action step 1",
    "Action step 2",
    "Action step 3",
    "Action step 4"
  ]
}

Maintain the language of the source inputs (e.g., if Indonesian, output in Indonesian).`;

  const userPrompt = `Product Brief:
- Name: ${product.productName}
- Goal: ${product.campaignGoal}

--- SPECIALIST REPORT 1: AUDIENCE & PERSONA ---
${personaReport}

--- SPECIALIST REPORT 2: COPYWRITING & CREATIVE ---
${copywriterReport}

--- SPECIALIST REPORT 3: MARKETING STRATEGY ---
${strategistReport}${landingPageSection}${competitorSection}`;

  const responseText = await runAgent(
    "reportComposerAgent",
    systemInstruction,
    userPrompt,
    "application/json"
  );

  const cleaned = responseText
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  try {
    return JSON.parse(cleaned) as MarketingReport;
  } catch (err) {
    throw new Error(
      `Composer failed to format JSON. Reason: ${err instanceof Error ? err.message : String(err)}. Raw response:\n${responseText}`
    );
  }
}
