"use client";

import React, { useState } from "react";
import { MarketingReport, ProductInput } from "@/lib/types/marketing";
import { exportMarketingReportToMarkdown } from "@/lib/export/exportMarkdown";

interface ReportActionsProps {
  reportId: string;
  report: MarketingReport;
  input: ProductInput;
}

export default function ReportActions({ reportId, report, input }: ReportActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const markdown = exportMarketingReportToMarkdown(report, input);
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy markdown: ", err);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all duration-200 flex items-center gap-2 shadow-sm ${
          copied
            ? "bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
            : "bg-white border-gray-250 text-gray-700 hover:bg-gray-50 active:scale-95"
        }`}
      >
        {copied ? (
          <>
            <svg
              className="w-4 h-4 text-green-600 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            <span>Copied!</span>
          </>
        ) : (
          <>
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
              />
            </svg>
            <span>Copy Markdown</span>
          </>
        )}
      </button>

      {/* Download Button */}
      <a
        href={`/api/reports/${reportId}/export`}
        className="px-4 py-2 text-xs font-semibold rounded-xl bg-gray-900 border border-gray-800 text-white hover:bg-gray-855 transition-all duration-200 flex items-center gap-2 shadow-sm active:scale-95"
      >
        <svg
          className="w-4 h-4 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        <span>Download .md</span>
      </a>
    </div>
  );
}
