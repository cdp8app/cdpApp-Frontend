"use client";
import React, { useEffect, useState } from "react";
import Header1 from "../../Components/Header1";
import SearchBar from "../../Components/SearchBar";
import Footer1 from "../../Components/Footer1";
import { useRouter } from "next/navigation";
import { useApplicationContext } from "@/contexts/applicationContext";
import { useJobContext } from "@/contexts/jobContext";
import { CldImage } from "next-cloudinary";
import FormAlert from "@/app/Components/FormAlert";

export default function StudentHomePage() {
  const router = useRouter();
  const { getJobs, loading, error } = useJobContext();
  const [jobs, setJobs] = useState<{ title: string; results?: any[] }[]>([]);
  const [formError, setFormError] = useState("");

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
  }, []);

  const handleClick = (jobId: number) => {
    router.push(`/student/jobs/${jobId}`);
  };

  return (
    <div>
      <div className="px-[3%] py-[1%]">
        <Header1 />
        <SearchBar />
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
            <div className="mt-[21px] grid grid-cols-3 gap-[10px]">
              {jobs.map((job: any, index: number) => (
                <div key={index} className="flex max-w-[432px] flex-row items-center rounded-[15px] p-[18px] shadow-custom2 mr-3">
                  <div className="mr-[12px] h-[125px] w-[125px] rounded-[12px] overflow-hidden bg-White">
                    {job?.company?.profile_picture ? (
                      <CldImage
                        width="125"
                        height="125"
                        src={job?.company?.profile_picture}
                        alt="Description of my image"
                      />
                    ) : (
                      <div className="mr-[12px] h-[125px] w-[125px] rounded-[12px] bg-Gray1 bg-opacity-30"></div>
                    )}
                  </div>
                  <div>
                    <h1 className="mb-[4px] font-sans text-[16px]/[120%] text-Black2">
                      {job.title}
                    </h1>
                    <div className="flex flex-row items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5 text-Gray1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                        />
                      </svg>
                      <p className="font-sans text-[16px]/[80%] text-Gray1">
                        {job.company?.company_name}
                      </p>
                    </div>
                    <p className="text-xs leading-snug text-Gray1 font-sans line-clamp-2">
                      {job.description?.slice(0, 100)}...
                    </p>
                    <div className="flex flex-row" >
                      <button onClick={() => handleClick(job.id)} className="mt-[1px] rounded-[999px] border-[2px] border-PriGold px-[24px] py-[10px] font-sans text-[12px]/[120%] text-PriGold">
                View Details
                      </button>
                      <button onClick={() => handleClick(job.id)} className="mt-[1px] rounded-[999px] px-[24px] py-[10px] font-sans text-[12px]/[120%] text-GoldenWhite bg-PriGold ml-2">
                Apply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="mb-[91px]"></div>
      <Footer1 />
    </div>
  );
}
