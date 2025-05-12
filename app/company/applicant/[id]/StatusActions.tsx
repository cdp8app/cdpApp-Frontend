"use client";

import React, { useState } from "react";
import { Application, useApplicationContext } from "@/contexts/applicationContext";
import { useOfferContext } from "@/contexts/offerContext";
import { useAuth } from "@/contexts/AuthContext";
import { useApplicationStatus } from "@/contexts/applicationStatusContext";
import FormAlert from "@/app/Components/FormAlert";

interface StatusActionsProps {
  application: Application | null;
  applicationId: string;
  onStatusUpdated: () => void;
  openScheduleInterviewModal: () => void;
  openRateStudentModal: () => void;
}

const StatusActions: React.FC<StatusActionsProps> = ({
  application,
  applicationId,
  onStatusUpdated,
  openScheduleInterviewModal,
  openRateStudentModal,
}) => {
  const { user } = useAuth();
  const { updateApplicationStatus, error: statusError, clearError } = useApplicationStatus();
  const { getOffers, updateOffer, createOffer } = useOfferContext();
  const [formError, setFormError] = useState("");

  const handleReject = async () => {
    try {
      await updateApplicationStatus(applicationId, "rejected");
      onStatusUpdated();
    } catch (err: any) {
      setFormError(err.message || "Failed to reject application");
    }
  };

  const handleExtendOffer = async () => {
    try {
      // First update application status
      await updateApplicationStatus(applicationId, "accepted");
      
      // Then update any associated offers
      const fetchedOffers = (await getOffers()) ?? {};
      if (fetchedOffers && typeof fetchedOffers === "object" && Array.isArray((fetchedOffers as any)?.results)) {
        const offers = (fetchedOffers as any).results;
        const offer = offers.find((o: any) => o.application === applicationId);
        
        if (offer) {
          await updateOffer(offer.id, "accepted");
        } else {
          // Create a new offer if none exists
          await createOffer({
            company: user?.id,
            student: application?.user?.id,
            application: applicationId,
            status: "accepted"
          });
        }
      }
      
      onStatusUpdated();
    } catch (err: any) {
      setFormError(err.message || "Failed to extend offer");
    }
  };

  const handleEndInternship = async () => {
    try {
      await updateApplicationStatus(applicationId, "completed");
      onStatusUpdated();
    } catch (err: any) {
      setFormError(err.message || "Failed to end internship");
    }
  };

  if (!application) return null;

  return (
    <div>
      {(formError || statusError) && (
        <FormAlert
          message={(formError || statusError) ?? ""}
          type="error"
          duration={5000}
          onClose={() => {
            if (formError) {
              setFormError("");
            } else {
              clearError();
            }
          }}
        />
      )}

      {/* Status Badge */}
      <div className="mb-4">
        {application.status === "pending" && (
          <div className="flex w-[114px] flex-row items-center rounded-[8px] bg-Yellow2 px-[16px] py-[8px]">
            <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Yellow1"></div>
            <p className="font-sans text-[16px]/[120%] font-normal text-Yellow1">
              Pending
            </p>
          </div>
        )}

        {application.status === "interview" && (
          <div className="flex w-[117px] flex-row items-center rounded-[8px] bg-BlueB1 bg-opacity-15 px-[16px] py-[8px]">
            <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-BlueB1"></div>
            <p className="font-sans text-[16px]/[120%] font-normal text-BlueB1">
              Interview
            </p>
          </div>
        )}

        {application.status === "rejected" && (
          <div className="flex w-[115px] flex-row items-center rounded-[8px] bg-Red2 px-[16px] py-[8px]">
            <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Red1"></div>
            <p className="font-sans text-[16px]/[120%] font-normal text-Red1">
              Rejected
            </p>
          </div>
        )}

        {application.status === "accepted" && (
          <div className="flex w-[123px] flex-row items-center rounded-[8px] bg-Green2 px-[16px] py-[8px]">
            <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Green1"></div>
            <p className="font-sans text-[16px]/[120%] font-normal text-Green1">
              Accepted
            </p>
          </div>
        )}
        
        {application.status === "completed" && (
          <div className="flex w-[130px] flex-row items-center rounded-[8px] bg-Gray1 bg-opacity-15 px-[16px] py-[8px]">
            <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Gray1"></div>
            <p className="font-sans text-[16px]/[120%] font-normal text-Gray1">
              Completed
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-[21px] flex flex-row">
        {application.status === "pending" && (
          <>
            <button 
              onClick={handleReject} 
              className="mr-[18px] rounded-[999px] border-[2px] border-Red1 px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-Red1"
            >
              Reject Application
            </button>
            <button
              onClick={openScheduleInterviewModal}
              className="rounded-[999px] bg-gradient-to-r from-PriGold to-Gold1 px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-GoldenWhite"
            >
              Schedule Interview
            </button>
          </>
        )}

        {application.status === "interview" && (
          <>
            <button 
              onClick={handleReject}
              className="mr-[18px] rounded-[999px] border-[2px] border-Red1 px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-Red1"
            >
              Reject Application
            </button>
            <button 
              onClick={handleExtendOffer}
              className="rounded-[999px] bg-gradient-to-r from-PriGold to-Gold1 px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-GoldenWhite"
            >
              Extend Job Offer
            </button>
          </>
        )}

        {application.status === "accepted" && (
          <>
            <button 
              onClick={handleEndInternship}
              className="mr-[18px] rounded-[999px] border-[2px] border-Red1 px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-Red1"
            >
              End Internship
            </button>
            <button
              onClick={openRateStudentModal}
              className="rounded-[999px] bg-gradient-to-r from-PriGold to-Gold1 px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-GoldenWhite"
            >
              Rate Student
            </button>
          </>
        )}

        {application.status === "completed" && (
          <div className="flex items-center justify-center w-full">
            <p className="font-sans text-[16px]/[120%] text-Gray1">
              This internship has been completed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusActions;