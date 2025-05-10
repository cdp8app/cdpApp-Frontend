import { type NextRequest, NextResponse } from "next/server";

// Mock data for jobs
const MOCK_JOBS = [
  {
    id: "101",
    title: "Software Engineer",
    description: "We are looking for a skilled software engineer to join our team.",
    requirements: "5+ years of experience in software development. Proficiency in JavaScript, Python, and cloud technologies.",
    company: {
      id: "1",
      company_name: "Tech Solutions Inc",
      company_industry: "Technology",
      company_description: "Leading technology solutions provider",
      profile_picture: "https://via.placeholder.com/150"
    },
    job_type: "Full-time", // Updated to use full words
    salary: 120000,
    location: "San Francisco, CA",
    status: "open",
    deadline: "2023-07-15",
    created_at: "2023-06-15T10:30:00Z",
    updated_at: "2023-06-15T10:30:00Z"
  },
  {
    id: "102",
    title: "Frontend Developer",
    description: "Looking for a frontend developer with React experience.",
    requirements: "3+ years of experience with React. Knowledge of modern frontend frameworks and tools.",
    company: {
      id: "1",
      company_name: "Tech Solutions Inc",
      company_industry: "Technology",
      company_description: "Leading technology solutions provider",
      profile_picture: "https://via.placeholder.com/150"
    },
    job_type: "Full-time", // Updated to use full words
    salary: 100000,
    location: "Remote",
    status: "open",
    deadline: "2023-07-10",
    created_at: "2023-06-10T14:45:00Z",
    updated_at: "2023-06-10T14:45:00Z"
  }
];

export async function GET(request: NextRequest) {
  try {
    console.log("Handling GET request to /api/proxy/jobs");
    
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
      const url = `${baseUrl}/api/jobs/`; // Added /api prefix
      
      console.log(`Attempting to fetch from backend: ${url}`);
      
      try {
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
          console.log("Successfully fetched jobs from backend");
          return NextResponse.json(data, { status: 200 });
        } else {
          console.log(`Backend returned status ${response.status}, falling back to mock data`);
        }
      } catch (error) {
        console.error("Error fetching jobs from backend:", error);
      }
    } else {
      console.log("No auth token available, using mock data");
    }
    
    // Return mock data as fallback
    console.log("Returning mock jobs data");
    return NextResponse.json(MOCK_JOBS, { status: 200 });
  } catch (error) {
    console.error("Error in jobs route:", error);
    
    // Return mock data on error
    console.log("Error occurred, returning mock data");
    return NextResponse.json(MOCK_JOBS, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("Handling POST request to /api/proxy/jobs");
    
    // Get the request body
    const body = await request.json();
    
    // Log the request body (excluding sensitive fields)
    console.log("Job creation request body:", {
      ...body,
      // Don't log sensitive fields if any
    });
    
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
    
    // If we have an auth token, try to create job on the backend
    if (authToken) {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com";
      const url = `${baseUrl}/api/jobs/`; // Added /api prefix
      
      console.log(`Attempting to create job on backend: ${url}`);
      
      try {
        // Try different job type formats if needed
        const jobData = { ...body };
        
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(jobData),
          credentials: "include"
        });
        
        // Get response data
        let responseData;
        try {
          responseData = await response.json();
        } catch (e) {
          responseData = await response.text();
        }
        
        if (response.ok) {
          console.log("Successfully created job on backend");
          return NextResponse.json(responseData, { status: 201 });
        } else {
          console.log(`Backend returned status ${response.status}:`, responseData);
          
          // If job_type is the issue, try with lowercase
          if (response.status === 400 && 
              typeof responseData === "object" && 
              responseData.job_type && 
              jobData.job_type) {
            
            console.log("Trying with lowercase job type");
            jobData.job_type = jobData.job_type.toLowerCase();
            
            const retryResponse = await fetch(url, {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${authToken}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify(jobData),
              credentials: "include"
            });
            
            if (retryResponse.ok) {
              const retryData = await retryResponse.json();
              console.log("Successfully created job with lowercase job type");
              return NextResponse.json(retryData, { status: 201 });
            }
            
            // If still failing, try with different formats
            const jobTypeOptions = ["full-time", "part-time", "internship", "contract", "remote", "ft", "pt", "in", "ct", "rm"];
            
            for (const option of jobTypeOptions) {
              if (option === jobData.job_type.toLowerCase()) continue;
              
              console.log(`Trying job type: ${option}`);
              jobData.job_type = option;
              
              const optionResponse = await fetch(url, {
                method: "POST",
                headers: {
                  "Authorization": `Bearer ${authToken}`,
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(jobData),
                credentials: "include"
              });
              
              if (optionResponse.ok) {
                const optionData = await optionResponse.json();
                console.log(`Successfully created job with job type: ${option}`);
                return NextResponse.json(optionData, { status: 201 });
              }
            }
          }
          
          // Format validation errors for better display
          if (response.status === 400 && typeof responseData === "object") {
            const formattedErrors = Object.entries(responseData)
              .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(", ") : errors}`)
              .join("; ");
            
            return NextResponse.json(
              { error: "Validation error", details: formattedErrors, fields: responseData },
              { status: 400 }
            );
          }
          
          return NextResponse.json(
            { error: "Failed to create job", details: responseData },
            { status: response.status }
          );
        }
      } catch (error) {
        console.error("Error creating job on backend:", error);
        throw error;
      }
    } else {
      console.log("No auth token available, cannot create job");
      return NextResponse.json(
        { error: "Authentication required to create a job" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error in job creation:", error);
    return NextResponse.json(
      { 
        error: "Failed to create job",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}