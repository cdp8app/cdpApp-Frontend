// lib/api.ts
import axios from "axios";

// Use relative URL for API calls to avoid CORS issues
const API_BASE_URL = "/api/proxy";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken"); // Using "authToken" key from main branch
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    // Log the request for debugging
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.statusText}`);
    return response;
  },
  (error) => {
    const { response } = error;
    // Handle authentication errors
    if (response && response.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");
        // Redirect to login if needed
        window.location.href = "/UsersAuthentication/StudentAuth/StudentAuthPage";
      }
    }
    
    console.error("API Error:", error.message, response?.status, response?.data);
    return Promise.reject(error);
  },
);

// Helper to get auth header with token (from main branch)
export const getAuthHeader = (): Record<string, string> => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
  return {};
};

// Server-side fetch function for SSR/SSG components that can't use axios
export async function serverFetch(endpoint: string, options: RequestInit = {}) {
  // For server-side requests, use the full URL
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com";
  const url = `${apiUrl}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store", // Disable caching by default for server components
  };
  
  // Merge options
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(options.headers || {}),
    },
  };
  
  console.log(`Server fetch: ${url}`);
  const response = await fetch(url, mergedOptions);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Server API error: ${response.status}`);
  }
  
  return response.json();
}

export default api;