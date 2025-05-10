"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Header1 from "@/app/Components/Header1";
import Button7 from "@/app/user/Components/Button7";
import Footer1 from "@/app/Components/Footer1";
import Link from "next/link";
import ScheduleInterviewModal from "./schedule-interview/model";
import ViewScheduledInterviewModal from "./view-interview/modal";
import { Application, useApplicationContext } from "@/contexts/applicationContext";
import { useOfferContext } from "@/contexts/offerContext";
import { useAuth } from "@/contexts/AuthContext";
import { useReviewContext } from "@/contexts/reviewContext";
import { CldImage } from "next-cloudinary";
import ReusableRateModal from "@/app/Components/ReusableRateModal";
import FormAlert from "@/app/Components/FormAlert";
import StatusActions from "./StatusActions";
import { ApplicationStatusProvider } from "@/contexts/applicationStatusContext";

export default function CompanyJobApplicantInfo() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const applicationId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [application, setApplication] = useState<Application | null>(null);
  const { getApplicationsById, loading, error } = useApplicationContext();
  const { getOffers } = useOfferContext();
  const [formError, setFormError] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [isScheduleInterviewModalOpen, setIsScheduleInterviewModalOpen] = useState(false);
  const [isViewScheduledInterviewModalOpen, setIsViewScheduledInterviewModalOpen] = useState(false);
  const [isRateStudentsModalOpen, setIsRateStudentsModalOpen] = useState(false);
  const [offers, setOffers] = useState<{ id: string }[]>([]);
  const { createReview } = useReviewContext();

  const fetchApplicationDetails = async () => {
    if (applicationId) {
      const application = await getApplicationsById(applicationId);
      setApplication(application);
    }
  };
  
  useEffect(() => {
    fetchApplicationDetails();
  }, [applicationId]);

  const fetchOffers = async () => {
    try {
      const fetchedOffers = (await getOffers()) ?? {};
    
      if (fetchedOffers && typeof fetchedOffers === "object" && Array.isArray((fetchedOffers as any)?.results)) {
        setOffers((fetchedOffers as any).results);
      }
    } catch (error: any) {
      setFormError(error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleScheduleInterview = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert DD/MM to YYYY-MM-DD
    const [day, month] = interviewDate.split("/");
    const currentYear = new Date().getFullYear();

    const formattedDate = `${currentYear}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

    // Combine into ISO 8601 format
    const formattedTime = `${interviewTime}:00`;

    try {
      const offerData = {
        company: user?.id,
        student: application?.user?.id,
        application: applicationId,
        interview_date: formattedDate,
        interview_time: formattedTime,
        status: "interview"
      };
  
      if (applicationId) {
        await fetchApplicationDetails();
        setIsScheduleInterviewModalOpen(false);
      } else {
        setFormError("Application ID is undefined.");
      }
    } catch (err: any) {
      setFormError(err.message || "Failed to create offer.");
    }
  };

  return (
    <ApplicationStatusProvider>
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
                      {application?.user?.profile_picture ? (
                        <CldImage
                          width="135"
                          height="135"
                          src={application?.user?.profile_picture}
                          alt="Description of my image"
                        />
                      ) : (
                        <div className="mb-[16px] h-[134px] w-[134px] rounded-[67px] bg-Red1"></div>
                      )}
                    </div>
                    <h1 className="mb-[6px] text-center font-sans text-[27px]/[120%] font-bold">
                      {application?.user?.full_name}
                    </h1>
                    <h1 className="mb-[21px] font-sans text-[12px]/[120%] font-normal text-Gray2">
                      {application?.user?.course}
                    </h1>
                    <Button7
                      text="View profile"
                      className="text-[12px]/[120%] font-normal"
                      onClick={() => router.push(`/student/profile/${application?.user?.id}`)}
                    />
                  </div>
                </div>
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
                  <div className="mb-[21px] border-b-[1px] border-Gold3">
                    <button onClick={() => router.back()} className="flex flex-row items-center py-[12px] font-sans text-[36px]/[120%] font-normal text-Gold1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="size-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 19.5 8.25 12l7.5-7.5"
                        />
                      </svg>
                      Application status
                    </button>
                  </div>
                  
                  {/* Status Actions Component */}
                  <StatusActions 
                    application={application}
                    applicationId={applicationId}
                    onStatusUpdated={fetchApplicationDetails}
                    openScheduleInterviewModal={() => setIsScheduleInterviewModalOpen(true)}
                    openRateStudentModal={() => setIsRateStudentsModalOpen(true)}
                  />

                  {application?.status === "interview" && (
                    <button
                      onClick={() => setIsViewScheduledInterviewModalOpen(true)}
                      className="my-[21px] rounded-[999px] border-[2px] border-PriGold px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-PriGold"
                    >
                      See schedule
                    </button>
                  )}
                  
                  <ViewScheduledInterviewModal
                    isViewScheduledInterviewModalOpen={isViewScheduledInterviewModalOpen}
                    onViewScheduledInterviewModalClose={() => setIsViewScheduledInterviewModalOpen(false)}
                  >
                    {/* Interview schedule details */}
                    <div className="mb-[24px]">
                      <h1 className="font-sans text-[21px]/[120%] text-PriGold">
                        Interview
                      </h1>
                      <h1 className="font-sans text-[12px]/[120%] text-Gray1">
                        DATE AND TIME FOR YOUR SCHEDULED INTERVIEW
                      </h1>
                    </div>
                    {/* Rest of the modal content */}
                    {/* ... */}
                    <button
                      onClick={() => setIsViewScheduledInterviewModalOpen(false)}
                      className="rounded-[999px] bg-PriGold px-[80px] py-[18px] font-sans text-[16px]/[120%] text-GoldenWhite"
                    >
                      Close
                    </button>
                  </ViewScheduledInterviewModal>

                  <div className="mt-[21px] flex w-[80%] flex-col">
                    <div>
                      <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                        COVER LETTER:
                      </h1>
                      <p className="font-sans text-[16px]/[120%] text-Black2">
                        {application?.cover_letter}
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
                  </div>

                  <ScheduleInterviewModal
                    isScheduleInterviewModalOpen={isScheduleInterviewModalOpen}
                    onScheduleInterviewModalClose={() => setIsScheduleInterviewModalOpen(false)}
                  >
                    {/* Schedule interview form */}
                    <div className="mb-[24px]">
                      <h1 className="font-sans text-[21px]/[120%] text-PriGold">
                        Schedule interview
                      </h1>
                      <h1 className="font-sans text-[12px]/[120%] text-Gray1">
                        SELECT A DATE AND TIME FOR THE INTERVIEW
                      </h1>
                    </div>
                    {/* Rest of the form */}
                    {/* ... */}
                    <div className="mt-[28px] flex flex-row space-x-[24px]">
                      <button onClick={handleScheduleInterview} className="flex flex-row items-center rounded-[999px] bg-PriGold px-[70px] py-[18px] font-sans text-[16px]/[120%] text-GoldenWhite">
                        Schedule interview
                      </button>
                      <button
                        onClick={() => setIsScheduleInterviewModalOpen(false)}
                        className="rounded-[999px] border-[2px] border-PriGold px-[80px] py-[18px] font-sans text-[16px]/[120%] text-PriGold"
                      >
                        Cancel
                      </button>
                    </div>
                  </ScheduleInterviewModal>

                  <ReusableRateModal
                    ratingTarget="student"
                    isOpen={isRateStudentsModalOpen}
                    onClose={() => setIsRateStudentsModalOpen(false)}
                    user={{
                      full_name: application?.user?.full_name || "",
                      course: application?.user?.course || "",
                      profile_picture: application?.user?.profile_picture || "",
                    }}
                    title="Rate the student"
                    subtitle="Leave a review of your experience with this student"
                    viewProfileUrl={`/student/profile/${application?.user?.id}`}
                    onSubmit={async (rating, review, fromDate, toDate) => {
                      try {
                        const reviewData = {
                          student: application?.user?.id,
                          application: application?.id,
                          star: rating,
                          comment: review,
                          start_date: fromDate,
                          end_date: toDate,
                        };
                
                        if (application?.id) {
                          await createReview(reviewData);
                          router.push("/company/dashboard");
                        } else {
                          setFormError("Application is undefined.");
                        }
                      } catch (err: any) {
                        setFormError(err.message || "Failed to create review.");
                      }
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <Footer1 />
      </div>
    </ApplicationStatusProvider>
  );
}