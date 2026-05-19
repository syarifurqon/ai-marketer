import { MarketingReport, ProductInput } from "@/lib/types/marketing";

export function exportMarketingReportToMarkdown(report: MarketingReport, input: ProductInput): string {
  let md = `# Marketing Report - ${input.productName}\n\n`;

  // 1. Executive Summary
  md += `## Executive Summary\n`;
  md += `${report.executiveSummary || "N/A"}\n\n`;

  // 2. Audience Persona
  md += `## Audience Persona\n`;
  md += `${report.audiencePersona || "N/A"}\n\n`;

  // 3. Positioning
  md += `## Positioning\n`;
  md += `${report.positioning || "N/A"}\n\n`;

  // 4. Hooks
  md += `## Hooks\n`;
  if (report.hooks && report.hooks.length > 0) {
    report.hooks.forEach((hook, i) => {
      md += `${i + 1}. ${hook}\n`;
    });
  } else {
    md += `N/A\n`;
  }
  md += `\n`;

  // 5. Copywriting
  md += `## Copywriting\n`;
  md += `${report.copywriting || "N/A"}\n\n`;

  // 6. Campaign Ideas
  md += `## Campaign Ideas\n`;
  if (report.campaignIdeas && report.campaignIdeas.length > 0) {
    report.campaignIdeas.forEach((idea) => {
      md += `- ${idea}\n`;
    });
  } else {
    md += `N/A\n`;
  }
  md += `\n`;

  // 7. Landing Page Audit
  md += `## Landing Page Audit\n`;
  if (report.landingPageAudit) {
    md += `### Audit Result\n`;
    md += `${report.landingPageAudit}\n\n`;
  }
  if (report.landingPageSuggestions && report.landingPageSuggestions.length > 0) {
    md += `### Recommendations\n`;
    report.landingPageSuggestions.forEach((sug) => {
      md += `- ${sug}\n`;
    });
  } else if (!report.landingPageAudit) {
    md += `N/A\n`;
  }
  md += `\n`;

  // 8. Competitor Analysis
  md += `## Competitor Analysis\n`;
  if (report.competitorAnalysis) {
    md += `${report.competitorAnalysis}\n\n`;
  }
  if (report.competitorCards && report.competitorCards.length > 0) {
    report.competitorCards.forEach((comp, idx) => {
      md += `### Competitor ${idx + 1}: ${comp.title || "Untitled"}\n`;
      md += `- **URL**: ${comp.url}\n`;
      md += `- **Summary**: ${comp.summary}\n`;
      md += `- **Strengths**:\n`;
      comp.strengths.forEach((str) => {
        md += `  - ${str}\n`;
      });
      md += `- **Opportunities**:\n`;
      comp.opportunities.forEach((opp) => {
        md += `  - ${opp}\n`;
      });
      md += `\n`;
    });
  } else if (!report.competitorAnalysis) {
    md += `N/A\n`;
  }
  md += `\n`;

  // 9. Next 7 Days Action Plan
  md += `## Next 7 Days Action Plan\n`;
  if (report.nextActions && report.nextActions.length > 0) {
    report.nextActions.forEach((action, i) => {
      md += `${i + 1}. ${action}\n`;
    });
  } else {
    md += `N/A\n`;
  }

  return md;
}
