"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

import Button1 from "../../Components/Button1";
import Label2 from "../../Components/Label2";
import SelectDropDown from "@/app/Components/SelectDropdown";
import FormAlert from "@/app/Components/FormAlert";

export default function StudentRegisterForm() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [debugInfo, setDebugInfo] = useState("");

  const { register, error, loading, clearError, fetchCsrfToken } = useAuth();

  // Fetch CSRF token when component mounts
  useEffect(() => {
    const initializeForm = async () => {
      try {
        await fetchCsrfToken();
        setDebugInfo("CSRF token fetched successfully");
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
        setFormError("Error fetching security token. Please refresh the page.");
        setDebugInfo("Error fetching CSRF token: " + (error instanceof Error ? error.message : String(error)));
      }
    };

    initializeForm();
  }, [fetchCsrfToken]);

  const validateForm = () => {
    if (!role) {
      setFormError("Role is required");
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

  const options = [{ value: "Student" }, { value: "Company" }];

  const handleSelect = (value: string) => {
    setRole(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDebugInfo("Form submitted");
    setFieldErrors({});

    if (!validateForm()) {
      setDebugInfo("Form validation failed: " + formError);
      return;
    }

    const userData = {
      email,
      password,
      confirm_password: confirmPassword,
      role: role,
      userType: "student", // Adding userType as seen in the error logs
    };

    setDebugInfo(
      "Attempting to register with data: " +
        JSON.stringify({
          ...userData,
          password: "********", // Don't log actual password
          confirm_password: "********",
        }),
    );

    try {
      setDebugInfo("Calling register function...");
      const result = await register(userData, "student");
      setDebugInfo("Register function completed. Result: " + JSON.stringify(result));
    } catch (err: any) {
      setDebugInfo("Error in registration: " + (err.message || JSON.stringify(err)));

      // Handle structured validation errors from backend
      if (err.message && typeof err.message === "object") {
        setFieldErrors(err.message);

        // Set a general error message based on the first field error
        const firstErrorField = Object.keys(err.message)[0];
        if (firstErrorField && err.message[firstErrorField][0]) {
          setFormError(`${firstErrorField}: ${err.message[firstErrorField][0]}`);
        } else {
          setFormError("Registration failed. Please check your information.");
        }
      } else {
        // Handle general error
        setFormError(err.message || "Registration failed");
      }
    }
  };

  return (
    <form className="mt-[12.96px] flex flex-col justify-start w-full max-w-md" onSubmit={handleSubmit}>
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

      <Label2 text="Role" className="text-start font-sans text-[13px] font-medium text-Gold0" />

      <SelectDropDown
        options={options}
        selectedOption={role}
        onSelect={handleSelect}
        text="Are you a student or company?"
      />

      <Label2 text="Email" className="text-start font-sans text-[13px] font-medium text-Gold0" />
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
          placeholder="Enter your email address"
          className="w-full font-sans text-[16px] placeholder-Gray1 outline-none"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      {fieldErrors.email && <p className="mt-1 text-sm text-red-600">{fieldErrors.email[0]}</p>}

      <Label2 text="Password" className="text-start font-sans text-[13px] font-medium text-Blue4 mt-4" />
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
          placeholder="Create password"
          className="w-full font-sans text-[16px] placeholder-Gray1 outline-none"
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="right top-2/2 transform -translate-y-2/2 text-gray-500"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {fieldErrors.password && <p className="mt-1 text-sm text-red-600">{fieldErrors.password[0]}</p>}

      {/* Password strength hint */}
      <p className="mt-1 text-xs text-gray-500">
        Use a strong password with at least 8 characters, including numbers and special characters.
      </p>

      <Label2 text="Confirm Password" className="text-start font-sans text-[13px] font-medium text-Blue4 mt-4" />
      <div className="width-[100%] mb-[36px] mt-[8px] flex flex-row items-center border-b-[2px] border-Gold3 px-[4.91px] py-[4.91px]">
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
          placeholder="Confirm password"
          className="w-full font-sans text-[16px] placeholder-Gray1 outline-none"
          id="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="right top-2/2 transform -translate-y-2/2 text-gray-500"
        >
          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {fieldErrors.confirm_password && <p className="mt-1 text-sm text-red-600">{fieldErrors.confirm_password[0]}</p>}

      <div className="flex flex-col items-center justify-center">
        <Button1
          text={loading ? "Processing..." : "Register"}
          className="w-full rounded-md bg-Gold0 py-2 font-sans text-[16px] font-medium text-white shadow-md hover:bg-Gold1 focus:outline-none"
          disabled={loading}
          type="submit"
        />

        {/* Debug information - remove in production */}
        {debugInfo && process.env.NODE_ENV === "development" && (
          <div className="mt-4 border border-gray-300 p-2 text-xs text-gray-600">
            <strong>Debug Info:</strong>
            <pre>{debugInfo}</pre>
          </div>
        )}
      </div>
    </form>
  );
}
