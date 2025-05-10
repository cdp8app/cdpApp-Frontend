import { type NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    console.log("Handling PUT request to /api/proxy/user/update-profile");
    
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
    
    if (cookies) {
      const authCookie = cookies.split(";").find(cookie => cookie.trim().startsWith("authToken="));
      if (authCookie) {
        authToken = authCookie.split("=")[1];
        console.log("Found JWT token in cookies");
      } else {
        console.log("No authorization token found in cookies");
        return NextResponse.json(
          { error: "Authentication required", message: "Please log in to update your profile" },
          { status: 401 }
        );
      }
    } else {
      console.log("No cookies found, authentication required");
      return NextResponse.json(
        { error: "Authentication required", message: "Please log in to update your profile" },
        { status: 401 }
      );
    }
    
    // Step 1: First, get a CSRF token
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com";
    
    // Try to get CSRF token from multiple possible endpoints
    const csrfEndpoints = [
      "/user/login/",
      "/csrf-token/",
      "/api/csrf-token/",
      "/api/user/login/"
    ];
    
    let csrfToken = "";
    let csrfCookies = "";
    
    for (const endpoint of csrfEndpoints) {
      try {
        console.log(`Attempting to get CSRF token from ${baseUrl}${endpoint}`);
        
        const csrfResponse = await fetch(`${baseUrl}${endpoint}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Accept": "text/html,application/json,*/*"
          }
        });
        
        if (csrfResponse.ok) {
          // Extract the CSRF token from the cookie
          const responseCookies = csrfResponse.headers.get("set-cookie");
          
          if (responseCookies) {
            const csrfCookie = responseCookies.split(";").find(cookie => cookie.trim().startsWith("csrftoken="));
            if (csrfCookie) {
              csrfToken = csrfCookie.split("=")[1];
              csrfCookies = responseCookies;
              console.log(`Successfully extracted CSRF token from ${endpoint}:`, csrfToken);
              break;
            }
          }
          
          // If we got a successful response but no CSRF token, try to get it from the response body
          try {
            const data = await csrfResponse.json();
            if (data && data.csrfToken) {
              csrfToken = data.csrfToken;
              console.log(`Got CSRF token from response body at ${endpoint}:`, csrfToken);
              break;
            }
          } catch (e) {
            // Not JSON or no token in response, continue to next endpoint
          }
        }
      } catch (csrfError) {
        console.warn(`Error trying CSRF endpoint ${endpoint}:`, csrfError);
      }
    }
    
    if (!csrfToken) {
      console.warn("Could not obtain CSRF token from any endpoint");
    }
    
    // Step 2: Try multiple possible update endpoints
    const updateEndpoints = [
      "/user/update_profile/",
      "/api/user/update_profile/",
      "/user/update-profile/",
      "/api/user/update-profile/"
    ];
    
    let responseData = null;
    let responseStatus = 500;
    let responseText = "";
    
    // Try each endpoint until we get a successful response
    for (const endpoint of updateEndpoints) {
      try {
        const url = `${baseUrl}${endpoint}`;
        console.log(`Attempting to update profile at: ${url}`);
        
        // Set up headers with Authorization, CSRF token, and proper origin headers
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
        
        // Add cookies to the request
        if (csrfCookies) {
          headers.set("Cookie", csrfCookies);
        }
        
        const response = await fetch(url, {
          method: "PUT",
          headers,
          body: JSON.stringify(body),
          credentials: "include"
        });
        
        responseStatus = response.status;
        responseText = await response.text();
        
        console.log(`${endpoint} returned status ${response.status}`);
        
        if (response.ok) {
          try {
            responseData = JSON.parse(responseText);
            console.log(`Successfully updated profile at ${endpoint}`);
            break;
          } catch (parseError) {
            console.warn(`Response from ${endpoint} is not valid JSON:`, parseError);
            // If the response is OK but not JSON, we'll still consider it successful
            responseData = { message: "Profile updated successfully" };
            break;
          }
        }
      } catch (endpointError) {
        console.warn(`Error trying update endpoint ${endpoint}:`, endpointError);
      }
    }
    
    if (responseData) {
      return NextResponse.json({
        success: true,
        message: "Profile updated successfully",
        data: responseData
      }, { status: 200 });
    } else {
      // If all endpoints failed, return appropriate error
      if (responseStatus === 401 || responseStatus === 403) {
        return NextResponse.json(
          { error: "Authentication failed", message: "Your session may have expired. Please log in again." },
          { status: 401 }
        );
      } else {
        // Try to parse the error response
        let errorDetails = responseText;
        try {
          const errorJson = JSON.parse(responseText);
          errorDetails = errorJson.message || errorJson.detail || errorJson.error || responseText;
        } catch (e) {
          // If we can't parse as JSON, use the raw text (truncated)
          errorDetails = responseText.substring(0, 300);
        }
        
        return NextResponse.json(
          { 
            error: "Failed to update profile", 
            message: "The server could not process your profile update",
            details: errorDetails,
            status: responseStatus
          },
          { status: responseStatus || 500 }
        );
      }
    }
  } catch (error) {
    console.error("Error in profile update route:", error);
    return NextResponse.json(
      { 
        error: "Server error",
        message: "An unexpected error occurred while updating your profile",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}