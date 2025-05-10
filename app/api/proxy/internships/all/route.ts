import { type NextRequest, NextResponse } from "next/server";

// Mock data for all internships
const MOCK_ALL_INTERNSHIPS = [
  {
    id: "101",
    title: "Software Engineering Intern",
    description: "Join our team as a software engineering intern",
    requirements: "Knowledge of JavaScript and React",
    company_details: {
      id: "c1",
      company_name: "Tech Solutions Inc",
      company_industry: "Technology",
      profile_picture: "https://via.placeholder.com/150"
    },
    location: "San Francisco, CA",
    stipend: 2000,
    duration: "3 months",
    status: "open",
    createdAt: "2023-06-01T10:30:00Z",
    updatedAt: "2023-06-01T10:30:00Z"
  },
  {
    id: "102",
    title: "Data Science Intern",
    description: "Work on machine learning projects",
    requirements: "Knowledge of Python and pandas",
    company_details: {
      id: "c2",
      company_name: "Analytics Pro",
      company_industry: "Data Analytics",
      profile_picture: "https://via.placeholder.com/150"
    },
    location: "Remote",
    stipend: 1800,
    duration: "4 months",
    status: "open",
    createdAt: "2023-05-15T14:45:00Z",
    updatedAt: "2023-05-15T14:45:00Z"
  },
  {
    id: "103",
    title: "Marketing Intern",
    description: "Help with digital marketing campaigns",
    requirements: "Knowledge of social media marketing",
    company_details: {
      id: "c3",
      company_name: "Marketing Masters",
      company_industry: "Marketing",
      profile_picture: "https://via.placeholder.com/150"
    },
    location: "New York, NY",
    stipend: 1500,
    duration: "3 months",
    status: "open",
    createdAt: "2023-05-20T09:15:00Z",
    updatedAt: "2023-05-20T09:15:00Z"
  }
];

export async function GET(request: NextRequest) {
  try {
    console.log("Handling GET request to /api/proxy/internships/all");
    
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
      const url = `${baseUrl}/api/internships/`; // Added /api prefix
      
      console.log(`Attempting to fetch all internships from backend: ${url}`);
      
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
          console.log("Successfully fetched all internships from backend");
          return NextResponse.json(data, { status: 200 });
        } else {
          console.log(`Backend returned status ${response.status}, falling back to mock data`);
        }
      } catch (error) {
        console.error("Error fetching all internships:", error);
      }
    } else {
      console.log("No auth token available, using mock data");
    }
    
    // Return mock data as fallback
    console.log("Returning mock all internships data");
    return NextResponse.json(MOCK_ALL_INTERNSHIPS, { status: 200 });
  } catch (error) {
    console.error("Error in all internships route:", error);
    
    // Return mock data on error
    console.log("Error occurred, returning mock data");
    return NextResponse.json(MOCK_ALL_INTERNSHIPS, { status: 200 });
  }
}