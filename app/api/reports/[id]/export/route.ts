import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { ProductInput, MarketingReport } from "@/lib/types/marketing";
import { exportMarketingReportToMarkdown } from "@/lib/export/exportMarkdown";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!supabaseServer) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 500 }
    );
  }

  const { data, error } = await supabaseServer
    .from("marketing_reports")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: "Report not found" },
      { status: 404 }
    );
  }

  const input = data.input as ProductInput;
  const result = data.result as MarketingReport;

  const markdownContent = exportMarketingReportToMarkdown(result, input);

  // Normalize product name for filename (safe characters only)
  const safeProductName = (data.product_name || "report")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const filename = `marketing-report-${safeProductName}.md`;

  return new Response(markdownContent, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
