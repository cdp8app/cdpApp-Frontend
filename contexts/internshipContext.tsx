"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/api";

// Define types
export interface Internship {
  id: string;
  title: string;
  location: string;
  description: string;
  requirements: string;
  duration: string;
  stipend: string;
  student: string;
  job_details?: {
    title: string;
    location?: string;
    description?: string;
    requirements?: string;
    deadline?: string;
  };
  company_details?: {
    id: string;
    company_name?: string;
    company_industry?: string;
    profile_picture?: string;
  };
  application?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

interface InternshipContextType {
  internships: Internship | null;
  loading: boolean;
  error: string | null;
  getInternships: () => Promise<void>;
  getStudentInternships: () => Promise<void>;
  getAllInternships: () => Promise<any>; // Added method for students to see all internships
  getInternshipsById: (internshipId: string) => Promise<void>;
  createInternship: (internshipData: any) => Promise<void>;
  updateInternship: (internshipId: string, internshipData: any) => Promise<void>;
  deleteInternship: (internshipId: string) => Promise<void>;
};

const InternshipContext = createContext<InternshipContextType | undefined>(undefined);

// Mock data for student internships
const MOCK_STUDENT_INTERNSHIPS = [
  {
    id: "1",
    title: "Software Engineering Intern",
    company_details: {
      id: "c1",
      company_name: "Tech Solutions Inc",
      company_industry: "Technology",
      profile_picture: "https://via.placeholder.com/150"
    },
    location: "San Francisco, CA",
    description: "Join our team as a software engineering intern",
    requirements: "Knowledge of JavaScript and React",
    duration: "3 months",
    stipend: "2000",
    status: "active",
    createdAt: "2023-06-01T10:30:00Z",
    updatedAt: "2023-06-01T10:30:00Z",
    student: "student-1"
  },
  {
    id: "2",
    title: "Data Science Intern",
    company_details: {
      id: "c2",
      company_name: "Analytics Pro",
      company_industry: "Data Analytics",
      profile_picture: "https://via.placeholder.com/150"
    },
    location: "Remote",
    description: "Work on machine learning projects",
    requirements: "Knowledge of Python and pandas",
    duration: "4 months",
    stipend: "1800",
    status: "upcoming",
    createdAt: "2023-05-15T14:45:00Z",
    updatedAt: "2023-05-15T14:45:00Z",
    student: "student-1"
  }
];

// Mock data for all available internships
const MOCK_ALL_INTERNSHIPS = [
  {
    id: "101",
    title: "Software Engineering Intern",
    description: "Join our team as a software engineering intern",
    requirements: "Knowledge of JavaScript and React",
    company_details: {
      id: "c1",
      company_name: "Tech Solutions Inc",
      company_industry: "Technology",
      profile_picture: "https://via.placeholder.com/150"
    },
    location: "San Francisco, CA",
    stipend: "2000",
    duration: "3 months",
    status: "open",
    createdAt: "2023-06-01T10:30:00Z",
    updatedAt: "2023-06-01T10:30:00Z",
    student: ""
  },
  {
    id: "102",
    title: "Data Science Intern",
    description: "Work on machine learning projects",
    requirements: "Knowledge of Python and pandas",
    company_details: {
      id: "c2",
      company_name: "Analytics Pro",
      company_industry: "Data Analytics",
      profile_picture: "https://via.placeholder.com/150"
    },
    location: "Remote",
    stipend: "1800",
    duration: "4 months",
    status: "open",
    createdAt: "2023-05-15T14:45:00Z",
    updatedAt: "2023-05-15T14:45:00Z",
    student: ""
  },
  {
    id: "103",
    title: "Marketing Intern",
    description: "Help with digital marketing campaigns",
    requirements: "Knowledge of social media marketing",
    company_details: {
      id: "c3",
      company_name: "Marketing Masters",
      company_industry: "Marketing",
      profile_picture: "https://via.placeholder.com/150"
    },
    location: "New York, NY",
    stipend: "1500",
    duration: "3 months",
    status: "open",
    createdAt: "2023-05-20T09:15:00Z",
    updatedAt: "2023-05-20T09:15:00Z",
    student: ""
  }
];

export const InternshipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [internships, setInternships] = useState<Internship | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const getInternships = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use the API module instead of direct fetch
      const response = await api.get('/internships');
      
