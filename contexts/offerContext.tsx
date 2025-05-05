"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";


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

export const OfferProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [offers, setOffers] = useState<Offer | null>(null);
  const [currentOffer, setCurrentOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const getOffers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/offers/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || data.detail || "Failed to fetch offers");
      }

      setOffers(data);
      return data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const getOffersById = async (offerId: string): Promise<Offer | null> => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/offers/${offerId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || data.detail || "Failed to fetch offer");
      }
      
      setCurrentOffer(data);
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getStudentOffers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/offers/my-offers/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.detail || "Failed to fetch offers");
      }
    
      setOffers(data);
      return data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCompanyExtendOffers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/offers/sent-offers/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.detail || "Failed to fetch offers");
      }
    
      setOffers(data);
      return data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createOffer = async (offerData: Offer) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/offers/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(offerData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.detail || "Failed to create offer");
      }

      setOffers(data);
      // router.push("/company/offers");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateOffer = async (offerId: string, offerData: Offer) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/offers/${offerId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(offerData),
      });
    
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || data.detail || "Failed to update offer");
      }
    
      setOffers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteOffer = async (offerId: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/offers/${offerId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
        
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || data.detail || "Failed to delete offer");
      }
        
      setOffers(null);
    } catch (err: any) {
      setError(err.message);
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