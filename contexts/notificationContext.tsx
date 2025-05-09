'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define notification types
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

// Define notification categories that match the settings
export type NotificationCategory = 
  | 'new_opportunities' 
  | 'application_updates' 
  | 'messages' 
  | 'reminders';

// Define notification channels
export type NotificationChannel = 'email' | 'sms' | 'in_app';

// Define notification object structure
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  category: NotificationCategory;
  isRead: boolean;
  createdAt: Date;
  link?: string; // Optional link to navigate to when clicking the notification
}

// Define notification settings structure
export interface NotificationSettings {
  channels: {
    email: boolean;
    sms: boolean;
    in_app: boolean;
  };
  categories: {
    new_opportunities: boolean;
    application_updates: boolean;
    messages: boolean;
    reminders: boolean;
  };
}

// Define context type
interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  settings: NotificationSettings;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  updateSettings: (settings: Partial<NotificationSettings>) => void;
}

// Create context with default values
const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  settings: {
    channels: {
      email: true,
      sms: false,
      in_app: true,
    },
    categories: {
      new_opportunities: true,
      application_updates: true,
      messages: true,
      reminders: true,
    },
  },
  addNotification: () => {},
  markAsRead: () => {},
  markAllAsRead: () => {},
  removeNotification: () => {},
  clearAllNotifications: () => {},
  updateSettings: () => {},
});

// Provider component
export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State for notifications
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // State for notification settings
  const [settings, setSettings] = useState<NotificationSettings>({
    channels: {
      email: true,
      sms: false,
      in_app: true,
    },
    categories: {
      new_opportunities: true,
      application_updates: true,
      messages: true,
      reminders: true,
    },
  });

  // Calculate unread count
  const unreadCount = notifications.filter(notification => !notification.isRead).length;

  // Load notifications and settings from localStorage on mount
  useEffect(() => {
    try {
      const savedNotifications = localStorage.getItem('notifications');
      const savedSettings = localStorage.getItem('notificationSettings');
      
      if (savedNotifications) {
        const parsedNotifications = JSON.parse(savedNotifications);
        // Convert string dates back to Date objects
        const processedNotifications = parsedNotifications.map((notification: any) => ({
          ...notification,
          createdAt: new Date(notification.createdAt),
        }));
        setNotifications(processedNotifications);
      }
      
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Error loading notifications from localStorage:', error);
    }
  }, []);

  // Save notifications and settings to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem('notifications', JSON.stringify(notifications));
    } catch (error) {
      console.error('Error saving notifications to localStorage:', error);
    }
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem('notificationSettings', JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving notification settings to localStorage:', error);
    }
  }, [settings]);

  // Add a new notification
  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => {
    // Check if the notification category is enabled in settings
    if (!settings.categories[notification.category]) {
      return; // Don't add notification if the category is disabled
    }

    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(), // Simple ID generation
      createdAt: new Date(),
      isRead: false,
    };

    setNotifications(prev => [newNotification, ...prev]);
  };

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  // Remove a notification
  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Update notification settings
  const updateSettings = (newSettings: Partial<NotificationSettings>) => {
    setSettings(prev => ({
      channels: {
        ...prev.channels,
        ...(newSettings.channels || {}),
      },
      categories: {
        ...prev.categories,
        ...(newSettings.categories || {}),
      },
    }));
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        settings,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAllNotifications,
        updateSettings,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook for using the notification context
export const useNotification = () => useContext(NotificationContext);

export default NotificationContext;