import React from "react";

interface PositioningCardProps {
  positioning: string;
}

export default function PositioningCard({ positioning }: PositioningCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow h-full">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🎯</span>
        <h3 className="text-lg font-bold text-gray-900">Market Positioning</h3>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{positioning}</p>
    </div>
  );
}
