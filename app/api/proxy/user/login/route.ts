// app/api/proxy/user/login/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Use environment variable for API URL
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com/api";
    
    console.log("Proxying login request to backend:", {
      ...body,
      password: "[REDACTED]"
    });
    
    // Make the request to the backend
    const response = await fetch(`${apiUrl}/user/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": apiUrl, // Add Referer header to avoid CSRF issues
      },
      body: JSON.stringify(body),
    });
    
    // Get the response data
    let data;
    try {
      const text = await response.text();
      console.log("Raw login response:", text);
      data = text ? JSON.parse(text) : { message: "Empty response" };
    } catch (e: any) {
      data = { message: "Failed to parse response: " + e.message };
    }
    
    console.log("Backend login response:", response.status, data);
    
    // Return the response to the client
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error("Login proxy error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
