import { ScrapeResult } from "@/lib/browser/scrapePage";
import { runAgent } from "./runAgent";

export interface CompetitorScrapeData {
  url: string;
  data: ScrapeResult;
}

/**
 * Competitor Research Specialist Agent.
 * Accepts scraped data from multiple competitor websites and generates a detailed comparative analysis.
 */
export async function runCompetitorAgent(
  productName: string,
  usp: string,
  competitors: CompetitorScrapeData[]
): Promise<string> {
  const systemInstruction = `You are a Lead Competitor Intelligence Analyst and Marketing Strategist.
Your task is to analyze scraped landing page data from competitors and provide a strategic comparative review.

Format your output in clear markdown sections:
1. **Executive Overview**: A 2-paragraph summary of the competitive landscape for this product space.
2. **Competitor Profiles**: For each competitor, evaluate their title, main body text, and links. Identify their positioning, apparent USP, and focus.
3. **Strategic Gap Analysis & Opportunities**: Compare our product USP ("${usp}") with their offerings. Identify 3-4 key market opportunities where our product can win.

Be objective, analytical, and highly strategic. Avoid generic high-level statements. Refer directly to the scraped text.`;

  const competitorBriefs = competitors
    .map((c, idx) => {
      return `### COMPETITOR #${idx + 1}
URL: ${c.url}
Page Title: ${c.data.title}
Meta Description: ${c.data.metaDescription || "Not set"}
Page Content (truncated):
${c.data.bodyText.slice(0, 4000)}`;
    })
    .join("\n\n---\n\n");

  const userPrompt = `Our Product Name: ${productName}
Our USP: ${usp}

Compare with the following competitors:
${competitorBriefs}`;

  return runAgent("competitorAgent", systemInstruction, userPrompt);
}
