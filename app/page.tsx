"use client";

import { useState } from "react";
import Link from "next/link";
import ProductForm from "@/components/ProductForm";
import ReportView from "@/components/ReportView";
import { ProductInput, MarketingReport } from "@/lib/types/marketing";

type Status = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [status, setStatus] = useState<Status>("idle");
  const [report, setReport] = useState<MarketingReport | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [warnings, setWarnings] = useState<string[]>([]);

  const handleFormSubmit = async (data: ProductInput) => {
    setStatus("loading");
    setReport(null);
    setErrorMsg("");
    setWarnings([]);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to generate report.");
      }

      setReport(json.report as MarketingReport);
      setWarnings(Array.isArray(json.warnings) ? json.warnings : []);
      setStatus("success");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unexpected error.";
      setErrorMsg(message);
      setStatus("error");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setReport(null);
    setErrorMsg("");
    setWarnings([]);
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-6 sm:p-12 bg-gray-50">
      <div className="max-w-4xl w-full flex flex-col items-center">

        {/* Header */}
        <div className="mb-10 text-center">
          <h1
            onClick={handleReset}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-4 cursor-pointer hover:opacity-80 transition-opacity"
          >
            Personal AI Marketing Assistant
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Generate comprehensive marketing reports, website audits, and competitor research using advanced AI agents.
          </p>
        </div>

        {/* Landing */}
        {status === "idle" && !report && (
          <>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md mb-16">
              <button
                onClick={() => setStatus("loading")}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow transition-all w-full sm:w-auto"
                onClickCapture={(e) => {
                  e.stopPropagation();
                  setStatus("idle");
                  document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Create Report
              </button>
              <button className="px-8 py-4 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-xl shadow transition-all w-full sm:w-auto">
                Audit Website
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
              {[
                { title: "AI Reports", desc: "Instant marketing strategies tailored to your product.", icon: "📊" },
                { title: "Website Audit", desc: "Technical and SEO analysis of your landing pages.", icon: "🔍" },
                { title: "Competitor Research", desc: "Understand your market positioning automatically.", icon: "🎯" },
              ].map((f) => (
                <div key={f.title} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start">
                  <span className="text-3xl mb-4">{f.icon}</span>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Form */}
        <div id="form-section" className="w-full">
          {status !== "success" && (
            <ProductForm onSubmit={handleFormSubmit} />
          )}
        </div>

        {/* Loading */}
        {status === "loading" && (
          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-600 font-medium">Generating your marketing report…</p>
            <p className="text-gray-400 text-sm">This may take 10–20 seconds.</p>
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div className="mt-8 w-full bg-red-50 border border-red-200 rounded-2xl p-6">
            <h3 className="text-red-700 font-semibold text-lg mb-2">❌ Error</h3>
            <p className="text-red-600 text-sm">{errorMsg}</p>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Report */}
        {status === "success" && report && (
          <div className="w-full mt-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">📋 Marketing Report</h2>
              <div className="flex gap-3">
                <Link
                  href="/dashboard"
                  className="px-5 py-2 text-sm bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg transition-all font-medium"
                >
                  View Dashboard
                </Link>
                <button
                  onClick={handleReset}
                  className="px-5 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all font-medium"
                >
                  New Report
                </button>
              </div>
            </div>

            {/* Warnings banner – shown when scraping or audit partially failed */}
            {warnings.length > 0 && (
              <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-amber-800 font-semibold text-sm mb-2">⚠️ Partial warnings:</p>
                <ul className="list-disc list-inside space-y-1">
                  {warnings.map((w, i) => (
                    <li key={i} className="text-amber-700 text-sm">{w}</li>
                  ))}
                </ul>
              </div>
            )}

            <ReportView report={report} />
          </div>
        )}
      </div>
    </main>
  );
}
