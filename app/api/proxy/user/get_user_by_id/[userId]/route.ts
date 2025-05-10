import { type NextRequest, NextResponse } from "next/server";

// Mock user data
const MOCK_USERS = {
  "user-1": {
    id: "user-1",
    email: "student@example.com",
    userType: "student",
    first_name: "John",
    last_name: "Doe",
    profile_picture: "https://via.placeholder.com/150",
    bio: "Computer Science student with a passion for web development",
    university: "Example University",
    skills: ["JavaScript", "React", "Node.js"]
  },
  "user-2": {
    id: "user-2",
    email: "company@example.com",
    userType: "company",
    company_name: "Tech Solutions Inc",
    company_industry: "Technology",
    company_description: "Leading technology solutions provider",
    profile_picture: "https://via.placeholder.com/150"
  }
};

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    console.log(`Handling GET request to /api/proxy/user/get_user_by_id/${userId}`);
    
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
      const url = `${baseUrl}/api/user/get_user_by_id/${userId}/`; // Added /api prefix
      
      console.log(`Attempting to fetch user details from backend: ${url}`);
      
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
          console.log("Successfully fetched user details from backend");
          return NextResponse.json(data, { status: 200 });
        } else {
          console.log(`Backend returned status ${response.status}, falling back to mock data`);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    } else {
      console.log("No auth token available, using mock data");
    }
    
    // Return mock data as fallback
    const mockUser = MOCK_USERS[userId] || {
      id: userId,
      email: "user@example.com",
      userType: "student",
      first_name: "User",
      last_name: userId,
      profile_picture: "https://via.placeholder.com/150"
    };
    
    console.log("Returning mock user data:", mockUser);
    return NextResponse.json(mockUser, { status: 200 });
  } catch (error) {
    console.error("Error in user details route:", error);
    
    // Return generic mock data on error
    return NextResponse.json({
      id: params.userId,
      email: "user@example.com",
      userType: "student",
      first_name: "User",
      last_name: params.userId,
      profile_picture: "https://via.placeholder.com/150"
    }, { status: 200 });
  }
}