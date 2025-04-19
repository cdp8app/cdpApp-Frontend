"use client"

// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Define types
type UserType = 'student' | 'company' | null;

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
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  verifyOTP: (email: string, otp: string) => Promise<void>;
  setNewPassword: (token: string, newPassword: string) => Promise<void>;
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
      const token = localStorage.getItem('token');
      const storedUserType = localStorage.getItem('userType') as UserType;
      
      if (token) {
        try {
          setLoading(true);
          const response = await fetch('https://careerxhub.onrender.com/api/user/profile/', {
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
            localStorage.removeItem('token');
            localStorage.removeItem('userType');
            setUser(null);
            setUserType(null);
          }
        } catch (err) {
          console.error('Auth check failed:', err);
          setError('Authentication verification failed');
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
    const response = await fetch('/api/proxy/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, userType: type }),
    });
  
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
    
    localStorage.setItem('token', data.token);
    localStorage.setItem('userType', type);
    setUser(data.user);
    setUserType(type);
    
    // Redirect based on user type
    if (type === 'student') {
      router.push('/Dashboard');
    } else {
      router.push('/company/dashboard');
    }
  } catch (err: any) {
    console.error('Login error:', err);
    setError(err.message || 'Login failed');
    throw err; // Re-throw to let the form component handle it
  } finally {
    setLoading(false);
  }
};

  // Update the register function to use the UserData interface
  const register = async (userData: UserData, role: UserType) => {
    setLoading(true);
    clearError();
    
    try {
      // Use our proxy endpoint instead of direct API call
      const response = await fetch('/api/proxy/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // Send role if needed as part of userData
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || data.error || 'Registration failed');
      }
      
      // Handle successful registration
      // You might want to automatically log the user in or redirect them
      router.push('/UsersAuthentication/StudentAuth/StudentAuthPage/StudentLogin');
      return data;
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Failed to register');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    setUser(null);
    setUserType(null);
    router.push('/');
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://careerxhub.onrender.com/api/user/reset-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Password reset request failed');
      }
      
      // Success - should redirect to OTP verification page
      router.push('/UsersAuthentication/StudentAuth/StudentAuthPage/StudentLogin/OTP');
    } catch (err: any) {
      setError(err.message || 'Password reset failed');
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (email: string, otp: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://careerxhub.onrender.com/api/user/verify-otp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, otp })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'OTP verification failed');
        
        // Redirect to unsuccessful verification page
        router.push('/UsersAuthentication/StudentAuth/StudentAuthPage/StudentLogin/OTP/UnsuccessfulVerfication');
      }
      
      const data = await response.json();
      
      // Store the reset token for the next step
      localStorage.setItem('resetToken', data.token);
      
      // Redirect to new password page
      router.push('/UsersAuthentication/StudentAuth/StudentAuthPage/StudentLogin/ForgotPassword/NewPassword');
    } catch (err: any) {
      setError(err.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const setNewPassword = async (token: string, newPassword: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://careerxhub.onrender.com/api/user/set-new-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, new_password: newPassword })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Setting new password failed');
      }
      
      // Clear the reset token
      localStorage.removeItem('resetToken');
      
      // Redirect to password created successfully page
      router.push('/UsersAuthentication/StudentAuth/StudentAuthPage/StudentLogin/ForgotPassword/NewPassword/NewPasswordCreated');
    } catch (err: any) {
      setError(err.message || 'Setting new password failed');
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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};