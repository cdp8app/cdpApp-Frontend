import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { userId, newPassword, confirm_password } = body;

    // Validate required fields
    if (!userId || !newPassword || !confirm_password) {
      return NextResponse.json(
        { message: "User ID, new password, and password confirmation are required" },
        { status: 400 }
      );
    }

    // Validate password match
    if (newPassword !== confirm_password) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 }
      );
    }

    console.log(`Setting new password for user ID: ${userId}`);

    // Forward the request to the backend
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com";
    const url = `${baseUrl}/api/user/set-new-password/`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, newPassword, confirm_password }),
      });

      // Get the response as text first
      const responseText = await response.text();
      console.log("Raw set new password response:", responseText);

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
      console.error("Error forwarding set new password request:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error in setting new password:", error);
    return NextResponse.json(
      {
        message: "An error occurred while setting new password",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}