"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";

import Header1 from "@/app/Components/Header1";
import Button7 from "@/app/user/Components/Button7";
import Footer1 from "@/app/Components/Footer1";
import Logout from "@/app/user/auth/logout/page";
import { Internship, useInternshipContext } from "@/contexts/internshipContext";
import ReusableRateModal from "@/app/Components/ReusableRateModal";
import { useReviewContext } from "@/contexts/reviewContext";
import FormAlert from "@/app/Components/FormAlert";

export default function StudentInternshipInfo() {
  const params = useParams();
  const router = useRouter();
    
  const internshipId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [internship, setInternship] = useState<Internship | null>(null);
  const { getInternshipsById, updateInternship, loading, error } = useInternshipContext();
  const { createReview } = useReviewContext();
    
  const [formError, setFormError] = useState("");

  const [
    isRateStudentsModalOpen,
    setIsRateStudentsModalOpen
  ] = useState(false);

  useEffect(() => {
    const fetchInternshipDetails = async () => {
      if (internshipId) {
        const internshipData = await getInternshipsById(internshipId);
        if (internshipData !== undefined && internshipData !== null) {
          setInternship(internshipData);
        }
      }
    };
          
    fetchInternshipDetails();
  }, []);

  const handleStartInternship = async () => {   
    if (internship?.id) {
      await updateInternship(internship.id, { status: "ongoing" });
      const updatedApp = await getInternshipsById(internship.id);
      if (updatedApp !== undefined && updatedApp !== null) {
        setInternship(updatedApp);
      }
    }
  };

  const handleCompleteInternship = async () => {   
    if (internship?.id) {
      await updateInternship(internship.id, { status: "completed" });
      const updatedApp = await getInternshipsById(internship.id);
      if (updatedApp !== undefined && updatedApp !== null) {
        setInternship(updatedApp);
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
            <div className="mb-[80px] flex w-[100%] flex-row justify-between rounded-[30px]">
              <div className="flex w-[20%] flex-col items-center space-y-[200px] py-[1%]">
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-[16px] h-[134px] w-[134px] rounded-[67px] overflow-hidden bg-White">
                    {internship?.company_details?.profile_picture ? (
                      <CldImage
                        width="134"
                        height="134"
                        src={internship?.company_details?.profile_picture}
                        alt="Description of my image"
                      />
                    ) : (
                      <div className="mb-[16px] h-[134px] w-[134px] rounded-[67px] bg-Red1"></div>
                    )}
                  </div>
                  <h1 className="mb-[6px] text-center font-sans text-[27px]/[120%] font-bold">
                    {internship?.company_details?.company_name}
                  </h1>
                  <h1 className="mb-[21px] font-sans text-[12px]/[120%] font-normal text-Gray2">
                    {internship?.company_details?.company_industry}
                  </h1>
                  <Button7
                    text="View Profile"
                    className="text-[12px]/[120%] font-normal"
                    onClick={() => router.push(`/company/profile/${internship?.company_details?.id}`)}
                  />
                </div>
                <Logout/>
              </div>
              <div className="w-[75%]">
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
                {/* <h1 className="mb-[21px] font-sans text-[36px]/[120%] text-Gold1">
              Internship information
                </h1> */}
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
                Internship information
                </button>
                {internship?.status === "ongoing" && (
                  <div className="flex w-[114px] flex-row items-center rounded-[8px] bg-Yellow2 px-[16px] py-[8px]">
                    <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Yellow1"></div>
                    <p className="font-sans text-[16px]/[120%] font-normal text-Yellow1">
                Ongoing
                    </p>
                  </div>
                )}
                {internship?.status === "pending" && (
                  <div className="flex w-[135px] flex-row items-center rounded-[8px] bg-Red2 px-[16px] py-[8px]">
                    <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Red1"></div>
                    <p className="font-sans text-[16px]/[120%] font-normal text-Red1">
                Not started
                    </p>
                  </div>
                )}
                {internship?.status === "completed" && (
                  <div className="flex w-[136px] flex-row items-center rounded-[8px] bg-Green2 px-[16px] py-[8px]">
                    <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Green1"></div>
                    <p className="font-sans text-[16px]/[120%] font-normal text-Green1">
                Completed
                    </p>
                  </div>
                )}
                <div className="mt-[21px] flex w-[80%] flex-col">
                  <div>
                    <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  ROLE:
                    </h1>
                    <p className="font-sans text-[16px]/[120%] text-Black2">
                      {internship?.job_details?.title}
                    </p>
                  </div>
                  <div className="mt-[21px]">
                    <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  LOCATION:
                    </h1>
                    <p className="font-sans text-[16px]/[120%] text-Black2">
                  On-site: {internship?.job_details?.location}
                    </p>
                  </div>
                  <div className="mt-[21px]">
                    <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  DESCRIPTION:
                    </h1>
                    <p className="font-sans text-[16px]/[120%] text-Black2">
                      {internship?.job_details?.description}
                    </p>
                  </div>
                  <div className="mt-[21px]">
                    <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  REQUIREMENTS:
                    </h1>
                    <p className="font-sans text-[16px]/[120%] text-Black2">
                      {internship?.job_details?.requirements}
                    </p>
                  </div>
                  <div className="mt-[21px]">
                    <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  DURATION:
                    </h1>
                    <p className="font-sans text-[16px]/[120%] text-Black2">
                      {internship?.job_details?.deadline}
                    </p>
                  </div>
                </div>
                {internship?.status === "ongoing" && (
                  <div className="mt-[21px] flex flex-row">
                    <button onClick={() => handleCompleteInternship()} className="mr-[18px] rounded-[999px] border-[2px] border-Red1 px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-Red1">
                End internship
                    </button>
                    <button className="rounded-[999px] bg-gradient-to-r px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-GoldenWhite">
                Rate company
                    </button>
                  </div>
                )}
                {internship?.status === "pending" && (
                  <div className="mt-[21px] flex flex-row">
                    <button className="mr-[18px] rounded-[999px] border-[2px] border-Red1 px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-Red1">
                End internship
                    </button>
                    <button onClick={() => handleStartInternship()} className="rounded-[999px] bg-gradient-to-r px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-GoldenWhite">
                Start internship
                    </button>
                  </div>
                )}
                {internship?.status === "completed" && (
                  <div className="mt-[21px] flex flex-row">
                    <button className="mr-[18px] rounded-[999px] border-[2px] border-Red1 px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-Red1">
                Write report
                    </button>
                    <button 
                      onClick={() => setIsRateStudentsModalOpen(true)}
                      className="rounded-[999px] bg-gradient-to-r px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-GoldenWhite">
                Rate company
                    </button>
                    <ReusableRateModal
                      ratingTarget="company"
                      isOpen={isRateStudentsModalOpen}
                      onClose={() => setIsRateStudentsModalOpen(false)}
                      user={{
                        company_name: internship?.company_details?.company_name || "",
                        company_industry: internship?.company_details?.company_industry || "",
                        company_profile: internship?.company_details?.profile_picture || "",
                      }}
                      title="Rate the company"
                      subtitle="Leave a review of your experience with this company"
                      viewProfileUrl={`/company/profile/${internship?.company_details?.id}`}
                      onSubmit={async (rating, review, fromDate, toDate) => {
                        try {
                          const reviewData = {
                            company: internship?.company_details?.id,
                            internship: internship?.id,
                            star: rating,
                            comment: review,
                            start_date: fromDate,
                            end_date: toDate,
                          };
                  
                          if (internship?.id) {
                            await createReview(reviewData);
                            router.push("/student/dashboard");
                          } else {
                            setFormError("Internship is undefined.");
                          }
                        } catch (err: any) {
                          setFormError(err.message || "Failed to create review.");
                        }
                      }}                  
                    />
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
