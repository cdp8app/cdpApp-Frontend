import { type NextRequest, NextResponse } from "next/server";

// Base URL for the backend API
const getBaseUrl = () => {
  return (process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com").replace(/\/$/, "");
};

// Helper function to handle API requests
export async function handleApiRequest(request: NextRequest, endpoint: string, mockData: any = null, method?: string) {
  try {
    console.log(`Handling ${request.method} request to ${endpoint}`);

    // Get authorization header if present
    const authHeader = request.headers.get("authorization");
    console.log(authHeader ? "Using provided authorization header" : "No authorization header provided");

    // Construct the full URL
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}${endpoint}`;

    console.log(`Attempting to fetch from backend: ${url}`);

    // Get request body if it's not a GET request
    let requestBody = null;
    if (request.method !== "GET" && request.body) {
      try {
        const text = await request.text();
        if (text) {
          requestBody = JSON.parse(text);
        }
      } catch (error) {
        console.log("No request body or invalid JSON");
      }
    }

    try {
      // Make the request to the backend
      const response = await fetch(url, {
        method: method || request.method,
        headers: {
          "Content-Type": "application/json",
          ...(authHeader ? { Authorization: authHeader } : {}),
        },
        ...(requestBody ? { body: JSON.stringify(requestBody) } : {}),
        cache: "no-store",
      });

      if (response.ok) {
        // If the response is successful, return it
        try {
          const data = await response.json();
          console.log(`Successfully fetched real data from backend for ${endpoint}`);
          return NextResponse.json(data);
        } catch (error) {
          console.log(
            `Error parsing JSON from backend for ${endpoint}: ${error instanceof Error ? error.message : "Unknown error"}`,
          );
          // If JSON parsing fails, return the raw text
          const text = await response.text();
          return new NextResponse(text, {
            status: response.status,
            headers: {
              "Content-Type": "text/plain",
            },
          });
        }
      }

      console.log(`Backend returned status ${response.status} for ${endpoint}, falling back to mock data`);
    } catch (error) {
      console.log(
        `Error fetching from backend for ${endpoint}: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }

    // If we get here, either the backend request failed or returned an error
    // Return mock data if provided
    if (mockData) {
      console.log(`Returning mock data for ${endpoint}`);
      return NextResponse.json(mockData);
    }

    // If no mock data is provided, return a 404 error
    return NextResponse.json({ error: `Failed to fetch data from ${endpoint}` }, { status: 404 });
  } catch (error) {
    console.error(`Error in API request to ${endpoint}:`, error);
    return NextResponse.json(
      {
        error: `Failed to process request to ${endpoint}`,
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// Helper function to safely parse JSON
export function safeJsonParse(text: string) {
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

// Helper function to generate mock data for different entity types
export function generateMockData(type: string, count = 3) {
  switch (type) {
  case "internships":
    return Array.from({ length: count }, (_, i) => ({
      id: `mock-internship-${i + 1}`,
      title: `Mock Internship ${i + 1}`,
      company: `Company ${i + 1}`,
      location: i % 2 === 0 ? "Remote" : "New York, NY",
      description: `This is a mock internship ${i + 1} description.`,
      start_date: new Date(Date.now() + i * 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      end_date: new Date(Date.now() + (i + 3) * 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status: ["Active", "Completed", "Upcoming"][i % 3],
    }));

  case "jobs":
    return Array.from({ length: count }, (_, i) => ({
      id: `mock-job-${i + 1}`,
      title: `Mock Job ${i + 1}`,
      company: `Company ${i + 1}`,
      location: i % 2 === 0 ? "Remote" : "San Francisco, CA",
      type: ["Full-time", "Part-time", "Contract"][i % 3],
      salary_range: `$${70 + i * 10}k - $${90 + i * 10}k`,
      description: `This is a mock job ${i + 1} description.`,
      requirements: ["3+ years of experience", "Strong communication skills", "Team player"],
      posted_date: new Date(Date.now() - i * 5 * 24 * 60 * 60 * 1000).toISOString(),
      application_deadline: new Date(Date.now() + (i + 2) * 15 * 24 * 60 * 60 * 1000).toISOString(),
    }));

  case "applications":
    return Array.from({ length: count }, (_, i) => ({
      id: `mock-application-${i + 1}`,
      job_title: `Mock Job ${i + 1}`,
      company_name: `Company ${i + 1}`,
      location: i % 2 === 0 ? "Remote" : "Boston, MA",
      status: ["Applied", "Interview", "Offer", "Rejected"][i % 4],
      applied_date: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toISOString(),
    }));

  case "offers":
    return Array.from({ length: count }, (_, i) => ({
      id: `mock-offer-${i + 1}`,
      position: `Mock Position ${i + 1}`,
      company: `Company ${i + 1}`,
      location: i % 2 === 0 ? "Remote" : "Chicago, IL",
      salary: `$${80 + i * 5},000`,
      benefits: ["Health Insurance", "401k", "Remote Work Options"],
      status: ["Pending", "Accepted", "Declined"][i % 3],
      offer_date: new Date(Date.now() - i * 3 * 24 * 60 * 60 * 1000).toISOString(),
      expiration_date: new Date(Date.now() + (i + 1) * 7 * 24 * 60 * 60 * 1000).toISOString(),
    }));

  default:
    return Array.from({ length: count }, (_, i) => ({
      id: `mock-item-${i + 1}`,
      title: `Mock Item ${i + 1}`,
      description: `This is a mock item ${i + 1}.`,
      created_at: new Date().toISOString(),
    }));
  }
}

// Helper function to handle errors consistently
export function handleApiError(error: unknown, defaultMessage = "An error occurred") {
  console.error("API Error:", error);

  if (error instanceof Response) {
    return {
      error: true,
      message: `Server returned ${error.status}: ${error.statusText}`,
      status: error.status,
    };
  }

  if (error instanceof Error) {
    return {
      error: true,
      message: error.message || defaultMessage,
      details: error.stack,
    };
  }

  return {
    error: true,
    message: defaultMessage,
    details: String(error),
  };
}
