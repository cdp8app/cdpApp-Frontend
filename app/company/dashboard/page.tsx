"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Header1 from "@/app/Components/Header1";
import Footer1 from "@/app/Components/Footer1";
import { CldImage } from "next-cloudinary";

export default function CompanyDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [companyName, setCompanyName] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");

  // Force refresh user data when the dashboard loads
  useEffect(() => {
    // Get the latest user data from localStorage
    const refreshUserData = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          if (userData.company_name) {
            console.log("Dashboard: Using company name from localStorage:", userData.company_name);
            setCompanyName(userData.company_name);
          } else if (user?.company_name) {
            console.log("Dashboard: Using company name from user state:", user.company_name);
            setCompanyName(user.company_name);
          } else {
            console.log("Dashboard: No company name found, using default");
            setCompanyName("Your Company");
          }

          if (userData.profile_picture) {
            setProfilePicture(userData.profile_picture);
          } else if (user?.profile_picture) {
            setProfilePicture(user.profile_picture);
          }
        } else if (user?.company_name) {
          setCompanyName(user.company_name);
          if (user.profile_picture) {
            setProfilePicture(user.profile_picture);
          }
        }
      } catch (error) {
        console.error("Error refreshing user data:", error);
      }
    };

    refreshUserData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-Gold1 font-sans text-[20px]/[120%]">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header1 />
      <main className="flex-grow px-[6%] py-[2%]">
        <div className="mb-[30px]">
          <h1 className="text-[36px]/[120%] font-bold text-Gold1">
            Welcome, {companyName || "Company"}
          </h1>
          <p className="text-[18px]/[120%] text-Gray1 mt-2">
            Manage your job postings and applications from your dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-[40px]">
          {/* Company Profile Card */}
          <div className="bg-GoldenWhite rounded-[16px] p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="h-[60px] w-[60px] rounded-full overflow-hidden bg-Gold4 mr-4">
                {profilePicture ? (
                  <CldImage
                    width="60"
                    height="60"
                    src={profilePicture}
                    alt="Company Logo"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-Gold3 text-white">
                    {companyName?.charAt(0) || "C"}
                  </div>
                )}
              </div>
              <div>
                <h2 className="font-bold text-[18px]/[120%] text-Black2">{companyName || "Your Company"}</h2>
                <p className="text-[14px]/[120%] text-Gray1">Company Profile</p>
              </div>
            </div>
            <button
              onClick={() => router.push("/company/profile")}
              className="w-full rounded-[999px] border-2 border-PriGold text-PriGold px-4 py-2 text-[14px]/[120%] hover:bg-Gold4 transition-colors"
            >
              View Profile
            </button>
          </div>

          {/* Job Postings Card */}
          <div className="bg-GoldenWhite rounded-[16px] p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-[18px]/[120%] text-Black2">Job Postings</h2>
              <span className="bg-Gold4 text-PriGold rounded-full px-3 py-1 text-[14px]/[120%]">3</span>
            </div>
            <p className="text-[14px]/[120%] text-Gray1 mb-4">
              Manage your current job listings and create new opportunities
            </p>
            <button
              onClick={() => router.push("/company/jobs")}
              className="w-full rounded-[999px] border-2 border-PriGold text-PriGold px-4 py-2 text-[14px]/[120%] hover:bg-Gold4 transition-colors"
            >
              View Jobs
            </button>
          </div>

          {/* Applications Card */}
          <div className="bg-GoldenWhite rounded-[16px] p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-[18px]/[120%] text-Black2">Applications</h2>
              <span className="bg-Gold4 text-PriGold rounded-full px-3 py-1 text-[14px]/[120%]">12</span>
            </div>
            <p className="text-[14px]/[120%] text-Gray1 mb-4">
              Review and manage applications from candidates
            </p>
            <button
              onClick={() => router.push("/company/applications")}
              className="w-full rounded-[999px] border-2 border-PriGold text-PriGold px-4 py-2 text-[14px]/[120%] hover:bg-Gold4 transition-colors"
            >
              View Applications
            </button>
          </div>
        </div>

        <div className="mb-[40px]">
          <h2 className="text-[24px]/[120%] font-bold text-Gold1 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => router.push("/company/job/create")}
              className="bg-PriGold text-white rounded-[12px] p-4 text-center hover:bg-Gold1 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Post New Job
            </button>
            <button
              onClick={() => router.push("/company/applications")}
              className="bg-PriGold text-white rounded-[12px] p-4 text-center hover:bg-Gold1 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Review Applications
            </button>
            <button
              onClick={() => router.push("/company/profile/edit")}
              className="bg-PriGold text-white rounded-[12px] p-4 text-center hover:bg-Gold1 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Profile
            </button>
            <button
              onClick={() => router.push("/messaging")}
              className="bg-PriGold text-white rounded-[12px] p-4 text-center hover:bg-Gold1 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Messages
            </button>
          </div>
        </div>
      </main>
      <Footer1 />
    </div>
  );
}