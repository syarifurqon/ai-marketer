import React from "react";

interface HookListProps {
  hooks: string[];
}

export default function HookList({ hooks }: HookListProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow h-full">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🪝</span>
        <h3 className="text-lg font-bold text-gray-900">High-Converting Hooks</h3>
      </div>
      <div className="space-y-3">
        {hooks.map((hook, idx) => (
          <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100/50">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-750 text-xs font-bold flex items-center justify-center">
              {idx + 1}
            </span>
            <p className="text-gray-700 text-sm font-medium leading-relaxed">{hook}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
