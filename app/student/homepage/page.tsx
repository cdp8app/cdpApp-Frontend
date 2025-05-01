"use client";
import React, { useEffect, useState } from "react";
import Header1 from "../../Components/Header1";
import SearchBar from "../../Components/SearchBar";
import Footer1 from "../../Components/Footer1";
import { useRouter } from "next/navigation";
import { useApplicationContext } from "@/contexts/applicationContext";
import { useJobContext } from "@/contexts/jobContext";

export default function StudentHomePage() {
  const router = useRouter();
  const { getJobs } = useJobContext();
  const [jobs, setJobs] = useState<{ title: string; results?: any[] }[]>([]);
  console.log("fetch: ",jobs);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const fetchedJobs = (await getJobs()) ?? {};

        if (fetchedJobs && typeof fetchedJobs === "object" && Array.isArray((fetchedJobs as any)?.results)) {
          setJobs((fetchedJobs as any).results);
        }
      } catch (error) {
        console.error("Failed to fetch jobs", error);
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
        <div className="mt-[21px] flex row">
          {jobs.map((job: any, index: number) => (
            <div key={index} className="flex max-w-[432px] flex-row items-center rounded-[15px] p-[18px] shadow-custom2 mr-3">
              <div className="mr-[12px] h-[125px] w-[125px] rounded-[12px] bg-Gray1 bg-opacity-30"></div>
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
                    {job.company?.company_industry}
                  </p>
                </div>
                <div className="">
                  <div className="my-[6px] flex max-w-[79px] flex-row items-center rounded-[6px] bg-Green2 px-[15px] py-[6px]">
                    <div className="h-[10px] w-[10px] rounded-full bg-Green1"></div>
                    <p className="ml-[5px] font-sans text-[12px]/[120%] text-Green1">
                    Hiring
                    </p>
                  </div>
                  <div className="my-[6px] flex max-w-[150px] flex-row items-center rounded-[6px] bg-Red2 px-[15px] py-[6px]">
                    <div className="h-[10px] w-[10px] rounded-full bg-Red1"></div>
                    <p className="ml-[5px] font-sans text-[12px]/[120%] text-Red1">
                    Not Hiring
                    </p>
                  </div>
                </div>
                <div className="flex flex-row" >
                  <button className="mt-[1px] rounded-[999px] border-[2px] border-PriGold px-[24px] py-[10px] font-sans text-[12px]/[120%] text-PriGold">
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
      </div>
      <div className="mb-[91px]"></div>
      <Footer1 />
    </div>
  );
}
