import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const body = await request.json();
    console.log("Login request body:", {
      ...body,
      password: body.password ? "[REDACTED]" : undefined,
    });

    // Construct the backend URL
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com";
    
    // First, get a CSRF token by making a GET request to the login page
    console.log("Fetching CSRF token from login page");
    const csrfResponse = await fetch(`${baseUrl}/api/user/login/`, {
      method: "GET",
      credentials: "include",
    });
    
    // Extract the CSRF token from the cookie
    const csrfCookies = csrfResponse.headers.get("set-cookie");
    let csrfToken = "";
    
    if (csrfCookies) {
      const csrfCookie = csrfCookies.split(";").find(cookie => cookie.trim().startsWith("csrftoken="));
      if (csrfCookie) {
        csrfToken = csrfCookie.split("=")[1];
        console.log("Extracted CSRF token:", csrfToken);
      }
    }
    
    if (!csrfToken) {
      console.warn("Could not extract CSRF token from login page");
      // Use token from request if available
      csrfToken = request.headers.get("X-CSRFToken") || body.csrfmiddlewaretoken || "";
    }
    
    // Prepare headers for the login request
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    
    // Set the CSRF token header
    if (csrfToken) {
      headers.set("X-CSRFToken", csrfToken);
    }
    
    // Forward cookies from the CSRF response
    if (csrfCookies) {
      headers.set("Cookie", csrfCookies);
    } else {
      // Use cookies from the original request as fallback
      const originalCookies = request.headers.get("cookie");
      if (originalCookies) {
        headers.set("Cookie", originalCookies);
      }
    }
    
    // Make the login request to the backend
    const url = `${baseUrl}/api/user/login/`;
    console.log(`Making login request to: ${url}`);
    
    const response = await fetch(url, {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify(body),
    });
    
    // Get the response as text first
    const responseText = await response.text();
    console.log(`Login response status: ${response.status}`);
    console.log(`Raw response: ${responseText.substring(0, 200)}${responseText.length > 200 ? "..." : ""}`);
    
    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(responseText);
      
      // If login was successful and we have tokens
      if (response.status === 200 && data.access) {
        console.log("Login successful, storing JWT token");
        
        // Create response headers with the JWT token in a cookie
        const responseHeaders = new Headers();
        
        // Set the JWT token as an HTTP-only cookie
        const tokenCookie = `authToken=${data.access}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`;
        responseHeaders.set("set-cookie", tokenCookie);
        
        // Also set refresh token if available
        if (data.refresh) {
          const refreshCookie = `refreshToken=${data.refresh}; Path=/; HttpOnly; SameSite=Strict; Max-Age=604800`;
          responseHeaders.append("set-cookie", refreshCookie);
        }
        
        // Forward any cookies from the response
        const responseCookies = response.headers.get("set-cookie");
        if (responseCookies) {
          // Append to existing cookies
          responseHeaders.append("set-cookie", responseCookies);
        }
        
        console.log("Set auth cookies in response");
        
        // Return the JSON response with the token cookie
        return NextResponse.json(data, { 
          status: response.status,
          headers: responseHeaders
        });
      }
    } catch (error) {
      console.error("Failed to parse response:", error);
      // If not valid JSON, return an error message
      return NextResponse.json({
        message: `Failed to parse response: ${error instanceof Error ? error.message : "Unknown error"}`,
        rawHtml: responseText.substring(0, 500) // Include part of the HTML for debugging
      }, {
        status: response.status
      });
    }
    
    // Forward any cookies from the response
    const responseHeaders = new Headers();
    const responseCookies = response.headers.get("set-cookie");
    if (responseCookies) {
      responseHeaders.set("set-cookie", responseCookies);
    }
    
    // Return the JSON response
    return NextResponse.json(data, { 
      status: response.status,
      headers: responseHeaders
    });
  } catch (error) {
    console.error("Error in user login:", error);
    return NextResponse.json(
      {
        message: "An error occurred during login",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}