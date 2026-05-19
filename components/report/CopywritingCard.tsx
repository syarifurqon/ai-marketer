"use client";

import React, { useState } from "react";

interface CopywritingCardProps {
  copywriting: string;
}

export default function CopywritingCard({ copywriting }: CopywritingCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(copywriting);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">✍️</span>
            <h3 className="text-lg font-bold text-gray-900">Copywriting Copy</h3>
          </div>
          <button
            onClick={handleCopy}
            className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all ${
              copied
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-gray-50 text-gray-650 hover:bg-gray-100 border-gray-200"
            }`}
          >
            {copied ? "Copied! ✓" : "Copy Copy"}
          </button>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 max-h-[350px] overflow-y-auto font-mono text-xs text-gray-800 leading-relaxed whitespace-pre-wrap">
          {copywriting}
        </div>
      </div>
    </div>
  );
}
