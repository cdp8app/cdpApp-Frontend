"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/./contexts/AuthContext";
import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";
import { useJobContext } from "@/contexts/jobContext";

import Link from "next/link";
import EditAboutModal from "../../Components/Modals/EditAboutModal";
import Button5 from "../../user/Components/Button5";
import Footer1 from "../../Components/Footer1";
import Header1 from "../../Components/Header1";
import Logout from "@/app/user/auth/logout/page";

export default function CompanyProfile() {

  const router = useRouter();
  const [formError, setFormError] = useState("");

  const { user, updateProfile, getCompanyProfile, loading, error, clearError } = useAuth();
  const { getPostedJobs } = useJobContext();
  const [company_name, setCompanyName] = useState<string>("");
  const [company_industry, setCompanyIndustry] = useState<string>("");
  const [aboutText, setAboutText] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState("");
  const [phone_number, setPhoneNumber] = useState<string>("");
  const [company_website, setCompanyWebsite] = useState<string>("");
  const [company_size, setCompanySize] = useState<string[]>([]);
  const [company_linkedin, setCompanyLinkedin] = useState<string>("");
  const [company_facebook, setCompanyFacebook] = useState<string>("");
  const [company_twitter, setCompanyTwitter] = useState<string>("");
  const [company_instagram, setCompanyInstagram ] = useState<string>("");
  const [isAboutModalOpen, setIsAboutModalOpen] = useState<boolean>(false);
  const [jobs, setJobs] = useState<{ title: string; status?: string; results?: any[] }[]>([]);

  const openAboutModal = () => setIsAboutModalOpen(true);
  const closeAboutModal = () => setIsAboutModalOpen(false);

  const changeAboutText = async (newText: string) => {
    setAboutText(newText);
    closeAboutModal();

    if (!user?.id || !user?.email) return;

    try {
      await updateProfile({
        id: user.id,
        email: user.email,
        userType: "student",
        bio: newText,
      });
    } catch (err: any) {
      setFormError(`Failed to update bio: ${err}`);
    }
  };

  useEffect(() => {
    const fetchData  = async () => {
      try {
        const fetchedJobs = (await getPostedJobs()) ?? {};
   
        if (fetchedJobs && typeof fetchedJobs === "object" && Array.isArray((fetchedJobs as any)?.results)) {
          setJobs((fetchedJobs as any).results);
        }
      } catch (error) {
        setFormError(`Failed to fetch jobs, ${error}`);
      }
    };
    fetchData ();
  }, []);

  const allJobsCount = jobs?.length || 0;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getCompanyProfile();

        if (profile && profile.company_name) setCompanyName(profile.company_name);
        if (profile && profile.company_industry) setCompanyIndustry(profile.company_industry);
        if (profile && profile.company_size) setCompanySize(profile.company_size.split(",").map((size: string) => size.trim()));
        if (profile && profile.company_description) setAboutText(profile.company_description);
        if (profile && profile.phone_number) setPhoneNumber(profile.phone_number);
        if (profile && profile.company_facebook) setCompanyFacebook(profile.company_facebook);
        if (profile && profile.company_instagram) setCompanyInstagram(profile.company_instagram);
        if (profile && profile.company_linkedin) setCompanyLinkedin(profile.company_linkedin);
        if (profile && profile.company_twitter) setCompanyTwitter(profile.company_twitter);
        if (profile && profile.company_website) setCompanyWebsite(profile.company_website);
        if (profile && profile.profile_picture) setProfilePicture(profile.profile_picture);
        if (profile && profile.phone_number) setPhoneNumber(profile.phone_number);
  
        // Set other profile data as needed (e.g., name, profile picture)
      } catch (error: any) {
        setFormError(`Failed to fetch profile, ${error}`);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="p-[1%]">
        <Header1 />
        <div className="px-[6%]">
          <div className="mb-[18px] flex flex-row justify-between border-b-[1px] border-Gold2">
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
              Your Profile
            </button>
            <Logout/>
          </div>
          <div className="mb-[18px] flex w-[100%] flex-row items-center justify-between rounded-[16px] border-[1px] border-PriGold bg-gradient-to-r p-[30px]">
            <div className="flex flex-row items-center">
              <div className="mr-[24px] h-[120px] w-[120px] rounded-[60px] overflow-hidden bg-White">
                {profilePicture ? (
                  <CldImage
                    width="120"
                    height="120"
                    src={profilePicture}
                    alt="Description of my image"
                  />
                ) : (
                  <div className="h-full w-full bg-White flex items-center justify-center text-gray-400">
          No Image
                  </div>
                )}
              </div>
              <div>
                <h1 className="mb-1 font-sans text-[36px]/[100%] font-semibold text-GoldenWhite">
                  {company_name}
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
                      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                    />
                  </svg>
                  {company_industry}
                </h2>
              </div>
            </div>
            <div>
              <button onClick={() => router.push("/settings")} className="rounded-[999px] border-2 border-Black2 px-[80px] py-[18px] font-sans text-[16px]/[120%] text-Black2">
                Profile settings
              </button>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex w-[50%] flex-row items-center justify-between rounded-l-[16px] border-[1px] border-PriGold px-[25px] py-[32px]">
              <div>
                <h1 className="font-sans text-[21px]/[120%] text-Gold1">
                  Job Availability
                </h1>
              </div>
              <div className="flex flex-row items-center">
                <div className="mr-[7px] flex flex-row items-center rounded-[6px] border-[0.5px] border-Red1 bg-Red2 px-[15px] py-[6px]">
                  <div className="h-[8px] w-[8px] rounded-[4px] bg-Red1"></div>
                  <h1 className="ml-[5px] font-sans text-[12px]/[120%] font-medium text-Red1">
                    Not hiring
                  </h1>
                </div>
                <div className="flex h-[20px] w-[20px] items-center justify-center rounded-[10px] border-[2px] border-Gray2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="size-3 text-Gray2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex w-[50%] flex-row items-center justify-between rounded-r-[16px] border-[1px] border-PriGold px-[25px] py-[32px]">
              <div>
                <h1 className="font-sans text-[21px]/[120%] text-Gold1">
                  Can work remotely?
                </h1>
              </div>
              <div className="flex flex-row items-center">
                <div className="mr-[7px] flex flex-row items-center rounded-[6px] border-[0.5px] border-Green1 bg-Green2 px-[15px] py-[6px]">
                  <div className="h-[8px] w-[8px] rounded-[4px] bg-Green1"></div>
                  <h1 className="ml-[5px] font-sans text-[12px]/[120%] font-medium text-Green1">
                    Yes
                  </h1>
                </div>
                <div className="flex h-[20px] w-[20px] items-center justify-center rounded-[10px] border-[2px] border-Gray2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="size-3 text-Gray2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[18px] flex w-[100%] flex-col rounded-[16px] border-[1px] border-PriGold px-[40px] py-[20px]">
            <div className="flex w-[100%] flex-row items-center justify-between">
              <h1 className="font-sans text-[21px]/[120%] font-normal text-Gray2">
                Jobs posted
              </h1>
              <h1 className="ml-[5px] font-sans text-[52px]/[120%] font-bold text-Gold1">
                {allJobsCount}
              </h1>
            </div>
            <button onClick={() => router.push("/company/job/create")} className="mt-[12px] flex max-w-[280px] justify-center justify-self-start rounded-[999px] bg-PriGold px-[60px] py-[14px] font-sans text-GoldenWhite">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="mr-[12px] size-6 text-GoldenWhite"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Post a new job
            </button>
          </div>
          <div className="mt-[18px] flex w-[100%] flex-col rounded-[16px] border-[1px] border-PriGold px-[51px] py-[30px]">
            <div className="flex flex-row items-center justify-between">
              <h1 className="font-sans text-[21px]/[120%] text-Black2">
                About Text
              </h1>
              <button
                onClick={openAboutModal}
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
            <p className="mt-[12px] text-justify font-sans text-[16px]/[120%] font-normal text-Gray1">
              {aboutText}
            </p>
          </div>

          {isAboutModalOpen && (
            <EditAboutModal
              currentText={aboutText}
              onSave={changeAboutText}
              onClose={closeAboutModal}
            />
          )}
          <div className="mt-[18px] flex w-[100%] flex-col rounded-[16px] border-[1px] border-PriGold px-[40px] py-[20px]">
            <div className="flex w-[100%] flex-row items-center justify-between">
              <h1 className="font-sans text-[21px]/[120%] font-normal text-Gray2">
                Company Size
              </h1>
              <h1 className="ml-[5px] font-sans text-[36px]/[120%] font-normal text-Gold1">
                {company_size}
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
                    {phone_number}
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
                    {company_website}
                  </h1>
                </div>
                <Button5
                  // onClick={handleSave}
                  text="Add contact"
                  className="mt-[25px] text-[16px] font-normal"
                />
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
                      {company_linkedin}
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
                      {company_facebook}
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
                      {company_twitter}
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
                      {company_instagram}
                    </h1>
                  </div>
                  <Button5
                    // onClick={handleSave}
                    text="Add Social Link"
                    className="mt-[25px] text-[16px] font-normal"
                  />
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
