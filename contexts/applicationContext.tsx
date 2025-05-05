"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";


// Define types
export interface Application {
  id: string;
  job?: {
    id: string;
    location: string;
  }
  cover_letter: string
  skills: string
  experience: string
  description: string;
  resume: string
  status: string;
  user?: {
    id: string;
    full_name: string;
    course: string;
    location: string;
    profile_picture: string;
  };
  createdAt: string;
  updatedAt: string;
};

interface ApplicationContextType {
  applications: Application | null;
  loading: boolean;
  error: string | null;
  getApplications: () => Promise<void>;
  getStudentApplications: () => Promise<void>;
  getApplicationsById: (applicationId: string) => Promise<Application | null>;
  createApplication: (applicationData: any) => Promise<void>;
  updateApplication: (applicationId: string, applicationData: any) => Promise<void>;
  deleteApplication: (applicationId: string) => Promise<void>;
};

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applications, setApplications] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const getApplications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.detail || "Failed to fetch applications");
      }
    
      setApplications(data);
      return data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStudentApplications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications/my-job-applications/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.detail || "Failed to fetch applications");
      }
    
      setApplications(data);
      return data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getApplicationsById = async (applicationId: string): Promise<Application | null> => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications/${applicationId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || data.detail || "Failed to fetch application");
      }
    
      setApplications(data);
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    }
    finally {
      setLoading(false);
    }
  };

  const createApplication = async (applicationData: Application) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(applicationData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.detail || "Failed to create application");
      }

      setApplications(data);
      router.push("/student/jobs/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateApplication = async (applicationId: string, applicationData: Application) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications/${applicationId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(applicationData),
      });
    
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || data.detail || "Failed to update application");
      }
    
      setApplications(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteApplication = async (applicationId: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications/${applicationId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
        
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || data.detail || "Failed to delete application");
      }
        
      setApplications(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <ApplicationContext.Provider 
      value={{ 
        applications, 
        loading, 
        error, 
        getApplications, 
        getStudentApplications,
        getApplicationsById, 
        createApplication, 
        updateApplication, 
        deleteApplication 
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplicationContext = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error("useApplicationContext must be used within an ApplicationProvider");
  }
  return context;
};