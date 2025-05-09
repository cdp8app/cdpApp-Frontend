"use client";

import React from "react";
import { useNotification, NotificationType, NotificationCategory } from "../../contexts/notificationContext";

const NotificationDemo: React.FC = () => {
  const { addNotification } = useNotification();

  // Function to generate a random notification
  const generateRandomNotification = () => {
    const types: NotificationType[] = ["info", "success", "warning", "error"];
    const categories: NotificationCategory[] = [
      "new_opportunities",
      "application_updates",
      "messages",
      "reminders",
    ];

    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    const notifications = {
      new_opportunities: {
        title: "New Internship Opportunity",
        message: "A new internship matching your skills is available at Google.",
        link: "/student/opportunities/123",
      },
      application_updates: {
        title: "Application Status Update",
        message: "Your application for Microsoft internship has moved to the interview stage.",
        link: "/student/applications/456",
      },
      messages: {
        title: "New Message Received",
        message: "You have a new message from Amazon recruiter.",
        link: "/messaging",
      },
      reminders: {
        title: "Upcoming Interview",
        message: "Reminder: You have an interview scheduled tomorrow at 2:00 PM.",
        link: "/student/calendar",
      },
    };

    const notification = notifications[randomCategory];

    addNotification({
      title: notification.title,
      message: notification.message,
      type: randomType,
      category: randomCategory,
      link: notification.link,
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={generateRandomNotification}
        className="rounded-full bg-PriGold p-3 text-white shadow-lg hover:bg-Gold1 transition-colors"
        aria-label="Generate test notification"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>
      </button>
    </div>
  );
};

export default NotificationDemo;