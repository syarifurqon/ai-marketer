import { supabaseServer } from "@/lib/supabase/server";
import Link from "next/link";
import { MarketingReport } from "@/lib/types/marketing";

export const revalidate = 0; // Disable static caching for this dashboard

export default async function DashboardPage() {
  if (!supabaseServer) {
    return (
      <div className="p-12 text-center text-gray-500 max-w-2xl mx-auto mt-10 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Database Not Configured</h2>
        <p className="mb-6">Please configure your Supabase environment variables in <code>.env.local</code> to save and view reports.</p>
        <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-sm hover:bg-blue-700 font-medium transition-colors">
          Go Back Home
        </Link>
      </div>
    );
  }

  const { data: reports, error } = await supabaseServer
    .from("marketing_reports")
    .select("id, product_name, category, result, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-12 text-center max-w-2xl mx-auto mt-10">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Error Fetching Reports</h2>
        <p className="text-gray-600">{error.message}</p>
      </div>
    );
  }

  if (!reports || reports.length === 0) {
    return (
      <div className="p-12 text-center flex flex-col items-center mt-10 bg-white max-w-3xl mx-auto rounded-3xl border border-gray-100 shadow-sm">
        <div className="text-6xl mb-6">📭</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">No Reports Yet</h2>
        <p className="text-gray-500 mb-8 max-w-md leading-relaxed">You haven&apos;t generated any marketing reports. Go back to the home page to create your first AI-powered strategy.</p>
        <Link href="/" className="px-8 py-4 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 font-semibold transition-all hover:scale-105">
          Create Your First Report
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-12 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Report Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage and view your generated marketing strategies.</p>
        </div>
        <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-semibold transition-all shadow-sm">
          + New Report
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => {
          const result = report.result as MarketingReport;
          const summary = result?.executiveSummary || "No summary available.";
          
          return (
            <Link 
              href={`/reports/${report.id}`} 
              key={report.id} 
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-300 transition-all flex flex-col group"
            >
              <div className="flex justify-between items-start mb-4 gap-2">
                <h3 className="font-bold text-lg text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors" title={report.product_name}>
                  {report.product_name}
                </h3>
                {report.category && (
                  <span className="text-xs bg-gray-50 border border-gray-100 text-gray-600 px-2.5 py-1 rounded-full whitespace-nowrap">
                    {report.category}
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                {summary}
              </p>
              <div className="flex justify-between items-center text-xs text-gray-400 mt-auto pt-4 border-t border-gray-50">
                <span>
                  {new Date(report.created_at).toLocaleDateString(undefined, {
                    year: 'numeric', month: 'short', day: 'numeric'
                  })}
                </span>
                <span className="text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View Detail &rarr;
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
