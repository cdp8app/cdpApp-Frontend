import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const pathSegments = request.nextUrl.pathname.split("/").slice(3);
  return handleRequest(request, pathSegments, "GET");
}

export async function POST(request: NextRequest) {
  const pathSegments = request.nextUrl.pathname.split("/").slice(3);
  return handleRequest(request, pathSegments, "POST");
}

export async function PUT(request: NextRequest) {
  const pathSegments = request.nextUrl.pathname.split("/").slice(3);
  return handleRequest(request, pathSegments, "PUT");
}

export async function DELETE(request: NextRequest) {
  const pathSegments = request.nextUrl.pathname.split("/").slice(3);
  return handleRequest(request, pathSegments, "DELETE");
}

async function handleRequest(request: NextRequest, pathSegments: string[], method: string) {
  try {
    // Get the base API URL from environment variables
    // Remove trailing slash if present
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com").replace(/\/$/, "");

    // Join the path segments and ensure proper formatting
    const path = pathSegments.join("/");

    // Construct the full URL - Note we're adding /api/ to the path
    const url = `${baseUrl}/api/${path}`;

    console.log(`Proxying ${method} request to: ${url}`);

    // Get request body for non-GET requests
    let body = null;
    if (method !== "GET" && request.body) {
      body = await request.text();
      console.log(`Request body: ${body.substring(0, 200)}${body.length > 200 ? "..." : ""}`);
    }

    // Forward headers from the original request
    const headers = new Headers();
    request.headers.forEach((value, key) => {
      // Skip host header to avoid CORS issues
      if (key.toLowerCase() !== "host") {
        headers.append(key, value);
      }
    });

    // Set content type if not already set
    if (!headers.has("Content-Type") && body) {
      headers.set("Content-Type", "application/json");
    }

    // Add authorization header if present in cookies or localStorage
    // This would need to be implemented based on your auth strategy

    // Make the request to the backend API
    const response = await fetch(url, {
      method,
      headers,
      body,
      // Include credentials if needed
      credentials: "include",
    });

    // Get response data
    const responseData = await response.text();
    console.log(`Response status: ${response.status} ${response.statusText}`);
    console.log(`Response data: ${responseData.substring(0, 200)}${responseData.length > 200 ? "..." : ""}`);

    // Create headers for the response
    const responseHeaders = new Headers();
    response.headers.forEach((value, key) => {
      responseHeaders.append(key, value);
    });

    // Return the response
    return new NextResponse(responseData, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("API Proxy Error:", error);
    return NextResponse.json(
      {
        error: "Failed to proxy request to backend API",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
