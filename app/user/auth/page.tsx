"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Logo from "@/app/Components/Logo";
import StudentAuthTogglePage from "@/app/Components/StudentAuthTogglePage";
import "../../../app/globals.css";
import LoginForm from "./login/form";

export default function StudentAuthPage() {
  const [activeContent, setActiveContent] = useState<1 | 2>(1);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get redirect path from URL query parameter or localStorage
    const redirectParam = searchParams.get("redirect");
    const storedRedirect = typeof window !== "undefined" ? localStorage.getItem("redirectAfterLogin") : null;
    
    if (redirectParam) {
      setRedirectPath(redirectParam);
      // Store it in localStorage in case the page refreshes
      if (typeof window !== "undefined") {
        localStorage.setItem("redirectAfterLogin", redirectParam);
      }
    } else if (storedRedirect) {
      setRedirectPath(storedRedirect);
    }
  }, [searchParams]);

  const handleToggle = (content: 1 | 2) => {
    setActiveContent(content);
  };

  return (
    <div>
      <div className="flex h-screen w-screen max-w-[100%] flex-row justify-between p-[1%]">
        <div className="h-[100%] lg:w-[50%] p-[10px] md:w-[100%] ">
          <Logo />
          <div className="mt-[29px] flex flex-col items-center">
            <h1 className="hidden md:block font-sans text-[21px]/[120%]">Welcome!</h1>
            
            {redirectPath && (
              <div className="bg-blue-100 text-blue-700 p-3 rounded mb-4 text-center">
                Please log in to continue to your requested page
              </div>
            )}
            
            <StudentAuthTogglePage 
              activeContent={activeContent} 
              onToggle={handleToggle} 
              redirectPath={redirectPath}
            />
            
            {/* Add the login form directly here */}
            <div className="mt-8 sm:w-full sm:max-w-md">
              <LoginForm 
                userType={activeContent === 1 ? "student" : "company"} 
                redirectPath={redirectPath}
              />
            </div>
          </div>
        </div>
        <div className="hidden lg:flex h-screen w-[50%] rounded-[15px] relative overflow-hidden">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/Images/OnboardingBG.png')" }}
          ></div>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black opacity-40"></div>

          {/* Text content */}
          <div className="relative z-10 flex flex-col justify-end px-[10%] pb-[10%] text-white">
            <h1 className="mb-[4px] font-sans text-[40px] font-semibold">
              {activeContent === 1 ? "Login to Career X Hub" : "Sign Up to Career X Hub"}
            </h1>
            <p className="font-sans text-[20px] font-light">Lorem Ipsum is simply</p>
          </div>
        </div>
      </div>
    </div>
  );
}