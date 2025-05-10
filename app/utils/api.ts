// Base URL for API requests
const API_BASE_URL = "/api/proxy";

// Generic fetch function with error handling
export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    const url = `${API_BASE_URL}/${endpoint.replace(/^\//, "")}`;
    console.log(`Fetching from: ${url}`);

    // Get auth token from localStorage
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") || localStorage.getItem("token") : null;

    // Create headers with auth token if available
    const headers = new Headers(options.headers || {});
    headers.set("Content-Type", "application/json");

    if (token) {
      console.log("Adding authorization header");
      headers.set("Authorization", `Bearer ${token}`);
    } else {
      console.log("No auth token found in localStorage");
    }

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: "include", // Include cookies
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error (${response.status}): ${errorText}`);

      throw new Error(`API error: ${response.status} - ${errorText || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}

// Internships API
export async function getMyInternships() {
  return fetchApi<any[]>("internships/my-internships");
}

export async function getInternships() {
  return fetchApi<any[]>("internships");
}

export async function getInternship(id: string) {
  return fetchApi<any>(`internships/${id}`);
}

// Jobs API
export async function getJobs() {
  return fetchApi<any[]>("jobs");
}

export async function getJob(id: string) {
  return fetchApi<any>(`jobs/${id}`);
}

export async function getMyJobs() {
  return fetchApi<any[]>("jobs/my-jobs");
}

export async function getPostedJobs() {
  return fetchApi<any[]>("jobs/posted_jobs");
}

// Applications API
export async function getMyApplications() {
  return fetchApi<any[]>("applications/my-job-applications");
}

export async function getApplication(id: string) {
  return fetchApi<any>(`applications/${id}`);
}

// Offers API
export async function getMyOffers() {
  return fetchApi<any[]>("offers/my-offers");
}

export async function getSentOffers() {
  return fetchApi<any[]>("offers/sent-offers");
}

export async function getOffer(id: string) {
  return fetchApi<any>(`offers/${id}`);
}

// User API
export async function getStudentProfile() {
  return fetchApi<any>("user/get-student-profile");
}

export async function getCompanyProfile() {
  return fetchApi<any>("user/get-company-profile");
}
