"use client";
import Footer1 from "@/app/Components/Footer1";
import Header1 from "@/app/Components/Header1";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useJobContext } from "@/contexts/jobContext";
import { CldImage } from "next-cloudinary";
import FormAlert from "@/app/Components/FormAlert";

export default function CompanyJobsPosted() {
  const router = useRouter();

  const { getPostedJobs, loading, error } = useJobContext();
  const [section, setSection] = useState(1);
  const [jobs, setJobs] = useState<{ title: string; status: string; results?: any[] }[]>([]);
  const [formError, setFormError] = useState("");
  

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const fetchedJobs = (await getPostedJobs()) ?? {};

        if (fetchedJobs && typeof fetchedJobs === "object" && Array.isArray((fetchedJobs as any)?.results)) {
          setJobs((fetchedJobs as any).results);
        }
      } catch (error: any) {
        setFormError(error || "Failed to fetch jobs");
      }
    };
    fetchJobs();
  }, []);

  const handleSectionChange = (sectionNumber: number) => {
    setSection(sectionNumber);
  };

  const handleClick = (jobId: number) => {
    router.push(`/company/job/${jobId}`);
  };

  const filteredJobs = section === 1
    ? jobs
    : jobs.filter(job => job.status === (section === 2 ? "open" : "closed"));
  
  return (
    <div>
      <div className="mb-[100px] p-[1.5%]">
        <Header1 />
        <div className="px-[4%]">
          <div className="mb-[18px] border-b-[1px] border-Gold2">
            <button
              className="flex flex-row items-center py-[12px] font-sans text-[27px]/[120%] font-normal text-Gold1"
              onClick={() => router.back()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
              Jobs Posted
            </button>
          </div>
          <div className="space-x-[16px]">
            <button
              onClick={() => handleSectionChange(1)}
              className={`w-[186px] rounded-[30px] px-[20px] py-[12px] font-sans text-[16px]/[120%] shadow-custom2 ${section === 1 ? "bg-Gold2" : "bg-GoldenWhite text-Gray2"}`}
            >
              All
            </button>
            <button
              onClick={() => handleSectionChange(2)}
              className={`w-[186px] rounded-[30px] px-[20px] py-[12px] font-sans text-[16px]/[120%] shadow-custom2 ${section === 2 ? "bg-Gold2" : "bg-GoldenWhite text-Gray2"}`}
            >
              Open
            </button>
            <button
              onClick={() => handleSectionChange(3)}
              className={`w-[186px] rounded-[30px] px-[20px] py-[12px] font-sans text-[16px]/[120%] shadow-custom2 ${section === 3 ? "bg-Gold2" : "bg-GoldenWhite text-Gray2"}`}
            >
              Closed
            </button>
          </div>
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
              {(section === 1 || section === 2 || section === 3) && (
                <div className="mt-[20px]">
                  {filteredJobs.map((job: any, index: number) => (
                    <div key={index} className="mt-[20px] flex w-[100%] flex-row items-center justify-between rounded-[18px] bg-GoldenWhite py-[16px] pl-[16px] pr-[55px] shadow-custom2">
                      <div className="flex flex-row items-center">
                        <div className="mb-[16px] h-[127px] w-[127px] rounded-[12px] overflow-hidden bg-White">
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
                        <div className="ml-[12px] flex flex-col">
                          <h1 className="mb-[6px] font-sans text-[16px]/[120%]">
                            {job.title}
                          </h1>
                          <div className="flex flex-row items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-6 text-Gray2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                              />
                            </svg>

                            <h1 className="font-sans text-[16px]/[120%] text-Gray2">
                              {job.company?.company_industry}
                            </h1>
                          </div>
                          <button onClick={() => handleClick(job.id)} className="mt-[18px] flex w-[136px] flex-row items-center justify-center rounded-[999px] border-[2px] border-PriGold px-[20px] py-[10px] font-sans text-[12px]/[100%] font-normal text-PriGold">
                      View Details
                          </button>
                        </div>
                      </div>
                      <div
                        className={`flex flex-row items-center rounded-[8px] ${
                          job.status === "closed" ? "bg-Red2" : "bg-Green2"
                        } px-[16px] py-[8px]`}
                      >
                        <div
                          className={`mr-[5px] h-[8px] w-[8px] rounded-[4px] ${
                            job.status === "closed" ? "bg-Red1" : "bg-Green1"
                          }`}
                        ></div>
                        <p
                          className={`font-sans text-[12px]/[120%] font-normal ${
                            job.status === "closed" ? "text-Red1" : "text-Green1"
                          }`}
                        >
                          {job.status === "closed" ? "Closed" : "Open position"}
                        </p>
                      </div>
                    </div>
                  ))}

                  <button onClick={() => router.push("/company/job/create")} className="bg-PriGold mt-[21px] justify-center flex flex-row items-center py-[20px] px-[170px] rounded-[999px] justify-self-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="size-6 text-GoldenWhite mr-[6px] "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <h1 className=" font-sans text-[17px] text-GoldenWhite font-medium ">Post a new job</h1>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer1 />
    </div>
  );
}
