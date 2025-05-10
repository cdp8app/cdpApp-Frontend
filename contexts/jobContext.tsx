"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/api";

// Define types
export interface Job {
  id: string;
  title: string;
  company?: {
    id: string;
    company_name: string;
    company_industry: string;
    company_description: string;
    profile_picture: string;
  };
  location: string;
  job_type: string;
  description: string;
  requirements: string;
  salary: number;
  deadline: string;
  status: string;
  created_at?: string;
  updated_at?: string;
};

interface JobContextType {
  jobs: Job | null;
  currentJob: Job | null;
  loading: boolean;
  error: string | null;
  getJobs: () => Promise<void>;
  getStudentJobs: () => Promise<void>;
  getPostedJobs: () => Promise<any>;
  getJobsById: (jobId: string) => Promise<Job | null>;
  createJob: (jobData: any) => Promise<any>;
  updateJob: (jobId: string, jobData: any) => Promise<void>;
  deleteJob: (jobId: string) => Promise<void>;
};

const JobContext = createContext<JobContextType | undefined>(undefined);

// Mock data for posted jobs
const MOCK_POSTED_JOBS = {
  results: [
    {
      id: "101",
      title: "Software Engineer",
      description: "We are looking for a skilled software engineer to join our team.",
      requirements: "5+ years of experience in software development. Proficiency in JavaScript, Python, and cloud technologies.",
      company: {
        id: "1",
        company_name: "Tech Solutions Inc",
        company_industry: "Technology",
        company_description: "Leading technology solutions provider",
        profile_picture: "https://via.placeholder.com/150"
      },
      job_type: "Full-time", // Updated to use full words
      salary: 120000,
      location: "San Francisco, CA",
      status: "open",
      deadline: "2023-07-15",
      created_at: "2023-06-15T10:30:00Z",
      updated_at: "2023-06-15T10:30:00Z"
    },
    {
      id: "102",
      title: "Frontend Developer",
      description: "Looking for a frontend developer with React experience.",
      requirements: "3+ years of experience with React. Knowledge of modern frontend frameworks and tools.",
      company: {
        id: "1",
        company_name: "Tech Solutions Inc",
        company_industry: "Technology",
        company_description: "Leading technology solutions provider",
        profile_picture: "https://via.placeholder.com/150"
      },
      job_type: "Full-time", // Updated to use full words
      salary: 100000,
      location: "Remote",
      status: "open",
      deadline: "2023-07-10",
      created_at: "2023-06-10T14:45:00Z",
      updated_at: "2023-06-10T14:45:00Z"
    },
    {
      id: "103",
      title: "DevOps Engineer",
      description: "Join our team to build and maintain our cloud infrastructure.",
      requirements: "Experience with AWS, Docker, Kubernetes, and CI/CD pipelines.",
      company: {
        id: "1",
        company_name: "Tech Solutions Inc",
        company_industry: "Technology",
        company_description: "Leading technology solutions provider",
        profile_picture: "https://via.placeholder.com/150"
      },
      job_type: "Part-time", // Updated to use full words
      salary: 110000,
      location: "San Francisco, CA",
      status: "closed",
      deadline: "2023-07-05",
      created_at: "2023-06-05T09:15:00Z",
      updated_at: "2023-06-05T09:15:00Z"
    }
  ]
};

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job | null>(null);
  const [currentJob, setCurrentJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const getJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      // Use the proxy API instead of direct backend URL
      const response = await api.get('/jobs');
      setJobs(response.data);
      return response.data;
    } catch (err: any) {
      console.error("Error fetching jobs:", err);
      setError(err.message || "Failed to fetch jobs");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getStudentJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      // Use the proxy API instead of direct backend URL
      const response = await api.get('/jobs/my-jobs');
      setJobs(response.data);
      return response.data;
    } catch (err: any) {
      console.error("Error fetching student jobs:", err);
      setError(err.message || "Failed to fetch your jobs");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getPostedJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching posted jobs");
      
      // Use the proxy API instead of direct backend URL
      const response = await api.get('/jobs/posted_jobs');
      console.log("Posted jobs response:", response.data);
      
      setJobs(response.data);
      return response.data;
    } catch (err: any) {
      console.error("Error fetching posted jobs:", err);
      setError(err.message || "Failed to fetch posted jobs");
      
      // Return mock data as fallback
      console.log("Returning mock posted jobs data");
      return MOCK_POSTED_JOBS;
    } finally {
      setLoading(false);
    }
  };
  
  const getJobsById = async (jobId: string): Promise<Job | null> => {
    try {
      setLoading(true);
      setError(null);
      // Use the proxy API instead of direct backend URL
      const response = await api.get(`/jobs/${jobId}`);
      setCurrentJob(response.data);
      return response.data;
    } catch (err: any) {
      console.error("Error fetching job details:", err);
      setError(err.message || "Failed to fetch job details");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createJob = async (jobData: any) => {
    try {
      setLoading(true);
      setError(null);
      
      // No need to modify job_type, use it as is
      console.log(`Using job type: ${jobData.job_type}`);
      
      // Ensure salary is a number
      if (jobData.salary && typeof jobData.salary === 'string') {
        jobData.salary = Number(jobData.salary.replace(/[^0-9.]/g, ''));
      }
      
      console.log("Submitting job data:", jobData);
      
      // Use the proxy API instead of direct backend URL
      const response = await api.post('/jobs', jobData);
      console.log("Job creation response:", response.data);
      
      setJobs(response.data);
      return response.data;
    } catch (err: any) {
      console.error("Error creating job:", err);
      
      // Extract validation errors from the response if available
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        
        if (errorData.fields) {
          // Format field errors for display
          const fieldErrors = Object.entries(errorData.fields)
            .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`)
            .join('; ');
          
          setError(fieldErrors || errorData.details || err.message);
        } else if (errorData.details) {
          setError(errorData.details);
        } else {
          setError(err.message || "Failed to create job");
        }
      } else {
        setError(err.message || "Failed to create job");
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateJob = async (jobId: string, jobData: any) => {
    try {
      setLoading(true);
      setError(null);
      
      // No need to modify job_type, use it as is
      
      // Ensure salary is a number
      if (jobData.salary && typeof jobData.salary === 'string') {
        jobData.salary = Number(jobData.salary.replace(/[^0-9.]/g, ''));
      }
      
      // Use the proxy API instead of direct backend URL
      const response = await api.put(`/jobs/${jobId}`, jobData);
      setJobs(response.data);
      return response.data;
    } catch (err: any) {
      console.error("Error updating job:", err);
      setError(err.message || "Failed to update job");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (jobId: string) => {
    try {
      setLoading(true);
      setError(null);
      // Use the proxy API instead of direct backend URL
      await api.delete(`/jobs/${jobId}`);
      setJobs(null);
    } catch (err: any) {
      console.error("Error deleting job:", err);
      setError(err.message || "Failed to delete job");
      throw err;
    } finally {
      setLoading(false);
    }
  };


  return (
    <JobContext.Provider 
      value={{ 
        jobs, 
        currentJob,
        loading, 
        error, 
        getJobs, 
        getStudentJobs,
        getPostedJobs,
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