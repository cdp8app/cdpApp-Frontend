"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header1 from "@/app/Components/Header1";
import Footer1 from "@/app/Components/Footer1";
import { useJobContext } from "@/contexts/jobContext";
import FormAlert from "@/app/Components/FormAlert";
import JobForm from "../../create/form";

export default function EditJobPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = Array.isArray(params.id) ? params.id[0] : params.id;
  const { getJobsById, updateJob, loading, error } = useJobContext();
  const [formError, setFormError] = useState("");
  const [jobData, setJobData] = useState<any>(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (jobId) {
        const job = await getJobsById(jobId);
        setJobData(job);
      }
    };
  
    fetchJobDetails();
  }, [jobId]);

  const handleSubmit = async (updatedJobData: any) => {
    try {
      setFormError("");
      
      if (!jobId) {
        setFormError("Job ID is missing");
        return;
      }
      
      await updateJob(jobId, updatedJobData);
      router.push(`/company/job/${jobId}`);
    } catch (err: any) {
      setFormError(err.message || "Failed to update job");
    }
  };

  if (!jobData && !loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow p-[2%]">
          <Header1 />
          <div className="px-[10%] py-[2%] flex items-center justify-center">
            <p className="text-Red1 font-sans text-[20px]/[120%]">Job not found</p>
          </div>
        </div>
        <Footer1 />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow p-[2%]">
        <Header1 />
        <div className="px-[10%] py-[2%]">
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
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
            Edit Job Posting
          </button>

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

          {loading ? (
            <div className="flex items-center justify-center my-[120px]">
              <p className="text-Gold1 font-sans text-[20px]/[120%]">Loading...</p>
            </div>
          ) : (
            <div className="mt-[30px]">
              {jobData && <JobForm onSubmit={handleSubmit} isLoading={loading} initialData={jobData} />}
            </div>
          )}
        </div>
      </div>
      <Footer1 />
    </div>
  );
}