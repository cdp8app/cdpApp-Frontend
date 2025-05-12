"use client";
import React, { useState } from "react";
import Footer1 from "../Components/Footer1";
import Header1 from "../Components/Header1";
import Link from "next/link";
import NotificationSettingsModal from "./notifications/modal";
import ToggleSwitch from "./notifications/toggleSwitch";
import Button4 from "../user/Components/Button4";
import ProfileVisibilityModal from "./profile-visibility/modal";
import ManageDataSharingModal from "./manage-data/modal";
import RecommendationsModal from "./recommendations/modal";

export default function Settings() {
  const [isNotificationSettingsModalOpen, setIsNotificationSettingsModalOpen] =
    useState(false);
  const [isProfileVisibilityModalOpen, setIsProfileVisibilityModalOpen] =
    useState(false);
  const [isManageDataSharingModalOpen, setIsManageDataSharingModalOpen] =
    useState(false);
  const [isRecommendationsModalOpen, setIsRecommendationsModalOpen] =
    useState(false);

  return (
    <div className="flex flex-col">
      <div className="p-[1%]">
        <Header1 />
        <div className="px-[7%]">
          <div className="mb-[31px] border-b-[2px] border-Gold3 p-[10px]">
            <h1 className="font-sans text-[36px]/[120%] text-Gold1">
              Settings
            </h1>
          </div>
          <div className="mb-[31px] border-b-[1px] border-Gray2 p-[10px]">
            <h1 className="font-sans text-[21px]/[120%] text-Gray2">
              Profile settings
            </h1>
          </div>
          <div className="mb-[18px] flex w-[100%] flex-row items-center justify-between rounded-[16px] bg-Gold3 p-[30px]">
            <div className="flex flex-row items-center">
              <div className="mr-[24px] h-[120px] w-[120px] rounded-[60px] bg-White"></div>
              <div>
                <h1 className="mb-1 font-sans text-[36px]/[100%] font-semibold text-Gold1">
                  John Doe
                </h1>
                <h2 className="flex flex-row font-sans text-[16px] text-Gold1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="mr-[11px] size-6 text-Gold1"
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
              <button className="rounded-[999px] border-2 border-PriGold px-[80px] py-[18px] font-sans text-[16px]/[120%] text-PriGold">
                Go to profile
              </button>
            </div>
          </div>
          <div className="mt-[21px] border-b-[1px] border-Gray2 p-[10px]">
            <h1 className="font-sans text-[21px]/[120%] text-Gray2">
              Security
            </h1>
          </div>
          <div className="flex flex-col">
            <Link className="p-[10px] font-sans text-[16px]/[120%]" href={"#"}>
              Change password
            </Link>
            <Link className="p-[10px] font-sans text-[16px]/[120%]" href={"#"}>
              Change email address
            </Link>
          </div>
          <div className="mt-[21px] border-b-[1px] border-Gray2 p-[10px]">
            <h1 className="font-sans text-[21px]/[120%] text-Gray2">
              Privacy & data controls
            </h1>
          </div>
          <div className="flex flex-col">
            <button
              onClick={() => setIsProfileVisibilityModalOpen(true)}
              className="flex justify-self-start p-[10px] font-sans text-[16px]/[120%]"
            >
              Profile visibilty
            </button>
            <ProfileVisibilityModal
              isProfileVisibilityModalOpen={isProfileVisibilityModalOpen}
              onProfileVisibilityModalClose={() =>
                setIsProfileVisibilityModalOpen(false)
              }
            >
              <div className="mb-6 flex flex-row items-center border-b-[1px] border-Gold3 p-[10px]">
                <button onClick={() => setIsProfileVisibilityModalOpen(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="mr-[5px] size-8 text-PriGold"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
                <h1 className="font-sans text-[36px]/[120%] text-PriGold">
                  Profile visibility
                </h1>
              </div>
              <div className="mb-6 border-b-[1px] border-Gold3 p-[10px]">
                <h5 className="font-sans text-[21px]/[120%] text-Gray2">
                  Who can view your profile details?
                </h5>
              </div>
              <div className="mb-[6px] flex flex-row items-center justify-between rounded-[18px] border-[1px] border-Gold3 bg-GoldenWhite p-[17px]">
                <div>
                  <h1 className="mb-[2px] font-sans text-[12px]/[120%] text-Gray2">
                    Not visible
                  </h1>
                  <h2 className="font-sans text-[12px]/[120%] text-Gold1">
                    Your profile is Invisible to everyone and will not appear in
                    search results
                  </h2>
                </div>
                <div>
                  <ToggleSwitch 
                    isOn={false} 
                    onToggle={() => console.log("Toggle switched")} 
                  />
                </div>
              </div>
              <div className="mb-[6px] flex flex-row items-center justify-between rounded-[18px] border-[1px] border-Gold3 bg-GoldenWhite p-[17px]">
                <div>
                  <h1 className="mb-[2px] font-sans text-[12px]/[120%] text-Gray2">
                    Recruiters only
                  </h1>
                  <h2 className="font-sans text-[12px]/[120%] text-Gold1">
                    Your profile is only visible to recruiters and will appear
                    in their search results
                  </h2>
                </div>
                <div>
                  <ToggleSwitch 
                    isOn={false} 
                    onToggle={() => console.log("Toggle switched")} />
                </div>
              </div>
              <div className="mb-[6px] flex flex-row items-center justify-between rounded-[18px] border-[1px] border-Gold3 bg-GoldenWhite p-[17px]">
                <div>
                  <h1 className="mb-[2px] font-sans text-[12px]/[120%] text-Gray2">
                    Everyone
                  </h1>
                  <h2 className="font-sans text-[12px]/[120%] text-Gold1">
                    Your profile is visible to everyone and will appear in
                    search results
                  </h2>
                </div>
                <div>
                  <ToggleSwitch
                    isOn={false} 
                    onToggle={() => console.log("Toggle switched")}  />
                </div>
              </div>
              <Button4
                // onClick={handleSave}
                text="Save"
                className="mt-10 text-[16px] font-normal"
              />
            </ProfileVisibilityModal>
            <button
              onClick={() => setIsManageDataSharingModalOpen(true)}
              className="flex justify-self-start p-[10px] font-sans text-[16px]/[120%]"
            >
              Manage data sharing
            </button>
            <ManageDataSharingModal
              isManageDataSharingModalOpen={isManageDataSharingModalOpen}
              onManageDataSharingModalClose={() =>
                setIsManageDataSharingModalOpen(false)
              }
            >
              <div className="mb-6 flex flex-row items-center border-b-[1px] border-Gold3 p-[10px]">
                <button onClick={() => setIsManageDataSharingModalOpen(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="mr-[5px] size-8 text-PriGold"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
                <h1 className="font-sans text-[36px]/[120%] text-PriGold">
                  Manage data sharing
                </h1>
              </div>
              <div className="mb-[6px] flex flex-row items-center justify-between rounded-[18px] border-[1px] border-Gold3 bg-GoldenWhite p-[17px]">
                <div>
                  <h1 className="mb-[2px] font-sans text-[12px]/[120%] text-Gray2">
                    Partners
                  </h1>
                  <h2 className="font-sans text-[12px]/[120%] text-Gold1">
                    Permit sharing your data with our partners
                  </h2>
                </div>
                <div>
                  <ToggleSwitch 
                    isOn={false} 
                    onToggle={() => console.log("Toggle switched")} />
                </div>
              </div>
              <div className="mb-[6px] flex flex-row items-center justify-between rounded-[18px] border-[1px] border-Gold3 bg-GoldenWhite p-[17px]">
                <div>
                  <h1 className="mb-[2px] font-sans text-[12px]/[120%] text-Gray2">
                    Third party services
                  </h1>
                  <h2 className="font-sans text-[12px]/[120%] text-Gold1">
                    Permit sharing your data with third party services
                  </h2>
                </div>
                <div>
                  <ToggleSwitch 
                    isOn={false} 
                    onToggle={() => console.log("Toggle switched")} />
                </div>
              </div>
              <Button4
                // onClick={handleSave}
                text="Save"
                className="mt-10 text-[16px] font-normal"
              />
            </ManageDataSharingModal>
            <button
              onClick={() => setIsRecommendationsModalOpen(true)}
              className="flex justify-self-start p-[10px] font-sans text-[16px]/[120%]"
            >
              Personalized recommendations
            </button>
            <RecommendationsModal
              isRecommendationsModalOpen={isRecommendationsModalOpen}
              onRecommendationsModalClose={() =>
                setIsRecommendationsModalOpen(false)
              }
            >
              <div className="mb-6 flex flex-row items-center border-b-[1px] border-Gold3 p-[10px]">
                <button onClick={() => setIsRecommendationsModalOpen(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="mr-[5px] size-8 text-PriGold"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
                <h1 className="font-sans text-[36px]/[120%] text-PriGold">
                  Recommendations
                </h1>
              </div>
              <div className="mb-[6px] flex flex-row items-center justify-between rounded-[18px] border-[1px] border-Gold3 bg-GoldenWhite p-[17px]">
                <div>
                  <h1 className="mb-[2px] font-sans text-[12px]/[120%] text-Gray2">
                    Personalized recommendations
                  </h1>
                  <h2 className="font-sans text-[12px]/[120%] text-Gold1">
                    Receive internship suggestions based on your activity
                  </h2>
                </div>
                <div>
                  <ToggleSwitch 
                    isOn={false} 
                    onToggle={() => console.log("Toggle switched")} />
                </div>
              </div>
              <Button4
                // onClick={handleSave}
                text="Save"
                className="mt-10 text-[16px] font-normal"
              />
            </RecommendationsModal>
          </div>
          <div className="mt-[21px] border-b-[1px] border-Gray2 p-[10px]">
            <h1 className="font-sans text-[21px]/[120%] text-Gray2">
              Notification preferences
            </h1>
          </div>
          <div className="flex flex-col">
            <button
              onClick={() => setIsNotificationSettingsModalOpen(true)}
              className="flex justify-self-start p-[10px] font-sans text-[16px]/[120%]"
            >
              Customize notifications
            </button>
          </div>
          <NotificationSettingsModal
            isNotificationSettingsModalOpen={isNotificationSettingsModalOpen}
            onNotificationSettingsModalClose={() =>
              setIsNotificationSettingsModalOpen(false)
            }
          >
            <div className="mb-6 flex flex-row items-center border-b-[1px] border-Gold3 p-[10px]">
              <button onClick={() => setIsNotificationSettingsModalOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="mr-[5px] size-8 text-PriGold"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <h1 className="font-sans text-[36px]/[120%] text-PriGold">
                Notifications
              </h1>
            </div>
            <div className="mb-6 border-b-[1px] border-Gold3 p-[10px]">
              <h5 className="font-sans text-[21px]/[120%] text-Gray2">
                Notifications channels
              </h5>
            </div>
            <div className="mb-[6px] flex flex-row items-center justify-between rounded-[18px] border-[1px] border-Gold3 bg-GoldenWhite p-[17px]">
              <div>
                <h1 className="mb-[2px] font-sans text-[12px]/[120%] text-Gray2">
                  Email notifications
                </h1>
                <h2 className="font-sans text-[12px]/[120%] text-Gold1">
                  Toggle on/off to receive updates via email
                </h2>
              </div>
              <div>
                <ToggleSwitch
                  isOn={false} 
                  onToggle={() => console.log("Toggle switched")}  />
              </div>
            </div>
            <div className="mb-[6px] flex flex-row items-center justify-between rounded-[18px] border-[1px] border-Gold3 bg-GoldenWhite p-[17px]">
              <div>
                <h1 className="mb-[2px] font-sans text-[12px]/[120%] text-Gray2">
                  SMS notifications
                </h1>
                <h2 className="font-sans text-[12px]/[120%] text-Gold1">
                  Option to receive text messages for urgent alerts
                </h2>
              </div>
              <div>
                <ToggleSwitch 
                  isOn={false} 
                  onToggle={() => console.log("Toggle switched")} />
              </div>
            </div>
            <div className="mb-[6px] flex flex-row items-center justify-between rounded-[18px] border-[1px] border-Gold3 bg-GoldenWhite p-[17px]">
              <div>
                <h1 className="mb-[2px] font-sans text-[12px]/[120%] text-Gray2">
                  In-app notifications
                </h1>
                <h2 className="font-sans text-[12px]/[120%] text-Gold1">
                  Enable notifications that appear while using the website
                </h2>
              </div>
              <div>
                <ToggleSwitch 
                  isOn={false} 
                  onToggle={() => console.log("Toggle switched")} />
              </div>
            </div>
            <div className="mb-6 border-b-[1px] border-Gold3 p-[10px]">
              <h5 className="font-sans text-[21px]/[120%] text-Gray2">
                Notifications types
              </h5>
            </div>
            <div className="mb-[6px] flex flex-row items-center justify-between rounded-[18px] border-[1px] border-Gold3 bg-GoldenWhite p-[17px]">
              <div>
                <h1 className="mb-[2px] font-sans text-[12px]/[120%] text-Gray2">
                  New opportunities
                </h1>
                <h2 className="font-sans text-[12px]/[120%] text-Gold1">
                  Alerts for new internship postings that match your interests
                </h2>
              </div>
              <div>
                <ToggleSwitch
                  isOn={false} 
                  onToggle={() => console.log("Toggle switched")}  />
              </div>
            </div>
            <div className="mb-[6px] flex flex-row items-center justify-between rounded-[18px] border-[1px] border-Gold3 bg-GoldenWhite p-[17px]">
              <div>
                <h1 className="mb-[2px] font-sans text-[12px]/[120%] text-Gray2">
                  Application updates
                </h1>
                <h2 className="font-sans text-[12px]/[120%] text-Gold1">
                  Notifications about the status of your internship applications
                </h2>
              </div>
              <div>
                <ToggleSwitch 
                  isOn={false} 
                  onToggle={() => console.log("Toggle switched")} />
              </div>
            </div>
            <div className="mb-[6px] flex flex-row items-center justify-between rounded-[18px] border-[1px] border-Gold3 bg-GoldenWhite p-[17px]">
              <div>
                <h1 className="mb-[2px] font-sans text-[12px]/[120%] text-Gray2">
                  Messages
                </h1>
                <h2 className="font-sans text-[12px]/[120%] text-Gold1">
                  Updates when a company or recruiter sends you a message
                </h2>
              </div>
              <div>
                <ToggleSwitch 
                  isOn={false} 
                  onToggle={() => console.log("Toggle switched")} />
              </div>
            </div>
            <div className="mb-[6px] flex flex-row items-center justify-between rounded-[18px] border-[1px] border-Gold3 bg-GoldenWhite p-[17px]">
              <div>
                <h1 className="mb-[2px] font-sans text-[12px]/[120%] text-Gray2">
                  Reminders
                </h1>
                <h2 className="font-sans text-[12px]/[120%] text-Gold1">
                  Alerts for schedules, deadlines or events related to your
                  applications
                </h2>
              </div>
              <div>
                <ToggleSwitch 
                  isOn={false} 
                  onToggle={() => console.log("Toggle switched")} />
              </div>
            </div>
            <Button4
              // onClick={handleSave}
              text="Save"
              className="mt-10 text-[16px] font-normal"
            />
          </NotificationSettingsModal>
          <div className="mt-[21px] border-b-[1px] border-Gray2 p-[10px]">
            <h1 className="font-sans text-[21px]/[120%] text-Gray2">
              Support and feedback
            </h1>
          </div>
          <div className="mb-[100px] flex flex-col">
            <Link className="p-[10px] font-sans text-[16px]/[120%]" href={"#"}>
              Send feedback
            </Link>
            <Link className="p-[10px] font-sans text-[16px]/[120%]" href={"#"}>
              Contact support
            </Link>
            <Link className="p-[10px] font-sans text-[16px]/[120%]" href={"#"}>
              FAQs
            </Link>
          </div>
        </div>
      </div>
      <Footer1 />
    </div>
  );
}
