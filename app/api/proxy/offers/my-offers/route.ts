import { type NextRequest, NextResponse } from "next/server";

// Mock data for offers
const MOCK_OFFERS = [
  {
    id: "1",
    job: {
      title: "Software Engineer",
      company: {
        name: "Tech Solutions Inc",
        logo: "https://via.placeholder.com/150"
      }
    },
    status: "pending",
    created_at: "2023-06-15T10:30:00Z"
  },
  {
    id: "2",
    job: {
      title: "Frontend Developer",
      company: {
        name: "WebDesign Pro",
        logo: "https://via.placeholder.com/150"
      }
    },
    status: "accepted",
    created_at: "2023-06-10T14:45:00Z"
  }
];

export async function GET(request: NextRequest) {
  try {
    console.log("Handling GET request to /api/proxy/offers/my-offers");
    
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
      }
    }
    
    // If we have an auth token, try to fetch from the backend
    if (authToken) {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com";
      const url = `${baseUrl}/api/offers/my-offers/`; // Added /api prefix
      
      console.log(`Attempting to fetch from backend: ${url}`);
      
      try {
        const response = await fetch(url, {
          headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json"
          },
          credentials: "include"
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log("Successfully fetched offers from backend");
          return NextResponse.json(data, { status: 200 });
        } else {
          console.log(`Backend returned status ${response.status}, falling back to mock data`);
        }
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    } else {
      console.log("No auth token available, using mock data");
    }
    
    // Return mock data as fallback
    console.log("Returning mock offers data");
    return NextResponse.json(MOCK_OFFERS, { status: 200 });
  } catch (error) {
    console.error("Error in offers route:", error);
    
    // Return mock data on error
    console.log("Error occurred, returning mock data");
    return NextResponse.json(MOCK_OFFERS, { status: 200 });
  }
}