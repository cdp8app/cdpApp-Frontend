"use client";

import React from "react";
import { Application } from "@/contexts/applicationContext";

interface ApplicationStatusManagerProps {
  application: Application | null;
  onStatusChange: (newStatus: string) => Promise<void>;
  onScheduleInterview: () => void;
  onExtendOffer: () => void;
  onRejectApplication: () => void;
  onEndInternship: () => void;
}

const ApplicationStatusManager: React.FC<ApplicationStatusManagerProps> = ({
  application,
  onStatusChange,
  onScheduleInterview,
  onExtendOffer,
  onRejectApplication,
  onEndInternship,
}) => {
  if (!application) return null;

  return (
    <div className="application-status-manager">
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
              onClick={onRejectApplication} 
              className="mr-[18px] rounded-[999px] border-[2px] border-Red1 px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-Red1"
            >
              Reject Application
            </button>
            <button
              onClick={onScheduleInterview}
              className="rounded-[999px] bg-gradient-to-r px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-GoldenWhite"
            >
              Schedule Interview
            </button>
          </>
        )}

        {application.status === "interview" && (
          <>
            <button 
              onClick={onRejectApplication}
              className="mr-[18px] rounded-[999px] border-[2px] border-Red1 px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-Red1"
            >
              Reject Application
            </button>
            <button 
              onClick={onExtendOffer}
              className="rounded-[999px] bg-gradient-to-r px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-GoldenWhite"
            >
              Extend Job Offer
            </button>
          </>
        )}

        {application.status === "accepted" && (
          <>
            <button 
              onClick={onEndInternship}
              className="mr-[18px] rounded-[999px] border-[2px] border-Red1 px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-Red1"
            >
              End Internship
            </button>
            <button
              onClick={() => onStatusChange("completed")}
              className="rounded-[999px] bg-gradient-to-r px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-GoldenWhite"
            >
              Complete Internship
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

export default ApplicationStatusManager;