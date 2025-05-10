import { type NextRequest, NextResponse } from "next/server";

// Mock data for internships
const MOCK_INTERNSHIPS = [
  {
    id: "1",
    title: "Software Engineering Intern",
    company: {
      name: "Tech Solutions Inc",
      logo: "https://via.placeholder.com/150"
    },
    location: "San Francisco, CA",
    status: "active",
    start_date: "2023-06-01",
    end_date: "2023-08-31"
  },
  {
    id: "2",
    title: "Data Science Intern",
    company: {
      name: "Analytics Pro",
      logo: "https://via.placeholder.com/150"
    },
    location: "Remote",
    status: "upcoming",
    start_date: "2023-09-01",
    end_date: "2023-12-31"
  }
];

export async function GET(request: NextRequest) {
  try {
    console.log("Handling GET request to /api/proxy/internships/my-internships");
    
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
      const url = `${baseUrl}/api/internships/my-internships/`; // Added /api prefix
      
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
          console.log("Successfully fetched internships from backend");
          return NextResponse.json(data, { status: 200 });
        } else {
          console.log(`Backend returned status ${response.status}, falling back to mock data`);
        }
      } catch (error) {
        console.error("Error fetching internships:", error);
      }
    } else {
      console.log("No auth token available, using mock data");
    }
    
    // Return mock data as fallback
    console.log("Returning mock internships data");
    return NextResponse.json(MOCK_INTERNSHIPS, { status: 200 });
  } catch (error) {
    console.error("Error in internships route:", error);
    
    // Return mock data on error
    console.log("Error occurred, returning mock data");
    return NextResponse.json(MOCK_INTERNSHIPS, { status: 200 });
  }
}