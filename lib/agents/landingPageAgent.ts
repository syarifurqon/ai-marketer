import { ScrapeResult } from "@/lib/browser/scrapePage";
import { runAgent } from "./runAgent";

/**
 * Landing Page Audit Agent.
 * Receives scraped page data and returns a qualitative marketing analysis.
 */
export async function runLandingPageAgent(
  scrapeResult: ScrapeResult
): Promise<string> {
  const systemInstruction = `You are an expert Landing Page Conversion Rate Optimizer (CRO) and UX Strategist.
Your job is to audit a real website's landing page content and provide a detailed, actionable critique.

Analyze and provide:
1. **First Impression & Clarity** – Is the value proposition clear within 5 seconds?
2. **Headline & Copy Quality** – Is the messaging compelling and benefit-driven?
3. **Call-to-Action (CTA) Effectiveness** – Are CTAs prominent, clear, and action-oriented?
4. **Social Proof & Trust Signals** – Are there testimonials, badges, logos, guarantees?
5. **SEO & Meta Signals** – Is the title and description optimized for search?
6. **Specific Improvement Recommendations** – At least 5 concrete, actionable improvements.

Write in the same language as the page content. Be specific, reference actual content from the page.`;

  const userPrompt = `Here is the scraped data from the landing page:

Page Title: ${scrapeResult.title}
Meta Description: ${scrapeResult.metaDescription || "Not set"}
Page Content (truncated):
${scrapeResult.bodyText}

Links found (sample):
${scrapeResult.links.slice(0, 15).join("\n")}`;

  return runAgent("landingPageAgent", systemInstruction, userPrompt);
}
