"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import Button1 from "../../../Components/Button1";
import Label2 from "../../../Components/Label2";
import Image from "next/image";

export default function StudentRegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState(""); // Added username field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [debugInfo, setDebugInfo] = useState("");
  
  const { register, error, loading, clearError } = useAuth();
  // const router = useRouter();

  const validateForm = () => {
    if (!firstName || !lastName) {
      setFormError("First name and last name are required");
      return false;
    }
    
    if (!username) {
      setFormError("Username is required");
      return false;
    }

    if (!email) {
      setFormError("Email is required");
      return false;
    }

    if (!email.includes("@")) {
      setFormError("Please enter a valid email address");
      return false;
    }
    
    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return false;
    }
    
    if (password.length < 8) {
      setFormError("Password must be at least 8 characters long");
      return false;
    }
    
    setFormError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDebugInfo("Form submitted");
    
    if (!validateForm()) {
      setDebugInfo("Form validation failed: " + formError);
      return;
    }
    
    const userData = {
      first_name: firstName,
      last_name: lastName,
      username: username, // Send username as separate field
      email,
      password,
      confirm_password: confirmPassword, // Send confirm_password as required by API
      role: "Student" // Try uppercase as indicated by error message
    };
    
    setDebugInfo("Attempting to register with data: " + JSON.stringify({
      ...userData,
      password: "********", // Don"t log actual password
      confirm_password: "********"
    }));
    
    try {
      setDebugInfo("Calling register function...");
      const result = await register(userData, "student");
      setDebugInfo("Register function completed. Result: " + JSON.stringify(result));
    } catch (err: any) {
      setDebugInfo("Error in registration: " + (err.message || JSON.stringify(err)));
      // Error should be handled in the auth context, but we"ll also show it here
      setFormError(err.message || "Registration failed");
    }
  };

  const handleTestConnection = () => {
    if (typeof register !== "function") {
      setDebugInfo("Register function is not available: " + typeof register);
    } else {
      setDebugInfo("Register function is available");
    }
  };

  return (
    <form className="w-full max-w-md" onSubmit={handleSubmit}>

      {(formError || error) && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md  text-center">
          {formError || error}
          <button 
            type="button"
            onClick={() => {formError ? setFormError("") : clearError();}} 
            className="float-right text-red-700"
          >
            ×
          </button>
        </div>
      )}

      {/* {debugInfo && (
        <div className="mb-4 p-3 bg-gray-100 text-gray-700 rounded-md">
          <strong>Debug Info:</strong> {debugInfo}
        </div>
      )} */}

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <Label2
            text="First Name"
            className="text-start font-sans text-[13px] font-medium text-Gold0"
          />
          <div className="width-[100%] mt-[8px] flex flex-row items-center border-b-[2px] border-Gold3 px-[4.91px] py-[4.91px]">
          
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="font-sans text-[16px] placeholder-Gray1 outline-none"
              placeholder="Enter your First Name"
              required
            />
          </div>
        </div>
        <div>
          <Label2
            text="Last Name"
            className="text-start font-sans text-[13px] font-medium text-Gold0"
          />
          <div className="width-[100%] mt-[8px] flex flex-row items-center border-b-[2px] border-Gold3 px-[4.91px] py-[4.91px]">
          
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="font-sans text-[16px] placeholder-Gray1 outline-none"
              placeholder="Enter your Last Name"
              required
            />
          </div>
        </div>
      </div>

      {/* New Username field */}
      {/* <div className="mb-6">
        <Label2 text="Username"></Label2>
        <div className="relative">
          <Image
            src="/Images/Icons/userIcon.png" 
            alt="Username"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" 
            onError={(e) => {
              // Fallback if icon doesn"t exist
              (e.target as HTMLImageElement).style.display = "none";
            }}
            width={20}
            height={20}
          />
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-white py-3 pl-12 pr-4 border border-gray-300 rounded-lg"
            placeholder="Choose a username"
            required
          />
        </div>
      </div> */}
      <Label2
        text="Username"
        className="text-start font-sans text-[13px] font-medium text-Gold0"
      />
      <div className="width-[100%] mt-[8px] flex flex-row items-center border-b-[2px] border-Gold3 px-[4.91px] py-[4.91px]">
        {/* <Image src={emailIcon} alt="Phone" className="mr-[8px] w-[22.18px] h-[17.31px]" /> */}
        <input
          placeholder="Enter your username address"
          className="font-sans text-[16px] placeholder-Gray1 outline-none"
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      {/* <div className="mb-6">
        <Label2 text="Email"></Label2>
        <div className="relative">
          <Image
            src="/Images/Icons/emailIcon.png" 
            alt="Email" 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" 
            width={20}
            height={20}
          />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white py-3 pl-12 pr-4 border border-gray-300 rounded-lg"
            placeholder="Enter your email"
            required
          />
        </div>
      </div> */}
      <Label2
        text="Email"
        className="text-start font-sans text-[13px] font-medium text-Gold0"
      />
      <div className="width-[100%] mt-[8px] flex flex-row items-center border-b-[2px] border-Gold3 px-[4.91px] py-[4.91px]">
        {/* <Image src={emailIcon} alt="Phone" className="mr-[8px] w-[22.18px] h-[17.31px]" /> */}
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
          placeholder="Enter your email address"
          className="font-sans text-[16px] placeholder-Gray1 outline-none"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* <div className="mb-6">
        <Label2 text="Password"></Label2>
        <div className="relative">
          <Image
            src="/Images/Icons/passwordIcon.png" 
            alt="Password" 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" 
            width={20}
            height={20}
          />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white py-3 pl-12 pr-12 border border-gray-300 rounded-lg"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div> */}

      <Label2
        text="Password"
        className="text-start font-sans text-[13px] font-medium text-Blue4"
      />
      <div className="width-[100%] mt-[8px] flex flex-row items-center border-b-[2px] border-Gold3 px-[4.91px] py-[4.91px]">
        {/* <Image src={passwordIcon} alt="password" className="mr-[8px] w-[16px] h-[20px]" /> */}
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
          placeholder="Create password"
          className="w-[95%] font-sans text-[16px] placeholder-Gray1 outline-none"
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500"
        >
          {showPassword ? "Hide" : "Show"}
        </button> */}
      </div>

      {/* <div className="mb-6">
        <Label2 text="Confirm Password"></Label2>
        <div className="relative">
          <Image
            src="/Images/Icons/passwordIcon.png" 
            alt="Confirm Password" 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" 
            width={20}
            height={20}
          />
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-white py-3 pl-12 pr-12 border border-gray-300 rounded-lg"
            placeholder="Confirm your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div> */}

      <Label2
        text="Confirm Password"
        className="text-start font-sans text-[13px] font-medium text-Blue4"
      />
      <div className="width-[100%] mb-[36px] mt-[8px] flex flex-row items-center border-b-[2px] border-Gold3 px-[4.91px] py-[4.91px]">
        {/* <Image src={passwordIcon} alt="password" className="mr-[8px] w-[16px] h-[20px]" /> */}
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
          id="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-[95%] font-sans text-[16px] placeholder-Gray1 outline-none"
          placeholder="Confirm your password"
          required
        />
        {/* <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500"
        >
          {showConfirmPassword ? "Hide" : "Show"}
        </button> */}
      </div>

      {/* <Button1 
        type="submit" 
        disabled={loading}
        className="w-full"
      >
        {loading ? "Registering..." : "Register"}
      </Button1> */}
      <Button1
        text="Register"
        loading={loading}
        disabled={loading}
        type="submit"
      />
      
      {/* <button
        type="button"
        onClick={handleTestConnection}
        className="mt-2 w-full py-2 bg-gray-200 text-gray-700 rounded"
      >
        Test Auth Context
      </button> */}

      {/* <div className="mt-4 text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link 
            href="/UsersAuthentication/StudentAuth/StudentAuthPage/StudentLogin"
            className="text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div> */}

      {/* <Button1
        text="Register"
        loading={loading}
        disabled={loading}
        type="submit"
      /> */}
    </form>
  );
}