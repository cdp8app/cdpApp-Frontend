import { type NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    console.log("Handling PUT request to /api/proxy/user/update_profile");
    
    // Get the request body
    const body = await request.json();
    console.log("Update profile request body:", {
      ...body,
      // Don't log sensitive fields if any
      password: undefined
    });
    
    // Get JWT token from cookies
    const cookies = request.headers.get("cookie");
    let authToken = null;
    let csrfToken = null;
    
    if (cookies) {
      const authCookie = cookies.split(";").find(cookie => cookie.trim().startsWith("authToken="));
      if (authCookie) {
        authToken = authCookie.split("=")[1];
        console.log("Found JWT token in cookies");
      } else {
        console.log("No authorization token found in cookies");
      }
      
      // Try to get CSRF token from cookies
      const csrfCookie = cookies.split(";").find(cookie => cookie.trim().startsWith("csrftoken="));
      if (csrfCookie) {
        csrfToken = csrfCookie.split("=")[1];
        console.log("Found CSRF token in cookies:", csrfToken);
      }
    }
    
    // If we have an auth token, try to update on the backend
    if (authToken) {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com";
      const url = `${baseUrl}/api/user/update_profile/`; // Added /api prefix
      
      console.log(`Forwarding update profile request to: ${url}`);
      
      // First, get a CSRF token if we don't have one
      if (!csrfToken) {
        try {
          const csrfResponse = await fetch(`${baseUrl}/api/user/login/`, {
            method: "GET",
            credentials: "include",
          });
          
          // Extract the CSRF token from the cookie
          const csrfCookies = csrfResponse.headers.get("set-cookie");
          if (csrfCookies) {
            const csrfCookie = csrfCookies.split(";").find(cookie => cookie.trim().startsWith("csrftoken="));
            if (csrfCookie) {
              csrfToken = csrfCookie.split("=")[1];
              console.log("Extracted CSRF token:", csrfToken);
            }
          }
        } catch (error) {
          console.error("Error fetching CSRF token:", error);
        }
      }
      
      try {
        // Set up headers with Referer and Origin
        const headers = new Headers({
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "application/json",
          "Referer": baseUrl,
          "Origin": baseUrl
        });
        
        // Add CSRF token if available
        if (csrfToken) {
          headers.set("X-CSRFToken", csrfToken);
        }
        
        const response = await fetch(url, {
          method: "PUT",
          headers,
          body: JSON.stringify(body),
          credentials: "include"
        });
        
        // Get response as text first to log it
        const responseText = await response.text();
        console.log(`Raw update profile response: ${responseText}`);
        
        if (response.ok) {
          try {
            // Try to parse as JSON
            const data = JSON.parse(responseText);
            console.log("Successfully updated profile on backend");
            return NextResponse.json(data, { status: 200 });
          } catch (e) {
            // If not valid JSON, return the raw text
            console.log("Response is not valid JSON, returning raw text");
            return new NextResponse(responseText, { 
              status: response.status,
              headers: { "Content-Type": "text/plain" }
            });
          }
        } else {
          console.log(`Backend returned status ${response.status}`);
          return NextResponse.json(
            { error: "Failed to update profile", details: responseText },
            { status: response.status }
          );
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
      }
    } else {
      console.log("No auth token available, cannot update profile");
      return NextResponse.json(
        { error: "Authentication required to update profile" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error in profile update route:", error);
    return NextResponse.json(
      { 
        error: "Failed to update profile",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}