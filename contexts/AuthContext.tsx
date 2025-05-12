"use client";

import { createContext, useState, useEffect, useContext, type ReactNode } from "react";
import { useRouter } from "next/navigation";

export type UserType = "student" | "company" | null

export interface User {
  id: string;
  email: string;
  userType: UserType;
  profile_picture?: string;
  full_name?: string;
  phone_number?: string;
  bio?: string;
  intuition?: string;
  course?: string;
  reg_num?: string;
  start_data?: string;
  end_data?: string;
  skills?: string;
  resume?: string;
  portfolio?: string;
  company_name?: string;
  company_reg_num?: string;
  company_industry?: string;
  company_description?: string;
  company_address1?: string;
  company_address2?: string;
  company_city?: string;
  company_state?: string;
  company_website?: string;
  company_size?: string;
  company_linkedin?: string;
  company_facebook?: string;
  company_twitter?: string;
  company_instagram?: string;
  first_name?: string
  last_name?: string;
  location?: string | null
  website_url?: string | null
  is_active?: boolean
  is_staff?: boolean
  date_joined?: string
  last_login?: string
  role?: string
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  userType: UserType;
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string, userType: UserType) => Promise<void>;
  register: (userData: any, userType: UserType) => Promise<void>;
  activateAccount: (code: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  verifyOTP: (otp: string) => Promise<void>;
  setNewPassword: (userId: string, newPassword: string, confirm_password: string) => Promise<void>;
  updateProfile: (userData: User) => Promise<void>;
  clearError: () => void;
  getStudentProfile: () => Promise<StudentProfile | null>;
  getCompanyProfile: () => Promise<CompanyProfile | null>;
  getUserDetails: (userId: string) => Promise<User | null>;
}

interface StudentProfile {
  id: string
  user: string
  major?: string
  university?: string
  expected_graduation?: string
  resume?: string | null
  skills?: string[]
  userId?: string
  firstName?: string
  lastName?: string
}

interface CompanyProfile {
  id: string
  user: string
  company_name?: string
  industry?: string
  company_size?: string
  founded_year?: number
  linkedin_url?: string | null
  userId?: string
  companyName?: string
  company_industry?: string
  company_description?: string
  company_website?: string
  company_location?: string
  company_founded_year?: string
}

interface TokenPayload {
  exp: number
  user_id: string
  jti: string
  token_type: string
}

