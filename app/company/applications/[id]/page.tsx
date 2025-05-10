"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/app/Components/ui/card";
import { Button } from "@/app/Components/ui/button";
import { Badge } from "@/app/Components/ui/badge";
import { Textarea } from "@/app/Components/ui/textarea";
import { AlertCircle, ArrowLeft, FileText, User, Calendar, Briefcase, Mail, Phone } from "lucide-react";
import { Alert, AlertDescription } from "@/app/Components/ui/alert";
import AuthRedirect from "@/app/Components/AuthRedirect";

// Define application status colors
const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  reviewing: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  interview: "bg-purple-100 text-purple-800 hover:bg-purple-100",
  accepted: "bg-green-100 text-green-800 hover:bg-green-100",
  rejected: "bg-red-100 text-red-800 hover:bg-red-100",
  withdrawn: "bg-gray-100 text-gray-800 hover:bg-gray-100",
};

// Application interface
interface Application {
  id: number
  job_title: string
  applicant_name: string
  applicant_email: string
  applicant_phone: string
  status: string
  applied_date: string
  location: string
  experience: string
  feedback?: string
  resume_url?: string
  cover_letter_url?: string
}

export default function CompanyApplicationDetailPage({ params }: { params: { id: string } }) {
  const unwrappedParams = use(params);
  const applicationId = unwrappedParams.id;
  const router = useRouter();
  const [application, setApplication] = useState<Application | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newStatus, setNewStatus] = useState<string | null>(null);

  useEffect(() => {
    async function fetchApplication() {
      try {
        const response = await fetch(`/api/proxy/applications/${applicationId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch application details");
        }

        const data = await response.json();
        setApplication(data);
        setFeedback(data.feedback || "");
        setNewStatus(null);
      } catch (error) {
        console.error("Error fetching application:", error);
        setError("Failed to load application details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchApplication();
  }, [applicationId]);

  const handleStatusChange = async (status: string) => {
    setNewStatus(status);
  };

  const handleSubmit = async () => {
    if (!newStatus) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/proxy/applications/${applicationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
          feedback: feedback.trim() ? feedback : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update application");
      }

      // Update local state
      setApplication((prev) =>
        prev
          ? {
            ...prev,
            status: newStatus,
            feedback: feedback.trim() ? feedback : prev.feedback,
          }
          : null,
      );

      setNewStatus(null);
    } catch (error) {
      console.error("Error updating application:", error);
      setError("Failed to update application. Please try again later.");
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

  if (!application) {
    return (
      <div className="container py-10">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Application not found</AlertDescription>
        </Alert>
        <Button variant="outline" onClick={() => router.push("/company/applications")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Applications
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
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{application.job_title}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <Briefcase className="mr-1 h-4 w-4" />
                      Position
                    </CardDescription>
                  </div>
                  <Badge className={statusColors[application.status.toLowerCase()] || "bg-gray-100"}>
                    {application.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  Applied on {new Date(application.applied_date).toLocaleDateString()}
                </div>

                <div className="mt-4">
                  <h3 className="font-medium mb-2">Applicant Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{application.applicant_name}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${application.applicant_email}`} className="text-primary hover:underline">
                        {application.applicant_email}
                      </a>
                    </div>
                    {application.applicant_phone && (
                      <div className="flex items-center">
                        <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                        <a href={`tel:${application.applicant_phone}`} className="text-primary hover:underline">
                          {application.applicant_phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {application.experience && (
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Experience</h3>
                    <div className="text-sm text-muted-foreground whitespace-pre-line">{application.experience}</div>
                  </div>
                )}

                <div className="mt-6">
                  <h3 className="font-medium mb-2">Update Application Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {["pending", "reviewing", "interview", "accepted", "rejected"].map((status) => (
                      <Button
                        key={status}
                        variant={newStatus === status ? "default" : "outline"}
                        size="sm"
                        className={newStatus !== status ? statusColors[status] : ""}
                        onClick={() => handleStatusChange(status)}
                        disabled={application.status === "withdrawn" || isSubmitting}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-medium mb-2">Feedback to Applicant</h3>
                  <Textarea
                    placeholder="Provide feedback to the applicant..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={4}
                    disabled={application.status === "withdrawn" || isSubmitting}
                  />
                </div>

                {newStatus && (
                  <div className="mt-4 flex justify-end">
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                      {isSubmitting ? "Updating..." : "Update Application"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Application Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {application.resume_url ? (
                  <a
                    href={application.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 border rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <FileText className="mr-2 h-5 w-5 text-blue-500" />
                    <span>View Resume</span>
                  </a>
                ) : (
                  <div className="p-3 border rounded-md text-muted-foreground text-sm">No resume attached</div>
                )}

                {application.cover_letter_url ? (
                  <a
                    href={application.cover_letter_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 border rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <FileText className="mr-2 h-5 w-5 text-blue-500" />
                    <span>View Cover Letter</span>
                  </a>
                ) : (
                  <div className="p-3 border rounded-md text-muted-foreground text-sm">No cover letter attached</div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push(`/messaging/new?recipient=${application.applicant_email}`)}
                >
                  Message Applicant
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