      setInternships(response.data);
      return response.data;
    } catch (err: any) {
      console.error("Error fetching internships:", err);
      setError(err.message || "Failed to fetch internships");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getStudentInternships = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Fetching student internships");
      
      // Use the API module instead of direct fetch
      const response = await api.get('/internships/my-internships');
      
      console.log("Student internships response:", response.data);
      setInternships(response.data);
      return response.data;
    } catch (err: any) {
      console.error("Error fetching student internships:", err);
      setError(err.message || "Failed to fetch internships");
      
      // Return mock data as fallback
      console.log("Returning mock student internships data");
      return MOCK_STUDENT_INTERNSHIPS;
    } finally {
      setLoading(false);
    }
  };

  // New method for students to see all available internships
  const getAllInternships = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Fetching all available internships");
      
      // Use fetch directly to avoid any axios encoding issues
      const response = await fetch('/api/proxy/internships/all', {
        credentials: 'include', // Include cookies for authentication
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch internships: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("All internships response:", data);
      
      setInternships(data);
      return data;
    } catch (err: any) {
      console.error("Error fetching all internships:", err);
      setError(err.message || "Failed to fetch internships");
      
      // Return mock data as fallback
      console.log("Returning mock all internships data");
      return MOCK_ALL_INTERNSHIPS;
    } finally {
      setLoading(false);
    }
  };

  const getInternshipsById = async (internshipId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`Fetching internship details for ID: ${internshipId}`);
      
      // Use fetch directly to avoid any axios encoding issues
      const response = await fetch(`/api/proxy/internships/${internshipId}`, {
        credentials: 'include', // Include cookies for authentication
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch internship details: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Internship details response:", data);
      
      setInternships(data);
      return data;
    } catch (err: any) {
      console.error("Error fetching internship details:", err);
      setError(err.message || "Failed to fetch internship details");
      
      // Return mock data as fallback
      const mockData = {
        id: internshipId,
        title: `Mock Internship ${internshipId}`,
        description: "This is a mock internship description",
        requirements: "Mock requirements",
        location: "Remote",
        duration: "3 months",
        stipend: "2000",
        status: "active",
        company_details: {
          id: "c1",
          company_name: "Mock Company",
          company_industry: "Technology",
          profile_picture: "https://via.placeholder.com/150"
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        student: "student-1"
      };
      
      return mockData;
    } finally {
      setLoading(false);
    }
  };

  const createInternship = async (internshipData: Internship) => {
    try {
      setLoading(true);
      setError(null);
      
      // Use the API module instead of direct fetch
      const response = await api.post('/internships', internshipData);
      
      setInternships(response.data);
      return response.data;
    } catch (err: any) {
      console.error("Error creating internship:", err);
      setError(err.message || "Failed to create internship");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateInternship = async (internshipId: string, internshipData: Internship) => {
    try {
      setLoading(true);
      setError(null);
      
      // Use the API module instead of direct fetch
      const response = await api.put(`/internships/${internshipId}`, internshipData);
      
      setInternships(response.data);
      return response.data;
    } catch (err: any) {
      console.error("Error updating internship:", err);
      setError(err.message || "Failed to update internship");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteInternship = async (internshipId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Use the API module instead of direct fetch
      await api.delete(`/internships/${internshipId}`);
      
      setInternships(null);
    } catch (err: any) {
      console.error("Error deleting internship:", err);
      setError(err.message || "Failed to delete internship");
      throw err;
    } finally {
      setLoading(false);
    }
  };


  return (
    <InternshipContext.Provider 
      value={{ 
        internships, 
        loading, 
        error, 
        getInternships, 
        getStudentInternships,
        getAllInternships, // Added new method
        getInternshipsById, 
        createInternship, 
        updateInternship, 
        deleteInternship 
      }}
    >
      {children}
    </InternshipContext.Provider>
  );
};

export const useInternshipContext = () => {
  const context = useContext(InternshipContext);
  if (!context) {
    throw new Error("useInternshipContext must be used within an InternshipProvider");
  }
  return context;
};