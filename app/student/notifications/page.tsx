"use client";

import React, { useState } from "react";
import { useNotification, NotificationCategory } from "../../../contexts/notificationContext";
import Navbar1 from "../../Components/Navbar";

export default function StudentNotifications() {
  const { notifications, markAsRead, markAllAsRead, removeNotification, clearAllNotifications } = useNotification();
  const [activeFilter, setActiveFilter] = useState<NotificationCategory | "all">("all");

  // Filter notifications based on the active filter
  const filteredNotifications = activeFilter === "all"
    ? notifications
    : notifications.filter(notification => notification.category === activeFilter);

  // Handle notification click
  const handleNotificationClick = (id: string) => {
    markAsRead(id);
  };

  // Handle notification delete
  const handleNotificationDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent triggering the parent click handler
    removeNotification(id);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <div className="flex justify-center pt-6">
        <Navbar1 userType="student" />
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-Gray2">Notifications</h1>
          <div className="flex space-x-4">
            <button
              onClick={markAllAsRead}
              className="rounded-md bg-GoldenWhite px-4 py-2 text-sm font-medium text-PriGold hover:bg-Gold3"
            >
              Mark all as read
            </button>
            <button
              onClick={clearAllNotifications}
              className="rounded-md bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
            >
              Clear all
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex space-x-4 border-b border-gray-200">
          <button
            className={`border-b-2 px-4 py-2 ${
              activeFilter === "all" ? "border-PriGold text-PriGold" : "border-transparent text-gray-500"
            }`}
            onClick={() => setActiveFilter("all")}
          >
            All
          </button>
          <button
            className={`border-b-2 px-4 py-2 ${
              activeFilter === "new_opportunities" ? "border-PriGold text-PriGold" : "border-transparent text-gray-500"
            }`}
            onClick={() => setActiveFilter("new_opportunities")}
          >
            Opportunities
          </button>
          <button
            className={`border-b-2 px-4 py-2 ${
              activeFilter === "application_updates" ? "border-PriGold text-PriGold" : "border-transparent text-gray-500"
            }`}
            onClick={() => setActiveFilter("application_updates")}
          >
            Applications
          </button>
          <button
            className={`border-b-2 px-4 py-2 ${
              activeFilter === "messages" ? "border-PriGold text-PriGold" : "border-transparent text-gray-500"
            }`}
            onClick={() => setActiveFilter("messages")}
          >
            Messages
          </button>
          <button
            className={`border-b-2 px-4 py-2 ${
              activeFilter === "reminders" ? "border-PriGold text-PriGold" : "border-transparent text-gray-500"
            }`}
            onClick={() => setActiveFilter("reminders")}
          >
            Reminders
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`relative cursor-pointer rounded-lg border p-4 transition-all hover:shadow-md ${
                  !notification.isRead ? "border-Gold3 bg-GoldenWhite" : "border-gray-200"
                }`}
                onClick={() => handleNotificationClick(notification.id)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-Gray2">{notification.title}</h3>
                    <p className="mt-1 text-Gold1">{notification.message}</p>
                    <div className="mt-2 flex items-center space-x-4">
                      <span className="text-xs text-gray-400">
                        {new Date(notification.createdAt).toLocaleString()}
                      </span>
                      <span className="text-xs font-medium text-PriGold">
                        {notification.category === "new_opportunities" && "Opportunity"}
                        {notification.category === "application_updates" && "Application"}
                        {notification.category === "messages" && "Message"}
                        {notification.category === "reminders" && "Reminder"}
                      </span>
                      {!notification.isRead && (
                        <span className="flex h-2 w-2 rounded-full bg-PriGold"></span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleNotificationDelete(e, notification.id)}
                    className="text-gray-400 hover:text-red-500"
                    aria-label="Delete notification"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-12 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="mb-4 h-12 w-12 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
              <h3 className="mb-1 text-lg font-medium text-Gray2">No notifications</h3>
              <p className="text-sm text-Gold1">
                {activeFilter === "all"
                  ? "You don't have any notifications yet."
                  : `You don't have any ${activeFilter.replace("_", " ")} notifications.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}