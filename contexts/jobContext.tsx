"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";


// Define types
interface Job {
  id: string;
  title: string;
    company: string;
    location: string;
    job_type: string;
  description: string;
    requirements: string;
    salary: string;
    deadline: string;
    // startDate: string;
    // endDate: string;
    // status: string;
  createdAt: string;
  updatedAt: string;
};

interface JobContextType {
  jobs: Job | null;
  loading: boolean;
  error: string | null;
  getJobs: () => Promise<void>;
  getJobsById: (jobId: string) => Promise<void>;
  createJob: (jobData: any) => Promise<void>;
  updateJob: (jobId: string, jobData: any) => Promise<void>;
  deleteJob: (jobId: string) => Promise<void>;
};

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const getJobs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("https://careerxhub.onrender.com/api/job/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch jobs");
      }
    
      setJobs(data);
      router.push("/Dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getJobsById = async (jobId: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`https://careerxhub.onrender.com/api/job/${jobId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch job");
      }
    
      setJobs(data);
    } catch (err: any) {
      setError(err.message);
    }
    finally {
      setLoading(false);
    }
  };

  const createJob = async (jobData: Job) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("https://careerxhub.onrender.com/api/job/", {
        method: "POST",
        headers: {
          "Content-Type": "job/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create job");
      }

      setJobs(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateJob = async (jobId: string, jobData: Job) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`https://careerxhub.onrender.com/api/job/${jobId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "job/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobData),
      });
    
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || "Failed to update job");
      }
    
      setJobs(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (jobId: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`https://careerxhub.onrender.com/api/job/${jobId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
        
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete job");
      }
        
      setJobs(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <JobContext.Provider 
      value={{ 
        jobs, 
        loading, 
        error, 
        getJobs, 
        getJobsById, 
        createJob, 
        updateJob, 
        deleteJob 
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobContext must be used within an JobProvider");
  }
  return context;
};