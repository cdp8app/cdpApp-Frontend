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
    try {
      const csrfResponse = await fetch(`${baseUrl}/user/login/`, {
        method: "GET",
        credentials: "include",
      });
      
      if (!csrfResponse.ok) {
        console.warn(`Failed to get CSRF token: ${csrfResponse.status} ${csrfResponse.statusText}`);
      }
      
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
      const url = `${baseUrl}/user/login/`;
      console.log(`Making login request to: ${url}`);
      
      try {
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
            return NextResponse.json({
              success: true,
              message: "Login successful",
              ...data
            }, { 
              status: response.status,
              headers: responseHeaders
            });
          } else if (response.status === 401) {
            // Handle authentication failure
            return NextResponse.json({
              error: "Authentication failed",
              message: data.detail || "Invalid credentials",
              status: 401
            }, { 
              status: 401
            });
          } else {
            // Handle other error responses
            return NextResponse.json({
              error: "Login failed",
              message: data.detail || "An error occurred during login",
              status: response.status
            }, { 
              status: response.status
            });
          }
        } catch (parseError) {
          console.error("Failed to parse response:", parseError);
          // If not valid JSON, return an error message
          return NextResponse.json({
            error: "Invalid response format",
            message: "The server returned an invalid response format",
            details: responseText.substring(0, 300)
          }, {
            status: 500
          });
        }
      } catch (fetchError) {
        console.error("Network error during login:", fetchError);
        return NextResponse.json({
          error: "Network error",
          message: "Failed to connect to the authentication service",
          details: fetchError instanceof Error ? fetchError.message : "Unknown network error"
        }, {
          status: 503
        });
      }
    } catch (csrfError) {
      console.error("Error fetching CSRF token:", csrfError);
      return NextResponse.json({
        error: "CSRF token error",
        message: "Failed to obtain CSRF token for secure login",
        details: csrfError instanceof Error ? csrfError.message : "Unknown CSRF error"
      }, {
        status: 500
      });
    }
  } catch (error) {
    console.error("Error in user login:", error);
    return NextResponse.json({
      error: "Server error",
      message: "An unexpected error occurred while processing your login request",
      details: error instanceof Error ? error.message : "Unknown error"
    }, {
      status: 500
    });
  }
}