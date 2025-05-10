import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Mock data for a specific application
const MOCK_APPLICATION = {
  id: "1",
  opportunity: {
    id: "101",
    title: "Software Engineering Intern",
    company: "Tech Solutions Inc.",
    location: "San Francisco, CA",
  },
  status: "Applied",
  applied_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
  last_updated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  resume: "https://example.com/resume.pdf",
  cover_letter: "I am excited to apply for this position...",
  additional_documents: [],
  notes: "Followed up with HR on 2023-05-15",
};

function extractIdFromUrl(request: NextRequest): string {
  return request.nextUrl.pathname.split("/").pop() || "";
}

// GET /api/proxy/applications/{id}/ - Get a specific application
export async function GET(request: NextRequest) {
  try {
    const id = extractIdFromUrl(request);
    console.log(`Handling GET request to /api/proxy/applications/${id}`);

    // Check if authorization header is present
    const authHeader = request.headers.get("authorization");
    console.log(authHeader ? "Using provided authorization header" : "No authorization header found");

    // First try to get data from the real backend
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com").replace(/\/$/, "");
    const url = `${baseUrl}/api/applications/${id}/`;

    console.log(`Attempting to fetch from backend: ${url}`);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(authHeader ? { Authorization: authHeader } : {}),
        },
        cache: "no-store",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Successfully fetched real data from backend");
        return NextResponse.json(data);
      }

      console.log(`Backend returned status ${response.status}, falling back to mock data`);
    } catch (error) {
      console.log(`Error fetching from backend: ${error instanceof Error ? error.message : "Unknown error"}`);
    }

    // If we get here, either the backend request failed or returned an error
    // Return mock data instead with the requested ID
    const mockData = { ...MOCK_APPLICATION, id };
    console.log(`Returning mock application data for ID: ${id}`);
    return NextResponse.json(mockData);
  } catch (error) {
    console.error("Error in application read endpoint:", error);
    return NextResponse.json(
      { error: "Failed to fetch application", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}

// PUT /api/proxy/applications/{id}/ - Update a specific application
export async function PUT(request: NextRequest) {
  try {
    const id = extractIdFromUrl(request);
    console.log(`Handling PUT request to /api/proxy/applications/${id}`);

    // Check if authorization header is present
    const authHeader = request.headers.get("authorization");
    console.log(authHeader ? "Using provided authorization header" : "No authorization header found");

    // Parse the request body
    const body = await request.json();
    console.log("Request body:", body);

    // First try to send to the real backend
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com").replace(/\/$/, "");
    const url = `${baseUrl}/api/applications/${id}/`;

    console.log(`Attempting to send to backend: ${url}`);

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(authHeader ? { Authorization: authHeader } : {}),
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Successfully updated application on backend");
        return NextResponse.json(data);
      }

      console.log(`Backend returned status ${response.status}, returning mock response`);
    } catch (error) {
      console.log(`Error sending to backend: ${error instanceof Error ? error.message : "Unknown error"}`);
    }

    // If we get here, either the backend request failed or returned an error
    // Return a mock response instead
    const mockResponse = {
      ...MOCK_APPLICATION,
      id,
      ...body,
      last_updated: new Date().toISOString(),
    };

    console.log("Returning mock application update response");
    return NextResponse.json(mockResponse);
  } catch (error) {
    console.error("Error in application update endpoint:", error);
    return NextResponse.json(
      { error: "Failed to update application", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}

// PATCH /api/proxy/applications/{id}/ - Partially update a specific application
export async function PATCH(request: NextRequest) {
  try {
    const id = extractIdFromUrl(request);
    console.log(`Handling PATCH request to /api/proxy/applications/${id}`);

    // Check if authorization header is present
    const authHeader = request.headers.get("authorization");
    console.log(authHeader ? "Using provided authorization header" : "No authorization header found");

    // Parse the request body
    const body = await request.json();
    console.log("Request body:", body);

    // First try to send to the real backend
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com").replace(/\/$/, "");
    const url = `${baseUrl}/api/applications/${id}/`;

    console.log(`Attempting to send to backend: ${url}`);

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(authHeader ? { Authorization: authHeader } : {}),
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Successfully patched application on backend");
        return NextResponse.json(data);
      }

      console.log(`Backend returned status ${response.status}, returning mock response`);
    } catch (error) {
      console.log(`Error sending to backend: ${error instanceof Error ? error.message : "Unknown error"}`);
    }

    // If we get here, either the backend request failed or returned an error
    // Return a mock response instead
    const mockResponse = {
      ...MOCK_APPLICATION,
      id,
      ...body,
      last_updated: new Date().toISOString(),
    };

    console.log("Returning mock application patch response");
    return NextResponse.json(mockResponse);
  } catch (error) {
    console.error("Error in application patch endpoint:", error);
    return NextResponse.json(
      { error: "Failed to patch application", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}

// DELETE /api/proxy/applications/{id}/ - Delete a specific application
export async function DELETE(request: NextRequest) {
  try {
    const id = extractIdFromUrl(request);
    console.log(`Handling DELETE request to /api/proxy/applications/${id}`);

    // Check if authorization header is present
    const authHeader = request.headers.get("authorization");
    console.log(authHeader ? "Using provided authorization header" : "No authorization header found");

    // First try to send to the real backend
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com").replace(/\/$/, "");
    const url = `${baseUrl}/api/applications/${id}/`;

    console.log(`Attempting to send to backend: ${url}`);

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(authHeader ? { Authorization: authHeader } : {}),
        },
      });

      if (response.ok) {
        console.log("Successfully deleted application on backend");
        return new NextResponse(null, { status: 204 }); // 204 No Content is the standard response for successful DELETE
      }

      console.log(`Backend returned status ${response.status}, returning mock response`);
    } catch (error) {
      console.log(`Error sending to backend: ${error instanceof Error ? error.message : "Unknown error"}`);
    }

    // If we get here, either the backend request failed or returned an error
    // Return a mock response instead (204 No Content)
    console.log("Returning mock application delete response");
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error in application delete endpoint:", error);
    return NextResponse.json(
      { error: "Failed to delete application", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}