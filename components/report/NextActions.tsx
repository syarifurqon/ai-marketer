import React from "react";

interface NextActionsProps {
  actions: string[];
}

export default function NextActions({ actions }: NextActionsProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl">📅</span>
        <h3 className="text-lg font-bold text-gray-900">7 Days Action Plan</h3>
      </div>
      <div className="relative border-l border-gray-200 ml-4 space-y-6">
        {actions.map((action, idx) => (
          <div key={idx} className="relative pl-6">
            <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-600 border border-white shadow-sm flex items-center justify-center"></span>
            <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-4 hover:border-blue-100 transition-colors">
              <span className="text-xs uppercase font-extrabold tracking-wider text-blue-600 block mb-1">
                Day {idx + 1}
              </span>
              <p className="text-gray-700 text-sm font-medium leading-relaxed">{action}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
