"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

// Define types
export type UserType = "student" | "company" | null

type StudentProfile = {
  id: number
  profile_picture?: string
  full_name?: string
  phone_number?: string
  bio?: string
  intuition?: string
  course?: string
  reg_num?: string
  start_data?: string
  end_data?: string
  skills?: string
  resume?: string
  portfolio?: string
}

type CompanyProfile = {
  id: number
  phone_number?: string
  profile_picture?: string
  company_name?: string
  company_reg_num?: string
  company_industry?: string
  company_description?: string
  company_address1?: string
  company_address2?: string
  company_city?: string
  company_state?: string
  company_website?: string
  company_size?: string
  company_linkedin?: string
  company_facebook?: string
  company_twitter?: string
  company_instagram?: string
}

interface User {
  id: string
  email: string
  userType: UserType
  profile_picture?: string
  full_name?: string
  phone_number?: string
  bio?: string
  intuition?: string
  course?: string
  reg_num?: string
  start_data?: string
  end_data?: string
  skills?: string
  resume?: string
  portfolio?: string
  company_name?: string
  company_reg_num?: string
  company_industry?: string
  company_description?: string
  company_address1?: string
  company_address2?: string
  company_city?: string
  company_state?: string
  company_website?: string
  company_size?: string
  company_linkedin?: string
  company_facebook?: string
  company_twitter?: string
  company_instagram?: string
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
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userType, setUserType] = useState<UserType>(null)
  const [token, setToken] = useState<string | null>(null)
  const [csrfToken, setCsrfToken] = useState<string | null>(null)
  const router = useRouter()

  // Fetch CSRF token function
  const fetchCsrfToken = async (): Promise<string | null> => {
    try {
      // Return from state if already available
      if (csrfToken) {
        console.log("AuthContext: CSRF token reused from state")
        return csrfToken
      }

      console.log("AuthContext: Fetching CSRF token from /api/proxy/csrf-token")

      const response = await fetch("/api/proxy/csrf-token", {
        method: "GET",
        credentials: "include", // Ensures cookies (if any) are sent
        cache: "no-store", // Prevent caching issues
      })

      if (!response.ok) {
        const errorText = await response.text().catch(() => "No error details available")
        console.error("AuthContext: Failed to fetch CSRF token:", response.status, response.statusText, errorText)
        setError(`Failed to fetch CSRF token: ${response.status} ${response.statusText}`)
        return null
      }

      const data = await response.json()
      console.log("AuthContext: Raw CSRF response data:", data)

      const newToken = data.csrfToken
      if (!newToken || typeof newToken !== "string") {
        console.error("AuthContext: Invalid CSRF token in response:", newToken)
        setError("Invalid CSRF token format received")
        return null
      }

      setCsrfToken(newToken)
      console.log("AuthContext: CSRF token stored:", newToken)
      return newToken
    } catch (err) {
      console.error("AuthContext: Error fetching CSRF token:", err)
      setError(`Failed to fetch CSRF token: ${err instanceof Error ? err.message : "Unknown error"}`)
      return null
    }
  }

  // useEffect to initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      console.log("AuthContext: Initializing auth...")

      const csrf = await fetchCsrfToken()
      if (!csrf) {
        console.warn("AuthContext: Initialization failed — CSRF token not retrieved")
        return
      }

      const storedToken = localStorage.getItem("token")
      const storedUserType = localStorage.getItem("userType") as UserType

      if (storedToken && storedUserType) {
        setLoading(true)
        let profileEndpoint = ""

        if (storedUserType === "student") {
          profileEndpoint = `/api/proxy/user/get_student_profile/`
        } else if (storedUserType === "company") {
          profileEndpoint = `/api/proxy/user/get_company_profile/`
        } else {
          console.warn("AuthContext: Unknown userType in localStorage, clearing auth data")
          localStorage.clear()
          setUser(null)
          setUserType(null)
          setToken(null)
          setLoading(false)
          return
        }

        try {
          const response = await fetch(profileEndpoint, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          })

          if (response.ok) {
            const userData = await response.json()
            console.log("AuthContext: User profile fetched successfully")
            setUser(userData)
            setUserType(storedUserType)
            setToken(storedToken)
          } else {
            console.warn("AuthContext: Invalid token or user session expired")
            localStorage.clear()
            setUser(null)
            setUserType(null)
            setToken(null)
          }
        } catch (err) {
          console.error("AuthContext: Error verifying token", err)
          setError("Authentication verification failed")
          localStorage.clear()
          setUser(null)
          setUserType(null)
          setToken(null)
        } finally {
          setLoading(false)
        }
      } else {
        console.log("AuthContext: No existing auth session found")
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = async (email: string, password: string, type: UserType) => {
    try {
      setLoading(true)
      setError(null)

      console.log(`AuthContext: Attempting login with email: ${email}, type: ${type}`)

      // Step 1: Get CSRF token (log result for debug)
      let csrf = null
      try {
        csrf = await fetchCsrfToken()
        console.log("AuthContext: CSRF token fetched:", csrf)
      } catch (csrfErr) {
        console.warn("AuthContext: Failed to fetch CSRF token", csrfErr)
      }

      if (!csrf) {
        throw new Error("Could not get security token for login")
      }

      // Step 2: Attempt login via proxy
      const response = await fetch(`/api/proxy/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(csrf && { "X-CSRF-Token": csrf }),
        },
        body: JSON.stringify({ email, password, userType: type }),
      })

      const data = await response.json()
      console.log("AuthContext: Login response received", { status: response.status })

      if (!response.ok) {
        console.error("AuthContext: Login failed", data)
        throw new Error(data.message || data.detail || "Login failed")
      }

      if (!data.access || !data.refresh) {
        console.error("AuthContext: Missing token in response", data)
        throw new Error("Invalid response from server: missing authentication token")
      }

      console.log("AuthContext: Login successful, storing tokens and user data")

      // Store tokens
      localStorage.setItem("token", data.access)
      localStorage.setItem("refreshToken", data.refresh)
      localStorage.setItem("userType", type as string)

      // Store user data
      const userData = {
        id: data.user_id || data.id,
        email,
        userType: type,
      }

      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      setUserType(type)
      setToken(data.access)

      console.log(`AuthContext: Redirecting to ${type} dashboard`)

      router.push(type === "student" ? "/student/dashboard" : "/company/dashboard")
    } catch (err: any) {
      console.error("AuthContext: Login error", err)
      setError(err.message || "Login failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Modified register function with CSRF token handling
  const register = async (userData: User, role: UserType) => {
    setLoading(true)
    clearError()

    try {
      // Get CSRF token first
      const csrf = await fetchCsrfToken()
      if (!csrf) {
        throw new Error("Could not get security token for registration")
      }

      // Use our local proxy endpoint instead of direct API call
      const response = await fetch(`/api/proxy/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrf,
        },
        body: JSON.stringify({ ...userData, userType: role }), // Include role as part of userData
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.detail || "Registration failed")
      }

      localStorage.setItem("verifyOtpEmail", userData.email)
      localStorage.setItem("userType", role as string)

      // Handle successful registration
      router.push("/user/auth/register/otp")
      return data
    } catch (err: any) {
      setError(err.message || "Failed to register")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const activateAccount = async (code: string) => {
    setLoading(true)
    setError(null)
    try {
      // Get CSRF token first
      const csrf = await fetchCsrfToken()
      if (!csrf) {
        throw new Error("Could not get security token for account activation")
      }

      const response = await fetch(`/api/proxy/user/activate/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrf,
        },
        body: JSON.stringify({ code }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.error || "Registration failed")
      }

      localStorage.removeItem("verifyOtpEmail")

      router.push("/user/auth/register/successful")
      return data
    } catch (err: any) {
      setError(err.message || "Activation failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userType")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("user")
    setUser(null)
    setUserType(null)
    setToken(null)
    router.push("/")
  }

  const resetPassword = async (email: string) => {
    try {
      setLoading(true)
      setError(null)

      // Get CSRF token first
      const csrf = await fetchCsrfToken()
      if (!csrf) {
        throw new Error("Could not get security token for password reset")
      }

      const response = await fetch(`/api/proxy/user/password_reset/generate/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrf,
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.error || "Password reset request failed")
      }

      localStorage.setItem("otpEmail", email)

      // Success - should redirect to OTP verification page
      router.push("/user/auth/login/forget-password/otp")
      return data
    } catch (err: any) {
      setError(err.message || "Password reset failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const verifyOTP = async (otp: string) => {
    try {
      setLoading(true)
      setError(null)

      // Get CSRF token first
      const csrf = await fetchCsrfToken()
      if (!csrf) {
        throw new Error("Could not get security token for OTP verification")
      }

      const response = await fetch(`/api/proxy/user/password_reset/retrieve_user/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrf,
        },
        body: JSON.stringify({ token: otp }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.error || "OTP verification failed")
      }

      // Store the reset token for the next step
      localStorage.setItem("resetToken", data.token)
      localStorage.setItem("userId", data.id)

      // Redirect to new password page
      router.push("/user/auth/login/forget-password/new-password")
      return data
    } catch (err: any) {
      setError(err.message || "OTP verification failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const setNewPassword = async (userId: string, newPassword: string, confirm_password: string) => {
    try {
      setLoading(true)
      setError(null)

      // Get CSRF token first
      const csrf = await fetchCsrfToken()
      if (!csrf) {
        throw new Error("Could not get security token for password update")
      }

      const response = await fetch(`/api/proxy/user/password_reset/reset/${userId}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrf,
        },
        body: JSON.stringify({ new_password: newPassword, confirm_password: confirm_password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.error || "Setting new password failed")
      }

      localStorage.removeItem("resetToken")
      localStorage.removeItem("userId")
      router.push("/user/auth/login/forget-password/new-password/successful")
    } catch (err: any) {
      setError(err.message || "Setting new password failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (userData: User) => {
    try {
      setLoading(true)
      setError(null)

      const token = localStorage.getItem("token")

      // Get CSRF token first
      const csrf = await fetchCsrfToken()
      if (!csrf) {
        throw new Error("Could not get security token for profile update")
      }

      if (!token) {
        throw new Error("User not authenticated")
      }

      const response = await fetch(`/api/proxy/user/update_profile/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-CSRF-Token": csrf,
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.error || "Profile update failed")
      }

      setUser(data.user)
      if (userType === "student") {
        router.push("/student/profile")
      } else {
        router.push("/company/profile")
      }
    } catch (err: any) {
      setError(err.message || "Profile update failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getStudentProfile = async (): Promise<StudentProfile | null> => {
    try {
      setLoading(true)
      setError(null)

      const token = localStorage.getItem("token")

      if (!token) {
        throw new Error("User not authenticated")
      }

      const response = await fetch(`/api/proxy/user/get_student_profile/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.error || "Profile retrieval failed")
      }

      setUser(data.user)
      return data
    } catch (err: any) {
      setError(err.message || "Profile retrieval failed")
    } finally {
      setLoading(false)
    }
    return null // Ensure a return value in all code paths
  }

  const getCompanyProfile = async (): Promise<CompanyProfile | null> => {
    try {
      setLoading(true)
      setError(null)

      const token = localStorage.getItem("token")

      if (!token) {
        throw new Error("User not authenticated")
      }

      const response = await fetch(`/api/proxy/user/get_company_profile/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.error || "Profile retrieval failed")
      }

      setUser(data.user)
      return data
    } catch (err: any) {
      setError(err.message || "Profile retrieval failed")
    } finally {
      setLoading(false)
    }
    return null // Ensure a return value in all code paths
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <AuthContext.Provider
      value={{
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
        clearError,
        fetchCsrfToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
