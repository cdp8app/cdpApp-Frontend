import { type NextRequest, NextResponse } from "next/server";

// Mock data for posted jobs
const MOCK_POSTED_JOBS = [
  {
    id: "101",
    title: "Software Engineer",
    description: "We are looking for a skilled software engineer to join our team.",
    requirements: "5+ years of experience in software development. Proficiency in JavaScript, Python, and cloud technologies.",
    company: {
      id: "1",
      name: "Tech Solutions Inc",
      logo: "https://via.placeholder.com/150",
      location: "San Francisco, CA"
    },
    job_type: "Full-time",
    salary_range: "$120,000 - $150,000",
    location: "San Francisco, CA",
    remote: false,
    posted_date: "2023-06-15T10:30:00Z",
    application_deadline: "2023-07-15T23:59:59Z",
    applications_count: 12
  },
  {
    id: "102",
    title: "Frontend Developer",
    description: "Looking for a frontend developer with React experience.",
    requirements: "3+ years of experience with React. Knowledge of modern frontend frameworks and tools.",
    company: {
      id: "1",
      name: "Tech Solutions Inc",
      logo: "https://via.placeholder.com/150",
      location: "San Francisco, CA"
    },
    job_type: "Full-time",
    salary_range: "$100,000 - $130,000",
    location: "Remote",
    remote: true,
    posted_date: "2023-06-10T14:45:00Z",
    application_deadline: "2023-07-10T23:59:59Z",
    applications_count: 8
  },
  {
    id: "103",
    title: "DevOps Engineer",
    description: "Join our team to build and maintain our cloud infrastructure.",
    requirements: "Experience with AWS, Docker, Kubernetes, and CI/CD pipelines.",
    company: {
      id: "1",
      name: "Tech Solutions Inc",
      logo: "https://via.placeholder.com/150",
      location: "San Francisco, CA"
    },
    job_type: "Full-time",
    salary_range: "$110,000 - $140,000",
    location: "San Francisco, CA",
    remote: false,
    posted_date: "2023-06-05T09:15:00Z",
    application_deadline: "2023-07-05T23:59:59Z",
    applications_count: 5
  }
];

export async function GET(request: NextRequest) {
  try {
    console.log("Handling GET request to /api/proxy/jobs/posted_jobs");
    
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
      const url = `${baseUrl}/api/jobs/posted_jobs/`; // Added /api prefix
      
      console.log(`Attempting to fetch from backend: ${url}`);
      
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json"
          },
          credentials: "include",
          // Add a longer timeout
          signal: AbortSignal.timeout(15000) // 15 seconds timeout
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log("Successfully fetched posted jobs from backend");
          return NextResponse.json(data, { status: 200 });
        } else {
          console.log(`Backend returned status ${response.status}, falling back to mock data`);
        }
      } catch (error) {
        console.error("Error fetching posted jobs from backend:", error);
      }
    } else {
      console.log("No auth token available, using mock data");
    }
    
    // Return mock data as fallback
    console.log("Returning mock posted_jobs data");
    return NextResponse.json(MOCK_POSTED_JOBS, { status: 200 });
  } catch (error) {
    console.error("Error in posted jobs route:", error);
    
    // Return mock data on error
    console.log("Error occurred, returning mock data");
    return NextResponse.json(MOCK_POSTED_JOBS, { status: 200 });
  }
}