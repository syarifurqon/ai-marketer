import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env.local before other imports
dotenv.config({ path: path.join(process.cwd(), ".env.local") });

import { Command } from "commander";
import prompts from "prompts";
import chalk from "chalk";
import ora from "ora";
import { generateMarketingReport } from "../lib/services/generateMarketingReport";
import { scrapePage } from "../lib/browser/scrapePage";
import { runLandingPageAgent } from "../lib/agents/landingPageAgent";
import { ProductInput } from "../lib/types/marketing";

const program = new Command();

program
  .name("ai-marketing-cli")
  .description("Autonomous AI Marketing Assistant CLI")
  .version("0.1.0");

async function main() {
  console.log(chalk.bold.blue("\n=== WELCOME TO THE AI MARKETING ASSISTANT CLI ==="));
  console.log(chalk.gray("An autonomous agentic system to audit websites and compose strategies.\n"));

  let exitCLI = false;

  while (!exitCLI) {
    const response = await prompts({
      type: "select",
      name: "action",
      message: "Choose an action:",
      choices: [
        { title: "🚀 Generate Marketing Report", value: "generate" },
        { title: "🔍 Audit Single Landing Page URL", value: "audit" },
        { title: "❌ Exit", value: "exit" },
      ],
    });

    if (!response.action || response.action === "exit") {
      exitCLI = true;
      console.log(chalk.bold.green("\nThank you for using AI Marketing Assistant. Goodbye!"));
      break;
    }

    try {
      if (response.action === "generate") {
        await handleGenerate();
      } else if (response.action === "audit") {
        await handleAudit();
      }
    } catch (err) {
      console.error(chalk.red(`\nError occurred: ${err instanceof Error ? err.message : String(err)}`));
    }
    console.log(chalk.gray("\n------------------------------------------------"));
  }
}

async function handleGenerate() {
  console.log(chalk.bold.cyan("\n--- Product Details Brief ---"));

  const answers = await prompts([
    {
      type: "text",
      name: "productName",
      message: "Product Name:",
      validate: (val) => (val.trim() ? true : "Product Name is required"),
    },
    {
      type: "text",
      name: "category",
      message: "Category (e.g. SaaS, Tech, Services):",
      validate: (val) => (val.trim() ? true : "Category is required"),
    },
    {
      type: "select",
      name: "productType",
      message: "Product Type:",
      choices: [
        { title: "Digital Product / SaaS", value: "digital" },
        { title: "Service / Jasa", value: "jasa" },
        { title: "Physical Product", value: "fisik" },
      ],
    },
    {
      type: "text",
      name: "price",
      message: "Price (e.g. $49/mo, Rp 500.000):",
    },
    {
      type: "text",
      name: "targetAudience",
      message: "Target Audience details:",
      validate: (val) => (val.trim() ? true : "Target Audience is required"),
    },
    {
      type: "text",
      name: "usp",
      message: "Unique Selling Proposition (USP):",
      validate: (val) => (val.trim() ? true : "USP is required"),
    },
    {
      type: "text",
      name: "problemSolved",
      message: "Problem Solved:",
      validate: (val) => (val.trim() ? true : "Problem Solved is required"),
    },
    {
      type: "text",
      name: "campaignGoal",
      message: "Campaign Goal (e.g., Get 100 beta signups):",
      validate: (val) => (val.trim() ? true : "Campaign Goal is required"),
    },
    {
      type: "text",
      name: "websiteUrl",
      message: "Website URL to audit (Optional):",
    },
    {
      type: "list",
      name: "competitorUrls",
      message: "Competitor URLs (Comma-separated, Optional, Max 3):",
      separator: ",",
    },
  ]);

  // If user exits mid-prompt
  if (
    !answers.productName ||
    !answers.category ||
    !answers.targetAudience ||
    !answers.usp ||
    !answers.problemSolved ||
    !answers.campaignGoal
  ) {
    console.log(chalk.yellow("\nOperation cancelled."));
    return;
  }

  const cleanCompetitors = (answers.competitorUrls || [])
    .map((url: string) => url.trim())
    .filter((url: string) => url.length > 0);

  const productInput: ProductInput = {
    productName: answers.productName,
    category: answers.category,
    productType: answers.productType,
    price: answers.price || "",
    targetAudience: answers.targetAudience,
    usp: answers.usp,
    problemSolved: answers.problemSolved,
    campaignGoal: answers.campaignGoal,
    websiteUrl: answers.websiteUrl || undefined,
    competitorUrls: cleanCompetitors.length > 0 ? cleanCompetitors : undefined,
  };

  const spinner = ora("Orchestrating AI Specialists & Crawling Webpages...").start();

  try {
    const { report, warnings, screenshotPath, reportId } = await generateMarketingReport(productInput);
    spinner.succeed("Report successfully generated!");

    if (warnings.length > 0) {
      console.log(chalk.bold.yellow("\n⚠️ Warnings:"));
      warnings.forEach((w) => console.log(chalk.yellow(`- ${w}`)));
    }

    if (reportId) {
      console.log(chalk.bold.green(`\n💾 Saved to Database! UUID: ${reportId}`));
      console.log(chalk.blue(`🔗 Web View: http://localhost:3001/reports/${reportId}`));
    }

    if (screenshotPath) {
      console.log(chalk.bold.green(`📸 Website Screenshot Saved: ${screenshotPath}`));
    }

    // Print Report Summary
    console.log(chalk.bold.magenta("\n================================================"));
    console.log(chalk.bold.magenta("              MARKETING REPORT SUMMARY          "));
    console.log(chalk.bold.magenta("================================================"));

    console.log(chalk.bold.blue("\n🏆 Executive Summary:"));
    console.log(report.executiveSummary);

    console.log(chalk.bold.blue("\n👤 Audience Persona:"));
    console.log(report.audiencePersona);

    console.log(chalk.bold.blue("\n🎯 Market Positioning:"));
    console.log(report.positioning);

    console.log(chalk.bold.blue("\n🪝 Marketing Hooks:"));
    report.hooks.forEach((hook, i) => console.log(`${i + 1}. ${hook}`));

    console.log(chalk.bold.blue("\n✍️ Copywriting Sample:"));
    console.log(report.copywriting);

    console.log(chalk.bold.blue("\n💡 Campaign Ideas:"));
    report.campaignIdeas.forEach((idea) => console.log(`- ${idea}`));

    if (report.landingPageAudit) {
      console.log(chalk.bold.blue("\n🔍 Landing Page Audit:"));
      console.log(report.landingPageAudit);
    }

    if (report.competitorAnalysis) {
      console.log(chalk.bold.blue("\n⚔️ Competitor Analysis:"));
      console.log(report.competitorAnalysis);
    }

    if (report.competitorCards && report.competitorCards.length > 0) {
      console.log(chalk.bold.blue("\n📊 Competitor Matrix:"));
      report.competitorCards.forEach((c) => {
        console.log(chalk.bold(`- ${c.title || "Competitor"} (${c.url})`));
        console.log(`  Strengths: ${c.strengths.join(", ")}`);
        console.log(`  Opportunities: ${c.opportunities.join(", ")}`);
      });
    }

    console.log(chalk.bold.blue("\n✅ Next Steps (7-Day Plan):"));
    report.nextActions.forEach((act, i) => console.log(`Day ${i + 1}: ${act}`));

  } catch (err) {
    spinner.fail("Failed to generate report.");
    throw err;
  }
}

