import { ProductInput, MarketingReport } from "@/lib/types/marketing";
import { runPersonaAgent } from "../agents/personaAgent";
import { runCopywriterAgent } from "../agents/copywriterAgent";
import { runStrategistAgent } from "../agents/strategistAgent";
import { runReportComposerAgent } from "../agents/reportComposerAgent";
import { runLandingPageAgent } from "../agents/landingPageAgent";
import { scrapePage } from "../browser/scrapePage";
import { runCompetitorAgent, CompetitorScrapeData } from "../agents/competitorAgent";
import { supabaseServer } from "../supabase/server";

/**
 * Service Layer - Multi-Agent Orchestrator
 * Performs input validation, executes specialist agents, scrapes landing page/competitor URLs,
 * persists the results to Supabase, and returns the final report and database ID.
 */
export async function generateMarketingReport(
  input: ProductInput
): Promise<{ report: MarketingReport; warnings: string[]; screenshotPath?: string; reportId?: string }> {
  // 1. Input validation
  const requiredFields: (keyof ProductInput)[] = [
    "productName",
    "category",
    "targetAudience",
    "usp",
    "problemSolved",
    "campaignGoal",
  ];

  for (const field of requiredFields) {
    if (!input[field] || (typeof input[field] === "string" && (input[field] as string).trim() === "")) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  const warnings: string[] = [];

  // 2. Execute the three specialist agents in parallel
  const [personaReport, copywriterReport, strategistReport] = await Promise.all([
    runPersonaAgent(input).catch((err) => {
      throw new Error(`[PersonaAgent Error]: ${err instanceof Error ? err.message : err}`);
    }),
    runCopywriterAgent(input).catch((err) => {
      throw new Error(`[CopywriterAgent Error]: ${err instanceof Error ? err.message : err}`);
    }),
    runStrategistAgent(input).catch((err) => {
      throw new Error(`[StrategistAgent Error]: ${err instanceof Error ? err.message : err}`);
    }),
  ]);

  // 3. Optionally scrape & audit the website if a URL was provided
  let landingPageAudit: string | undefined;
  let screenshotPath: string | undefined;

  if (input.websiteUrl && input.websiteUrl.trim() !== "") {
    console.log(`[LandingPageAgent] Scraping: ${input.websiteUrl}`);
    try {
      const scrapeResult = await scrapePage(input.websiteUrl);
      if (scrapeResult) {
        screenshotPath = scrapeResult.screenshotPath;
        landingPageAudit = await runLandingPageAgent(scrapeResult).catch((err) => {
          warnings.push(
            `Landing page audit failed (AI analysis): ${err instanceof Error ? err.message : String(err)}`
          );
          return undefined;
        });
      } else {
        warnings.push(
          `Landing page scraping failed: Could not open "${input.websiteUrl}". The page may be unreachable or blocked.`
        );
      }
    } catch (err) {
      warnings.push(
        `Landing page scraping failed: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  // 4. Optionally scrape & analyze competitors if URLs were provided
  let competitorReport: string | undefined;
  
  if (input.competitorUrls && input.competitorUrls.length > 0) {
    const targetUrls = input.competitorUrls.slice(0, 3);
    const competitorScrapes: CompetitorScrapeData[] = [];

    console.log(`[CompetitorAgent] Scraping ${targetUrls.length} competitor URLs`);

    for (const url of targetUrls) {
      try {
        const scrapeResult = await scrapePage(url);
        if (scrapeResult) {
          competitorScrapes.push({ url, data: scrapeResult });
        } else {
          warnings.push(`Competitor scraping failed: Could not open competitor URL "${url}"`);
        }
      } catch (err) {
        warnings.push(`Competitor scraping failed for "${url}": ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    if (competitorScrapes.length > 0) {
      try {
        competitorReport = await runCompetitorAgent(
          input.productName,
          input.usp,
          competitorScrapes
        );
      } catch (err) {
        warnings.push(`Competitor analysis AI generation failed: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
  }

  // 5. Compose all outputs into final structured JSON
  let finalReport: MarketingReport;
  try {
    finalReport = await runReportComposerAgent(
      input,
      personaReport,
      copywriterReport,
      strategistReport,
      landingPageAudit,
      competitorReport
    );
  } catch (err) {
    throw new Error(
      `[ReportComposerAgent Error]: Failed to synthesize reports. Reason: ${
        err instanceof Error ? err.message : err
      }`
    );
  }

  // 6. Persist to Supabase if config exists
  let reportId: string | undefined;
  if (supabaseServer) {
    const { data, error } = await supabaseServer
      .from("marketing_reports")
      .insert({
        product_name: input.productName,
        category: input.category,
        product_type: input.productType,
        input: input,
        result: finalReport,
        screenshot_path: screenshotPath || null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase Storage Error:", error.message);
    } else {
      reportId = data?.id;
    }
  } else {
    console.warn("Supabase variables missing or not configured. Report was generated but not saved.");
  }

  return { report: finalReport, warnings, screenshotPath, reportId };
}
