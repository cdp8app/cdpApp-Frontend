// app/UsersAuthentication/Components/LoginForm.tsx
"use client";
import "../../../../app/globals.css";
// import Label from "@/app/UsersAuthentication/Components/Label";
import { useState } from "react";
// import Link from "next/link";
import { useAuth } from "@/./contexts/AuthContext"; 
import Button1 from "../../Components/Button1";
// import { useRouter } from "next/navigation";
import Image from "next/image";
import Label from "@/app/user/Components/Label";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  userType: "student" | "company" | null;
}

export default function LoginForm({ userType }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [formError, setFormError] = useState("");
  const router = useRouter();
  
  const { login, loading, error, clearError } = useAuth();

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
      // Form-specific errors are set here
      setFormError(err.message || "Login failed. Please check your credentials and try again.");
    }
  };

  const handleForgetPassword = () => {
    router.push("/user/auth/login/forget-password");
  };

  return (
    // <div className="w-full max-w-md mx-auto">
    <form onSubmit={handleSubmit} className="mt-[12.96px] flex flex-col justify-start">

      {/* <h2 className="text-2xl font-bold mb-6 text-center">
        {userType === "student" ? "Student Login!!!" : "Company Login"}
      </h2> */}
        
      {(formError || error) && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center">
          {formError || error}
        </div>
      )}
        
      {/* <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
        </label>
        <div className="flex items-center border border-gray-300 rounded">
          <Image 
            src="/Images/Icons/emailIcon.png" 
            alt="Email" 
            className="h-5 w-5 ml-3"
            width={20}
            height={20}
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
      </div> */}

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
        
      {/* <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
        </label>
        <div className="flex items-center border border-gray-300 rounded">
          <Image
            src="/Images/Icons/passwordIcon.png" 
            alt="Password" 
            className="h-5 w-5 ml-3"
            width={20}
            height={20}
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
      </div> */}
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
          type="password"
          placeholder="Enter your password"
          className="w-full font-sans text-[16px] placeholder-Gray1 outline-none"
          required
        />
      </div>
        
      {/* <div className="flex items-center justify-between mb-4">
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
      </div> */}

      <div className="mb-[30px] w-[100%] items-end justify-end text-end">
        <button className="mx-[11px] my-[10px]" onClick={handleForgetPassword}>
          <h6 className="justify-end font-sans text-[12px] text-Gold1">
                  Forgot password?
          </h6>
        </button>
      </div>
        
      <div className="mb-6">
        {/* <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {userType === "student" ? "Student Login" : "Company Login"}
        </button> */}
        <Button1
          text={userType === "student" ? "Student Login" : "Company Login"}
          loading={loading}
          disabled={loading}
          type="submit"
        />
      </div>
        
      {/* <div className="text-center">
        <p className="text-sm text-gray-600">
            Don&quot;t have an account?{" "}
          <a 
            href={userType === "student" ? "/UsersAuthentication/StudentAuth/StudentAuthPage/StudentRegister" : "/UsersAuthentication/CompanyAuth/CompanySignUp"} 
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
              Sign up
          </a>
        </p>
      </div> */}
    </form>
    // </div>
  );
}