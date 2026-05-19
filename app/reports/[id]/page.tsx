import { supabaseServer } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ProductInput, MarketingReport } from "@/lib/types/marketing";
import Link from "next/link";

// Import modular report components
import ExecutiveSummaryCard from "@/components/report/ExecutiveSummaryCard";
import PersonaCard from "@/components/report/PersonaCard";
import PositioningCard from "@/components/report/PositioningCard";
import HookList from "@/components/report/HookList";
import CopywritingCard from "@/components/report/CopywritingCard";
import CampaignIdeas from "@/components/report/CampaignIdeas";
import LandingPageActionList from "@/components/report/LandingPageActionList";
import CompetitorCards from "@/components/report/CompetitorCards";
import NextActions from "@/components/report/NextActions";
import ReportActions from "@/components/report/ReportActions";

export default async function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!supabaseServer) {
    return (
      <div className="p-12 text-center text-gray-500">
        Database not configured. Cannot view detailed report.
      </div>
    );
  }

  const { data, error } = await supabaseServer
    .from("marketing_reports")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return notFound();
  }

  const input = data.input as ProductInput;
  const result = data.result as MarketingReport;

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Top Banner / Header Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors shrink-0">
              &larr; Dashboard
            </Link>
            <span className="text-gray-300 shrink-0">|</span>
            <h2 className="text-sm font-bold text-gray-900 truncate max-w-[120px] sm:max-w-xs shrink-0">
              {data.product_name}
            </h2>
            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[10px] font-semibold uppercase tracking-wider border border-blue-100 shrink-0 hidden md:inline">
              {data.category}
            </span>
          </div>
          <ReportActions reportId={id} report={result} input={input} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* SECTION 1: REPORT OVERVIEW */}
        <section id="overview" className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-extrabold text-gray-950 tracking-tight">Report Overview</h2>
            <p className="text-sm text-gray-500">Overview of the submitted product brief and target objectives.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Brief details (Left 1/3) */}
            <div className="bg-gray-900 rounded-2xl p-6 text-gray-300 flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-800 pb-3 flex items-center gap-2">
                  <span>📋</span> Product Brief
                </h3>
                <div className="space-y-4 text-xs">
                  <div>
                    <span className="block text-gray-500 font-medium mb-1">Target Audience</span>
                    <span className="font-semibold text-white">{input.targetAudience}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 font-medium mb-1">Campaign Goal</span>
                    <span className="font-semibold text-white">{input.campaignGoal}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 font-medium mb-1">Problem Solved</span>
                    <span className="font-semibold text-white">{input.problemSolved}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 font-medium mb-1">Unique Selling Proposition (USP)</span>
                    <span className="font-semibold text-white">{input.usp}</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-800 pt-4 mt-6 space-y-2 text-xs">
                {input.price && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Price Points:</span>
                    <span className="text-white font-semibold">{input.price}</span>
                  </div>
                )}
                {input.websiteUrl && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Website:</span>
                    <a href={input.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline truncate max-w-[150px]">
                      {input.websiteUrl}
                    </a>
                  </div>
                )}
              </div>
            </div>
            {/* Executive Summary Card (Right 2/3) */}
            <div className="lg:col-span-2">
              <ExecutiveSummaryCard summary={result.executiveSummary} />
            </div>
          </div>
        </section>

        {/* SECTION 2: STRATEGY */}
        <section id="strategy" className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-extrabold text-gray-950 tracking-tight">Strategy</h2>
            <p className="text-sm text-gray-500">Positioning, audience persona research, and recommended campaign directions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PersonaCard persona={result.audiencePersona} />
            <PositioningCard positioning={result.positioning} />
          </div>
          <CampaignIdeas ideas={result.campaignIdeas} />
        </section>

        {/* SECTION 3: COPYWRITING */}
        <section id="copywriting" className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-extrabold text-gray-950 tracking-tight">Copywriting</h2>
            <p className="text-sm text-gray-500">High-converting copywriting copies and hooks optimized for marketing channels.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CopywritingCard copywriting={result.copywriting} />
            </div>
            <div>
              <HookList hooks={result.hooks} />
            </div>
          </div>
        </section>

        {/* SECTION 4: WEBSITE AUDIT */}
        <section id="audit" className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-extrabold text-gray-950 tracking-tight">Website Audit</h2>
            <p className="text-sm text-gray-500">Visual screenshot scans and automated conversion optimization diagnostics.</p>
          </div>
          {data.screenshot_path && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-150 p-6">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>📸</span> Scanned Landing Page Screenshot
              </h3>
              <div className="rounded-xl overflow-hidden border border-gray-100 shadow-inner bg-gray-50 max-h-[500px] overflow-y-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={data.screenshot_path} 
                  alt="Scanned website screenshot" 
                  className="w-full h-auto object-cover object-top"
                />
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Full-page scan snapshot taken during generation.
              </p>
            </div>
          )}
          <LandingPageActionList 
            suggestions={result.landingPageSuggestions} 
            audit={result.landingPageAudit} 
          />
        </section>

        {/* SECTION 5: COMPETITOR RESEARCH */}
        <section id="competitors" className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-extrabold text-gray-950 tracking-tight">Competitor Research</h2>
            <p className="text-sm text-gray-500">Comparative positioning overview and competitor strengths/weaknesses map.</p>
          </div>
          <CompetitorCards 
            analysis={result.competitorAnalysis} 
            cards={result.competitorCards} 
          />
        </section>

        {/* SECTION 6: 7 DAYS ACTION PLAN */}
        <section id="action-plan" className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-extrabold text-gray-950 tracking-tight">7 Days Action Plan</h2>
            <p className="text-sm text-gray-500">Strategic roadmap of immediate next actions to implement this plan.</p>
          </div>
          <NextActions actions={result.nextActions} />
        </section>
      </div>
    </div>
  );
}
