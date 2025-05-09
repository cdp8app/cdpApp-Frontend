"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LoginForm from "../login/form";

export default function StudentLoginPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<"student" | "company" | "student">("student"); // Default to student
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const storedUserType = localStorage.getItem("userType");
      if (storedUserType === "student" || storedUserType === "company") {
        setUserType(storedUserType);
      } else {
        // Default to student if no userType is found
        setUserType("student");
      }
    }
  }, []);

  // Don't render anything until after client-side hydration
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Use regular img tag to troubleshoot */}
        <Image 
          src="/Images/Logo3.png" 
          alt="CDP Logo" 
          className="mx-auto h-12 w-auto"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {/* Always render LoginForm with a default value */}
        <LoginForm userType={userType} />
      </div>
    </div>
  );
}