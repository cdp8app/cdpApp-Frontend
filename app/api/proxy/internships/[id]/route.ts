import { type NextRequest, NextResponse } from "next/server";

// Mock data for a single internship
const MOCK_INTERNSHIP = {
  id: "1",
  title: "Software Engineering Intern",
  company_details: {
    id: "c1",
    company_name: "Tech Solutions Inc",
    company_industry: "Technology",
    profile_picture: "https://via.placeholder.com/150"
  },
  location: "San Francisco, CA",
  description: "Join our team as a software engineering intern",
  requirements: "Knowledge of JavaScript and React",
  duration: "3 months",
  stipend: "2000",
  status: "active",
  createdAt: "2023-06-01T10:30:00Z",
  updatedAt: "2023-06-01T10:30:00Z",
  student: "student-1"
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const internshipId = params.id;
    console.log(`Handling GET request to /api/proxy/internships/${internshipId}`);
    
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
      const url = `${baseUrl}/api/internships/${internshipId}/`; // Added /api prefix
      
      console.log(`Attempting to fetch internship details from backend: ${url}`);
      
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
          console.log("Successfully fetched internship details from backend");
          return NextResponse.json(data, { status: 200 });
        } else {
          console.log(`Backend returned status ${response.status}, falling back to mock data`);
        }
      } catch (error) {
        console.error("Error fetching internship details:", error);
      }
    } else {
      console.log("No auth token available, using mock data");
    }
    
    // Return mock data as fallback
    console.log("Returning mock internship data");
    const mockData = { 
      ...MOCK_INTERNSHIP, 
      id: internshipId,
      title: `Mock Internship ${internshipId}`,
    };
    return NextResponse.json(mockData, { status: 200 });
  } catch (error) {
    console.error("Error in internship details route:", error);
    
    // Return mock data on error
    return NextResponse.json({
      id: params.id,
      title: `Mock Internship ${params.id}`,
      description: "This is a mock internship description",
      requirements: "Mock requirements",
      location: "Remote",
      duration: "3 months",
      stipend: "2000",
      status: "active",
      company_details: {
        id: "c1",
        company_name: "Mock Company",
        company_industry: "Technology",
        profile_picture: "https://via.placeholder.com/150"
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      student: "student-1"
    }, { status: 200 });
  }
}