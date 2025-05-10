"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function CompanyProfileSetup() {
  const { user, getCompanyProfile, updateProfile, loading, error } = useAuth();
  const router = useRouter();
  
  const [profile, setProfile] = useState({
    company_name: "",
    company_industry: "",
    company_description: "",
    company_size: "",
    company_website: "",
    company_location: "",
    company_founded_year: "",
    linkedin_url: ""
  });
  
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const companyProfile = await getCompanyProfile();
        if (companyProfile && companyProfile.company_name) {
          // If we have a profile with a name, we're editing an existing profile
          setIsEdit(true);
          setProfile({
            company_name: companyProfile.company_name || "",
            company_industry: companyProfile.company_industry || "",
            company_description: companyProfile.company_description || "",
            company_size: companyProfile.company_size || "",
            company_website: companyProfile.company_website || "",
            company_location: companyProfile.company_location || "",
            company_founded_year: companyProfile.company_founded_year?.toString() || "",
            linkedin_url: companyProfile.linkedin_url || ""
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        // Don't show error for new profiles
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfile();
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setSuccess(false);
    
    // Validate required fields
    if (!profile.company_name) {
      setFormError("Company name is required");
      return;
    }
    
    if (!profile.company_industry) {
      setFormError("Industry is required");
      return;
    }
    
    try {
      // First, fetch a fresh CSRF token
      try {
        await fetch("/api/proxy/csrf-cookie", {
          method: "GET",
          credentials: "include",
        });
      } catch (csrfError) {
        console.warn("Failed to fetch CSRF token:", csrfError);
        // Continue anyway, the update might still work
      }
      
      // Use direct fetch instead of the context method for better error handling
      const response = await fetch("/api/proxy/user/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...profile,
          company_founded_year: profile.company_founded_year ? parseInt(profile.company_founded_year) : null,
          userType: "company"
        }),
        credentials: "include", // Include cookies for authentication
      });
      
      const responseText = await response.text();
      let data;
      
      try {
        // Try to parse as JSON
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Failed to parse response:", parseError);
        throw new Error(`Failed to update profile: Server returned invalid response format. Status: ${response.status}`);
      }
      
      if (!response.ok) {
        console.error("Profile update failed:", data);
        
        if (response.status === 401 || response.status === 403) {
          // Authentication issue
          throw new Error("Authentication failed. Please log in again.");
        } else {
          throw new Error(data.error || data.message || `Failed to update profile: ${response.status}`);
        }
      }
      
      console.log("Profile update response:", data);
      
      setSuccess(true);
      setTimeout(() => {
        router.push("/company/profile");
      }, 2000);
    } catch (err: any) {
      console.error("Error updating profile:", err);
      setFormError(err.message || "Failed to update profile. Please try again.");
    }
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{isEdit ? "Edit Company Profile" : "Company Profile Setup"}</h1>
      
      {formError && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {formError}
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
          Profile updated successfully! Redirecting...
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Company Name*</label>
          <input
            type="text"
            name="company_name"
            value={profile.company_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block mb-1">Industry*</label>
          <input
            type="text"
            name="company_industry"
            value={profile.company_industry}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="company_description"
            value={profile.company_description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Company Size</label>
            <select
              name="company_size"
              value={profile.company_size}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select company size</option>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-500">201-500 employees</option>
              <option value="501-1000">501-1000 employees</option>
              <option value="1001+">1001+ employees</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-1">Founded Year</label>
            <input
              type="number"
              name="company_founded_year"
              value={profile.company_founded_year}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>
        </div>
        
        <div>
          <label className="block mb-1">Website</label>
          <input
            type="url"
            name="company_website"
            value={profile.company_website}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block mb-1">Location</label>
          <input
            type="text"
            name="company_location"
            value={profile.company_location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block mb-1">LinkedIn URL</label>
          <input
            type="url"
            name="linkedin_url"
            value={profile.linkedin_url}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? "Saving..." : (isEdit ? "Update Profile" : "Save Profile")}
          </button>
        </div>
      </form>
    </div>
  );
}