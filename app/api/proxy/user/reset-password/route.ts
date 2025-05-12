import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { email } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    console.log(`Resending activation code for email: ${email}`);

    // Forward the request to the backend
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com";
    const url = `${baseUrl}/api/user/resend-activation/`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      // Get the response as text first
      const responseText = await response.text();
      console.log("Raw resend activation response:", responseText);

      // Try to parse as JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (error) {
        // If not valid JSON, return the raw text with appropriate status
        return new NextResponse(responseText, {
          status: response.status,
          headers: {
            "Content-Type": "text/plain",
          },
        });
      }

      // Return the JSON response
      return NextResponse.json(data, { status: response.status });
    } catch (error) {
      console.error("Error forwarding resend activation request:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error in resend activation:", error);
    return NextResponse.json(
      {
        message: "An error occurred while resending activation code",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}