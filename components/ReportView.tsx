import { MarketingReport } from "@/lib/types/marketing";
import React from "react";

export function ReportCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <span>{icon}</span> {title}
      </h3>
      {children}
    </div>
  );
}

export default function ReportView({ report }: { report: MarketingReport }) {
  return (
    <div className="w-full space-y-6 mt-4">
      {/* Executive Summary */}
      <ReportCard title="Executive Summary" icon="🏆">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{report.executiveSummary}</p>
      </ReportCard>

      {/* Audience Persona */}
      <ReportCard title="Audience Persona" icon="👤">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{report.audiencePersona}</p>
      </ReportCard>

      {/* Positioning */}
      <ReportCard title="Market Positioning" icon="🎯">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{report.positioning}</p>
      </ReportCard>

      {/* Hooks */}
      <ReportCard title="Marketing Hooks" icon="🪝">
        <ul className="space-y-2">
          {report.hooks.map((hook, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1 w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold shrink-0">{i + 1}</span>
              <span className="text-gray-700">{hook}</span>
            </li>
          ))}
        </ul>
      </ReportCard>

      {/* Copywriting */}
      <ReportCard title="Copywriting" icon="✍️">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{report.copywriting}</p>
      </ReportCard>

      {/* Campaign Ideas */}
      <ReportCard title="Campaign Ideas" icon="💡">
        <ul className="space-y-2">
          {report.campaignIdeas.map((idea, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-blue-600 mt-0.5">→</span>
              <span className="text-gray-700">{idea}</span>
            </li>
          ))}
        </ul>
      </ReportCard>

      {/* Landing Page Suggestions */}
      <ReportCard title="Landing Page Suggestions" icon="🖥️">
        <ul className="space-y-2">
          {report.landingPageSuggestions.map((sug, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-purple-600 mt-0.5">→</span>
              <span className="text-gray-700">{sug}</span>
            </li>
          ))}
        </ul>
      </ReportCard>

      {/* Landing Page Audit — conditional, only if websiteUrl was provided */}
      {report.landingPageAudit && (
        <ReportCard title="Website Audit (Playwright)" icon="🔍">
          <div className="text-sm bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-2 mb-4 inline-block font-medium">
            ⚡ Based on live scan of your website
          </div>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{report.landingPageAudit}</p>
        </ReportCard>
      )}

      {/* Competitor Research — conditional, only if competitor data was generated */}
      {report.competitorAnalysis && (
        <ReportCard title="Competitor Analysis" icon="⚔️">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-6">
            {report.competitorAnalysis}
          </p>

          {report.competitorCards && report.competitorCards.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {report.competitorCards.map((comp, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-150 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-gray-900 text-base">{comp.title || "Competitor Website"}</h4>
                    <a
                      href={comp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline font-medium truncate max-w-[180px]"
                    >
                      Visit Site &rarr;
                    </a>
                  </div>
                  <p className="text-sm text-gray-650 mb-4">{comp.summary}</p>
                  
                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="font-semibold text-green-700 block mb-1">💪 Strengths</span>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {comp.strengths.map((str, i) => (
                          <li key={i}>{str}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-semibold text-blue-700 block mb-1">🎯 Opportunities for Us</span>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {comp.opportunities.map((opp, i) => (
                          <li key={i}>{opp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ReportCard>
      )}

      {/* Next Actions */}
      <ReportCard title="Next Actions" icon="✅">
        <ul className="space-y-2">
          {report.nextActions.map((action, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1 w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs flex items-center justify-center font-bold shrink-0">{i + 1}</span>
              <span className="text-gray-700">{action}</span>
            </li>
          ))}
        </ul>
      </ReportCard>
    </div>
  );
}
