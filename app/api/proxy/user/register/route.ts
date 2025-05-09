// app/api/proxy/user/register/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const payload = {
      username: body.username,
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      password: body.password,
      confirm_password: body.confirm_password,
      role: body.role || "Student",
      userType: body.userType
    };
    
    console.log("Proxying request to backend:", {
      ...payload,
      password: "[REDACTED]",
      confirm_password: "[REDACTED]"
    });
    
    // Use environment variable for API URL
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com/api";
    
    // First, get a CSRF token
    let csrfToken = "";
    try {
      // Use absolute URL for CSRF token endpoint
      const origin = request.headers.get("origin") || "";
      const csrfResponse = await fetch(`${origin}/api/proxy/csrf-token`, {
        method: "GET",
        credentials: "include",
      });
      
      if (csrfResponse.ok) {
        const csrfData = await csrfResponse.json();
        csrfToken = csrfData.csrfToken;
      } else {
        console.warn(`Failed to get CSRF token: ${csrfResponse.status} ${csrfResponse.statusText}`);
      }
    } catch (csrfError) {
      console.error("Error fetching CSRF token:", csrfError);
      // Continue without CSRF token as a fallback
    }
    
    // Use the token in your request
    const response = await fetch(`${apiUrl}/user/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
        "Referer": apiUrl, // Add Referer header
      },
      credentials: "include", // Include cookies
      body: JSON.stringify(payload),
    });
    
    // Get the response data
    let data;
    try {
      const text = await response.text();
      console.log("Raw response:", text);
      data = text ? JSON.parse(text) : { message: "Empty response" };
    } catch (e: any) {
      data = { message: "Failed to parse response: " + e.message };
    }
    
    console.log("Backend response:", response.status, data);
    
    // Return the response to the client
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
