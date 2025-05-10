"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header1 from "@/app/Components/Header1";
import Footer1 from "@/app/Components/Footer1";
import { Job, useJobContext } from "@/contexts/jobContext";
import FormAlert from "@/app/Components/FormAlert";
import { formatDate, isDatePast } from "@/app/utils/dateUtils";

export default function CompanyJobsPage() {
  const router = useRouter();
  const { getPostedJobs, loading, error } = useJobContext();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [formError, setFormError] = useState("");
  const [filter, setFilter] = useState("all"); // all, open, closed

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getPostedJobs();
        if (response && response.results) {
          setJobs(response.results);
        }
      } catch (err: any) {
        setFormError(err.message || "Failed to fetch jobs");
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    if (filter === "all") return true;
    return job.status === filter;
  });

  const handleViewJob = (jobId: string) => {
    router.push(`/company/job/${jobId}`);
  };

  const handleCreateJob = () => {
    router.push("/company/job/create");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow p-[2%]">
        <Header1 />
        <div className="px-[10%] py-[2%]">
          <div className="flex flex-row items-center justify-between mb-[30px]">
            <h1 className="font-sans text-[36px]/[120%] font-bold text-Gold1">
              Job Postings
            </h1>
            <button
              onClick={handleCreateJob}
              className="flex flex-row items-center rounded-[999px] bg-PriGold px-[30px] py-[14px] font-sans text-[16px]/[120%] text-GoldenWhite"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="mr-[12px] size-6 text-GoldenWhite"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Create New Job
            </button>
          </div>

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

          <div className="mb-[20px] flex space-x-4">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-[8px] px-[20px] py-[10px] font-sans text-[14px]/[120%] ${
                filter === "all"
                  ? "bg-PriGold text-GoldenWhite"
                  : "bg-Gold4 text-Gray1"
              }`}
            >
              All Jobs
            </button>
            <button
              onClick={() => setFilter("open")}
              className={`rounded-[8px] px-[20px] py-[10px] font-sans text-[14px]/[120%] ${
                filter === "open"
                  ? "bg-PriGold text-GoldenWhite"
                  : "bg-Gold4 text-Gray1"
              }`}
            >
              Open Jobs
            </button>
            <button
              onClick={() => setFilter("closed")}
              className={`rounded-[8px] px-[20px] py-[10px] font-sans text-[14px]/[120%] ${
                filter === "closed"
                  ? "bg-PriGold text-GoldenWhite"
                  : "bg-Gold4 text-Gray1"
              }`}
            >
              Closed Jobs
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center my-[120px]">
              <p className="text-Gold1 font-sans text-[20px]/[120%]">Loading...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center my-[120px] text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-16 h-16 text-Gray1 mb-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                />
              </svg>
              <p className="text-Gray1 font-sans text-[20px]/[120%]">No jobs found</p>
              <button
                onClick={handleCreateJob}
                className="mt-6 rounded-[999px] bg-PriGold px-[30px] py-[14px] font-sans text-[16px]/[120%] text-GoldenWhite"
              >
                Create Your First Job
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-GoldenWhite rounded-[16px] p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleViewJob(job.id)}
                >
                  <div className="flex flex-row items-start justify-between">
                    <div>
                      <h2 className="font-sans text-[20px]/[120%] font-semibold text-Black2 mb-2">
                        {job.title}
                      </h2>
                      <p className="font-sans text-[14px]/[120%] text-Gray1 mb-4">
                        Posted on: {formatDate(job.created_at || "")}
                      </p>
                      
                      <div className="flex flex-row items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-Gold1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="font-sans text-[14px]/[120%] text-Gray1">{job.location}</p>
                      </div>
                      
                      <div className="flex flex-row items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-Gold1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="font-sans text-[14px]/[120%] text-Gray1">{job.job_type}</p>
                      </div>
                      
                      <div className="flex flex-row items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-Gold1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className={`font-sans text-[14px]/[120%] ${isDatePast(job.deadline) ? "text-Red1" : "text-Gray1"}`}>
                          Deadline: {formatDate(job.deadline)}
                          {isDatePast(job.deadline) && " (Expired)"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      {job.status === "closed" ? (
                        <div className="flex w-[88px] flex-row items-center rounded-[8px] bg-Red2 px-[16px] py-[8px]">
                          <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Red1"></div>
                          <p className="font-sans text-[12px]/[120%] font-medium text-Red1">
                            Closed
                          </p>
                        </div>
                      ) : (
                        <div className="flex w-[130px] flex-row items-center rounded-[8px] bg-Green2 px-[16px] py-[8px]">
                          <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Green1"></div>
                          <p className="font-sans text-[12px]/[120%] font-medium text-Green1">
                            Open position
                          </p>
                        </div>
                      )}
                      
                      <div className="mt-4 bg-Gold4 rounded-[8px] px-[16px] py-[8px]">
                        <p className="font-sans text-[14px]/[120%] font-medium text-Gold1">
                          12 Applicants
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 border-t border-Gold3 pt-4">
                    <p className="font-sans text-[14px]/[120%] text-Gray1 line-clamp-2">
                      {job.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer1 />
    </div>
  );
}