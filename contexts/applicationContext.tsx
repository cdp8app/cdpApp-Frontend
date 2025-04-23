"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";


// Define types
interface Application {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

interface ApplicationContextType {
  applications: Application | null;
  loading: boolean;
  error: string | null;
  getApplications: () => Promise<void>;
  getApplicationsById: (applicationId: string) => Promise<void>;
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
      const response = await fetch("https://careerxhub.onrender.com/api/application/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch applications");
      }
    
      setApplications(data);
      router.push("/Dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getApplicationsById = async (applicationId: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`https://careerxhub.onrender.com/api/application/${applicationId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch application");
      }
    
      setApplications(data);
    } catch (err: any) {
      setError(err.message);
    }
    finally {
      setLoading(false);
    }
  };

  const createApplication = async (applicationData: Application) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("https://careerxhub.onrender.com/api/application/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(applicationData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create application");
      }

      setApplications(data);
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
      const response = await fetch(`https://careerxhub.onrender.com/api/application/${applicationId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(applicationData),
      });
    
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || "Failed to update application");
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
      const response = await fetch(`https://careerxhub.onrender.com/api/application/${applicationId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
        
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete application");
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