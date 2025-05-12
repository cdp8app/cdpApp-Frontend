"use client";
import React, { useEffect, useState } from "react";
import Header1 from "../../Components/Header1";
import SearchBar from "../../Components/SearchBar";
import Footer1 from "../../Components/Footer1";
import { useRouter } from "next/navigation";
import { useJobContext } from "@/contexts/jobContext";
import { CldImage } from "next-cloudinary";
import FormAlert from "@/app/Components/FormAlert";
import Link from "next/link";

export default function StudentHomePage() {
  const router = useRouter();
  const { getJobs, loading, error } = useJobContext();
  const [jobs, setJobs] = useState<{ title: string; results?: any[] }[]>([]);
  const [formError, setFormError] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const fetchedJobs = (await getJobs()) ?? {};

        if (fetchedJobs && typeof fetchedJobs === "object" && Array.isArray((fetchedJobs as any)?.results)) {
          setJobs((fetchedJobs as any).results);
        }
      } catch (error) {
        setFormError(`Failed to fetch jobs ${error}`);
      }
    };
    fetchJobs();
  }, [getJobs]);

  const handleClick = (jobId: number) => {
    router.push(`/student/jobs/${jobId}`);
  };

  const handleApply = (jobId: number) => {
    router.push(`/student/opportunities/${jobId}/apply`);
  };

  // Filter jobs based on active category
  const filteredJobs = activeCategory === "all" 
    ? jobs 
    : jobs.filter((job: any) => job.category === activeCategory || job.job_type === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-[3%] py-[1%] flex-grow">
        <Header1 />
        
        {/* Hero Section */}
        <div className="mt-[30px] mb-[40px] bg-gradient-to-r from-Gold3 to-Gold2 rounded-[20px] p-[30px] text-white">
          <div className="max-w-[600px]">
            <h1 className="font-sans text-[32px] font-bold mb-[15px]">Find Your Dream Internship</h1>
            <p className="font-sans text-[16px] mb-[25px]">
              Discover opportunities that match your skills and career goals. Apply to top companies and start your professional journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => router.push("/student/profile")}
                className="bg-white text-Gold1 font-sans text-[14px] font-medium py-[10px] px-[20px] rounded-[999px] hover:bg-gray-100 transition-colors"
              >
                Complete Your Profile
              </button>
              <button 
                onClick={() => router.push("/student/opportunities")}
                className="bg-transparent border-2 border-white text-white font-sans text-[14px] font-medium py-[10px] px-[20px] rounded-[999px] hover:bg-white/10 transition-colors"
              >
                Browse All Opportunities
              </button>
            </div>
          </div>
        </div>
        
        {/* Search and Categories */}
        <div className="mb-[30px]">
          <SearchBar />
          
          <div className="mt-[20px] flex flex-wrap gap-3">
            <button 
              onClick={() => setActiveCategory("all")}
              className={`px-[15px] py-[8px] rounded-[999px] font-sans text-[14px] transition-colors ${
                activeCategory === "all" 
                  ? "bg-Gold1 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Opportunities
            </button>
            <button 
              onClick={() => setActiveCategory("internship")}
              className={`px-[15px] py-[8px] rounded-[999px] font-sans text-[14px] transition-colors ${
                activeCategory === "internship" 
                  ? "bg-Gold1 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Internships
            </button>
            <button 
              onClick={() => setActiveCategory("part-time")}
              className={`px-[15px] py-[8px] rounded-[999px] font-sans text-[14px] transition-colors ${
                activeCategory === "part-time" 
                  ? "bg-Gold1 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Part-time
            </button>
            <button 
              onClick={() => setActiveCategory("full-time")}
              className={`px-[15px] py-[8px] rounded-[999px] font-sans text-[14px] transition-colors ${
                activeCategory === "full-time" 
                  ? "bg-Gold1 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Full-time
            </button>
          </div>
        </div>
        
        {/* Job Listings */}
        {loading ? (
          <div className="flex items-center justify-center mt-[60px]">
            <p className="text-Gold1 font-sans text-[20px]/[120%]">Loading...</p>
          </div>
        ) : (
          <>
            {(formError || error) && (
              <FormAlert
                message={(formError || error) ?? ""}
                type="error"
                duration={5000}
                onClose={() => {
                  if (formError) {
                    setFormError("");
                  }
                }}
              />
            )}
            
            {filteredJobs.length === 0 ? (
              <div className="mt-[40px] text-center py-[40px] bg-gray-50 rounded-[15px]">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-16 w-16 mx-auto text-gray-400 mb-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900">No opportunities found</h3>
                <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                  We couldn&apos;t find any opportunities matching your criteria. Try adjusting your filters or check back later.
                </p>
              </div>
            ) : (
              <div className="mt-[21px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                {filteredJobs.map((job: any, index: number) => (
                  <div 
                    key={index} 
                    className="flex flex-col rounded-[15px] p-[20px] shadow-custom2 border border-gray-100 hover:shadow-lg transition-shadow bg-white"
                  >
                    <div className="flex items-start mb-[15px]">
                      <div className="mr-[15px] h-[60px] w-[60px] rounded-[12px] overflow-hidden bg-White flex items-center justify-center border border-gray-200">
                        {job?.company?.profile_picture ? (
                          <CldImage
                            width="60"
                            height="60"
                            src={job?.company?.profile_picture}
                            alt={`${job.company?.company_name} logo`}
                            className="object-cover"
                          />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-8 h-8 text-Gray1"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <h2 className="font-sans text-[18px]/[120%] font-medium text-Black2 mb-[4px]">
                          {job.title}
                        </h2>
                        <div className="flex flex-row items-center">
                          <p className="font-sans text-[14px]/[80%] text-Gray1">
                            {job.company?.company_name}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-[15px] flex flex-wrap gap-2">
                      <span className="inline-block bg-gray-100 rounded-full px-[10px] py-[4px] text-xs text-gray-600">
                        {job.job_type || "Full-time"}
                      </span>
                      <span className="inline-block bg-gray-100 rounded-full px-[10px] py-[4px] text-xs text-gray-600">
                        {job.location || "Remote"}
                      </span>
                      {job.salary && (
                        <span className="inline-block bg-gray-100 rounded-full px-[10px] py-[4px] text-xs text-gray-600">
                          {job.salary}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm leading-relaxed text-Gray1 font-sans line-clamp-3 mb-[20px] flex-grow">
                      {job.description?.slice(0, 150)}...
                    </p>
                    
                    <div className="flex flex-row mt-auto">
                      <button 
                        onClick={() => handleClick(job.id)} 
                        className="flex-1 rounded-[999px] border-[2px] border-PriGold px-[15px] py-[8px] font-sans text-[14px]/[120%] text-PriGold hover:bg-Gold3/10 transition-colors"
                      >
                        View Details
                      </button>
                      <button 
                        onClick={() => handleApply(job.id)} 
                        className="flex-1 rounded-[999px] px-[15px] py-[8px] font-sans text-[14px]/[120%] text-GoldenWhite bg-PriGold ml-2 hover:bg-Gold2 transition-colors"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* View More Button */}
            {filteredJobs.length > 0 && (
              <div className="mt-[40px] text-center">
                <Link 
                  href="/student/opportunities" 
                  className="inline-block rounded-[999px] border-[2px] border-PriGold px-[30px] py-[12px] font-sans text-[16px]/[120%] text-PriGold hover:bg-Gold3/10 transition-colors"
                >
                  View All Opportunities
                </Link>
              </div>
            )}
          </>
        )}
        
        {/* Resources Section */}
        <div className="mt-[60px] mb-[40px]">
          <h2 className="font-sans text-[24px] font-bold mb-[20px]">Resources for Students</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
            <div className="bg-blue-50 rounded-[15px] p-[25px] border border-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="font-sans text-[18px] font-medium mb-[10px]">Resume Building</h3>
              <p className="font-sans text-[14px] text-gray-600 mb-[15px]">
                Learn how to create a standout resume that will catch employers&apos; attention.
              </p>
              <Link 
                href="/student/resources/resume" 
                className="font-sans text-[14px] text-blue-600 hover:underline"
              >
                View Resources →
              </Link>
            </div>
            
            <div className="bg-purple-50 rounded-[15px] p-[25px] border border-purple-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="font-sans text-[18px] font-medium mb-[10px]">Interview Prep</h3>
              <p className="font-sans text-[14px] text-gray-600 mb-[15px]">
                Prepare for your interviews with tips, common questions, and practice exercises.
              </p>
              <Link 
                href="/student/resources/interviews" 
                className="font-sans text-[14px] text-purple-600 hover:underline"
              >
                View Resources →
              </Link>
            </div>
            
            <div className="bg-green-50 rounded-[15px] p-[25px] border border-green-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="font-sans text-[18px] font-medium mb-[10px]">Career Planning</h3>
              <p className="font-sans text-[14px] text-gray-600 mb-[15px]">
                Discover tools and guidance to help you plan your career path effectively.
              </p>
              <Link 
                href="/student/resources/career" 
                className="font-sans text-[14px] text-green-600 hover:underline"
              >
                View Resources →
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer1 />
    </div>
  );
}