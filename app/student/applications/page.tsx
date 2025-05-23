"use client";
import Footer1 from "@/app/Components/Footer1";
import Header1 from "@/app/Components/Header1";
import { useEffect, useState } from "react";
import { useApplicationContext } from "@/contexts/applicationContext";
import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";
import FormAlert from "@/app/Components/FormAlert";

export default function StudentApplications() {
  const router = useRouter();
  const [section, setSection] = useState(1);
  const { getStudentApplications, loading, error } = useApplicationContext();
  const [applications, setApplications] = useState<
    {
      id: string
      title: string
      status?: string
      job?: {
        title: string
        company?: {
          company_name: string
          profile_picture?: string
        }
      }
      employer?: { company_name: string }
      results?: any[]
    }[]
  >([]);

  const handleSectionChange = (sectionNumber: number) => {
    setSection(sectionNumber);
  };
  const [formError, setFormError] = useState("");

  useEffect(() => {
    // Define fetchData inside useEffect to avoid dependency issues
    async function fetchData() {
      try {
        const fetchApplications = await getStudentApplications();
        console.log("Fetched applications:", fetchApplications);

        if (fetchApplications) {
          // Handle different response formats
          if (Array.isArray(fetchApplications)) {
            setApplications(fetchApplications);
          } else if (Array.isArray(fetchApplications.results)) {
            setApplications(fetchApplications.results);
          } else if (typeof fetchApplications === "object") {
            // Convert single object to array if needed
            setApplications([fetchApplications]);
          } else {
            setApplications([]);
          }
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
        setFormError(`Failed to fetch applications: ${error}`);
      }
    }

    fetchData();

    // Include getStudentApplications in the dependency array
  }, [getStudentApplications]);

  const filteredApplications = applications.filter((application) => {
    if (section === 1) return true;
    if (section === 2) return application.status?.toLowerCase() === "accepted";
    if (section === 3) return application.status?.toLowerCase() === "interview";
    if (section === 4) return application.status?.toLowerCase() === "pending";
    if (section === 5) return application.status?.toLowerCase() === "rejected";
    return false;
  });

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
              Applications
            </button>
          </div>
          <div className="space-x-[16px]">
            <button
              onClick={() => handleSectionChange(1)}
              className={`w-[186px] rounded-[30px] px-[20px] py-[12px] font-sans text-[16px]/[120%] shadow-custom2 ${section === 1 ? "bg-PriGold" : "bg-GoldenWhite text-Gray2"}`}
            >
              All
            </button>
            <button
              onClick={() => handleSectionChange(2)}
              className={`w-[186px] rounded-[30px] px-[20px] py-[12px] font-sans text-[16px]/[120%] shadow-custom2 ${section === 2 ? "bg-PriGold" : "bg-GoldenWhite text-Gray2"}`}
            >
              Accepted
            </button>
            <button
              onClick={() => handleSectionChange(3)}
              className={`w-[186px] rounded-[30px] px-[20px] py-[12px] font-sans text-[16px]/[120%] shadow-custom2 ${section === 3 ? "bg-PriGold" : "bg-GoldenWhite text-Gray2"}`}
            >
              Interview
            </button>
            <button
              onClick={() => handleSectionChange(4)}
              className={`w-[186px] rounded-[30px] px-[20px] py-[12px] font-sans text-[16px]/[120%] shadow-custom2 ${section === 4 ? "bg-PriGold" : "bg-GoldenWhite text-Gray2"}`}
            >
              Pending
            </button>
            <button
              onClick={() => handleSectionChange(5)}
              className={`w-[186px] rounded-[30px] px-[20px] py-[12px] font-sans text-[16px]/[120%] shadow-custom2 ${section === 5 ? "bg-PriGold" : "bg-GoldenWhite text-Gray2"}`}
            >
              Rejection
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
              <div className="mt-[20px] space-y-6">
                {filteredApplications.length === 0 ? (
                  <div className="flex items-center justify-center mt-[60px]">
                    <p className="text-Gray2 font-sans text-[20px]/[120%]">No applications found</p>
                  </div>
                ) : (
                  filteredApplications.map((app: any, index: number) => (
                    <div
                      key={index}
                      className="flex w-[100%] flex-row items-center justify-between rounded-[18px] bg-GoldenWhite py-[16px] pl-[16px] pr-[55px] shadow-custom2"
                    >
                      <div className="flex flex-row items-center">
                        <div className="h-[127px] w-[127px] rounded-[12px] overflow-hidden bg-White">
                          {app?.job?.company?.profile_picture ? (
                            <CldImage
                              width="127"
                              height="127"
                              src={app?.job?.company?.profile_picture}
                              alt="Company logo"
                            />
                          ) : (
                            <div className="h-[127px] w-[127px] rounded-[12px] bg-Gray3"></div>
                          )}
                        </div>
                        <div className="ml-[12px] flex flex-col">
                          <h1 className="mb-[6px] font-sans text-[16px]/[120%]">
                            {app.job?.title || app.title || "Untitled Position"}
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
                              {app.job?.company?.company_name || app.employer?.company_name || "Unknown Company"}
                            </h1>
                          </div>
                          <button
                            onClick={() => router.push(`/student/applications/${app.id}`)}
                            className="mt-[18px] flex w-[136px] flex-row items-center justify-center rounded-[999px] border-[2px] border-PriGold px-[20px] py-[10px] font-sans text-[12px]/[100%] font-normal text-PriGold"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                      <div
                        className={`flex flex-row items-center rounded-[8px] px-[16px] py-[8px] ${
                          app.status?.toLowerCase() === "accepted"
                            ? "bg-Green2"
                            : app.status?.toLowerCase() === "rejected"
                              ? "bg-Red2"
                              : app.status?.toLowerCase() === "interview"
                                ? "bg-BlueB2"
                                : "bg-Yellow2"
                        }`}
                      >
                        <div
                          className={`mr-[5px] h-[8px] w-[8px] rounded-[4px] ${
                            app.status?.toLowerCase() === "accepted"
                              ? "bg-Green1"
                              : app.status?.toLowerCase() === "rejected"
                                ? "bg-Red1"
                                : app.status?.toLowerCase() === "interview"
                                  ? "bg-BlueB1"
                                  : "bg-Yellow1"
                          }`}
                        ></div>
                        <p
                          className={`font-sans text-[12px]/[120%] font-normal ${
                            app.status?.toLowerCase() === "accepted"
                              ? "text-Green1"
                              : app.status?.toLowerCase() === "rejected"
                                ? "text-Red1"
                                : app.status?.toLowerCase() === "interview"
                                  ? "text-BlueB1"
                                  : "text-Yellow1"
                          }`}
                        >
                          {(app.status ?? "Pending").charAt(0).toUpperCase() +
                            (app.status ?? "Pending").slice(1).toLowerCase()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer1 />
    </div>
  );
}
