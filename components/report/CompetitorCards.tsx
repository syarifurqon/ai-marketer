import React from "react";

interface CompetitorCardItem {
  url: string;
  title: string;
  summary: string;
  strengths: string[];
  opportunities: string[];
}

interface CompetitorCardsProps {
  analysis?: string;
  cards?: CompetitorCardItem[];
}

export default function CompetitorCards({ analysis, cards }: CompetitorCardsProps) {
  if (!analysis && (!cards || cards.length === 0)) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm text-center py-12 text-gray-400">
        <span className="text-3xl mb-2 block">⚔️</span>
        <p className="text-sm">No competitor URLs provided for comparative research.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">⚔️</span>
        <h3 className="text-lg font-bold text-gray-900">Competitor Research & Opportunities</h3>
      </div>

      {analysis && (
        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap mb-6 border-b border-gray-100 pb-4">
          {analysis}
        </p>
      )}

      {cards && cards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {cards.map((comp, idx) => (
            <div key={idx} className="bg-gray-50 border border-gray-100 rounded-xl p-5 shadow-sm hover:border-blue-150 transition-colors">
              <div className="flex items-center justify-between mb-3 border-b border-gray-200/50 pb-2">
                <h4 className="font-bold text-gray-900 text-sm truncate max-w-[150px]">{comp.title || "Competitor"}</h4>
                <a
                  href={comp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline font-semibold flex-shrink-0"
                >
                  Visit Site &rarr;
                </a>
              </div>
              <p className="text-xs text-gray-600 mb-4">{comp.summary}</p>
              
              <div className="space-y-4 text-xs">
                <div>
                  <span className="font-bold text-green-700 block mb-1">💪 Competitor Strengths</span>
                  <ul className="list-disc list-inside space-y-1 text-gray-500">
                    {comp.strengths.map((str, i) => (
                      <li key={i}>{str}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="font-bold text-blue-700 block mb-1">🎯 Opportunities for Us</span>
                  <ul className="list-disc list-inside space-y-1 text-gray-500">
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
    </div>
  );
}
