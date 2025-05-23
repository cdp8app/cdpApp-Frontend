"use client";
import React, { useState } from "react";
import Header1 from "@/app/Components/Header1";
import Button7 from "@/app/user/Components/Button7";
import Footer1 from "@/app/Components/Footer1";
import Link from "next/link";
import ScheduleInterviewModal from "./ScheduleInterviewModal/modal";
import ViewScheduledInterviewModal from "./ViewScheduledInterview/modal";
import RateStudentsModal from "@/app/Old/RateStudents/modal";
import StarRating from "@/app/Components/StarRating";

export default function CompanyJobApplicantInfo() {
  const [isScheduleInterviewModalOpen, setIsScheduleInterviewModalOpen] =
    useState(false);
  const [
    isViewScheduledInterviewModalOpen,
    setIsViewScheduledInterviewModalOpen
  ] = useState(false);
  const [isRateStudentsModalOpen, setIsRateStudentsModalOpen] = useState(false);
  return (
    <div className="flex flex-col">
      <div className="p-[2%]">
        <Header1 />
        <div className="mb-[80px] flex w-[100%] flex-row justify-between rounded-[30px]">
          <div className="flex w-[20%] flex-col items-center space-y-[200px] py-[1%]">
            <div className="flex flex-col items-center justify-center">
              <div className="mb-[16px] h-[134px] w-[134px] rounded-[67px] bg-Red1"></div>
              <h1 className="mb-[6px] text-center font-sans text-[27px]/[120%] font-bold">
                John Doe
              </h1>
              <h1 className="mb-[21px] font-sans text-[12px]/[120%] font-normal text-Gray2">
                MEDICINE/SURGERY
              </h1>
              <Button7
                text="View profile"
                className="text-[12px]/[120%] font-normal"
              />
            </div>
          </div>
          <div className="w-[75%]">
            <Link href={"#"} className="mb-[21px] flex flex-row items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-8 text-Gray1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
              <p className="font-sans text-[36px]/[120%] text-Gold1">
                Application status
              </p>
            </Link>
            <div className="flex w-[114px] flex-row items-center rounded-[8px] bg-Yellow2 px-[16px] py-[8px]">
              <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Yellow1"></div>
              <p className="font-sans text-[16px]/[120%] font-normal text-Yellow1">
                Pending
              </p>
            </div>
            <div className="flex w-[117px] flex-row items-center rounded-[8px] bg-BlueB1 bg-opacity-15 px-[16px] py-[8px]">
              <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-BlueB1"></div>
              <p className="font-sans text-[16px]/[120%] font-normal text-BlueB1">
                Interview
              </p>
            </div>
            <div className="flex w-[115px] flex-row items-center rounded-[8px] bg-Red2 px-[16px] py-[8px]">
              <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Red1"></div>
              <p className="font-sans text-[16px]/[120%] font-normal text-Red1">
                Rejected
              </p>
            </div>
            <div className="flex w-[123px] flex-row items-center rounded-[8px] bg-Green2 px-[16px] py-[8px]">
              <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Green1"></div>
              <p className="font-sans text-[16px]/[120%] font-normal text-Green1">
                Accepted
              </p>
            </div>
            <button className="my-[21px] rounded-[999px] border-[2px] border-PriGold px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-PriGold">
              Back to applications
            </button>

            <button
              onClick={() => setIsViewScheduledInterviewModalOpen(true)}
              className="my-[21px] rounded-[999px] border-[2px] border-PriGold px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-PriGold"
            >
              See schedule
            </button>
            <ViewScheduledInterviewModal
              isViewScheduledInterviewModalOpen={
                isViewScheduledInterviewModalOpen
              }
              onViewScheduledInterviewModalClose={() =>
                setIsViewScheduledInterviewModalOpen(false)
              }
            >
              <div className="mb-[24px]">
                <h1 className="font-sans text-[21px]/[120%] text-PriGold">
                  Interview
                </h1>
                <h1 className="font-sans text-[12px]/[120%] text-Gray1">
                  DATE AND TIME FOR YOUR SCHEDULED INTERVIEW
                </h1>
                {/* <button
                    onClick={() => setIsScheduleInterviewModalOpen(false)}
                  >
                  </button> */}
              </div>
              <div className="flex flex-row items-center rounded-[15px] bg-Gold3 px-[20px] py-[16px]">
                <div className="mr-[16px] h-[100px] w-[100px] rounded-[50px] bg-red-800"></div>
                <div className="flex h-[100%] flex-col justify-between">
                  <h1 className="font-sans text-[16px]/[100%] font-normal text-Black2">
                    John Doe
                  </h1>
                  <h2 className="flex flex-row font-sans text-[16px] text-Gray2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="mr-[6px] size-6 text-Gray2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                      />
                    </svg>
                    COMPUTER ENGINEERING
                  </h2>
                  <Link
                    href={"#"}
                    className="max-w-[136px] rounded-[999px] border-[2px] border-PriGold px-[20px] py-[10px] text-center font-sans text-[12px]/[120%] text-PriGold"
                  >
                    View details
                  </Link>
                </div>
              </div>
              <div className="mt-[24px] flex flex-row justify-between">
                <div className="w-[45%]">
                  <h1 className="mb-[10px] font-sans text-[16px]/[120%] text-Gray2">
                    Date
                  </h1>
                  <button className="mt-[6px] flex w-[100%] flex-row items-center space-x-[8px] rounded-[12px] bg-GoldenWhite p-[18px] shadow-custom2">
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
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                      />
                    </svg>
                    <div className="h-[37px] w-[2px] bg-Gray2"></div>
                    <h1 className="font-sans text-[16px] text-Gray2">
                      27th February, 2027
                    </h1>
                  </button>
                </div>
                <div className="w-[45%]">
                  <h1 className="mb-[10px] font-sans text-[16px]/[120%] text-Gray2">
                    Time
                  </h1>
                  <button className="mt-[6px] flex w-[100%] flex-row items-center space-x-[8px] rounded-[12px] bg-GoldenWhite p-[18px] shadow-custom2">
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
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>

                    <div className="h-[37px] w-[2px] bg-Gray2"></div>
                    <h1 className="font-sans text-[16px] text-Gray2">
                      09:00 AM
                    </h1>
                  </button>
                </div>
              </div>
              <div className="mt-[24px] flex flex-row items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="mr-[6px] size-6 text-Gold1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  />
                </svg>
                <h1 className="font-sans text-[12px]/[120%] text-Gold1">
                  Reminder: You&apos;re 3 weeks away from the interview&apos;s
                  date
                </h1>
              </div>
              <div className="mt-[28px] flex flex-row space-x-[24px]">
                <button className="flex flex-row items-center rounded-[999px] border-[2px] border-Red1 px-[60px] py-[18px] font-sans text-[16px]/[120%] text-Red1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="mr-[12px] size-6 text-Red1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                    />
                  </svg>
                  Cancel interview
                </button>
                <button
                  // onClick={() => setIsScheduleInterviewModalOpen(false)}
                  onClick={() => setIsViewScheduledInterviewModalOpen(false)}
                  className="rounded-[999px] bg-PriGold px-[80px] py-[18px] font-sans text-[16px]/[120%] text-GoldenWhite"
                >
                  Close
                </button>
              </div>
            </ViewScheduledInterviewModal>
            <button className="my-[21px] rounded-[999px] border-[2px] border-PriGold px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-PriGold">
              Proceed to interview
            </button>
            <div className="flex w-[80%] flex-col">
              <div>
                <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  COVER LETTER:
                </h1>
                <p className="font-sans text-[16px]/[120%] text-Black2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
              <div className="mt-[21px]">
                <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  LOCATION:
                </h1>
                <p className="font-sans text-[16px]/[120%] text-Black2">
                  Calabar, Nigeria
                </p>
              </div>
            </div>
            <div className="mt-[21px] flex flex-row">
              <button className="mr-[18px] rounded-[999px] border-[2px] border-Red1 px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-Red1">
                Reject Internship
              </button>
              <button
                onClick={() => setIsScheduleInterviewModalOpen(true)}
                className="rounded-[999px] bg-gradient-to-r px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-GoldenWhite"
              >
                Proceed to interview
              </button>
              <ScheduleInterviewModal
                isScheduleInterviewModalOpen={isScheduleInterviewModalOpen}
                onScheduleInterviewModalClose={() =>
                  setIsScheduleInterviewModalOpen(false)
                }
              >
                <div className="mb-[24px]">
                  <h1 className="font-sans text-[21px]/[120%] text-PriGold">
                    Schedule interview
                  </h1>
                  <h1 className="font-sans text-[12px]/[120%] text-Gray1">
                    SELECT A DATE AND TIME FOR THE INTERVIEW
                  </h1>
                  {/* <button
                    onClick={() => setIsScheduleInterviewModalOpen(false)}
                  >
                  </button> */}
                </div>
                <div className="flex flex-row items-center rounded-[15px] bg-Gold3 px-[20px] py-[16px]">
                  <div className="mr-[16px] h-[100px] w-[100px] rounded-[50px] bg-red-800"></div>
                  <div className="flex h-[100%] flex-col justify-between">
                    <h1 className="font-sans text-[16px]/[100%] font-normal text-Black2">
                      John Doe
                    </h1>
                    <h2 className="flex flex-row font-sans text-[16px] text-Gray2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mr-[6px] size-6 text-Gray2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                        />
                      </svg>
                      COMPUTER ENGINEERING
                    </h2>
                    <Link
                      href={"#"}
                      className="max-w-[136px] rounded-[999px] border-[2px] border-PriGold px-[20px] py-[10px] text-center font-sans text-[12px]/[120%] text-PriGold"
                    >
                      View details
                    </Link>
                  </div>
                </div>
                <div className="mt-[24px] flex flex-row justify-between">
                  <div className="w-[45%]">
                    <h1 className="mb-[10px] font-sans text-[16px]/[120%] text-Gray2">
                      Select Date
                    </h1>
                    <button className="mt-[6px] flex w-[100%] flex-row items-center space-x-[8px] rounded-[12px] bg-GoldenWhite p-[18px] shadow-custom2">
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
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                        />
                      </svg>
                      <div className="h-[37px] w-[2px] bg-Gray2"></div>
                      <h1 className="font-sans text-[16px] text-Gray2">
                        DD/MM
                      </h1>
                    </button>
                  </div>
                  <div className="w-[45%]">
                    <h1 className="mb-[10px] font-sans text-[16px]/[120%] text-Gray2">
                      Select Time
                    </h1>
                    <button className="mt-[6px] flex w-[100%] flex-row items-center space-x-[8px] rounded-[12px] bg-GoldenWhite p-[18px] shadow-custom2">
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
                          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <div className="h-[37px] w-[2px] bg-Gray2"></div>
                      <h1 className="font-sans text-[16px] text-Gray2">
                        00:00
                      </h1>
                    </button>
                  </div>
                </div>
                <div className="mt-[24px] flex flex-row items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="mr-[6px] size-6 text-Gold1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                    />
                  </svg>
                  <h1 className="font-sans text-[12px]/[120%] text-Gold1">
                    Note: Once you schedule an interview you can no longer
                    change the schedule.
                  </h1>
                </div>
                <div className="mt-[28px] flex flex-row space-x-[24px]">
                  <button className="flex flex-row items-center rounded-[999px] bg-PriGold px-[70px] py-[18px] font-sans text-[16px]/[120%] text-GoldenWhite">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="mr-[12px] size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                      />
                    </svg>
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
            </div>
            <div className="mt-[21px] flex flex-row">
              <button className="mr-[18px] rounded-[999px] border-[2px] border-Red1 px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-Red1">
                Withdraw job offer
              </button>
              <button className="rounded-[999px] bg-gradient-to-r px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-GoldenWhite">
                Extend job offer
              </button>
            </div>
            <div className="mt-[21px] flex flex-row">
              <button className="mr-[18px] rounded-[999px] border-[2px] border-Red1 px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-Red1">
                End internship
              </button>
              <button
                onClick={() => setIsRateStudentsModalOpen(true)}
                className="rounded-[999px] bg-gradient-to-r px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-GoldenWhite"
              >
                Rate student
              </button>
              <RateStudentsModal
                isRateStudentsModalOpen={isRateStudentsModalOpen}
                onRateStudentsModalClose={() =>
                  setIsRateStudentsModalOpen(false)
                }
              >
                <div className="mb-[24px] justify-center overflow-y-auto text-center">
                  <h1 className="font-sans text-[21px]/[120%] text-PriGold">
                    Rate the student
                  </h1>
                  <h1 className="mt-[12px] font-sans text-[12px]/[120%] text-Gray1">
                    LEAVE A REVIEW OF YOUR EXPERIENCE WITH THIS STUDENT
                  </h1>
                  <div className="mt-[6px] justify-self-center rounded-[15px] bg-GoldenWhite px-[20px] py-[24px]">
                    <div className="h-[100px] w-[100px] justify-self-center rounded-[50px] bg-Gray2"></div>
                    <h1 className="my-[8px] font-sans text-[16px]/[120%]">
                      John Doe
                    </h1>
                    <div className="flex items-center justify-center">
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
                          d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                        />
                      </svg>

                      <h1 className="ml-[6px] font-sans text-[16px]/[120%] text-Gray2">
                        MED/SURGERY
                      </h1>
                    </div>
                    <button className="mt-[12px] rounded-[999px] border-[2px] border-PriGold px-[48px] py-[10px] font-sans text-[12px]/[120%] text-PriGold">
                      View student
                    </button>
                  </div>
                  <StarRating defaultValue={0} />
                  <input
                    placeholder="Leave review"
                    className="mb-[28px] mt-[28px] h-[100px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
                  />
                  <div className="flex flex-row items-center justify-between">
                    <input
                      type=""
                      placeholder="Dates (DD/MM)"
                      className="w-[45%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
                    ></input>
                    <div className="h-[3px] w-[2%] bg-Gray2"></div>
                    <input
                      type=""
                      placeholder="Dates (DD/MM)"
                      className="w-[45%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
                    ></input>
                  </div>
                  <div className="flex flex-row justify-center space-x-[24px] mt-[40px]">
                    <button
                      onClick={() => setIsRateStudentsModalOpen(false)}
                      className="rounded-[999px] border-[2px] border-PriGold px-[80px] py-[18px] font-sans text-[16px]/[120%] text-PriGold"
                    >
                      Cancel
                    </button>
                    <button className="flex flex-row items-center rounded-[999px] bg-PriGold px-[80px] py-[18px] font-sans text-[12px]/[120%] text-GoldenWhite">
                      Post review
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="ml-[12px] size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </RateStudentsModal>
            </div>
          </div>
        </div>
      </div>
      <Footer1 />
    </div>
  );
}
