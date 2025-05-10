import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    console.log("Handling GET request to /api/proxy/user/get_company_profile");
    
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
          { error: "Authentication required", message: "Please log in to view company profile" },
          { status: 401 }
        );
      }
    } else {
      console.log("No cookies found, authentication required");
      return NextResponse.json(
        { error: "Authentication required", message: "Please log in to view company profile" },
        { status: 401 }
      );
    }
    
    // Try multiple possible endpoints
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com";
    const endpoints = [
      "/user/get_company_profile/",
      "/api/user/get_company_profile/",
      "/company/profile/",
      "/api/company/profile/"
    ];
    
    let responseData = null;
    let responseStatus = 404;
    
    // Try each endpoint until we get a successful response
    for (const endpoint of endpoints) {
      try {
        const url = `${baseUrl}${endpoint}`;
        console.log(`Attempting to fetch company profile from: ${url}`);
        
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json"
          },
          credentials: "include"
        });
        
        responseStatus = response.status;
        
        if (response.ok) {
          const data = await response.json();
          console.log(`Successfully fetched company profile from ${endpoint}`);
          responseData = data;
          break;
        } else {
          console.log(`Endpoint ${endpoint} returned status ${response.status}`);
        }
      } catch (endpointError) {
        console.warn(`Error trying endpoint ${endpoint}:`, endpointError);
      }
    }
    
    if (responseData) {
      return NextResponse.json({
        success: true,
        message: "Company profile retrieved successfully",
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
        return NextResponse.json(
          { error: "Profile not found", message: "Could not retrieve company profile. Please set up your profile." },
          { status: 404 }
        );
      }
    }
  } catch (error) {
    console.error("Error in company profile route:", error);
    return NextResponse.json(
      { 
        error: "Server error", 
        message: "An unexpected error occurred while retrieving your profile",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}