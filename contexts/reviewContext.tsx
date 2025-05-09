"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";


// Define types
export interface Review {
  id: string;
  title: string;
  company?: {
    id: string;
    company_name: string;
    company_industry: string;
  };
    location: string;
    review_type: string;
  description: string;
    requirements: string;
    salary: string;
    deadline: string;
  createdAt: string;
  updatedAt: string;
};

interface ReviewContextType {
  reviews: Review | null;
  currentReview: Review | null;
  loading: boolean;
  error: string | null;
  getReviews: () => Promise<void>;
  getReviewsById: (reviewId: string) => Promise<Review | null>;
  createReview: (reviewData: any) => Promise<void>;
  updateReview: (reviewId: string, reviewData: any) => Promise<void>;
  deleteReview: (reviewId: string) => Promise<void>;
};

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review | null>(null);
  const [currentReview, setCurrentReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const getReviews = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || data.detail || "Failed to fetch reviews");
      }

      setReviews(data);
      return data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const getReviewsById = async (reviewId: string): Promise<Review | null> => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${reviewId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || data.detail || "Failed to fetch review");
      }
      
      setCurrentReview(data);
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createReview = async (reviewData: Review) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.detail || "Failed to create review");
      }

      setReviews(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateReview = async (reviewId: string, reviewData: Review) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${reviewId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
      });
    
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || data.detail || "Failed to update review");
      }
    
      setReviews(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (reviewId: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${reviewId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
        
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || data.detail || "Failed to delete review");
      }
        
      setReviews(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <ReviewContext.Provider 
      value={{ 
        reviews, 
        currentReview,
        loading, 
        error, 
        getReviews, 
        getReviewsById, 
        createReview, 
        updateReview, 
        deleteReview 
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviewContext = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error("useReviewContext must be used within an ReviewProvider");
  }
  return context;
};