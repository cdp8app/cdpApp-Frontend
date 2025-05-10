import { type NextRequest, NextResponse } from "next/server";

// Mock data for posted internships
const MOCK_POSTED_INTERNSHIPS = [
  {
    id: "101",
    title: "Software Engineering Intern",
    description: "We are looking for a software engineering intern to join our team for the summer.",
    requirements: "Currently pursuing a degree in Computer Science or related field. Knowledge of JavaScript and React.",
    company: {
      id: "1",
      company_name: "Tech Solutions Inc",
      company_industry: "Technology",
      company_description: "Leading technology solutions provider",
      profile_picture: "https://via.placeholder.com/150"
    },
    location: "San Francisco, CA",
    stipend: 2000,
    duration: "3 months",
    start_date: "2023-06-01",
    end_date: "2023-08-31",
    status: "open",
    created_at: "2023-05-01T10:30:00Z",
    updated_at: "2023-05-01T10:30:00Z"
  },
  {
    id: "102",
    title: "Data Science Intern",
    description: "Looking for a data science intern to work on machine learning projects.",
    requirements: "Knowledge of Python, pandas, and machine learning libraries. Currently pursuing a degree in Data Science or related field.",
    company: {
      id: "1",
      company_name: "Tech Solutions Inc",
      company_industry: "Technology",
      company_description: "Leading technology solutions provider",
      profile_picture: "https://via.placeholder.com/150"
    },
    location: "Remote",
    stipend: 1800,
    duration: "4 months",
    start_date: "2023-09-01",
    end_date: "2023-12-31",
    status: "open",
    created_at: "2023-05-15T14:45:00Z",
    updated_at: "2023-05-15T14:45:00Z"
  }
];

export async function GET(request: NextRequest) {
  try {
    console.log("Handling GET request to /api/proxy/internships/posted_internships");
    
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
      const url = `${baseUrl}/api/internships/posted_internships/`; // Added /api prefix
      
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
          console.log("Successfully fetched posted internships from backend");
          return NextResponse.json(data, { status: 200 });
        } else {
          console.log(`Backend returned status ${response.status}, falling back to mock data`);
        }
      } catch (error) {
        console.error("Error fetching posted internships:", error);
      }
    } else {
      console.log("No auth token available, using mock data");
    }
    
    // Return mock data as fallback
    console.log("Returning mock posted_internships data");
    return NextResponse.json(MOCK_POSTED_INTERNSHIPS, { status: 200 });
  } catch (error) {
    console.error("Error in posted internships route:", error);
    
    // Return mock data on error
    console.log("Error occurred, returning mock data");
    return NextResponse.json(MOCK_POSTED_INTERNSHIPS, { status: 200 });
  }
}