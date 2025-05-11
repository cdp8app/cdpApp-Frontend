"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/app/Components/ui/card";
import { Button } from "@/app/Components/ui/button";
import { Textarea } from "@/app/Components/ui/textarea";
import { AlertCircle, ArrowLeft, Upload, FileText, Building, MapPin, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/app/Components/ui/alert";
import Link from "next/link";
import AuthRedirect from "@/app/Components/AuthRedirect";

// Opportunity interface
interface Opportunity {
  id: number
  title: string
  company_name: string
  location: string
  description: string
}

// Allowed file types
const ALLOWED_RESUME_TYPES = [".pdf", ".doc", ".docx"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function ApplyPage({ params }: { params: { id: string } }) {
  const opportunityId = params.id;
  const router = useRouter();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const coverLetterInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchOpportunity() {
      try {
        const response = await fetch(`/api/proxy/student/opportunities/${opportunityId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch opportunity details");
        }

        const data = await response.json();
        setOpportunity(data);
      } catch (error) {
        console.error("Error fetching opportunity:", error);
        setError("Failed to load opportunity details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchOpportunity();
  }, [opportunityId]);

  // Validate file type
  const validateFileType = (file: File, allowedTypes: string[]) => {
    const extension = file.name.split(".").pop()?.toLowerCase() || "";
    return allowedTypes.includes(`.${extension}`);
  };

  // Handle resume file change
  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        setError("Resume file size must be less than 5MB");
        return;
      }
      
      // Check file type
      if (!validateFileType(file, ALLOWED_RESUME_TYPES)) {
        setError("Please upload a PDF, DOC, or DOCX file for your resume");
        return;
      }
      
      setResume(file);
      setError(""); // Clear any previous errors
    }
  };

  // Handle cover letter file change
  const handleCoverLetterFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        setError("Cover letter file size must be less than 5MB");
        return;
      }
      
      // Check file type
      if (!validateFileType(file, ALLOWED_RESUME_TYPES)) {
        setError("Please upload a PDF, DOC, or DOCX file for your cover letter");
        return;
      }
      
      setCoverLetterFile(file);
      setError(""); // Clear any previous errors
    }
  };

  // Form validation
  const validateForm = () => {
    if (!resume) {
      setError("Please upload your resume");
      return false;
    }
    
    if (resume.size > MAX_FILE_SIZE) {
      setError("Resume file size must be less than 5MB");
      return false;
    }
    
    if (coverLetterFile && coverLetterFile.size > MAX_FILE_SIZE) {
      setError("Cover letter file size must be less than 5MB");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError("");
    setShowSuccess(false);

    try {
      // Create a FormData object to handle file uploads
      const formData = new FormData();
      formData.append("opportunity_id", opportunityId);
      formData.append("job_id", opportunityId); // Add both formats for compatibility
      formData.append("resume", resume);
      
      if (coverLetterFile) {
        formData.append("cover_letter_file", coverLetterFile);
      } else if (coverLetter) {
        formData.append("cover_letter_text", coverLetter);
        formData.append("cover_letter", coverLetter); // Add both formats for compatibility
      }

      // Add additional fields that might be required by the API
      formData.append("status", "pending");
      
      // Get CSRF token first
      try {
        await fetch("/api/proxy/csrf-cookie", {
          method: "GET",
          credentials: "include",
        });
      } catch (csrfError) {
        console.warn("Failed to fetch CSRF token:", csrfError);
        // Continue anyway, the submission might still work
      }

      const response = await fetch("/api/proxy/applications", {
        method: "POST",
        body: formData,
        credentials: "include", // Include cookies for authentication
      });

      if (!response.ok) {
        const errorData = await response.text();
        let errorMessage = "Failed to submit application";
        
        try {
          const errorJson = JSON.parse(errorData);
          errorMessage = errorJson.message || errorJson.error || errorJson.detail || errorMessage;
        } catch (e) {
          // Not JSON, use status code to determine error
          if (response.status === 401 || response.status === 403) {
            errorMessage = "Authentication required. Please log in again.";
          } else if (response.status === 413) {
            errorMessage = "File too large. Please upload a smaller file.";
          } else if (response.status === 415) {
            errorMessage = "File type not supported.";
          } else {
            errorMessage = `Failed to submit application: ${response.status}`;
          }
        }
        
        console.error("Application submission failed:", errorData);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Application submitted successfully:", data);

      // Show success message before redirecting
      setShowSuccess(true);
      setTimeout(() => {
        router.push("/student/applications?success=true");
      }, 2000);
    } catch (error: any) {
      console.error("Error submitting application:", error);
      setError(error.message || "Failed to submit application. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error && !opportunity) {
    return (
      <div className="container py-10">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="container py-10">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Opportunity not found</AlertDescription>
        </Alert>
        <Button variant="outline" onClick={() => router.push("/student/opportunities")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Opportunities
        </Button>
      </div>
    );
  }

  return (
    <>
      <AuthRedirect />
      <div className="container py-10">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Apply for {opportunity.title}</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <Building className="mr-1 h-4 w-4" />
                  {opportunity.company_name}
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  {showSuccess && (
                    <Alert className="bg-green-50 text-green-700 border-green-200">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <AlertDescription>Application submitted successfully! Redirecting...</AlertDescription>
                      </div>
                    </Alert>
                  )}
                  
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div>
                    <h3 className="font-medium mb-2">Resume *</h3>
                    <div className="border rounded-md p-4">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeChange}
                        className="hidden"
                        ref={resumeInputRef}
                      />
                      {resume ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-blue-500 mr-2" />
                            <span>{resume.name}</span>
                            <span className="ml-2 text-xs text-gray-500">
                              ({(resume.size / (1024 * 1024)).toFixed(2)} MB)
                            </span>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => resumeInputRef.current?.click()}
                          >
                            Change
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">Upload your resume (PDF, DOC, DOCX, max 5MB)</p>
                          <Button type="button" onClick={() => resumeInputRef.current?.click()}>
                            Select File
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Cover Letter (Optional)</h3>
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Write your cover letter here..."
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        rows={8}
                        disabled={!!coverLetterFile}
                      />

                      <div className="text-sm text-muted-foreground">Or upload a cover letter file:</div>

                      <div className="border rounded-md p-4">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleCoverLetterFileChange}
                          className="hidden"
                          ref={coverLetterInputRef}
                        />
                        {coverLetterFile ? (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 text-blue-500 mr-2" />
                              <span>{coverLetterFile.name}</span>
                              <span className="ml-2 text-xs text-gray-500">
                                ({(coverLetterFile.size / (1024 * 1024)).toFixed(2)} MB)
                              </span>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setCoverLetterFile(null);
                                if (coverLetterInputRef.current) {
                                  coverLetterInputRef.current.value = "";
                                }
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground mb-2">Upload your cover letter (PDF, DOC, DOCX, max 5MB)</p>
                            <Button 
                              type="button" 
                              variant="outline"
                              onClick={() => coverLetterInputRef.current?.click()}
                            >
                              Select File
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => router.back()}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting || showSuccess}>
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Opportunity Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">Company</h3>
                  <p className="text-sm text-muted-foreground">{opportunity.company_name}</p>
                </div>
                
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {opportunity.location}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium">Description</h3>
                  <p className="text-sm text-muted-foreground">{opportunity.description}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}