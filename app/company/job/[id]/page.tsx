"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Header1 from "@/app/Components/Header1";
import Footer1 from "@/app/Components/Footer1";
import Button7 from "@/app/user/Components/Button7";
import { Job, useJobContext } from "@/contexts/jobContext";
import ConfirmationModal from "@/app/Components/ConfirmationModal";
import FormAlert from "@/app/Components/FormAlert";
import { formatDate } from "@/app/utils/dateUtils";

export default function CompanyJobDescription() {
  const params = useParams();
  const router = useRouter();
  const jobId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [job, setJob] = useState<Job | null>(null);
  const { getJobsById, deleteJob, updateJob, loading, error } = useJobContext();
  const [formError, setFormError] = useState("");
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [isConfirmStatusModalOpen, setIsConfirmStatusModalOpen] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (jobId) {
        const job = await getJobsById(jobId);
        setJob(job);
      }
    };
  
    fetchJobDetails();
  }, [jobId]);

  const handleDeleteJob = async () => {
    if (jobId) {
      try {
        await deleteJob(jobId);
        router.push("/company/dashboard");
      } catch (err: any) {
        setFormError(err.message || "Failed to delete the job post.");
      }
    }
  };

  const handleToggleJobStatus = async () => {
    if (jobId && job) {
      try {
        const newStatus = job.status === "open" ? "closed" : "open";
        await updateJob(jobId, { status: newStatus });
        
        // Refresh job data
        const updatedJob = await getJobsById(jobId);
        setJob(updatedJob);
      } catch (err: any) {
        setFormError(err.message || `Failed to ${job.status === "open" ? "close" : "open"} the job post.`);
      }
    }
  };

  const viewApplicants = () => {
    router.push(`/company/applications?jobId=${jobId}`);
  };

  const editJob = () => {
    router.push(`/company/job/${jobId}/edit`);
  };

  // Format salary for display
  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(salary);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow p-[2%]">
        <Header1 />
        {loading ? (
          <div className="flex items-center justify-center my-[120px]">
            <p className="text-Gold1 font-sans text-[20px]/[120%]">Loading...</p>
          </div>
        ) : (
          <>
            <div className="mb-[80px] w-[100%] justify-center">
              <div className="px-[10%]">
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
                <div className="flex flex-row items-center justify-between mb-[20px]">
                  <button
                    className="flex flex-row items-center py-[12px] font-sans text-[36px]/[120%] font-normal text-Gold1"
                    onClick={() => router.back()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-8 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5 8.25 12l7.5-7.5"
                      />
                    </svg>
                    Job Description
                  </button>
                  
                  <button
                    onClick={editJob}
                    className="flex items-center justify-center rounded-full bg-Gold4 h-[50px] w-[50px] text-PriGold hover:bg-Gold3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                  </button>
                </div>
                
                <div className="flex flex-row items-center justify-between mb-[20px]">
                  <div>
                    <h1 className="font-sans text-[28px]/[120%] font-bold text-Black2 mb-2">
                      {job?.title}
                    </h1>
                    <p className="font-sans text-[16px]/[120%] text-Gray1">
                      Posted on: {job?.created_at ? formatDate(job.created_at) : "N/A"}
                    </p>
                  </div>
                  
                  {job?.status === "closed" && (
                    <div className="flex w-[88px] flex-row items-center rounded-[8px] bg-Red2 px-[16px] py-[8px]">
                      <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Red1"></div>
                      <p className="font-sans text-[12px]/[120%] font-medium text-Red1">
                        Closed
                      </p>
                    </div>
                  )}
                  {job?.status === "open" && (
                    <div className="flex w-[130px] flex-row items-center rounded-[8px] bg-Green2 px-[16px] py-[8px]">
                      <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Green1"></div>
                      <p className="font-sans text-[12px]/[120%] font-medium text-Green1">
                        Open position
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-GoldenWhite rounded-[16px] p-6 shadow-sm">
                    <h2 className="font-sans text-[18px]/[120%] font-semibold text-Gold1 mb-2">
                      JOB DETAILS
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-Gold1 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div>
                          <p className="font-sans text-[14px]/[120%] text-Gray1">Location</p>
                          <p className="font-sans text-[16px]/[120%] text-Black2">{job?.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-Gold1 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="font-sans text-[14px]/[120%] text-Gray1">Job Type</p>
                          <p className="font-sans text-[16px]/[120%] text-Black2">{job?.job_type}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-Gold1 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="font-sans text-[14px]/[120%] text-Gray1">Salary</p>
                          <p className="font-sans text-[16px]/[120%] text-Black2">{job?.salary ? formatSalary(job.salary) : "Not specified"}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-Gold1 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <p className="font-sans text-[14px]/[120%] text-Gray1">Application Deadline</p>
                          <p className="font-sans text-[16px]/[120%] text-Black2">{job?.deadline ? formatDate(job.deadline) : "Not specified"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-GoldenWhite rounded-[16px] p-6 shadow-sm">
                    <h2 className="font-sans text-[18px]/[120%] font-semibold text-Gold1 mb-2">
                      APPLICANT STATS
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="font-sans text-[16px]/[120%] text-Gray1">Total Applicants</p>
                        <p className="font-sans text-[24px]/[120%] font-bold text-Gold1">12</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-sans text-[16px]/[120%] text-Gray1">New Applicants</p>
                        <p className="font-sans text-[24px]/[120%] font-bold text-Gold1">3</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-sans text-[16px]/[120%] text-Gray1">In Interview</p>
                        <p className="font-sans text-[24px]/[120%] font-bold text-Gold1">5</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-sans text-[16px]/[120%] text-Gray1">Offers Extended</p>
                        <p className="font-sans text-[24px]/[120%] font-bold text-Gold1">2</p>
                      </div>
                      <button
                        onClick={viewApplicants}
                        className="w-full mt-4 rounded-[999px] bg-PriGold px-[20px] py-[12px] font-sans text-[16px]/[120%] font-normal text-GoldenWhite"
                      >
                        View All Applicants
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-[21px] flex flex-col bg-GoldenWhite rounded-[16px] p-6 shadow-sm">
                  <div>
                    <h2 className="font-sans text-[18px]/[120%] font-semibold text-Gold1 mb-4">
                      JOB DESCRIPTION
                    </h2>
                    <p className="font-sans text-[16px]/[120%] text-Black2 whitespace-pre-line">
                      {job?.description}
                    </p>
                  </div>
                  
                  <div className="mt-[30px]">
                    <h2 className="font-sans text-[18px]/[120%] font-semibold text-Gold1 mb-4">
                      REQUIREMENTS
                    </h2>
                    <p className="font-sans text-[16px]/[120%] text-Black2 whitespace-pre-line">
                      {job?.requirements}
                    </p>
                  </div>
                </div>

                <div className="mt-[30px] flex flex-row space-x-[18px]">
                  <button 
                    onClick={() => setIsConfirmDeleteModalOpen(true)} 
                    className="rounded-[999px] border-[2px] border-Red1 px-[40px] py-[18px] font-sans text-[16px]/[120%] font-normal text-Red1"
                  >
                    Delete Job Post
                  </button>
                  
                  <button 
                    onClick={() => setIsConfirmStatusModalOpen(true)}
                    className={`rounded-[999px] border-[2px] px-[40px] py-[18px] font-sans text-[16px]/[120%] font-normal ${
                      job?.status === "open" 
                        ? "border-Red1 text-Red1" 
                        : "border-Green1 text-Green1"
                    }`}
                  >
                    {job?.status === "open" ? "Close Job Post" : "Reopen Job Post"}
                  </button>
                  
                  <button
                    onClick={viewApplicants}
                    className="rounded-[999px] bg-gradient-to-r from-PriGold to-Gold1 px-[40px] py-[18px] font-sans text-[16px]/[120%] font-normal text-GoldenWhite"
                  >
                    View Applicants
                  </button>
                </div>
              </div>
            </div>
            
            <ConfirmationModal 
              isOpen={isConfirmDeleteModalOpen}
              onConfirm={handleDeleteJob}
              onCancel={() => setIsConfirmDeleteModalOpen(false)}
              title="Delete Job Post"
              message="Are you sure you want to delete this job post? This action cannot be undone."
            />
            
            <ConfirmationModal 
              isOpen={isConfirmStatusModalOpen}
              onConfirm={handleToggleJobStatus}
              onCancel={() => setIsConfirmStatusModalOpen(false)}
              title={job?.status === "open" ? "Close Job Post" : "Reopen Job Post"}
              message={job?.status === "open" 
                ? "Are you sure you want to close this job post? It will no longer be visible to applicants." 
                : "Are you sure you want to reopen this job post? It will be visible to applicants again."
              }
            />
          </>
        )}
      </div>
      <Footer1 />
    </div>
  );
}