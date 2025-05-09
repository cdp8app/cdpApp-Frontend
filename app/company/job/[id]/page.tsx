"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Header1 from "@/app/Components/Header1";
import Footer1 from "@/app/Components/Footer1";
import Button7 from "@/app/user/Components/Button7";
import Link from "next/link";
import { Job, useJobContext } from "@/contexts/jobContext";
import ConfirmationModal from "@/app/Components/ConfirmationModal";
import FormAlert from "@/app/Components/FormAlert";

export default function CompanyJobsPostedInfo() {
  const params = useParams();
  const router = useRouter();
  const jobId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [job, setJob] = useState<Job | null>(null);
  const { getJobsById, deleteJob, loading, error } = useJobContext();
  const [formError, setFormError] = useState("");

  const [
    isConfirmModalOpen,
    setIsConfirmModalOpen
  ] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (jobId) {
        const job = await getJobsById(jobId);
        setJob(job);
      }
    };
  
    fetchJobDetails();
  }, []);

  const handleDeleteJob = async () => {
    if (jobId) {
      try {
        await deleteJob(jobId);
        router.push("/jobs");
      } catch (err: any) {
        setFormError(err || "Failed to delete the job post.");
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div className="p-[2%]">
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
              Job description
                </button>
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
                <Button7
                  text="View applicants"
                  className="mt-[12px] text-[16px]/[120%] font-normal"
                />

                <div className="mt-[21px] flex flex-col">
                  <div>
                    <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  ROLE:
                    </h1>
                    <p className="font-sans text-[16px]/[120%] text-Black2">
                      {job?.title}
                    </p>
                  </div>
                  <div className="mt-[21px]">
                    <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  LOCATION:
                    </h1>
                    <p className="font-sans text-[16px]/[120%] text-Black2">
                  On-site: {job?.location}
                    </p>
                  </div>
                  <div className="mt-[21px]">
                    <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  DESCRIPTION:
                    </h1>
                    <p className="font-sans text-[16px]/[120%] text-Black2">
                      {job?.description}
                    </p>
                  </div>
                  <div className="mt-[21px]">
                    <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  REQUIREMENTS:
                    </h1>
                    <p className="font-sans text-[16px]/[120%] text-Black2">
                      {job?.requirements}
                    </p>
                  </div>
                  <div className="mt-[21px]">
                    <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  DURATION:
                    </h1>
                    <p className="font-sans text-[16px]/[120%] text-Black2">
                      {job?.deadline}
                    </p>
                  </div>
                </div>
                {job?.status === "open" && (
                  <div className="mb-[20px] mt-[21px] flex flex-row space-x-[18px]">
                    <button onClick={() => setIsConfirmModalOpen(true)} className="rounded-[999px] border-[2px] border-Red1 px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-Red1">
                Delete job post
                    </button>
                    <ConfirmationModal 
                      isOpen={isConfirmModalOpen}
                      onConfirm={handleDeleteJob}
                      onCancel={() => setIsConfirmModalOpen(false)}
                      title="Delete Job Post"
                      message="Are you sure you want to delete this job post?"
                    />
                    <button className="rounded-[999px] bg-gradient-to-r px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-GoldenWhite">
                View applicants
                    </button>
                  </div>
                )}
                {job?.status === "closed" && (
                  <div className="mb-[20px] mt-[21px]">
                    <button className="rounded-[999px] bg-gradient-to-r px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-GoldenWhite">
                View applicants
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer1 />
    </div>
  );
}
