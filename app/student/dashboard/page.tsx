"use client";
import React, { useEffect } from "react";
import Header1 from "../../Components/Header1";
import Button7 from "../../user/Components/Button7";
import Link from "next/link";
import Footer1 from "../../Components/Footer1";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext"; 
import Logout from "@/app/user/auth/logout/page";
import { useInternshipContext } from "@/contexts/internshipContext";
import { useApplicationContext } from "@/contexts/applicationContext";
import { useOfferContext } from "@/contexts/offerContext";
import { CldImage } from "next-cloudinary";

export default function Dashboard() {
  const { user, clearError } = useAuth();
  const { getStudentInternships } = useInternshipContext();
  const { getApplications } = useApplicationContext();
  const { getStudentOffers } = useOfferContext();
  const [internships, setInternships] = useState<{ title: string; status?: string; results?: any[] }[]>([]);
  const [applications, setApplications] = useState<{ title: string; status?: string; results?: any[] }[]>([]);
  const [offers, setOffers] = useState<{ title: string; status?: string; results?: any[] }[]>([]); 
  
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const fetchData  = async () => {
      try {
        const fetchedInternships = (await getStudentInternships()) ?? {};
        const fetchApplications = (await getApplications()) ?? {};
        const fetchOffers = (await getStudentOffers()) ?? {};
 
        if (fetchedInternships && typeof fetchedInternships === "object" && Array.isArray((fetchedInternships as any)?.results)) {
          setInternships((fetchedInternships as any).results);
        }
        if (fetchApplications && typeof fetchApplications === "object" && Array.isArray((fetchApplications as any)?.results)) {
          setApplications((fetchApplications as any).results);
        }
        if (fetchOffers && typeof fetchOffers === "object" && Array.isArray((fetchOffers as any)?.results)) {
          setOffers((fetchOffers as any).results);
        }
      } catch (error) {
        setFormError(`Failed to fetch jobs ${error}`);
      }
    };
    fetchData ();
  }, []);


  const openOngoingInternships = internships?.filter((internship) => internship.status === "ongoing").length || 0;
  const completedInternships = internships?.filter((internship) => internship.status === "completed").length || 0;
  const pendingInternships = internships?.filter((internship) => internship.status === "pending").length || 0;
  
  const approvedApplications = applications?.filter((app) => app.status === "accepted").length || 0;
  const interviewApplications = applications?.filter((app) => app.status === "interview").length || 0;
  const pendingApplications = applications?.filter((app) => app.status === "pending").length || 0;
  const deniedApplications = applications?.filter((app) => app.status === "rejected").length || 0;
  
  const allOffers = offers?.length || 0;
  const acceptedOffers = offers?.filter((offer) => offer.status === "accepted").length || 0;
  const pendingOffers = offers?.filter((offer) => offer.status === "pending").length || 0;
  const rejectedOffers = offers?.filter((offer) => offer.status === "rejected").length || 0;

  return (
    <div className="flex flex-col">
      <div className="p-[1%]">
        <Header1 />
        <div className="shadow-custom flex w-[100%] flex-row justify-between rounded-[30px] mb-[80px] bg-GoldenWhite p-[2%]">
          <div className="flex py-[5%] space-y-[200px] w-[20%] items-center flex-col">
            <div className="flex flex-col items-center justify-center">
              <div className="mb-[16px] h-[134px] w-[134px] rounded-[67px] overflow-hidden bg-White">
                {user?.profile_picture ? (
                  <CldImage
                    width="134"
                    height="134"
                    src={user?.profile_picture}
                    alt="Description of my image"
                  />
                ) : (
                  <div className="mb-[16px] h-[134px] w-[134px] rounded-[67px] bg-Red1"></div>
                )}
              </div>
              <h1 className="mb-[6px] font-sans text-[27px]/[120%] font-bold">
                {user?.full_name}
              </h1>
              <h1 className="mb-[21px] font-sans text-[12px]/[120%] font-normal text-Gray2">
                {user?.course}
              </h1>
              <Button7
                onClick={() => { window.location.href = "/student/profile"; }}
                text="View Profile"
                className="text-[12px]/[120%] font-normal"
              />
            </div>
            <Logout/>
          </div>
          <div className="w-[78%]">
            <div className="shadow-custom2 mb-[25px] w-[100%] rounded-[20px] bg-White p-[2%]">
              <div className="mb-[22px] flex w-[100%] flex-row items-center justify-between">
                <p className="font-sans text-[21px]/[120%] text-Gray2">
                  INTERNSHIPS
                </p>
                <Link
                  className="flex flex-row items-center py-[12px] font-sans text-[21px]/[120%] font-normal text-Gray2"
                  href={"/student/internships"}
                >
                  See all
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="ml-2 size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </Link>
              </div>
              <div className="flex flex-row justify-between">
                <div className="w-[32%] rounded-[11.62px] bg-Green2 px-[22.29px] py-[21.39px]">
                  <div className="mb-[6px] flex flex-row items-center">
                    <div className="mr-[5px] h-[8.37px] w-[8.37px] rounded-[4.18px] bg-Green1"></div>
                    <h1 className="font-sans text-[16px]/[120%] text-Green1">
                      COMPLETED
                    </h1>
                  </div>
                  <p className="font-sans text-[47px]/[49px] font-bold text-Black2">
                    {completedInternships}
                  </p>
                </div>
                <div className="bg-Yellow2 w-[32%] rounded-[11.62px] px-[22.29px] py-[21.39px]">
                  <div className="mb-[6px] flex flex-row items-center">
                    <div className="bg-Yellow1 mr-[5px] h-[8.37px] w-[8.37px] rounded-[4.18px]"></div>
                    <h1 className="text-Yellow1 font-sans text-[16px]/[120%]">
                      ONGOING
                    </h1>
                  </div>
                  <p className="font-sans text-[47px]/[49px] font-bold text-Black2">
                    {openOngoingInternships}
                  </p>
                </div>
                <div className="w-[32%] rounded-[11.62px] bg-Red2 px-[22.29px] py-[21.39px]">
                  <div className="mb-[6px] flex flex-row items-center">
                    <div className="mr-[5px] h-[8.37px] w-[8.37px] rounded-[4.18px] bg-Red1"></div>
                    <h1 className="font-sans text-[16px]/[120%] text-Red1">
                      NOT STARTED
                    </h1>
                  </div>
                  <p className="font-sans text-[47px]/[49px] font-bold text-Black2">
                    {pendingInternships}
                  </p>
                </div>
              </div>
            </div>
            <div className="shadow-custom2 mb-[25px] w-[100%] rounded-[20px] bg-White p-[2%]">
              <div className="mb-[22px] flex w-[100%] flex-row items-center justify-between">
                <p className="font-sans text-[21px]/[120%] text-Gray2">
                  APPLICATIONS
                </p>
                <Link
                  className="flex flex-row items-center py-[12px] font-sans text-[21px]/[120%] font-normal text-Gray2"
                  href={"/student/applications"}
                >
                  See all
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="ml-2 size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </Link>
              </div>
              <div className="flex flex-row justify-between">
                <div className="w-[24%] rounded-[11.62px] bg-Green2 px-[22.29px] py-[21.39px]">
                  <div className="mb-[6px] flex flex-row items-center">
                    <div className="mr-[5px] h-[8.37px] w-[8.37px] rounded-[4.18px] bg-Green1"></div>
                    <h1 className="font-sans text-[16px]/[120%] text-Green1">
                      ACCEPTED
                    </h1>
                  </div>
                  <p className="font-sans text-[47px]/[49px] font-bold text-Black2">
                    {approvedApplications}
                  </p>
                </div>
                <div className="bg-BlueB1 w-[24%] rounded-[11.62px] bg-opacity-15 px-[22.29px] py-[21.39px]">
                  <div className="mb-[6px] flex flex-row items-center">
                    <div className="bg-BlueB1 mr-[5px] h-[8.37px] w-[8.37px] rounded-[4.18px]"></div>
                    <h1 className="text-BlueB1 font-sans text-[16px]/[120%]">
                      INTERVIEW
                    </h1>
                  </div>
                  <p className="font-sans text-[47px]/[49px] font-bold text-Black2">
                    {interviewApplications}
                  </p>
                </div>
                <div className="bg-Yellow2 w-[24%] rounded-[11.62px] px-[22.29px] py-[21.39px]">
                  <div className="mb-[6px] flex flex-row items-center">
                    <div className="bg-Yellow1 mr-[5px] h-[8.37px] w-[8.37px] rounded-[4.18px]"></div>
                    <h1 className="text-Yellow1 font-sans text-[16px]/[120%]">
                      PENDING
                    </h1>
                  </div>
                  <p className="font-sans text-[47px]/[49px] font-bold text-Black2">
                    {pendingApplications}
                  </p>
                </div>
                <div className="w-[24%] rounded-[11.62px] bg-Red2 px-[22.29px] py-[21.39px]">
                  <div className="mb-[6px] flex flex-row items-center">
                    <div className="mr-[5px] h-[8.37px] w-[8.37px] rounded-[4.18px] bg-Red1"></div>
                    <h1 className="font-sans text-[16px]/[120%] text-Red1">
                      REJECTED
                    </h1>
                  </div>
                  <p className="font-sans text-[47px]/[49px] font-bold text-Black2">
                    {deniedApplications}
                  </p>
                </div>
              </div>
            </div>
            <div className="shadow-custom2 mb-[25px] w-[100%] rounded-[20px] bg-White p-[2%]">
              <div className="mb-[22px] flex w-[100%] flex-row items-center justify-between">
                <p className="font-sans text-[21px]/[120%] text-Gray2">
                  OFFERS
                </p>
                <Link
                  className="flex flex-row items-center py-[12px] font-sans text-[21px]/[120%] font-normal text-Gray2"
                  href={"/student/offers"}
                >
                  See all
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="ml-2 size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </Link>
              </div>
              <div className="flex flex-row justify-between">
                <div className="w-[24%] rounded-[11.62px] bg-Gray2 bg-opacity-30 px-[22.29px] py-[21.39px]">
                  <div className="mb-[6px] flex flex-row items-center">
                    <div className="mr-[5px] h-[8.37px] w-[8.37px] rounded-[4.18px] bg-Gold1"></div>
                    <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                      ALL
                    </h1>
                  </div>
                  <p className="font-sans text-[47px]/[49px] font-bold text-Black2">
                    {allOffers}
                  </p>
                </div>
                <div className="w-[24%] rounded-[11.62px] bg-Green2 px-[22.29px] py-[21.39px]">
                  <div className="mb-[6px] flex flex-row items-center">
                    <div className="mr-[5px] h-[8.37px] w-[8.37px] rounded-[4.18px] bg-Green1"></div>
                    <h1 className="font-sans text-[16px]/[120%] text-Green1">
                      ACCEPTED
                    </h1>
                  </div>
                  <p className="font-sans text-[47px]/[49px] font-bold text-Black2">
                    {acceptedOffers}
                  </p>
                </div>
                <div className="bg-Yellow2 w-[24%] rounded-[11.62px] px-[22.29px] py-[21.39px]">
                  <div className="mb-[6px] flex flex-row items-center">
                    <div className="bg-Yellow1 mr-[5px] h-[8.37px] w-[8.37px] rounded-[4.18px]"></div>
                    <h1 className="text-Yellow1 font-sans text-[16px]/[120%]">
                      PENDING
                    </h1>
                  </div>
                  <p className="font-sans text-[47px]/[49px] font-bold text-Black2">
                    {pendingOffers}
                  </p>
                </div>
                <div className="w-[24%] rounded-[11.62px] bg-Red2 px-[22.29px] py-[21.39px]">
                  <div className="mb-[6px] flex flex-row items-center">
                    <div className="mr-[5px] h-[8.37px] w-[8.37px] rounded-[4.18px] bg-Red1"></div>
                    <h1 className="font-sans text-[16px]/[120%] text-Red1">
                      REJECTED
                    </h1>
                  </div>
                  <p className="font-sans text-[47px]/[49px] font-bold text-Black2">
                    {rejectedOffers}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer1/>
    </div>
  );
}
