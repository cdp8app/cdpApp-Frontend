import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function extractIdFromUrl(request: NextRequest): string {
  return request.nextUrl.pathname.split("/").pop() || "";
}

export async function POST(request: NextRequest) {
  let id: string = "unknown";
  try {
    id = extractIdFromUrl(request);
    console.log(`Proxying POST request to /chat/messages/${id}/mark-as-read/`);

    // Check if authorization header is present
    const authHeader = request.headers.get("authorization");
    console.log(authHeader ? "Using provided authorization header" : "No authorization header found");

    // If no auth header, return 401 immediately
    if (!authHeader) {
      console.log("No authorization header provided for mark-as-read");
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "Authentication required to mark messages as read.",
        },
        { status: 401 },
      );
    }

    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com").replace(/\/$/, "");
    const url = `${baseUrl}/api/chat/messages/${id}/mark-as-read/`;

    // Forward headers from the original request
    const headers = new Headers();
    request.headers.forEach((value, key) => {
      if (key.toLowerCase() !== "host") {
        headers.append(key, value);
      }
    });

    // Set content type
    headers.set("Content-Type", "application/json");

    // Add authorization header
    headers.set("Authorization", authHeader);

    try {
      // Make the request to the backend API
      const response = await fetch(url, {
        method: "POST",
        headers,
        credentials: "include",
      });

      // If unauthorized, return a 401 with a clear error message
      if (response.status === 401) {
        console.log("Received 401 Unauthorized from backend for mark-as-read");
        return NextResponse.json(
          {
            error: "Unauthorized",
            message: "Authentication required. Please log in again.",
          },
          { status: 401 },
        );
      }

      // Get response data
      const responseData = await response.text();

      // Create headers for the response
      const responseHeaders = new Headers();
      response.headers.forEach((value, key) => {
        responseHeaders.append(key, value);
      });

      return new NextResponse(responseData, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      });
    } catch (error) {
      console.error(`Error in POST /chat/messages/${id}/mark-as-read/:`, error);

      // Return a success response even if the backend call fails
      // This prevents UI errors for a non-critical operation
      return NextResponse.json({ success: true, mock: true });
    }
  } catch (error) {
    console.error(`Error in POST /chat/messages/${id}/mark-as-read/:`, error);

    // Return a success response even if there's an error
    // This prevents UI errors for a non-critical operation
    return NextResponse.json({ success: true, mock: true });
  }
}
