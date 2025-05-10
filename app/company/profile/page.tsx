"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function CompanyProfile() {
  const { user, getCompanyProfile, loading, error } = useAuth();
  const router = useRouter();
  
  const [profile, setProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  
  useEffect(() => {
    const fetchProfile = async () => {
      setLoadingProfile(true);
      try {
        const companyProfile = await getCompanyProfile();
        setProfile(companyProfile);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoadingProfile(false);
      }
    };
    
    fetchProfile();
  }, []);
  
  if (loadingProfile) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }
  
  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md mb-6">
          <h2 className="text-xl font-semibold text-yellow-700 mb-2">Profile Not Found</h2>
          <p className="text-yellow-600 mb-4">
            You haven't set up your company profile yet. Complete your profile to get started.
          </p>
          <Link 
            href="/company/profile/setup" 
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Set Up Profile
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Company Profile</h1>
        <Link 
          href="/company/profile/setup" 
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Edit Profile
        </Link>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-blue-50 p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
            {profile.profile_picture ? (
              <Image 
                src={profile.profile_picture} 
                alt={profile.company_name}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-500 text-2xl font-bold">
                {profile.company_name?.[0]}
              </div>
            )}
          </div>
          
          <div>
            <h2 className="text-2xl font-bold">{profile.company_name}</h2>
            <p className="text-gray-600">{profile.company_industry}</p>
            <p className="text-gray-500 mt-1">{profile.company_location}</p>
            
            <div className="flex gap-3 mt-4">
              {profile.company_website && (
                <a href={profile.company_website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </a>
              )}
              
              {profile.linkedin_url && (
                <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">About Us</h3>
            <p className="text-gray-700">{profile.company_description || "No description provided."}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Company Details</h3>
              <div className="space-y-2">
                <div className="flex">
                  <span className="font-medium w-32">Size:</span>
                  <span className="text-gray-700">{profile.company_size || "Not specified"}</span>
                </div>
                
                <div className="flex">
                  <span className="font-medium w-32">Founded:</span>
                  <span className="text-gray-700">{profile.company_founded_year || "Not specified"}</span>
                </div>
                
                <div className="flex">
                  <span className="font-medium w-32">Industry:</span>
                  <span className="text-gray-700">{profile.company_industry || "Not specified"}</span>
                </div>
                
                <div className="flex">
                  <span className="font-medium w-32">Location:</span>
                  <span className="text-gray-700">{profile.company_location || "Not specified"}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
              <div className="space-y-2">
                {profile.company_website && (
                  <div className="flex">
                    <span className="font-medium w-32">Website:</span>
                    <a 
                      href={profile.company_website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {profile.company_website}
                    </a>
                  </div>
                )}
                
                {profile.linkedin_url && (
                  <div className="flex">
                    <span className="font-medium w-32">LinkedIn:</span>
                    <a 
                      href={profile.linkedin_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Company LinkedIn
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}