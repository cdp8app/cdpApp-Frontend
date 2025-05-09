import { type NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    // Get the activation code from the request body
    const body = await request.json();
    const { code, email } = body;

    if (!code) {
      return NextResponse.json({ message: "Activation code is required" }, { status: 400 });
    }

    // Forward the request to your backend API
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com").replace(/\/$/, "");
    const response = await fetch(`${baseUrl}/api/user/activate/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, email }),
    });

    // Get the response from the backend
    const responseText = await response.text();
    let data;

    try {
      // Try to parse as JSON
      data = JSON.parse(responseText);
    } catch (e) {
      // If not valid JSON, return as text
      return new NextResponse(responseText, {
        status: response.status,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }

    // Return the response with the appropriate status code
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error activating user account:", error);
    return NextResponse.json({ message: "An error occurred while activating the account" }, { status: 500 });
  }
}
