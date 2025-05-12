"use client";

import React from "react";
import ToggleSwitch from "./toggleSwitch";
import { useNotification } from "../../../contexts/notificationContext";
import Button4 from "../../user/Components/Button4";

interface NotificationSettingsModalProps {
  isNotificationSettingsModalOpen: boolean;
  onNotificationSettingsModalClose: () => void;
  children?: React.ReactNode;
}

const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({ 
  isNotificationSettingsModalOpen, 
  onNotificationSettingsModalClose 
}) => {
  const { settings, updateSettings } = useNotification();
  
  if (!isNotificationSettingsModalOpen) return null;

  // Handle toggle for notification channels
  const handleChannelToggle = (channel: "email" | "sms" | "in_app") => {
    updateSettings({
      channels: {
        ...settings.channels,
        [channel]: !settings.channels[channel]
      }
    });
  };

  // Handle toggle for notification categories
  const handleCategoryToggle = (category: "new_opportunities" | "application_updates" | "messages" | "reminders") => {
    updateSettings({
      categories: {
        ...settings.categories,
        [category]: !settings.categories[category]
      }
    });
  };

  // Handle save button click
  const handleSave = () => {
    // Settings are automatically saved via the context
    onNotificationSettingsModalClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="absolute bg-white h-[90%] bottom-1 w-[60%] p-20 rounded-[18px] shadow-lg overflow-x-auto">
        <div className="mb-6 flex flex-row items-center border-b-[1px] border-Gold3 p-[10px]">
          <button onClick={onNotificationSettingsModalClose}>
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
              isOn={settings.channels.email} 
              onToggle={() => handleChannelToggle("email")} 
            />
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
              isOn={settings.channels.sms} 
              onToggle={() => handleChannelToggle("sms")} 
            />
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
              isOn={settings.channels.in_app} 
              onToggle={() => handleChannelToggle("in_app")} 
            />
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
              isOn={settings.categories.new_opportunities} 
              onToggle={() => handleCategoryToggle("new_opportunities")} 
            />
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
              isOn={settings.categories.application_updates} 
              onToggle={() => handleCategoryToggle("application_updates")} 
            />
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
              isOn={settings.categories.messages} 
              onToggle={() => handleCategoryToggle("messages")} 
            />
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
              isOn={settings.categories.reminders} 
              onToggle={() => handleCategoryToggle("reminders")} 
            />
          </div>
        </div>
        <Button4
          onClick={handleSave}
          text="Save"
          className="mt-10 text-[16px] font-normal"
        />
      </div>
    </div>
  );
};

export default NotificationSettingsModal;