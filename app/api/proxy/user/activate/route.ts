import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { token, email } = body;

    // Validate required fields
    if (!token || !email) {
      return NextResponse.json(
        { message: "Token and email are required" },
        { status: 400 }
      );
    }

    console.log(`Activating account for email: ${email} with token: ${token}`);

    // Forward the request to the backend
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com";
    const url = `${baseUrl}/api/user/activate/`;

    try {
      // IMPORTANT: The backend expects "code" instead of "token"
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          code: token,  // Rename token to code for the backend
          email 
        }),
      });

      // Get the response as text first
      const responseText = await response.text();
      console.log("Raw activation response:", responseText);

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
      console.error("Error forwarding activation request:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error in account activation:", error);
    return NextResponse.json(
      {
        message: "An error occurred during account activation",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}