"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function StudentProfileSetup() {
  const { user, getStudentProfile, updateProfile, loading, error } = useAuth();
  const router = useRouter();
  
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    university: "",
    major: "",
    expected_graduation: "",
    bio: "",
    skills: [] as string[],
    linkedin_url: "",
    github_url: "",
    portfolio_url: ""
  });
  
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const studentProfile = await getStudentProfile();
        if (studentProfile && (studentProfile.first_name || studentProfile.last_name)) {
          // If we have a profile with a name, we're editing an existing profile
          setIsEdit(true);
          setProfile({
            first_name: studentProfile.first_name || "",
            last_name: studentProfile.last_name || "",
            university: studentProfile.university || "",
            major: studentProfile.major || "",
            expected_graduation: studentProfile.expected_graduation || "",
            bio: studentProfile.bio || "",
            skills: studentProfile.skills || [],
            linkedin_url: studentProfile.linkedin_url || "",
            github_url: studentProfile.github_url || "",
            portfolio_url: studentProfile.portfolio_url || ""
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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(",").map(skill => skill.trim());
    setProfile(prev => ({ ...prev, skills }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setSuccess(false);
    
    // Validate required fields
    if (!profile.first_name || !profile.last_name) {
      setFormError("First name and last name are required");
      return;
    }
    
    try {
      // Use direct fetch instead of the context method for better error handling
      const response = await fetch("/api/proxy/user/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...profile,
          userType: "student"
        }),
        credentials: "include", // Include cookies for authentication
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error("Profile update failed:", errorData);
        throw new Error(`Failed to update profile: ${response.status} ${errorData}`);
      }
      
      const data = await response.json();
      console.log("Profile update response:", data);
      
      setSuccess(true);
      setTimeout(() => {
        router.push("/student/profile");
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
      <h1 className="text-2xl font-bold mb-6">{isEdit ? "Edit Student Profile" : "Student Profile Setup"}</h1>
      
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">First Name*</label>
            <input
              type="text"
              name="first_name"
              value={profile.first_name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1">Last Name*</label>
            <input
              type="text"
              name="last_name"
              value={profile.last_name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block mb-1">University</label>
          <input
            type="text"
            name="university"
            value={profile.university}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Major</label>
            <input
              type="text"
              name="major"
              value={profile.major}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block mb-1">Expected Graduation</label>
            <input
              type="date"
              name="expected_graduation"
              value={profile.expected_graduation}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        
        <div>
          <label className="block mb-1">Bio</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>
        
        <div>
          <label className="block mb-1">Skills (comma-separated)</label>
          <input
            type="text"
            name="skills"
            value={profile.skills.join(", ")}
            onChange={handleSkillsChange}
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
        
        <div>
          <label className="block mb-1">GitHub URL</label>
          <input
            type="url"
            name="github_url"
            value={profile.github_url}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block mb-1">Portfolio URL</label>
          <input
            type="url"
            name="portfolio_url"
            value={profile.portfolio_url}
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