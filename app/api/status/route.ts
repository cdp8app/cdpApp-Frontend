import { NextResponse } from "next/server";

export async function GET() {
  try {
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com").replace(/\/$/, "");

    // Test endpoints to check
    const endpoints = ["/api/user/", "/api/chat/", "/api/internships/", "/api/applications/"];

    const results = {};

    // Test each endpoint
    for (const endpoint of endpoints) {
      try {
        const url = `${baseUrl}${endpoint}`;
        console.log(`Testing connection to: ${url}`);

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          cache: "no-store",
        });

        results[endpoint] = {
          status: response.status,
          ok: response.ok,
          statusText: response.statusText,
        };
      } catch (error) {
        results[endpoint] = {
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      baseUrl,
      results,
      environment: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "Not set",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to check API status",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
