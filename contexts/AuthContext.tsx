// File: contexts/AuthContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { userService } from "@/lib/services/userService";

interface User {
  id: string;
  email: string;
  name: string;
  profile_image?: string;
  // Add other user fields as needed
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  activateAccount: (code: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Check for existing auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (typeof window !== "undefined" && localStorage.getItem("authToken")) {
        setLoading(true);
        try {
          const userData = await userService.getCurrentUser();
          setUser(userData);
          setIsAuthenticated(true);
        } catch (err: any) {
          console.error("Auth check failed:", err);
          setError("Authentication expired");
          setUser(null);
          setIsAuthenticated(false);
          localStorage.removeItem("authToken");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.login(email, password);
      
      if (response.token) {
        localStorage.setItem("authToken", response.token);
        setUser(response.user);
        setIsAuthenticated(true);
        router.push("/Dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.register(userData);
      
      if (response.token) {
        localStorage.setItem("authToken", response.token);
        setUser(response.user);
        setIsAuthenticated(true);
        router.push("/UsersAuthentication/StudentAuth/StudentAuthPage/StudentRegister/OTPVerification");
      }
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const activateAccount = async (code: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.activateAccount(code);
      if (response.success) {
        setUser(response.user);
        setIsAuthenticated(true);
        router.push("/Dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Activation failed");
    }
    finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await userService.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("authToken");
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        activateAccount,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
