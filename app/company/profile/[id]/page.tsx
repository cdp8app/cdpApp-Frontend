"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Portfolio from "../../../../public/Images/Portfolio.png";
import Footer1 from "../../../Components/Footer1";
import Header1 from "../../../Components/Header1";
import ResumeUploadButton3 from "../../../Components/ResumeUpload3";
import { User, useAuth } from "@/contexts/AuthContext";
import { CldImage } from "next-cloudinary";

export default function ViewCompanyProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { getUserDetails } = useAuth();
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userId) {
        const application = await getUserDetails(userId);
        setUser(application);
      }
    };
      
    fetchUserDetails();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="p-[1%]">
        <Header1 />
        <div className="px-[6%]">
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
              {user?.company_name}&apos;s Profile
            </button>
          </div>
          <div className="mb-[18px] flex w-[100%] flex-row items-center justify-between rounded-[16px] border-[1px] border-PriGold bg-gradient-to-r p-[30px]">
            <div className="flex flex-row items-center">
              <div className="mr-[24px] h-[120px] w-[120px] rounded-[60px] overflow-hidden bg-White">
                {user?.profile_picture ? (
                  <CldImage
                    width="120"
                    height="120"
                    src={user?.profile_picture}
                    alt="Description of my image"
                  />
                ) : (
                  <div className="mr-[24px] h-[120px] w-[120px] rounded-[60px] bg-White"></div>
                )}
              </div>
              <div>
                <h1 className="mb-1 font-sans text-[36px]/[100%] font-semibold text-GoldenWhite">
                  {user?.company_name}
                </h1>
                <h2 className="flex flex-row font-sans text-[16px] text-Gold3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="mr-[11px] size-6 text-Gold3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                    />
                  </svg>
                  {user?.company_industry}
                </h2>
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex w-[50%] flex-row items-center justify-between rounded-l-[16px] border-[1px] border-PriGold px-[25px] py-[32px]">
              <div>
                <h1 className="font-sans text-[21px]/[120%] text-Gold1">
                  Job Availability
                </h1>
              </div>
              <div className="mr-[7px] flex flex-row items-center rounded-[6px] border-[0.5px] border-Green1 bg-Green2 px-[15px] py-[6px]">
                <div className="h-[8px] w-[8px] rounded-[4px] bg-Green1"></div>
                <h1 className="ml-[5px] font-sans text-[12px]/[120%] font-medium text-Green1">
                Hiring
                </h1>
              </div>
            </div>
            <div className="flex w-[50%] flex-row items-center justify-between rounded-r-[16px] border-[1px] border-PriGold px-[25px] py-[32px]">
              <div>
                <h1 className="font-sans text-[21px]/[120%] text-Gold1">
                Can work remotely?
                </h1>
              </div>
              <div className="mr-[7px] flex flex-row items-center rounded-[6px] border-[0.5px] border-Green1 bg-Green2 px-[15px] py-[6px]">
                <div className="h-[8px] w-[8px] rounded-[4px] bg-Green1"></div>
                <h1 className="ml-[5px] font-sans text-[12px]/[120%] font-medium text-Green1">
                Yes
                </h1>
              </div>
            </div>
          </div>
          <div className="mt-[18px] flex w-[100%] flex-row items-center justify-between rounded-[16px] border-[1px] border-PriGold px-[40px] py-[20px]">
            <h1 className="font-sans text-[27px]/[120%] font-normal text-Gray2">
              Job posted
            </h1>
            <h1 className="ml-[5px] font-sans text-[52px]/[120%] font-bold text-Gold1">
              39
            </h1>
          </div>
          <div className="mt-[18px] flex w-[100%] flex-col rounded-[16px] border-[1px] border-PriGold px-[51px] py-[30px]">
            <div className="flex flex-row items-center justify-between">
              <h1 className="font-sans text-[21px]/[120%] text-Black2">
                About Text
              </h1>
            </div>
            <p className="mt-[12px] text-justify font-sans text-[16px]/[120%] font-normal text-Gray1">
              {user?.company_description}
            </p>
          </div>

          <div className="mt-[18px] flex w-[100%] flex-col rounded-[16px] border-[1px] border-PriGold px-[40px] py-[20px]">
            <div className="flex w-[100%] flex-row items-center justify-between">
              <h1 className="font-sans text-[21px]/[120%] font-normal text-Gray2">
                Company Size
              </h1>
              <h1 className="ml-[5px] font-sans text-[36px]/[120%] font-normal text-Gold1">
                {user?.company_size}
              </h1>
            </div>
          </div>

          <div className="mt-[18px] flex flex-row mb-[154px]">
            <div className="flex w-[50%] flex-col rounded-l-[16px] border-[1px] border-PriGold px-[25px] py-[32px]">
              <div className="mb-[10px] flex w-[100%] flex-row items-center justify-between">
                <h1 className="font-sans text-[21px]/[120%] text-Black2">
                  Contact
                </h1>
                <button
                  // onClick={openAboutModal}
                  className="flex h-[50px] w-[50px] items-center justify-center rounded-[25px] bg-Gold4 text-PriGold hover:bg-Gold2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                </button>
              </div>
              <div>
                <div className="flex flex-row items-center pb-[10px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 text-Gold0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>

                  <h1 className="ml-[10px] font-sans text-[16px]/[120%] text-Gray1">
                    {user?.email}
                  </h1>
                </div>
                <div className="flex flex-row items-center pb-[10px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 text-Gold0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>

                  <h1 className="ml-[10px] font-sans text-[16px]/[120%] text-Gray1">
                    {user?.phone_number}
                  </h1>
                </div>
                <div className="flex flex-row items-center pb-[10px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 text-Gold0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                    />
                  </svg>

                  <h1 className="ml-[10px] font-sans text-[16px]/[120%] text-Gray1">
                    {user?.company_website}
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex w-[50%] flex-col justify-between rounded-r-[16px] border-[1px] border-PriGold px-[25px] py-[32px]">
              <div>
                <div className="mb-[10px] flex w-[100%] flex-row items-center justify-between">
                  <h1 className="font-sans text-[21px]/[120%] text-Black2">
                    Social links
                  </h1>
                  <button
                    // onClick={openAboutModal}
                    className="flex h-[50px] w-[50px] items-center justify-center rounded-[25px] bg-Gold4 text-PriGold hover:bg-Gold2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                      />
                    </svg>
                  </button>
                </div>
                <div>
                  <div className="flex flex-row items-center pb-[10px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 text-Gold0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      />
                    </svg>

                    <h1 className="ml-[10px] font-sans text-[16px]/[120%] text-Gray1">
                      {user?.company_linkedin}
                    </h1>
                  </div>
                  <div className="flex flex-row items-center pb-[10px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 text-Gold0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                      />
                    </svg>

                    <h1 className="ml-[10px] font-sans text-[16px]/[120%] text-Gray1">
                      {user?.company_facebook}
                    </h1>
                  </div>
                  <div className="flex flex-row items-center pb-[10px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 text-Gold0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                      />
                    </svg>

                    <h1 className="ml-[10px] font-sans text-[16px]/[120%] text-Gray1">
                      {user?.company_twitter}
                    </h1>
                  </div>
                  <div className="flex flex-row items-center pb-[10px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 text-Gold0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                      />
                    </svg>

                    <h1 className="ml-[10px] font-sans text-[16px]/[120%] text-Gray1">
                      {user?.company_instagram}
                    </h1>
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
