// app/UsersAuthentication/Components/LoginForm.tsx
"use client";
import "../../../../app/globals.css";
import { useState, useEffect } from "react";
import { useAuth } from "@/./contexts/AuthContext"; 
import Button1 from "../../Components/Button1";
import Image from "next/image";
import Label from "@/app/user/Components/Label";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import FormAlert from "@/app/Components/FormAlert";

interface LoginFormProps {
  userType: "student" | "company" | null;
  redirectPath?: string | null;
}

export default function LoginForm({ userType, redirectPath }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  
  const { login, loading, error, clearError } = useAuth();

  // Fetch CSRF token on component mount
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        await fetch("/api/proxy/csrf-cookie", {
          method: "GET",
          credentials: "include",
        });
        console.log("CSRF cookie fetched for login");
      } catch (err) {
        console.warn("Failed to fetch CSRF cookie:", err);
      }
    };
    
    fetchCsrfToken();
  }, []);
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
      console.log(`Attempting login with email: ${email} and userType: ${userType}`);
      
      // Make sure userType is properly set
      if (!userType) {
        setFormError("User type is not specified. Please select student or company.");
        return;
      }
      
      // Try login with lowercase userType to ensure consistency
      await login(email, password, userType);
      console.log("Login request sent successfully");
      
      // Handle redirect after successful login
      if (redirectPath) {
        console.log(`Redirecting to: ${redirectPath}`);
        localStorage.removeItem("redirectAfterLogin"); // Clear stored redirect
        router.push(redirectPath);
      } else {
        // Default redirect based on user type
        router.push(userType === "student" ? "/student/dashboard" : "/company/dashboard");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      
      // Form-specific errors are set here
      if (err.message && err.message.includes("No active account")) {
        setFormError("No account found with these credentials. Please check your email and password.");
      } else {
        setFormError(err.message || "Login failed. Please check your credentials and try again.");
      }
      
      // Suggest registration if account doesn't exist
      if (err.message && err.message.includes("No active account")) {
        setTimeout(() => {
          const shouldRegister = confirm("Account not found. Would you like to register instead?");
          if (shouldRegister) {
            router.push("/user/auth/register");
          }
        }, 1000);
      }
    }
  };

  const handleForgetPassword = () => {
    router.push("/user/auth/login/forget-password");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-[12.96px] flex flex-col justify-start">
      {redirectPath && (
        <div className="bg-blue-50 text-blue-600 p-2 rounded mb-4 text-sm">
          You&apos;ll be redirected after login
        </div>
      )}
      
      {(formError || error) && (
        <FormAlert
          message={(formError || error) ?? ""}
          type="error"
          duration={5000}
          onClose={() => {
            if (formError) {
              setFormError("");
            } else {
              clearError();
            }
          }}
        />
      )}

      <Label
        text="Email"
        className="text-start font-sans text-[12px] font-medium text-Gold0"
      />
      <div className="width-[100%] mt-[8px] flex flex-row items-center border-b-[2px] border-Gold3 px-[4.91px] py-[4.91px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          className="mr-[8px] h-[24px] w-[24px] text-Gold0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
          />
        </svg>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
          placeholder="Enter your email address"
          className="w-full font-sans text-[16px] placeholder-Gray1 outline-none"
          required
        />
      </div>
        
      <Label
        text="Password"
        className="mt-4 text-start font-sans text-[12px] font-medium text-Gold0"
      />
      <div className="width-[100%] mt-[8px] flex flex-row items-center border-b-[2px] border-Gold3 px-[4.91px] py-[4.91px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="mr-[8px] h-[24px] w-[24px] text-Gold0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          className="w-full font-sans text-[16px] placeholder-Gray1 outline-none"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className=" right top-2/2 transform -translate-y-2/2 text-gray-500"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <div className="mb-[30px] w-[100%] items-end justify-end text-end">
        <button className="mx-[11px] my-[10px]" onClick={handleForgetPassword}>
          <h6 className="justify-end font-sans text-[12px] text-Gold1">
                  Forgot password?
          </h6>
        </button>
      </div>
        
      <div className="mb-6">
        <Button1
          text={userType === "student" ? "Student Login" : "Company Login"}
          loading={loading}
          disabled={loading}
          type="submit"
        />
      </div>
    </form>
  );
}