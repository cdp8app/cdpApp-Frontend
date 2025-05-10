"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/api";

// Define types
export interface Offer {
  id: string;
  company?: {
    id: string;
    company_name: string;
    company_industry: string;
  };
  job: {
    title: string;
    location: string;
    description: string;
    requirements: string;
    deadline: string;
  };
  employer?: {
    company_name: string;
    company_industry: string;
  };
  company_details?: {
    id: string;
    company_name?: string;
    company_industry?: string;
    profile_picture?: string;
  };
  application_details?: {
    id: string;
    job?: {
      id: string;
      location?: string;
      description?: string;
      requirements?: string;
      deadline?: string;
    };
  };
  student_details?: {
    id: string;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
};

interface OfferContextType {
  offers: Offer | null;
  currentOffer: Offer | null;
  loading: boolean;
  error: string | null;
  getOffers: () => Promise<void>;
  getStudentOffers: () => Promise<void>;
  getCompanyExtendOffers: () => Promise<void>;
  getOffersById: (offerId: string) => Promise<Offer | null>;
  createOffer: (offerData: any) => Promise<void>;
  updateOffer: (offerId: string, offerData: any) => Promise<void>;
  deleteOffer: (offerId: string) => Promise<void>;
};

const OfferContext = createContext<OfferContextType | undefined>(undefined);

// Mock data for offers
const MOCK_STUDENT_OFFERS = [
  {
    id: "1",
    job: {
      title: "Software Engineer",
      location: "San Francisco, CA",
      description: "Join our team as a software engineer",
      requirements: "5+ years of experience in software development",
      deadline: "2023-07-15"
    },
    company_details: {
      id: "c1",
      company_name: "Tech Solutions Inc",
      company_industry: "Technology",
      profile_picture: "https://via.placeholder.com/150"
    },
    status: "pending",
    createdAt: "2023-06-15T10:30:00Z",
    updatedAt: "2023-06-15T10:30:00Z"
  },
  {
    id: "2",
    job: {
      title: "Frontend Developer",
      location: "Remote",
      description: "Work on our web applications",
      requirements: "3+ years of experience with React",
      deadline: "2023-07-10"
    },
    company_details: {
      id: "c2",
      company_name: "WebDesign Pro",
      company_industry: "Web Development",
      profile_picture: "https://via.placeholder.com/150"
    },
    status: "accepted",
    createdAt: "2023-06-10T14:45:00Z",
    updatedAt: "2023-06-10T14:45:00Z"
  }
];

const MOCK_COMPANY_OFFERS = [
  {
    id: "3",
    job: {
      title: "Software Engineer",
      location: "San Francisco, CA",
      description: "Join our team as a software engineer",
      requirements: "5+ years of experience in software development",
      deadline: "2023-07-15"
    },
    student_details: {
      id: "s1"
    },
    status: "pending",
    createdAt: "2023-06-15T10:30:00Z",
    updatedAt: "2023-06-15T10:30:00Z"
  },
  {
    id: "4",
    job: {
      title: "Frontend Developer",
      location: "Remote",
      description: "Work on our web applications",
      requirements: "3+ years of experience with React",
      deadline: "2023-07-10"
    },
    student_details: {
      id: "s2"
    },
    status: "accepted",
    createdAt: "2023-06-10T14:45:00Z",
    updatedAt: "2023-06-10T14:45:00Z"
  }
];

export const OfferProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [offers, setOffers] = useState<Offer | null>(null);
  const [currentOffer, setCurrentOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const getOffers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use the API module instead of direct fetch
      const response = await api.get('/offers');
      
      setOffers(response.data);
      return response.data;
    } catch (err: any) {
      console.error("Error fetching offers:", err);
      setError(err.message || "Failed to fetch offers");
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const getOffersById = async (offerId: string): Promise<Offer | null> => {
    try {
      setLoading(true);
      setError(null);
      
      // Use the API module instead of direct fetch
      const response = await api.get(`/offers/${offerId}`);
      
      setCurrentOffer(response.data);
      return response.data;
    } catch (err: any) {
      console.error("Error fetching offer details:", err);
      setError(err.message || "Failed to fetch offer details");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getStudentOffers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Fetching student offers");
      
      // Use the API module instead of direct fetch
      const response = await api.get('/offers/my-offers');
      
      console.log("Student offers response:", response.data);
      setOffers(response.data);
      return response.data;
    } catch (err: any) {
      console.error("Error fetching student offers:", err);
      setError(err.message || "Failed to fetch offers");
      
      // Return mock data as fallback
      console.log("Returning mock student offers data");
      return MOCK_STUDENT_OFFERS;
    } finally {
      setLoading(false);
    }
  };

  const getCompanyExtendOffers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Fetching company sent offers");
      
      // Use the API module instead of direct fetch
      const response = await api.get('/offers/sent-offers');
      
      console.log("Company sent offers response:", response.data);
      setOffers(response.data);
      return response.data;
    } catch (err: any) {
      console.error("Error fetching company sent offers:", err);
      setError(err.message || "Failed to fetch offers");
      
      // Return mock data as fallback
      console.log("Returning mock company offers data");
      return MOCK_COMPANY_OFFERS;
    } finally {
      setLoading(false);
    }
  };

  const createOffer = async (offerData: Offer) => {
    try {
      setLoading(true);
      setError(null);
      
      // Use the API module instead of direct fetch
      const response = await api.post('/offers', offerData);
      
      setOffers(response.data);
      return response.data;
    } catch (err: any) {
      console.error("Error creating offer:", err);
      setError(err.message || "Failed to create offer");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateOffer = async (offerId: string, offerData: Offer) => {
    try {
      setLoading(true);
      setError(null);
      
      // Use the API module instead of direct fetch
      const response = await api.patch(`/offers/${offerId}`, offerData);
      
      setOffers(response.data);
      return response.data;
    } catch (err: any) {
      console.error("Error updating offer:", err);
      setError(err.message || "Failed to update offer");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteOffer = async (offerId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Use the API module instead of direct fetch
      await api.delete(`/offers/${offerId}`);
      
      setOffers(null);
    } catch (err: any) {
      console.error("Error deleting offer:", err);
      setError(err.message || "Failed to delete offer");
      throw err;
    } finally {
      setLoading(false);
    }
  };


  return (
    <OfferContext.Provider 
      value={{ 
        offers, 
        currentOffer,
        loading, 
        error, 
        getOffers, 
        getStudentOffers,
        getCompanyExtendOffers,
        getOffersById, 
        createOffer, 
        updateOffer, 
        deleteOffer 
      }}
    >
      {children}
    </OfferContext.Provider>
  );
};

export const useOfferContext = () => {
  const context = useContext(OfferContext);
  if (!context) {
    throw new Error("useOfferContext must be used within an OfferProvider");
  }
  return context;
};