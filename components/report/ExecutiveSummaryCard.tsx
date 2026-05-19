import React from "react";

interface ExecutiveSummaryCardProps {
  summary: string;
}

export default function ExecutiveSummaryCard({ summary }: ExecutiveSummaryCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🏆</span>
        <h3 className="text-lg font-bold text-gray-900">Executive Summary</h3>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{summary}</p>
    </div>
  );
}
