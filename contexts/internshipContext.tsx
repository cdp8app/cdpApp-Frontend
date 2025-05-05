"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";


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
//     startDate: string;
//     endDate: string;
//   status: string;
company_details?: {
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
  getInternshipsById: (internshipId: string) => Promise<void>;
  createInternship: (internshipData: any) => Promise<void>;
  updateInternship: (internshipId: string, internshipData: any) => Promise<void>;
  deleteInternship: (internshipId: string) => Promise<void>;
};

const InternshipContext = createContext<InternshipContextType | undefined>(undefined);

export const InternshipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [internships, setInternships] = useState<Internship | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const getInternships = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/internships/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.detail || "Failed to fetch internships");
      }
    
      setInternships(data);
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getStudentInternships = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/internships/my-internships/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.detail || "Failed to fetch internships");
      }
    
      setInternships(data);
      return data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getInternshipsById = async (internshipId: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/internships/${internshipId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || data.detail || "Failed to fetch internship");
      }
    
      setInternships(data);
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    }
    finally {
      setLoading(false);
    }
  };

  const createInternship = async (internshipData: Internship) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/internships/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(internshipData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.detail || "Failed to create internship");
      }

      setInternships(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateInternship = async (internshipId: string, internshipData: Internship) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/internships/${internshipId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(internshipData),
      });
    
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || data.detail || "Failed to update internship");
      }
    
      setInternships(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteInternship = async (internshipId: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/internships/${internshipId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
        
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || data.detail || "Failed to delete internship");
      }
        
      setInternships(null);
    } catch (err: any) {
      setError(err.message);
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