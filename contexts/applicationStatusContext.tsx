"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Application } from "./applicationContext";

interface ApplicationStatusContextType {
  updateApplicationStatus: (applicationId: string, status: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}

const ApplicationStatusContext = createContext<ApplicationStatusContextType | undefined>(undefined);

export const ApplicationStatusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const updateApplicationStatus = useCallback(async (applicationId: string, status: string) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      const response = await fetch("/api/proxy/applications/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ applicationId, status }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.detail || `API error: ${response.status}`);
      }

      await response.json();
      console.log(`Application ${applicationId} status updated to ${status}`);
    } catch (err: any) {
      console.error(`Error updating application status:`, err);
      setError(err.message || "Failed to update application status");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ApplicationStatusContext.Provider
      value={{
        updateApplicationStatus,
        loading,
        error,
        clearError,
      }}
    >
      {children}
    </ApplicationStatusContext.Provider>
  );
};

export const useApplicationStatus = () => {
  const context = useContext(ApplicationStatusContext);
  if (!context) {
    throw new Error("useApplicationStatus must be used within an ApplicationStatusProvider");
  }
  return context;
};