async function handleAudit() {
  console.log(chalk.bold.cyan("\n--- Single Page UX/CRO Audit ---"));

  const answers = await prompts([
    {
      type: "text",
      name: "url",
      message: "Target URL to scrape & audit:",
      validate: (val) => (val.trim() ? true : "URL is required"),
    },
  ]);

  if (!answers.url) {
    console.log(chalk.yellow("\nOperation cancelled."));
    return;
  }

  const spinner = ora(`Scraping webpage: ${answers.url}...`).start();

  try {
    const scrapeResult = await scrapePage(answers.url);
    if (!scrapeResult) {
      spinner.fail("Scraping failed: Could not fetch URL page details.");
      return;
    }
    spinner.succeed("Page successfully scraped! Analyzing with Landing Page Agent...");

    spinner.start("Analyzing page structure...");
    const auditReport = await runLandingPageAgent(scrapeResult);
    spinner.succeed("Analysis complete!");

    console.log(chalk.bold.magenta("\n================================================"));
    console.log(chalk.bold.magenta("                 UX/CRO AUDIT REPORT            "));
    console.log(chalk.bold.magenta("================================================"));
    console.log(chalk.bold.blue(`Target: ${answers.url}`));
    console.log(chalk.bold.blue(`Title: ${scrapeResult.title}`));
    console.log(chalk.bold.blue(`Meta Description: ${scrapeResult.metaDescription || "None"}\n`));
    console.log(auditReport);
    
    if (scrapeResult.screenshotPath) {
      console.log(chalk.bold.green(`\n📸 Screenshot path: ${scrapeResult.screenshotPath}`));
    }
  } catch (err) {
    spinner.fail("Failed to audit page.");
    throw err;
  }
}

// Run commander if arguments are provided, otherwise launch interactive console loop
if (process.argv.length > 2) {
  program.parse(process.argv);
} else {
  main();
}
