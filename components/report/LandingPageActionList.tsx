import React from "react";

interface LandingPageActionListProps {
  suggestions: string[];
  audit?: string;
}

export default function LandingPageActionList({ suggestions, audit }: LandingPageActionListProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Suggestions Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🖥️</span>
          <h3 className="text-lg font-bold text-gray-900">Landing Page Suggestions</h3>
        </div>
        <ul className="space-y-3">
          {suggestions.map((sug, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-purple-600 mt-1 flex-shrink-0">✦</span>
              <span className="text-gray-600 text-sm leading-relaxed">{sug}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Audit Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔍</span>
            <h3 className="text-lg font-bold text-gray-900">Website CRO/UX Scan Result</h3>
          </div>
          {audit && (
            <span className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full font-medium">
              Live Scan
            </span>
          )}
        </div>
        {audit ? (
          <p className="text-gray-650 text-sm leading-relaxed whitespace-pre-wrap">{audit}</p>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
            <span className="text-2xl mb-2">🌐</span>
            <p className="text-xs">No website URL scanned during report generation.</p>
          </div>
        )}
      </div>
    </div>
  );
}
