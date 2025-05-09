import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Get the refresh token from the request body
    const body = await request.json();
    const { refresh } = body;

    if (!refresh) {
      return NextResponse.json({ error: "Refresh token is required" }, { status: 400 });
    }

    // Get the base URL from environment variables
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com").replace(/\/$/, "");

    // Determine the refresh token endpoint
    // This might vary depending on your backend API
    const url = `${baseUrl}/api/user/token/refresh/`;

    console.log(`Attempting to refresh token at: ${url}`);

    // Make the request to the backend API
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh }),
    });

    // Get the response data
    const data = await response.json();

    // If the request was not successful, return the error
    if (!response.ok) {
      console.error(`Token refresh failed: ${response.status} ${response.statusText}`);
      return NextResponse.json({ error: "Failed to refresh token", details: data }, { status: response.status });
    }

    // Return the new access token (and possibly a new refresh token)
    console.log("Token refreshed successfully");
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in refresh token endpoint:", error);
    return NextResponse.json(
      { error: "Failed to refresh token", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
