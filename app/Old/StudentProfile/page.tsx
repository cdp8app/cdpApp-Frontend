"use client";
import React, { useState } from "react";
import Link from "next/link";
import EditAboutModal from "../Components/Modals/EditAboutModal";
import Button5 from "../UsersAuthentication/Components/Button5";
import ResumeUploadButton2 from "../Components/ResumeUpload2";
import Image from "next/image";
import Portfolio from "../../public/Images/Portfolio.png";
import Footer1 from "../Components/Footer1";
import Header1 from "../Components/Header1";
import EditEducationModal from "../Components/Modals/editEducationModal";

export default function StudentProfilePage() {
  const [aboutText, setAboutText] = useState<string>(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  );
  const [isAboutModalOpen, setIsAboutModalOpen] = useState<boolean>(false);

  const openAboutModal = () => setIsAboutModalOpen(true);
  const closeAboutModal = () => setIsAboutModalOpen(false);

  const changeAboutText = (newText: string) => {
    setAboutText(newText);
    closeAboutModal();
  };
  const [educationData, setEducationData] = useState({
    university: "",
    department: "",
    fromYear: "",
    toYear: ""
  });

  const [isEditEducationModalOpen, setIsEditEducationModalOpen] =
    useState<boolean>(false);

  const openEditEducationModal = () => setIsEditEducationModalOpen(true);
  const closeEditEducationModal = () => setIsEditEducationModalOpen(false);

  const changeEducationData = (newData: {
    university: string;
    department: string;
    fromYear: string;
    toYear: string;
  }) => {
    setEducationData(newData);
    closeEditEducationModal();
  };

  return (
    <div className="flex flex-col">
      <div className="p-[1%]">
        <Header1 />
        <div className="px-[6%]">
          <div className="mb-[18px] flex flex-row justify-between border-b-[1px] border-Gold2">
            <Link
              className="flex flex-row items-center py-[12px] font-sans text-[27px]/[120%] font-normal text-Gold1"
              href={"#"}
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
            </Link>
            <Link
              className="flex flex-row items-center py-[12px] font-sans text-[12px]/[120%] font-normal text-Red1"
              href={"#"}
            >
              Log out
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
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                />
              </svg>
            </Link>
          </div>
          <div className="mb-[18px] flex w-[100%] flex-row items-center justify-between rounded-[16px] border-[1px] border-PriGold bg-gradient-to-r p-[30px]">
            <div className="flex flex-row items-center">
              <div className="mr-[24px] h-[120px] w-[120px] rounded-[60px] bg-White"></div>
              <div>
                <h1 className="mb-1 font-sans text-[36px]/[100%] font-semibold text-GoldenWhite">
                  John Doe
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
                  Med/surgery
                </h2>
              </div>
            </div>
            <div>
              <button className="rounded-[999px] border-2 border-Black2 px-[80px] py-[18px] font-sans text-[16px]/[120%] text-Black2">
                Go to settings
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
                    Not available to work
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
                  Work in another state
                </h1>
              </div>
              <div className="flex flex-row items-center">
                <div className="mr-[7px] flex flex-row items-center rounded-[6px] border-[0.5px] border-Green1 bg-Green2 px-[15px] py-[6px]">
                  <div className="h-[8px] w-[8px] rounded-[4px] bg-Green1"></div>
                  <h1 className="ml-[5px] font-sans text-[12px]/[120%] font-medium text-Green1">
                    Available to work
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
          <div className="mt-[18px] flex w-[100%] flex-row items-center justify-between rounded-[16px] border-[1px] border-PriGold px-[40px] py-[20px]">
            <h1 className="font-sans text-[27px]/[120%] font-normal text-Gray2">
              Projects completed
            </h1>
            <h1 className="ml-[5px] font-sans text-[52px]/[120%] font-bold text-Gold1">
              19
            </h1>
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

          <div className="mt-[18px] flex flex-row">
            <div className="flex w-[50%] flex-col rounded-l-[16px] border-[1px] border-PriGold px-[25px] py-[32px]">
              <div className="mb-[10px] flex w-[100%] flex-row items-center justify-between">
                <h1 className="font-sans text-[21px]/[120%] text-Black2">
                  Education
                </h1>
                <button
                  onClick={openEditEducationModal}
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
                {isEditEducationModalOpen && (
                  <EditEducationModal
                    currentData={educationData}
                    onSave={changeEducationData}
                    onClose={closeEditEducationModal}
                  />
                )}
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
                      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                    />
                  </svg>
                  <h1 className="ml-[10px] font-sans text-[16px]/[120%] text-Gray1">
                    {educationData.university ||
                      "University of Calabar, Calabar"}
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
                      d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                    />
                  </svg>
                  <h1 className="ml-[10px] font-sans text-[16px]/[120%] text-Gray1">
                    {educationData.department || "Computer Science"}
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
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                    />
                  </svg>

                  <h1 className="ml-[10px] font-sans text-[16px]/[120%] text-Gray1">
                    {educationData.fromYear || "2017"}
                    {"-"}
                    {educationData.toYear || "2019"}
                  </h1>
                </div>
                <Button5
                  // onClick={handleSave}
                  text="Add Education"
                  className="mt-[25px] text-[16px] font-normal"
                />
              </div>
              {/* <div>
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
                      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                    />
                  </svg>
                  <h1 className="ml-[10px] font-sans text-[16px]/[120%] text-Gray1">
                    University of Calabar, Calabar
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
                      d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                    />
                  </svg>

                  <h1 className="ml-[10px] font-sans text-[16px]/[120%] text-Gray1">
                    MBBS
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
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                    />
                  </svg>

                  <h1 className="ml-[10px] font-sans text-[16px]/[120%] text-Gray1">
                    2017-2025
                  </h1>
                </div>
                <Button5
                  // onClick={handleSave}
                  text="Add Education"
                  className="mt-[25px] text-[16px] font-normal"
                />
              </div> */}
            </div>
            <div className="flex w-[50%] flex-col justify-between rounded-r-[16px] border-[1px] border-PriGold px-[25px] py-[32px]">
              <div>
                <div className="mb-[10px] flex w-[100%] flex-row items-center justify-between">
                  <h1 className="font-sans text-[21px]/[120%] text-Black2">
                    Skills
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
                <div className="flex flex-row space-x-5">
                  <div className="w-auto rounded-[6px] bg-Gold3 px-[15px] py-[10px]">
                    <p className="font-sans text-[12px]/[120%] text-Gold1">
                      Communication
                    </p>
                  </div>
                  <div className="w-auto rounded-[6px] bg-Gold3 px-[15px] py-[10px]">
                    <p className="font-sans text-[12px]/[120%] text-Gold1">
                      Communication
                    </p>
                  </div>
                  <div className="w-auto rounded-[6px] bg-Gold3 px-[15px] py-[10px]">
                    <p className="font-sans text-[12px]/[120%] text-Gold1">
                      Communication
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <Button5
                  // onClick={handleSave}
                  text="Add a skill"
                  className="text-[16px] font-normal"
                />
              </div>
            </div>
          </div>
          <ResumeUploadButton2 />
          <div className="mb-[160px] mt-[18px] flex w-[100%] flex-col rounded-[16px] border-[1px] border-PriGold p-[42px]">
            <h1 className="mb-[32px] font-sans text-[21px]/[120%] font-normal text-Black2">
              Portfolio{" "}
              <span className="text-Gold1">
                {" "}
                (This increases your credibility amongst recruiters)
              </span>
            </h1>
            <div className="flex flex-row space-x-3">
              <Image
                src={Portfolio}
                alt="Portfolio"
                className="h-[200px] w-[200px] rounded-[12px] border-[1px] border-Gold3"
              />
              <button className="flex h-[200px] w-[200px] items-center justify-center rounded-[12px] border-[1px] border-Gold3 bg-Gold4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 h-[70px] w-[70px] text-Gray1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer1 />
    </div>
  );
}
