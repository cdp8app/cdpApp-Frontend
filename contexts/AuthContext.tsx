// contexts/AuthContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Define types
export type UserType = "student" | "company" | null;

type StudentProfile = {
  id: number;
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
};

type CompanyProfile = {
  id: number;
  phone_number?: string;
  profile_picture?: string;
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
}

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

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuthOnLoad = async () => {
      const storedToken = localStorage.getItem("token");
      const storedUserType = localStorage.getItem("userType") as UserType;

      if (storedToken && storedUserType) { // Ensure we have both token and userType
        setLoading(true);
        let profileEndpoint = "";

        if (storedUserType === "student") {
          profileEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/user/get_student_profile/`;
        } else if (storedUserType === "company") {
          profileEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/user/get_company_profile/`;
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("userType");
          setUser(null);
          setUserType(null);
          setToken(null);
          setLoading(false);
          return;
        }

        try {
          const response = await fetch(profileEndpoint, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setUserType(storedUserType);
            setToken(storedToken);
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("userType");
            setUser(null);
            setUserType(null);
            setToken(null);
          }
        } catch (err) {
          setError("Authentication verification failed");
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

    checkAuthOnLoad();
  }, []);

  // Update this function in your AuthContext.tsx

  const login = async (email: string, password: string, type: UserType) => {
    try {
      setLoading(true);
      setError(null);
    
      // Use our proxy endpoint instead of direct API call
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, userType: type }),
      });
  
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || data.detail || "Login failed");
      }
    
      localStorage.setItem("token", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("userType", type as string);
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      setUserType(type);
      setToken(data.access);
    
      // Redirect based on user type
      if (type === "student") {
        router.push("/student/dashboard");
      } else {
        router.push("/company/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
      throw err; // Re-throw to let the form component handle it
    } finally {
      setLoading(false);
    }
  };

  // Update the register function to use the UserData interface
  const register = async (userData: User, role: UserType) => {
    setLoading(true);
    clearError();
    
    try {
      // Use our proxy endpoint instead of direct API call
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData, userType: role }), // Include role as part of userData
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || data.detail || "Registration failed");
      }

      localStorage.setItem("verifyOtpEmail", userData.email);
      localStorage.setItem("userType", role as string);
      
      // Handle successful registration
      // You might want to automatically log the user in or redirect them
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/activate/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({code})
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Registration failed");
      }

      localStorage.removeItem("verifyOtpEmail");

      router.push("/user/auth/register/successful");
      return data;
    } catch (err: any) {
      setError(err.message || "Activation failed");
      throw err;
    }
    finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    setUser(null);
    setUserType(null);
    router.push("/");
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/password_reset/generate/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Password reset request failed");
      }
      
      // if (!response.ok) {
      //   const errorData = await response.json();

      //   throw new Error(errorData.message || "");
      // }

      localStorage.setItem("otpEmail", email);
      
      // Success - should redirect to OTP verification page
      router.push("/user/auth/login/forget-password/otp");
      return data;
    } catch (err: any) {
      setError(err.message || "Password reset failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (otp: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/password_reset/retrieve_user/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: otp })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "OTP verification failed");
      }
      
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || "");
      // }
      
      // const data = await response.json();
      
      // Store the reset token for the next step
      localStorage.setItem("resetToken", data.token);
      localStorage.setItem("userId", data.id);
      
      // Redirect to new password page
      router.push("/user/auth/login/forget-password/new-password");
      return data;
    } catch (err: any) {
      setError(err.message || "OTP verification failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const setNewPassword = async (userId: string, newPassword: string, confirm_password: string) => {
    try {
      setLoading(true);
      setError(null);
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/password_reset/reset/${userId}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ new_password: newPassword, confirm_password: confirm_password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Setting new password failed");
      }
  
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || "");
      // }
  
      localStorage.removeItem("resetToken");
      localStorage.removeItem("userId");
      router.push("/user/auth/login/forget-password/new-password/successful");
    } catch (err: any) {
      setError(err.message || "Setting new password failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };  

  const updateProfile = async (userData: User) => {
    try {
      setLoading(true);
      setError(null);
  
      const token = localStorage.getItem("token");
      localStorage.getItem("token");
      localStorage.getItem("userType");
  
      if (!token) {
        throw new Error("User not authenticated");
      }
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/update_profile/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || data.error || "Profile update failed");
      }
  
      setUser(data.user);
      if (userType === "student") {
        router.push("/student/profile");
      } else {
        router.push("/company/profile");
      }
      
    }
    catch (err: any) {
      setError(err.message || "Profile update failed");
      throw err;
    }
    finally {
      setLoading(false);
    }
  };

  const getStudentProfile = async (): Promise<StudentProfile | null>=> {
    try {
      setLoading(true);
      setError(null);
  
      const token = localStorage.getItem("token");
  
      if (!token) {
        throw new Error("User not authenticated");
      }
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/get_student_profile/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || data.error || "Profile retrieval failed");
      }
  
      setUser(data.user);
      return data;
    } catch (err: any) {
      setError(err.message || "Profile retrieval failed");
    } finally {
      setLoading(false);
    }
    return null; // Ensure a return value in all code paths
  };

  const getCompanyProfile = async (): Promise<CompanyProfile | null> => {
    try {
      setLoading(true);
      setError(null);
  
      const token = localStorage.getItem("token");
  
      if (!token) {
        throw new Error("User not authenticated");
      }
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/get_company_profile/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || data.error || "Profile retrieval failed");
      }
  
      setUser(data.user);
      return data;
    } catch (err: any) {
      setError(err.message || "Profile retrieval failed");
    } finally {
      setLoading(false);
    }
    return null; // Ensure a return value in all code paths
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

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        error,
        userType,
        isAuthenticated: !!user,
        token,
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
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};