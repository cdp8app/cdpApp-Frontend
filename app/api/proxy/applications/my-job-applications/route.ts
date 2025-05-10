import { type NextRequest, NextResponse } from "next/server";

// Mock data for job applications
const MOCK_JOB_APPLICATIONS = [
  {
    id: "1",
    job: {
      id: "101",
      title: "Software Engineer",
      company: {
        name: "Tech Solutions Inc",
        logo: "https://via.placeholder.com/150"
      },
      location: "San Francisco, CA",
      posted_date: "2023-05-15T00:00:00Z"
    },
    status: "Applied",
    applied_date: "2023-05-20T14:30:00Z"
  },
  {
    id: "2",
    job: {
      id: "102",
      title: "Frontend Developer",
      company: {
        name: "WebDesign Pro",
        logo: "https://via.placeholder.com/150"
      },
      location: "Remote",
      posted_date: "2023-05-10T00:00:00Z"
    },
    status: "Interview",
    applied_date: "2023-05-12T09:15:00Z"
  },
  {
    id: "3",
    job: {
      id: "103",
      title: "Full Stack Developer",
      company: {
        name: "Innovative Apps",
        logo: "https://via.placeholder.com/150"
      },
      location: "New York, NY",
      posted_date: "2023-05-05T00:00:00Z"
    },
    status: "Rejected",
    applied_date: "2023-05-07T11:45:00Z"
  }
];

export async function GET(request: NextRequest) {
  try {
    console.log("Handling GET request to /api/proxy/applications/my-job-applications");
    
    // Get JWT token from cookies
    const cookies = request.headers.get("cookie");
    let authToken = null;
    
    if (cookies) {
      const authCookie = cookies.split(";").find(cookie => cookie.trim().startsWith("authToken="));
      if (authCookie) {
        authToken = authCookie.split("=")[1];
        console.log("Found JWT token in cookies");
      } else {
        console.log("No authorization header found");
      }
    }
    
    // If we have an auth token, try to fetch from the backend
    if (authToken) {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com";
      const url = `${baseUrl}/api/applications/my-job-applications/`;
      
      console.log(`Attempting to fetch from backend: ${url}`);
      
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("Successfully fetched job applications from backend");
        return NextResponse.json(data, { status: 200 });
      } else {
        console.log(`Backend returned status ${response.status}, falling back to mock data`);
      }
    } else {
      console.log("No auth token available, using mock data");
    }
    
    // Return mock data as fallback
    console.log("Returning mock my-job-applications data");
    return NextResponse.json(MOCK_JOB_APPLICATIONS, { status: 200 });
  } catch (error) {
    console.error("Error fetching job applications:", error);
    
    // Return mock data on error
    console.log("Error occurred, returning mock data");
    return NextResponse.json(MOCK_JOB_APPLICATIONS, { status: 200 });
  }
}