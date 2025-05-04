"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";

import Header1 from "@/app/Components/Header1";
import Footer1 from "@/app/Components/Footer1";
import Button7 from "@/app/user/Components/Button7";
import ApplyModel from "@/app/Components/Modals/ApplyModal";
import Link from "next/link";
import { Job, useJobContext } from "@/contexts/jobContext";
import Logout from "@/app/user/auth/logout/page";

export default function ApplyInternship() {
  const params = useParams();
  const router = useRouter();
  const jobId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [job, setJob] = useState<Job | null>(null);
  const { getJobsById, loading, error } = useJobContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (jobId) {
        const job = await getJobsById(jobId);
        setJob(job);
      }
    };
  
    fetchJobDetails();
  }, [jobId]);

  return (
    <div className="flex flex-col">
      <div className="p-[2%]">
        <Header1 />
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-[80px] flex w-[100%] flex-row justify-between rounded-[30px]r">
          <div className="flex w-[20%] flex-col items-center space-y-[200px] py-[1%]">
            <div className="flex flex-col items-center justify-center">
              <div className="mb-[16px] h-[134px] w-[134px] rounded-[67px] overflow-hidden bg-White">
                {job?.company?.profile_picture ? (
                  <CldImage
                    width="120"
                    height="120"
                    src={job?.company?.profile_picture}
                    alt="Description of my image"
                  />
                ) : (
                  <div className="mb-[16px] h-[127px] w-[127px] rounded-[12px] bg-Gray3"></div>
                )}
              </div>
              <h1 className="mb-[6px] text-center font-sans text-[27px]/[120%] font-bold">
                {job?.company?.company_name}
              </h1>
              <h1 className="mb-[21px] font-sans text-[12px]/[120%] font-normal text-Gray2">
                {job?.company?.company_industry}
              </h1>
              <Button7
                text="View Profile"
                className="text-[12px]/[120%] font-normal"
              />
            </div>
            <Logout/>
          </div>
          <div className="px-[10%]">
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
              Internship description
            </button>
            <Button7
              text="Apply"
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
              <button onClick={() => router.back()} className="rounded-[999px] border-[2px] border-PriGold px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-PriGold">
              Return to internships
              </button>
              <button onClick={() => setIsModalOpen(true)} className="rounded-[999px] bg-gradient-to-r px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-GoldenWhite">
                Apply
              </button>

              {isModalOpen && job && (
                <ApplyModel onClose={() => setIsModalOpen(false)} job={job} />
              )}

            </div>
          </div>
        </div>
      </div>
      <Footer1 />
    </div>
  );
}