interface RefreshResponse {
  access: string
  refresh?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  userType: UserType
  isAuthenticated: boolean
  token: string | null
  csrfToken: string | null
  login: (email: string, password: string, userType: UserType) => Promise<void>
  register: (userData: any, userType: UserType) => Promise<void>
  activateAccount: (code: string) => Promise<void>
  logout: () => void
  resetPassword: (email: string) => Promise<void>
  verifyOTP: (otp: string) => Promise<void>
  setNewPassword: (userId: string, newPassword: string, confirm_password: string) => Promise<void>
  updateProfile: (userData: User) => Promise<void>
  clearError: () => void
  getStudentProfile: () => Promise<StudentProfile | null>
  getCompanyProfile: () => Promise<CompanyProfile | null>
  fetchCsrfToken: () => Promise<string | null>
  fetchCsrfCookie: () => Promise<string | null>
  getValidToken: () => Promise<string | null>
  authenticatedFetch: (url: string, options?: RequestInit) => Promise<Response>
  isTokenExpired: (token: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [token, setToken] = useState<string | null>(null);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const router = useRouter();

  // Fetch CSRF token function
  const fetchCsrfToken = async (): Promise<string | null> => {
    try {
      // Return from state if already available
      if (csrfToken) {
        console.log("AuthContext: CSRF token reused from state");
        return csrfToken;
      }

      console.log("AuthContext: Fetching CSRF token from /api/proxy/csrf-token");

      const response = await fetch("/api/proxy/csrf-token", {
        method: "GET",
        credentials: "include", // Ensures cookies (if any) are sent
        cache: "no-store", // Prevent caching issues
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "No error details available");
        console.error("AuthContext: Failed to fetch CSRF token:", response.status, response.statusText, errorText);
        setError(`Failed to fetch CSRF token: ${response.status} ${response.statusText}`);
        return null;
      }

      const data = await response.json();
      console.log("AuthContext: Raw CSRF response data:", data);

      const newToken = data.csrfToken;
      if (!newToken || typeof newToken !== "string") {
        console.error("AuthContext: Invalid CSRF token in response:", newToken);
        setError("Invalid CSRF token format received");
        return null;
      }

      setCsrfToken(newToken);
      console.log("AuthContext: CSRF token stored:", newToken);
      return newToken;
    } catch (err) {
      console.error("AuthContext: Error fetching CSRF token:", err);
      setError(`Failed to fetch CSRF token: ${err instanceof Error ? err.message : "Unknown error"}`);
      return null;
    }
  };

  // New function to fetch CSRF cookie
  const fetchCsrfCookie = async (): Promise<string | null> => {
    try {
      console.log("AuthContext: Fetching CSRF cookie from /api/proxy/csrf-cookie");

      const response = await fetch("/api/proxy/csrf-cookie", {
        method: "GET",
        credentials: "include", // Ensures cookies are sent and stored
        cache: "no-store", // Prevent caching issues
      });

      if (!response.ok) {
        console.error("AuthContext: Failed to fetch CSRF cookie:", response.status, response.statusText);
        setError(`Failed to fetch CSRF cookie: ${response.status} ${response.statusText}`);
        return null;
      }

      const data = await response.json();
      console.log("AuthContext: CSRF cookie response:", data);

      return data.csrfToken;
    } catch (err) {
      console.error("AuthContext: Error fetching CSRF cookie:", err);
      setError(`Failed to fetch CSRF cookie: ${err instanceof Error ? err.message : "Unknown error"}`);
      return null;
    }
  };

  // Check if a token is expired
  const isTokenExpired = (token: string): boolean => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(window.atob(base64)) as TokenPayload;
      return payload.exp * 1000 < Date.now();
    } catch (err) {
      console.error("AuthContext: Error checking token expiration:", err);
      return true;
    }
  };

  // Get a valid token, refreshing if necessary
  const getValidToken = async (): Promise<string | null> => {
    const storedToken = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!storedToken) {
      console.log("AuthContext: No token found in localStorage");
      return null;
    }

    // If token is still valid, return it
    if (!isTokenExpired(storedToken)) {
      return storedToken;
    }

    console.log("AuthContext: Token is expired, attempting to refresh");

    // Token is expired, try to refresh
    if (refreshToken) {
      try {
        const response = await fetch("/api/proxy/user/refresh-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: refreshToken }),
        });

        if (response.ok) {
          const data = (await response.json()) as RefreshResponse;
          console.log("AuthContext: Token refreshed successfully");

          // Store the new token
          localStorage.setItem("token", data.access);

          // Update the refresh token if a new one was provided
          if (data.refresh) {
            localStorage.setItem("refreshToken", data.refresh);
          }

          // Update state
          setToken(data.access);

          return data.access;
        } else {
          console.error("AuthContext: Failed to refresh token, status:", response.status);
          // If refresh fails, clear auth state
          logout();
          return null;
        }
      } catch (err) {
        console.error("AuthContext: Error refreshing token:", err);
        logout();
        return null;
      }
    } else {
      console.log("AuthContext: No refresh token available");
      logout();
      return null;
    }
  };

  // Helper function for authenticated API requests
  const authenticatedFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const validToken = await getValidToken();

    const headers = new Headers(options.headers || {});

    // Add authorization header if we have a token
    if (validToken) {
      headers.set("Authorization", `Bearer ${validToken}`);
    }

    // Add CSRF token if available
    if (csrfToken) {
      headers.set("X-CSRFToken", csrfToken);
    }

    // Set content type if not already set and we have a body
    if (!headers.has("Content-Type") && options.body) {
      headers.set("Content-Type", "application/json");
    }

    return fetch(url, {
      ...options,
      headers,
      credentials: "include", // Always include credentials
    });
  };

  const login = async (email: string, password: string, type: UserType) => {
    try {
      setLoading(true);
      setError(null);

      console.log(`AuthContext: Attempting login with email: ${email}, type: ${type}`);

      // Step 1: Get CSRF cookie first
      await fetchCsrfCookie();

      // Step 2: Attempt login via proxy
      const response = await fetch("/api/proxy/user/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important for cookies
        body: JSON.stringify({ email, password, userType: type }),
      });

      const data = await response.json();
      console.log("AuthContext: Login response received", { status: response.status });

      if (!response.ok) {
        console.error("AuthContext: Login failed", data);
        throw new Error(data.message || data.detail || "Login failed");
      }

      if (!data.access || !data.refresh) {
        console.error("AuthContext: Missing token in response", data);
        throw new Error("Invalid response from server: missing authentication token");
      }

      console.log("AuthContext: Login successful, storing tokens and user data");

      // Store tokens
      localStorage.setItem("token", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("userType", type as string);

      // Store user data
      const userData = {
        id: data.user_id || data.id,
        email,
        userType: type,
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setUserType(type);
      setToken(data.access);

      console.log(`AuthContext: Redirecting to ${type} dashboard`);

      router.push(type === "student" ? "/student/dashboard" : "/company/dashboard");
    } catch (err: any) {
      console.error("AuthContext: Login error", err);
      setError(err.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Modified register function with CSRF cookie handling
  const register = async (userData: User, role: UserType) => {
    setLoading(true);
    clearError();

    try {
      // Get CSRF cookie first
      await fetchCsrfCookie();

      // Use our local proxy endpoint instead of direct API call
      const response = await fetch("/api/proxy/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important for cookies
        body: JSON.stringify({ ...userData, userType: role }), // Include role as part of userData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.detail || "Registration failed");
      }

      localStorage.setItem("verifyOtpEmail", userData.email);
      localStorage.setItem("userType", role as string);

      // Handle successful registration
      router.push("/user/auth/register/otp");
      return data;
    } catch (err: any) {
      setError(err.message || "Failed to register");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const activateAccount = async (code: string) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch CSRF token first
      await fetchCsrfToken();

      const email = localStorage.getItem("verifyOtpEmail");
      if (!email) {
        throw new Error("Email not found. Please try registering again.");
      }

      const response = await fetch("/api/proxy/user/activate", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: code,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to verify OTP. Please try again.");
      }

      return data;
    } catch (err: any) {
      setError(err.message || "Failed to verify OTP. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resendActivationCode = async (email: string) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch CSRF token first
      await fetchCsrfToken();

      const response = await fetch("/api/proxy/user/resend-activation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to resend activation code");
      }

      return data;
    } catch (err: any) {
      setError(err.message || "Failed to resend activation code");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    // Clear any auth tokens from localStorage or cookies if needed
    localStorage.removeItem("verifyOtpEmail");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
    router.push("/login");
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch CSRF token first
      await fetchCsrfToken();

      const response = await fetch("/api/proxy/user/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      return data;
    } catch (err: any) {
      setError(err.message || "Failed to reset password");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (otp: string) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch CSRF token first
      await fetchCsrfToken();

      const email = localStorage.getItem("verifyOtpEmail");
      if (!email) {
        throw new Error("Email not found. Please try registering again.");
      }

      const response = await fetch("/api/proxy/user/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to verify OTP. Please try again.");
      }

      return data;
    } catch (err: any) {
      setError(err.message || "Failed to verify OTP. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const setNewPassword = async (userId: string, newPassword: string, confirm_password: string) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch CSRF token first
      await fetchCsrfToken();

      const response = await fetch("/api/proxy/user/set-new-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          newPassword,
          confirm_password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to set new password");
      }

      return data;
    } catch (err: any) {
      setError(err.message || "Failed to set new password");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (userData: User) => {
    setLoading(true);
    setError(null);

    try {
      // Use authenticatedFetch instead of regular fetch
      const response = await authenticatedFetch("/api/proxy/user/update-profile", {
        method: "PUT",
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      setUser(userData);
      return data;
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getStudentProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      // Use authenticatedFetch instead of regular fetch
      const response = await authenticatedFetch("/api/proxy/user/get-student-profile", {
        method: "GET",
      });

      // If we get a 404, the endpoint might not exist yet
      if (response.status === 404) {
        return {
          id: "mock-profile-1",
          user: user?.id || "user-1",
          major: "Computer Science",
          university: "Example University",
          expected_graduation: "2024-05-15",
          skills: ["JavaScript", "React", "Node.js"],
          firstName: user?.first_name || "John",
          lastName: user?.last_name || "Doe",
        };
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to get student profile");
      }

      return data;
    } catch (err: any) {
      setError(err.message || "Failed to get student profile");

      // Return mock data as fallback
      return {
        id: "mock-profile-1",
        user: user?.id || "user-1",
        major: "Computer Science",
        university: "Example University",
        expected_graduation: "2024-05-15",
        skills: ["JavaScript", "React", "Node.js"],
        firstName: user?.first_name || "John",
        lastName: user?.last_name || "Doe",
      };
    } finally {
      setLoading(false);
    }
  };

  const getCompanyProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      // Use authenticatedFetch instead of regular fetch
      const response = await authenticatedFetch("/api/proxy/user/get-company-profile", {
        method: "GET",
      });

      // If we get a 404, the endpoint might not exist yet
      if (response.status === 404) {
        return {
          id: "mock-company-1",
          user: user?.id || "user-1",
          company_name: "Example Corp",
          industry: "Technology",
          company_size: "50-100",
          founded_year: 2010,
          linkedin_url: "https://linkedin.com/company/example",
          companyName: "Example Corp",
        };
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to get company profile");
      }

      return data;
    } catch (err: any) {
      setError(err.message || "Failed to get company profile");

      // Return mock data as fallback
      return {
        id: "mock-company-1",
        user: user?.id || "user-1",
        company_name: "Example Corp",
        industry: "Technology",
        company_size: "50-100",
        founded_year: 2010,
        linkedin_url: "https://linkedin.com/company/example",
        companyName: "Example Corp",
      };
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async (userId: string): Promise<User | null> => {
    try {
      setLoading(true);
      setError(null);
  
      const token = localStorage.getItem("token");
  
      if (!token) {
        throw new Error("User not authenticated");
      }
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/get_user_by_id/${userId}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || data.error || "User details retrieval failed");
      }
  
      setUser(data.user);
      return data;
    } catch (err: any) {
      setError(err.message || "User details retrieval failed");
    } finally {
      setLoading(false);
    }
    return null;
  };

  const clearError = () => {
    setError(null);
  };

  // useEffect to initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {

      // Fetch CSRF cookie first
      await fetchCsrfCookie();

      const csrf = await fetchCsrfToken();
      if (!csrf) {
        return;
      }

      const validToken = await getValidToken();
      const storedUserType = localStorage.getItem("userType") as UserType;

      if (validToken && storedUserType) {
        setLoading(true);
        let profileEndpoint = "";

        if (storedUserType === "student") {
          profileEndpoint = "/api/proxy/user/get_student_profile/";
        } else if (storedUserType === "company") {
          profileEndpoint = "/api/proxy/user/get_company_profile/";
        } else {
          localStorage.clear();
          setUser(null);
          setUserType(null);
          setToken(null);
          setLoading(false);
          return;
        }

        try {
          const response = await authenticatedFetch(profileEndpoint);

          // If we get a 404, the endpoint might not exist yet, but we can still use the token
          if (response.status === 404) {

            // Try to get stored user data
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
              try {
                const userData = JSON.parse(storedUser);
                setUser(userData);
                setUserType(storedUserType);
                setToken(validToken);
              } catch (e) {
                setUser(null);
              }
            } else {
              // Create a minimal user object
              setUser({
                id: "user-1", // Placeholder ID
                email: "user@example.com", // Placeholder email
                userType: null, // Placeholder userType
              });
            }
          } else if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setUserType(storedUserType);
            setToken(validToken);
          } else {
            localStorage.clear();
            setUser(null);
            setUserType(null);
            setToken(null);
          }
        } catch (err) {
          setError("Authentication verification failed");
          localStorage.clear();
          setUser(null);
          setUserType(null);
          setToken(null);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const value = {
    user,
    loading,
    error,
    userType,
    isAuthenticated: !!user,
    token,
    csrfToken,
    login,
    register,
    activateAccount,
    logout,
    resetPassword,
    verifyOTP,
    setNewPassword,
    updateProfile,
    getStudentProfile,
    getCompanyProfile,
    getUserDetails,
    clearError,
    fetchCsrfToken,
    fetchCsrfCookie,
    getValidToken,
    authenticatedFetch,
    isTokenExpired,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
