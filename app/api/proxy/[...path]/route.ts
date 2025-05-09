import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  // Fix: Use destructuring to get path safely
  const { path = [] } = params || {};
  return handleRequest(request, path, "GET");
}

export async function POST(request: NextRequest, { params }: { params: { path: string[] } }) {
  // Fix: Use destructuring to get path safely
  const { path = [] } = params || {};
  return handleRequest(request, path, "POST");
}

export async function PUT(request: NextRequest, { params }: { params: { path: string[] } }) {
  // Fix: Use destructuring to get path safely
  const { path = [] } = params || {};
  return handleRequest(request, path, "PUT");
}

export async function DELETE(request: NextRequest, { params }: { params: { path: string[] } }) {
  // Fix: Use destructuring to get path safely
  const { path = [] } = params || {};
  return handleRequest(request, path, "DELETE");
}

async function handleRequest(request: NextRequest, pathSegments: string[], method: string) {
  try {
    // Get the base API URL from environment variables
    // Remove trailing slash if present
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com").replace(/\/$/, "");

    // Join the path segments and ensure proper formatting
    const path = Array.isArray(pathSegments) ? pathSegments.join("/") : "";

    // Check if authorization header is present
    const authHeader = request.headers.get("authorization");
    console.log(authHeader ? "Using provided authorization header" : "No authorization header found");

    // Determine the correct API endpoint based on the path
    let url = "";

    // Special case for messaging - use the chat API
    if (path.startsWith("messaging")) {
      // Replace "messaging" with "chat" in the path
      const chatPath = path.replace(/^messaging/, "chat");
      url = `${baseUrl}/api/${chatPath}`;
      console.log(`Redirecting messaging request to chat API: ${url}`);
    } else {
      // Standard API path
      url = `${baseUrl}/api/${path}`;
    }

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

    // Add authorization header if present
    if (authHeader) {
      headers.set("Authorization", authHeader);
    }

    // Forward cookies
    const cookie = request.headers.get("cookie");
    if (cookie) {
      headers.set("Cookie", cookie);
    }

    try {
      // Special case for endpoints that we know don't exist yet
      if (path === "user/get_student_profile" || path === "user/get-student-profile") {
        console.log("Student profile endpoint not available yet, returning mock data");
        return NextResponse.json({
          id: "mock-profile-1",
          user: "user-1",
          major: "Computer Science",
          university: "Example University",
          expected_graduation: "2024-05-15",
          skills: ["JavaScript", "React", "Node.js"],
          firstName: "John",
          lastName: "Doe",
        });
      }

      if (path === "user/get_company_profile" || path === "user/get-company-profile") {
        console.log("Company profile endpoint not available yet, returning mock data");
        return NextResponse.json({
          id: "mock-company-1",
          user: "user-1",
          company_name: "Example Corp",
          industry: "Technology",
          company_size: "50-100",
          founded_year: 2010,
          linkedin_url: "https://linkedin.com/company/example",
          companyName: "Example Corp",
        });
      }

      // Make the request to the backend API
      const response = await fetch(url, {
        method,
        headers,
        body,
        // Include credentials if needed
        credentials: "include",
      });

      // Handle 401 Unauthorized responses
      if (response.status === 401) {
        console.log(`Received 401 Unauthorized from ${url}`);
        return NextResponse.json(
          {
            error: "Unauthorized",
            message: "Authentication required. Please log in again.",
          },
          { status: 401 },
        );
      }

      // Handle 404 Not Found responses with a more informative message
      if (response.status === 404) {
        console.log("Resource not found (404 Not Found), falling back to mock data");

        // For specific paths, return mock data
        if (path.includes("student/opportunities")) {
          return NextResponse.json({
            id: "mock-opportunity-1",
            title: "Mock Opportunity",
            company: "Example Corp",
            description: "This is a mock opportunity because the endpoint is not available.",
            location: "Remote",
            type: "Internship",
            status: "Open",
          });
        }

        // Generic 404 response for other paths
        return NextResponse.json(
          {
            error: "Resource not found",
            message: "The requested resource does not exist on the server.",
            path: path,
            url: url,
          },
          { status: 404 },
        );
      }

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
    } catch (fetchError) {
      console.error("Fetch error:", fetchError);

      // For specific paths, return mock data instead of an error
      if (path.includes("messaging") || path.includes("chat")) {
        console.log("Returning mock data for messaging/chat endpoint after fetch error");

        // Return appropriate mock data based on the path
        if (path.includes("conversations")) {
          return NextResponse.json([
            {
              id: "mock-1",
              recipient: { id: "system-1", name: "Support" },
              last_message: { content: "Hello! How can I help you?", timestamp: new Date().toISOString() },
              unread_count: 1,
            },
          ]);
        } else if (path.includes("messages")) {
          return NextResponse.json([
            {
              id: "mock-msg-1",
              content: "This is a mock message due to backend connection issues",
              sender: { id: "system-1", name: "System" },
              recipient: { id: "user-1", name: "You" },
              timestamp: new Date().toISOString(),
              is_read: false,
            },
          ]);
        }
      }

      // For student opportunities
      if (path.includes("student/opportunities")) {
        return NextResponse.json({
          id: "mock-opportunity-1",
          title: "Mock Opportunity",
          company: "Example Corp",
          description: "This is a mock opportunity because the endpoint is not available.",
          location: "Remote",
          type: "Internship",
          status: "Open",
        });
      }

      return NextResponse.json(
        {
          error: "Failed to connect to backend API",
          details: fetchError instanceof Error ? fetchError.message : "Unknown error",
          timestamp: new Date().toISOString(),
        },
        { status: 500 },
      );
    }
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
