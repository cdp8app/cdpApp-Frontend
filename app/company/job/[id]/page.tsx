"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Header1 from "@/app/Components/Header1";
import Footer1 from "@/app/Components/Footer1";
import Button7 from "@/app/user/Components/Button7";
import Link from "next/link";
import { Job, useJobContext } from "@/contexts/jobContext";

export default function CompanyJobsPostedInfo() {
  const params = useParams();
  const router = useRouter();
  const jobId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [job, setJob] = useState<Job | null>(null);
  const { getJobsById, deleteJob, loading, error } = useJobContext();

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
      const confirmed = window.confirm("Are you sure you want to delete this job post?");
      if (confirmed) {
        try {
          await deleteJob(jobId); // Call deleteJob function from context
          alert("Job post deleted successfully.");
          router.push("/jobs"); // Redirect to the jobs list page
        } catch (err) {
          console.error("Error deleting job post:", err);
          alert("Failed to delete the job post.");
        }
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div className="p-[2%]">
        <Header1 />
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-[80px] w-[100%] justify-center">
          <div className="px-[10%]">
            <Link
              className="flex flex-row items-center py-[12px] font-sans text-[36px]/[120%] font-normal text-Gold1"
              href={"#"}
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
            </Link>
            <div className="flex w-[88px] flex-row items-center rounded-[8px] bg-Red2 px-[16px] py-[8px]">
              <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Red1"></div>
              <p className="font-sans text-[12px]/[120%] font-medium text-Red1">
                Closed
              </p>
            </div>
            <div className="flex w-[130px] flex-row items-center rounded-[8px] bg-Green2 px-[16px] py-[8px]">
              <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Green1"></div>
              <p className="font-sans text-[12px]/[120%] font-medium text-Green1">
                Open position
              </p>
            </div>
            <Button7
              text="View applicants"
              className="mt-[12px] text-[16px]/[120%] font-normal"
            />

            {job ? (
              <>
                <div className="mt-[21px] flex flex-col">
                  <div>
                    <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  ROLE:
                    </h1>
                    <p className="font-sans text-[16px]/[120%] text-Black2">
                      {job.title}
                    </p>
                  </div>
                  <div className="mt-[21px]">
                    <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  LOCATION:
                    </h1>
                    <p className="font-sans text-[16px]/[120%] text-Black2">
                  On-site: {job.location}
                    </p>
                  </div>
                  <div className="mt-[21px]">
                    <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  DESCRIPTION:
                    </h1>
                    <p className="font-sans text-[16px]/[120%] text-Black2">
                      {job.description}
                    </p>
                  </div>
                  <div className="mt-[21px]">
                    <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  REQUIREMENTS:
                    </h1>
                    <p className="font-sans text-[16px]/[120%] text-Black2">
                      {job.requirements}
                    </p>
                  </div>
                  <div className="mt-[21px]">
                    <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  DURATION:
                    </h1>
                    <p className="font-sans text-[16px]/[120%] text-Black2">
                      {job.deadline}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <p className="mt-10 text-center text-Gray2">Loading job details...</p>
            )}
            <div className="mb-[20px] mt-[21px] flex flex-row space-x-[18px]">
              <button onClick={handleDeleteJob} className="rounded-[999px] border-[2px] border-Red1 px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-Red1">
                Delete job post
              </button>
              <button className="rounded-[999px] bg-gradient-to-r px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-GoldenWhite">
                View applicants
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer1 />
    </div>
  );
}
