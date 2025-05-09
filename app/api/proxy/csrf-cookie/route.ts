import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get the base API URL
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com").replace(/\/$/, "");

    // Make a request to the Django backend to get the CSRF cookie
    const response = await fetch(`${baseUrl}/api/csrf-cookie/`, {
      method: "GET",
      credentials: "include", // Important: This ensures cookies are sent and stored
    });

    // Get all cookies from the response
    const cookies = response.headers.getSetCookie();
    let csrfToken = "";

    // Extract the CSRF token from the cookies
    for (const cookie of cookies) {
      if (cookie.includes("csrftoken=")) {
        const match = cookie.match(/csrftoken=([^;]+)/);
        if (match && match[1]) {
          csrfToken = match[1];
          console.log("Found CSRF token in cookie:", csrfToken);
          break;
        }
      }
    }

    // Create a response with the CSRF token
    const responseData = {
      csrfToken: csrfToken || null,
      success: !!csrfToken,
    };

    // Create a response
    const nextResponse = NextResponse.json(responseData);

    // Forward all cookies from the Django response
    for (const cookie of cookies) {
      nextResponse.headers.append("Set-Cookie", cookie);
    }

    return nextResponse;
  } catch (error) {
    console.error("CSRF cookie error:", error);
    return NextResponse.json(
      {
        message: "Failed to get CSRF cookie",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
