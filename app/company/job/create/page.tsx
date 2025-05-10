"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header1 from "@/app/Components/Header1";
import Footer1 from "@/app/Components/Footer1";
import { useJobContext } from "@/contexts/jobContext";
import { useAuth } from "@/contexts/AuthContext";
import FormAlert from "@/app/Components/FormAlert";
import JobForm from "./form";

export default function CreateJobPage() {
  const router = useRouter();
  const { createJob, loading, error } = useJobContext();
  const { user } = useAuth();
  const [formError, setFormError] = useState("");

  const handleSubmit = async (jobData: any) => {
    try {
      setFormError("");
      
      // Add company ID to job data
      const jobWithCompany = {
        ...jobData,
        company: user?.id,
      };
      
      const result = await createJob(jobWithCompany);
      
      if (result && result.id) {
        router.push(`/company/job/${result.id}`);
      } else {
        setFormError("Failed to create job. Please try again.");
      }
    } catch (err: any) {
      setFormError(err.message || "Failed to create job");
    }
  };

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
            Create Job Posting
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

          <div className="mt-[30px]">
            <JobForm onSubmit={handleSubmit} isLoading={loading} />
          </div>
        </div>
      </div>
      <Footer1 />
    </div>
  );
}