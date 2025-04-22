// app/UsersAuthentication/Components/LoginForm.tsx
"use client";
import "../../../../../app/globals.css";
// import Label from "@/app/UsersAuthentication/Components/Label";
import { useState } from "react";
// import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext"; 
import Button1 from "../../../Components/Button1";
// import { useRouter } from "next/navigation";

interface LoginFormProps {
  userType: "student" | "company";
}

export default function LoginForm({ userType }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [formError, setFormError] = useState("");
  
  const { login, loading, error, clearError } = useAuth();
  // const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    clearError();
    
    // Basic validation
    if (!email.trim()) {
      setFormError("Email is required");
      return;
    }
    
    if (!password.trim()) {
      setFormError("Password is required");
      return;
    }
    
    try {
      await login(email, password, userType);
      // Note: The redirect is handled inside the login function in AuthContext
    } catch (err: any) {
      console.error("Login error:", err);
      // Form-specific errors are set here
      setFormError(err.message || "Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {userType === "student" ? "Student Login" : "Company Login"}
        </h2>
        
        {(formError || error) && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {formError || error}
          </div>
        )}
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <div className="flex items-center border border-gray-300 rounded">
            <img 
              src="/Images/Icons/emailIcon.png" 
              alt="Email" 
              className="h-5 w-5 ml-3"
            />
            <input
              className="appearance-none border-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <div className="flex items-center border border-gray-300 rounded">
            <img 
              src="/Images/Icons/passwordIcon.png" 
              alt="Password" 
              className="h-5 w-5 ml-3"
            />
            <input
              className="appearance-none border-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label className="text-sm text-gray-700" htmlFor="remember">
              Remember me
            </label>
          </div>
          <a 
            href={userType === "student" ? "/UsersAuthentication/StudentAuth/StudentAuthPage/StudentLogin/ForgotPassword" : "/UsersAuthentication/CompanyAuth/CompanyLogin/ForgotPassword"} 
            className="text-blue-500 hover:text-blue-700 text-sm font-semibold"
          >
            Forgot Password?
          </a>
        </div>
        
        <div className="mb-6">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {userType === "student" ? "Student Login" : "Company Login"}
          </button>
          <Button1
            text={userType === "student" ? "Student Login" : "Company Login"}
            loading={loading}
            disabled={loading}
            type="submit"
          />
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don&quot;t have an account?{" "}
            <a 
              href={userType === "student" ? "/UsersAuthentication/StudentAuth/StudentAuthPage/StudentRegister" : "/UsersAuthentication/CompanyAuth/CompanySignUp"} 
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Sign up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}