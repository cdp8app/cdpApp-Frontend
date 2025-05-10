import { type NextRequest, NextResponse } from "next/server";

// Mock student profile data
const MOCK_STUDENT_PROFILE = {
  id: "sp1",
  user: "user-2",
  first_name: "John",
  last_name: "Doe",
  university: "Stanford University",
  major: "Computer Science",
  expected_graduation: "2024-05-15",
  gpa: 3.8,
  bio: "Computer Science student with a passion for web development",
  profile_picture: "https://via.placeholder.com/150",
  resume: "https://example.com/resume.pdf",
  skills: ["JavaScript", "React", "Node.js", "Python"],
  linkedin_url: "https://linkedin.com/in/johndoe",
  github_url: "https://github.com/johndoe",
  portfolio_url: "https://johndoe.dev",
  created_at: "2023-02-10T09:15:00Z",
  updated_at: "2023-06-05T16:20:00Z"
};

export async function GET(request: NextRequest) {
  try {
    console.log("Handling GET request to /api/proxy/user/get_student_profile");
    
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
      const url = `${baseUrl}/api/user/get_student_profile/`; // Added /api prefix
      
      console.log(`Attempting to fetch student profile from backend: ${url}`);
      
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
          console.log("Successfully fetched student profile from backend");
          return NextResponse.json(data, { status: 200 });
        } else {
          console.log(`Backend returned status ${response.status}, falling back to mock data`);
        }
      } catch (error) {
        console.error("Error fetching student profile:", error);
      }
    } else {
      console.log("No auth token available, using mock data");
    }
    
    // Return mock data as fallback
    console.log("Returning mock student profile data");
    return NextResponse.json(MOCK_STUDENT_PROFILE, { status: 200 });
  } catch (error) {
    console.error("Error in student profile route:", error);
    
    // Return mock data on error
    console.log("Error occurred, returning mock data");
    return NextResponse.json(MOCK_STUDENT_PROFILE, { status: 200 });
  }
}