"use client";

import React, { useState, useEffect } from "react";
import { useNotification, Notification } from "../../contexts/notificationContext";
import Link from "next/link";

const NotificationToast: React.FC = () => {
  const { notifications, markAsRead } = useNotification();
  const [visibleToasts, setVisibleToasts] = useState<Notification[]>([]);

  // Listen for new notifications
  useEffect(() => {
    // Get only unread notifications that aren't already in the visible toasts
    const newNotifications = notifications.filter(
      (notification) => 
        !notification.isRead && 
        !visibleToasts.some((toast) => toast.id === notification.id)
    );

    if (newNotifications.length > 0) {
      // Add new notifications to visible toasts
      setVisibleToasts((prev) => [...prev, ...newNotifications]);
    }
  }, [notifications]);

  // Auto-dismiss toasts after 5 seconds
  useEffect(() => {
    if (visibleToasts.length > 0) {
      const timer = setTimeout(() => {
        // Remove the oldest toast
        setVisibleToasts((prev) => prev.slice(1));
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [visibleToasts]);

  // Handle toast dismiss
  const handleDismiss = (id: string) => {
    markAsRead(id);
    setVisibleToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Get icon based on notification type
  const getIcon = (type: string) => {
    switch (type) {
    case "success":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    case "warning":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
    case "error":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
  };

  if (visibleToasts.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col space-y-2">
      {visibleToasts.map((toast) => (
        <div
          key={toast.id}
          className="flex w-80 items-center justify-between rounded-lg bg-white p-4 shadow-lg"
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">{getIcon(toast.type)}</div>
            <div>
              {toast.link ? (
                <Link href={toast.link} onClick={() => handleDismiss(toast.id)}>
                  <h4 className="font-medium text-Gray2">{toast.title}</h4>
                  <p className="text-sm text-Gold1">{toast.message}</p>
                </Link>
              ) : (
                <>
                  <h4 className="font-medium text-Gray2">{toast.title}</h4>
                  <p className="text-sm text-Gold1">{toast.message}</p>
                </>
              )}
            </div>
          </div>
          <button
            onClick={() => handleDismiss(toast.id)}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationToast;