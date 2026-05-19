import { NextRequest, NextResponse } from "next/server";
import { generateMarketingReport } from "@/lib/services/generateMarketingReport";
import { ProductInput } from "@/lib/types/marketing";

export async function POST(req: NextRequest) {
  let input: ProductInput;

  try {
    input = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body. Expected JSON." },
      { status: 400 }
    );
  }

  try {
    const { report, warnings, screenshotPath, reportId } = await generateMarketingReport(input);

    return NextResponse.json(
      { success: true, report, reportId: reportId || "mock-uuid-not-persisted", warnings, screenshotPath },
      { status: 200 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected orchestrator error.";
    const isDev = process.env.NODE_ENV !== "production";

    const responsePayload: { error: string; rawResponse?: string } = {
      error: message,
    };

    if (isDev && err instanceof Error && err.message.includes("Raw response:")) {
      const parts = err.message.split("Raw response:\n");
      responsePayload.error = parts[0].trim();
      responsePayload.rawResponse = parts[1];
    }

    // Determine status code based on missing fields or general error
    const status = message.startsWith("Missing required field:") ? 400 : 500;

    return NextResponse.json(responsePayload, { status });
  }
}
