import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { otp, email } = body;

    // Validate required fields
    if (!otp || !email) {
      return NextResponse.json(
        { success: false, message: "OTP and email are required" },
        { status: 400 }
      );
    }

    console.log(`Verifying OTP for email: ${email}`);

    // Forward the request to the backend - try multiple possible endpoints
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com";
    const endpoints = [
      "/user/verify-otp/",
      "/api/user/verify-otp/",
      "/auth/verify-otp/",
      "/api/auth/verify-otp/"
    ];

    let responseData = null;
    let responseStatus = 404;
    let responseText = "";

    // Try each endpoint until we get a successful response
    for (const endpoint of endpoints) {
      try {
        const url = `${baseUrl}${endpoint}`;
        console.log(`Attempting to verify OTP at: ${url}`);

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp, email }),
        });

        responseStatus = response.status;
        responseText = await response.text();
        
        console.log(`${endpoint} returned status ${response.status}`);
        
        if (response.ok) {
          try {
            responseData = JSON.parse(responseText);
            console.log(`Successfully verified OTP at ${endpoint}`);
            break;
          } catch (parseError) {
            console.warn(`Response from ${endpoint} is not valid JSON:`, parseError);
            // If the response is OK but not JSON, we'll still consider it successful
            responseData = { message: "OTP verified successfully" };
            break;
          }
        }
      } catch (endpointError) {
        console.warn(`Error trying OTP verification endpoint ${endpoint}:`, endpointError);
      }
    }

    if (responseData) {
      return NextResponse.json({
        success: true,
        message: responseData.message || "OTP verified successfully",
        data: responseData
      }, { status: 200 });
    } else {
      // If all endpoints failed, return appropriate error
      
      // Try to parse the error response
      let errorDetails = responseText;
      try {
        const errorJson = JSON.parse(responseText);
        errorDetails = errorJson.message || errorJson.detail || errorJson.error || responseText;
      } catch (e) {
        // If we can't parse as JSON, use the raw text (truncated)
        errorDetails = responseText.substring(0, 300);
      }
      
      if (responseStatus === 400) {
        return NextResponse.json({
          success: false,
          message: "Invalid OTP code",
          error: errorDetails
        }, { status: 400 });
      } else if (responseStatus === 404) {
        return NextResponse.json({
          success: false,
          message: "Verification service not found",
          error: "The OTP verification service is currently unavailable"
        }, { status: 404 });
      } else {
        return NextResponse.json({
          success: false,
          message: "OTP verification failed",
          error: errorDetails
        }, { status: responseStatus || 500 });
      }
    }
  } catch (error) {
    console.error("Error in OTP verification:", error);
    return NextResponse.json({
      success: false,
      message: "An unexpected error occurred during OTP verification",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { 
      status: 500 
    });
  }
}