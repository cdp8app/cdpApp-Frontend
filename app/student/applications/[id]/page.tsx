"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Header1 from "@/app/Components/Header1";
import Button7 from "@/app/user/Components/Button7";
import Footer1 from "@/app/Components/Footer1";
import Logout from "@/app/user/auth/logout/page";
import { useApplicationContext } from "@/contexts/applicationContext";
import { Job } from "@/contexts/jobContext";

export default function StudentApplicationStatus() {
  const params = useParams();
  const router = useRouter();

  const applicationId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [application, setApplication] = useState<{ job?: { title: string; location?: string; description?: string; requirements?: string; deadline?: string }; employer?: { company_name: string; company_industry?: string }; status?: string } | null>(null);
  const { getApplicationsById, updateApplication, error } = useApplicationContext();

  const [formError, setFormError] = useState("");

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      if (applicationId) {
        const application = await getApplicationsById(applicationId);
        if (application) {
          setApplication({
            ...application,
            job: typeof application.job === "string" ? JSON.parse(application.job) : application.job,
          });
        }
      }
    };
      
    fetchApplicationDetails();
  }, [applicationId]);

  return (
    <div className="flex flex-col">
      <div className="p-[2%]">
        <Header1 />
        <div className="mb-[80px] flex w-[100%] flex-row justify-between rounded-[30px]">
          <div className="flex w-[20%] flex-col items-center space-y-[200px] py-[1%]">
            <div className="flex flex-col items-center justify-center">
              <div className="mb-[16px] h-[134px] w-[134px] rounded-[67px] bg-Red1"></div>
              <h1 className="mb-[6px] text-center font-sans text-[27px]/[120%] font-bold">
                {application?.employer?.company_name}
              </h1>
              <h1 className="mb-[21px] font-sans text-[12px]/[120%] font-normal text-Gray2">
                {application?.employer?.company_industry}
              </h1>
              <Button7
                text="View Profile"
                className="text-[12px]/[120%] font-normal"
              />
            </div>
            <Logout/>
          </div>
          <div className="w-[75%]">
            <h1 className="mb-[21px] font-sans text-[36px]/[120%] text-Gold1">
              Application status
            </h1>
            {application?.status === "pending" && (
              <div className="flex w-[111px] flex-row items-center rounded-[8px] bg-Yellow2 px-[16px] py-[8px]">
                <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Yellow1"></div>
                <p className="font-sans text-[16px]/[120%] font-normal text-Yellow1">
                Pending
                </p>
              </div>
            )}
            {application?.status === "rejected" && (
              <div className="flex w-[115px] flex-row items-center rounded-[8px] bg-Red2 px-[16px] py-[8px]">
                <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Red1"></div>
                <p className="font-sans text-[16px]/[120%] font-normal text-Red1">
                Rejected
                </p>
              </div>
            )}
            {application?.status === "accepted" && (
              <div className="flex w-[123px] flex-row items-center rounded-[8px] bg-Green2 px-[16px] py-[8px]">
                <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Green1"></div>
                <p className="font-sans text-[16px]/[120%] font-normal text-Green1">
                Accepted
                </p>
              </div>
            )}
            {application?.status === "interview" && (
              <div className="flex w-[123px] flex-row items-center rounded-[8px] bg-BlueB1 bg-opacity-15 px-[16px] py-[8px]">
                <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-BlueB1"></div>
                <p className="font-sans text-[16px]/[120%] font-normal text-BlueB1">
                Interview
                </p>
              </div>
            )}

            {application?.status === "pending" && (
              <button onClick={() => router.back()} className="mt-[21px] rounded-[999px] border-[2px] border-PriGold px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-PriGold">
              Return to applications
              </button>
            )}
            {application?.status === "interview" && (
              <button className="mt-[21px] rounded-[999px] border-[2px] border-PriGold px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-PriGold">
              Interview Schedule
              </button>
            )}
            {application?.status === "rejected" && (
              <button className="mt-[21px] rounded-[999px] border-[2px] border-PriGold px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-PriGold">
              Interview Schedule
              </button>
            )}
            {application?.status === "accepted" && (
              <button className="mt-[21px] rounded-[999px] border-[2px] border-PriGold px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-PriGold">
              Start Internship
              </button>
            )}

            <div className="mt-[21px] flex w-[80%] flex-col">
              <div>
                <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  ROLE:
                </h1>
                <p className="font-sans text-[16px]/[120%] text-Black2">
                  {application?.job?.title}
                </p>
              </div>
              <div className="mt-[21px]">
                <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  LOCATION:
                </h1>
                <p className="font-sans text-[16px]/[120%] text-Black2">
                  {application?.job?.location}
                </p>
              </div>
              <div className="mt-[21px]">
                <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  DESCRIPTION:
                </h1>
                <p className="font-sans text-[16px]/[120%] text-Black2">
                  {application?.job?.description}
                </p>
              </div>
              <div className="mt-[21px]">
                <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  REQUIREMENTS:
                </h1>
                <p className="font-sans text-[16px]/[120%] text-Black2">
                  {application?.job?.requirements}
                </p>
              </div>
              <div className="mt-[21px]">
                <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  DURATION:
                </h1>
                <p className="font-sans text-[16px]/[120%] text-Black2">
                  {application?.job?.deadline}
                </p>
              </div>
            </div>
            {application?.status === "rejected" && (
              <div onClick={() => router.back()} className="mt-[21px] flex flex-row">
                <button className="rounded-[999px] bg-gradient-to-r px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-GoldenWhite">
                Return to applications
                </button>
              </div>
            )}
            {application?.status === "pending" && (
              <div className="mt-[21px] flex flex-row">
                <button className="mr-[18px] rounded-[999px] border-[2px] border-Red1 px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-Red1">
                Cancel application
                </button>
                <button onClick={() => router.back()} className="rounded-[999px] bg-gradient-to-r px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-GoldenWhite">
                Return to applications
                </button>
              </div>
            )}
            {application?.status === "accepted" && (
              <div className="mt-[21px] flex flex-row">
                <button className="mr-[18px] rounded-[999px] border-[2px] border-Red1 px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-Red1">
                End Internship
                </button>
                <button className="rounded-[999px] bg-gradient-to-r px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-GoldenWhite">
                Start Internship
                </button>
              </div>
            )}
            {application?.status === "interview" && (
              <div className="mt-[21px] flex flex-row">
                <button className="mr-[18px] rounded-[999px] border-[2px] border-Red1 px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-Red1">
                Decline interview
                </button>
                <button className="rounded-[999px] bg-gradient-to-r px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-GoldenWhite">
                Interview schedule
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer1 />
    </div>
  );
}
