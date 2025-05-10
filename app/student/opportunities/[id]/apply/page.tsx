"use client";

import type React from "react";

import { use, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/app/Components/ui/card";
import { Button } from "@/app/Components/ui/button";
import { Textarea } from "@/app/Components/ui/textarea";
import { AlertCircle, ArrowLeft, Upload, FileText, Building, MapPin } from "lucide-react";
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

export default function ApplyPage({ params }: { params: { id: string } }) {
  const unwrappedParams = use(params);
  const opportunityId = unwrappedParams.id;
  const router = useRouter();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleCoverLetterFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverLetterFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resume) {
      setError("Please upload your resume");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // In a real implementation, you would upload the files to a storage service
      // and then submit the application with the file URLs

      // For now, we'll simulate the API call
      const formData = new FormData();
      formData.append("opportunity_id", opportunityId);
      formData.append("resume", resume);
      if (coverLetterFile) {
        formData.append("cover_letter_file", coverLetterFile);
      } else if (coverLetter) {
        formData.append("cover_letter_text", coverLetter);
      }

      const response = await fetch("/api/proxy/applications", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      // Redirect to success page or applications list
      router.push("/student/applications?success=true");
    } catch (error) {
      console.error("Error submitting application:", error);
      setError("Failed to submit application. Please try again later.");
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

  if (error) {
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
                          <p className="text-sm text-muted-foreground mb-2">Upload your resume (PDF, DOC, DOCX)</p>
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
                            <p className="text-sm text-muted-foreground mb-2">
                              Upload your cover letter (PDF, DOC, DOCX)
                            </p>
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
                <CardFooter className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting || !resume}>
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">{opportunity.title}</h3>
                  <p className="text-sm text-muted-foreground">{opportunity.company_name}</p>
                </div>

                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  {opportunity.location}
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1">Description</h4>
                  <div className="text-sm text-muted-foreground whitespace-pre-line">{opportunity.description}</div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/student/opportunities/${opportunityId}`} className="text-sm text-primary hover:underline">
                  View Full Job Details
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
