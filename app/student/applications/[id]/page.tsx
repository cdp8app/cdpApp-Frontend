"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useApplicationContext } from "@/contexts/applicationContext";
import Header1 from "@/app/Components/Header1";
import Footer1 from "@/app/Components/Footer1";
import FormAlert from "@/app/Components/FormAlert";
import { use } from "react";

interface PageProps {
  params: { id: string };
}

export default function ApplicationDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { getApplicationsById, updateApplication, loading, error } = useApplicationContext();
  const [application, setApplication] = useState<any>(null);
  const [formError, setFormError] = useState("");
  
  // Use React.use to unwrap params
  const applicationId = params.id;

  // Fetch application data
  useEffect(() => {
    const fetchApplication = async () => {
      if (!applicationId) return;

      try {
        const data = await getApplicationsById(applicationId);
        if (data) {
          setApplication(data);
        }
      } catch (err: any) {
        setFormError(`Failed to fetch application: ${err.message || err}`);
      }
    };

    fetchApplication();
  }, [applicationId, getApplicationsById]);

  const handleWithdraw = async () => {
    if (!applicationId) return;
    if (!confirm("Are you sure you want to withdraw this application?")) {
      return;
    }

    try {
      await updateApplication(applicationId, { ...application, status: "withdrawn" });
      // Update local state
      setApplication((prev: any) => (prev ? { ...prev, status: "withdrawn" } : null));
    } catch (err: any) {
      setFormError(`Failed to withdraw application: ${err.message || err}`);
    }
  };

  if (loading) {
    return (
      <div>
        <div className="mb-[100px] p-[1.5%]">
          <Header1 />
          <div className="flex items-center justify-center mt-[60px]">
            <p className="text-Gold1 font-sans text-[20px]/[120%]">Loading...</p>
          </div>
        </div>
        <Footer1 />
      </div>
    );
  }

  if (error || formError) {
    return (
      <div>
        <div className="mb-[100px] p-[1.5%]">
          <Header1 />
          <div className="px-[4%]">
            <FormAlert
              message={(error || formError) ?? ""}
              type="error"
              duration={5000}
              onClose={() => {
                if (formError) {
                  setFormError("");
                }
              }}
            />
            <button
              className="mt-4 flex flex-row items-center py-[12px] font-sans text-[16px]/[120%] font-normal text-Gold1"
              onClick={() => router.back()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
                className="size-6 mr-2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
              Go Back
            </button>
          </div>
        </div>
        <Footer1 />
      </div>
    );
  }

  if (!application) {
    return (
      <div>
        <div className="mb-[100px] p-[1.5%]">
          <Header1 />
          <div className="px-[4%]">
            <div className="mt-4 text-center">
              <p className="text-red-500 font-sans text-[18px]/[120%]">Application not found</p>
              <button
                className="mt-4 flex flex-row items-center mx-auto py-[12px] font-sans text-[16px]/[120%] font-normal text-Gold1"
                onClick={() => router.push("/student/applications")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                  className="size-6 mr-2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                Back to Applications
              </button>
            </div>
          </div>
        </div>
        <Footer1 />
      </div>
    );
  }

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
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
              Application Details
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="rounded-[18px] bg-GoldenWhite p-6 shadow-custom2">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="font-sans text-[24px]/[120%] font-medium">{application.job?.title}</h2>
                    <p className="font-sans text-[16px]/[120%] text-Gray2 mt-1">
                      {application.job?.company?.company_name}
                    </p>
                  </div>
                  <div
                    className={`flex flex-row items-center rounded-[8px] px-[16px] py-[8px] ${
                      application.status === "accepted"
                        ? "bg-Green2"
                        : application.status === "rejected"
                          ? "bg-Red2"
                          : application.status === "interview"
                            ? "bg-BlueB2"
                            : "bg-Yellow2"
                    }`}
                  >
                    <div
                      className={`mr-[5px] h-[8px] w-[8px] rounded-[4px] ${
                        application.status === "accepted"
                          ? "bg-Green1"
                          : application.status === "rejected"
                            ? "bg-Red1"
                            : application.status === "interview"
                              ? "bg-BlueB1"
                              : "bg-Yellow1"
                      }`}
                    ></div>
                    <p
                      className={`font-sans text-[12px]/[120%] font-normal ${
                        application.status === "accepted"
                          ? "text-Green1"
                          : application.status === "rejected"
                            ? "text-Red1"
                            : application.status === "interview"
                              ? "text-BlueB1"
                              : "text-Yellow1"
                      }`}
                    >
                      {(application.status ?? "").charAt(0).toUpperCase() + (application.status ?? "").slice(1)}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-sans text-[18px]/[120%] font-medium mb-2">Job Description</h3>
                    <p className="font-sans text-[14px]/[150%] text-Gray2 whitespace-pre-line">
                      {application.job?.description || "No description available"}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-sans text-[18px]/[120%] font-medium mb-2">Your Application</h3>

                    {application.cover_letter && (
                      <div className="mb-4">
                        <h4 className="font-sans text-[16px]/[120%] font-medium mb-1">Cover Letter</h4>
                        <p className="font-sans text-[14px]/[150%] text-Gray2 whitespace-pre-line p-3 bg-White rounded-md">
                          {application.cover_letter}
                        </p>
                      </div>
                    )}

                    {application.skills && (
                      <div className="mb-4">
                        <h4 className="font-sans text-[16px]/[120%] font-medium mb-1">Skills</h4>
                        <p className="font-sans text-[14px]/[150%] text-Gray2 whitespace-pre-line p-3 bg-White rounded-md">
                          {application.skills}
                        </p>
                      </div>
                    )}

                    {application.experience && (
                      <div className="mb-4">
                        <h4 className="font-sans text-[16px]/[120%] font-medium mb-1">Experience</h4>
                        <p className="font-sans text-[14px]/[150%] text-Gray2 whitespace-pre-line p-3 bg-White rounded-md">
                          {application.experience}
                        </p>
                      </div>
                    )}
                  </div>

                  {application.status !== "withdrawn" && (
                    <div className="mt-6">
                      <button
                        onClick={handleWithdraw}
                        className="rounded-[999px] border-[2px] border-Red1 px-[20px] py-[10px] font-sans text-[14px]/[100%] font-normal text-Red1 hover:bg-red-50"
                      >
                        Withdraw Application
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="rounded-[18px] bg-GoldenWhite p-6 shadow-custom2">
                <h3 className="font-sans text-[18px]/[120%] font-medium mb-4">Application Documents</h3>

                {application.resume ? (
                  <a
                    href={application.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-White rounded-md hover:bg-gray-50 transition-colors mb-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 mr-2 text-Gold1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                      />
                    </svg>
                    <span className="font-sans text-[14px]/[120%]">View Resume</span>
                  </a>
                ) : (
                  <div className="p-3 bg-White rounded-md text-Gray2 font-sans text-[14px]/[120%] mb-3">
                    No resume attached
                  </div>
                )}

                <div className="mt-6">
                  <h3 className="font-sans text-[18px]/[120%] font-medium mb-4">Application Timeline</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="bg-Gold1 rounded-full h-4 w-4 mt-1 mr-3"></div>
                      <div>
                        <p className="font-sans text-[14px]/[120%] font-medium">Applied</p>
                        <p className="font-sans text-[12px]/[120%] text-Gray2">
                          {new Date(application.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {application.status !== "pending" && (
                      <div className="flex items-start">
                        <div
                          className={`rounded-full h-4 w-4 mt-1 mr-3 ${
                            application.status === "accepted"
                              ? "bg-Green1"
                              : application.status === "rejected"
                                ? "bg-Red1"
                                : application.status === "interview"
                                  ? "bg-BlueB1"
                                  : application.status === "withdrawn"
                                    ? "bg-Gray2"
                                    : "bg-Yellow1"
                          }`}
                        ></div>
                        <div>
                          <p className="font-sans text-[14px]/[120%] font-medium">
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </p>
                          <p className="font-sans text-[12px]/[120%] text-Gray2">
                            {new Date(application.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer1 />
    </div>
  );
}