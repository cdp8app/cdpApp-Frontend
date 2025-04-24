// contexts/AuthContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Define types
type UserType = "student" | "company" | null;

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  userType: UserType;
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  userType: UserType;
  isAuthenticated: boolean;
  login: (email: string, password: string, userType: UserType) => Promise<void>;
  register: (userData: any, userType: UserType) => Promise<void>;
  activateAccount: (code: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  verifyOTP: (otp: string) => Promise<void>;
  setNewPassword: (userId: string, newPassword: string, confirm_password: string) => Promise<void>;
  clearError: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const router = useRouter();

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      const storedUserType = localStorage.getItem("userType") as UserType;
      
      if (token) {
        try {
          setLoading(true);
          const response = await fetch("https://careerxhub.onrender.com/api/user/profile/", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setUserType(storedUserType);
          } else {
            // Token invalid, clear storage
            localStorage.removeItem("token");
            localStorage.removeItem("userType");
            setUser(null);
            setUserType(null);
          }
        } catch (err) {
          setError("Authentication verification failed");
          
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    
    checkAuth();
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
        throw new Error(data.message || "Login failed");
      }
    
      localStorage.setItem("token", data.token);
      localStorage.setItem("userType", type as string);
      setUser(data.user);
      setUserType(type);
    
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
      const response = await fetch("/api/proxy/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData), // Send role if needed as part of userData
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || data.error || "Registration failed");
      }
      
      // Handle successful registration
      // You might want to automatically log the user in or redirect them
      router.push("/UsersAuthentication/StudentAuth/StudentAuthPage/StudentLogin");
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
      const response = await fetch("/api/proxy/activate", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(code)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Registration failed");
      }

      router.push("/Dashboard");
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
      router.push("/user/auth/login/forget-password/new-password/successful");
    } catch (err: any) {
      setError(err.message || "Setting new password failed");
      throw err;
    } finally {
      setLoading(false);
    }
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
        login, 
        register, 
        activateAccount,
        logout,
        resetPassword,
        verifyOTP,
        setNewPassword,
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