import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    console.log("Company profile endpoint not available yet, returning mock data");
    return NextResponse.json({
      id: "mock-company-1",
      user: "user-1",
      company_name: "Example Corp",
      industry: "Technology",
      company_size: "50-100",
      founded_year: 2010,
      linkedin_url: "https://linkedin.com/company/example",
      companyName: "Example Corp",
    });
  } catch (error) {
    console.error("Error in company profile endpoint:", error);
    return NextResponse.json(
      { error: "Failed to fetch company profile", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
