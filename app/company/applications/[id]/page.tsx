"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/app/Components/ui/card";
import { Button } from "@/app/Components/ui/button";
import { Badge } from "@/app/Components/ui/badge";
import { Textarea } from "@/app/Components/ui/textarea";
import { 
  AlertCircle, 
  ArrowLeft, 
  FileText, 
  User, 
  Calendar, 
  Briefcase, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Clock3,
  MessageSquare,
  Download,
  ExternalLink,
  ChevronLeft
} from "lucide-react";
import { Alert, AlertDescription } from "@/app/Components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/Components/ui/tabs";
import { Separator } from "@/app/Components/ui/separator";
import AuthRedirect from "@/app/Components/AuthRedirect";
import Navbar1 from "@/app/Components/Navbar";

// Define application status colors
const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  reviewing: "bg-blue-100 text-blue-800 border-blue-200",
  interview: "bg-purple-100 text-purple-800 border-purple-200",
  accepted: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
  withdrawn: "bg-gray-100 text-gray-800 border-gray-200",
};

// Status icons
const statusIcons: Record<string, any> = {
  pending: <Clock3 className="h-4 w-4 mr-1" />,
  reviewing: <FileText className="h-4 w-4 mr-1" />,
  interview: <Calendar className="h-4 w-4 mr-1" />,
  accepted: <CheckCircle2 className="h-4 w-4 mr-1" />,
  rejected: <XCircle className="h-4 w-4 mr-1" />,
  withdrawn: <XCircle className="h-4 w-4 mr-1" />,
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

interface PageProps {
  params: { id: string };
}

export default function CompanyApplicationDetailPage({ params }: PageProps) {
  const router = useRouter();
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [application, setApplication] = useState<Application | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newStatus, setNewStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("details");

  // Set the application ID from params after component mounts
  useEffect(() => {
    if (params && params.id) {
      setApplicationId(params.id);
    }
  }, [params]);

  // Fetch application data once we have the ID
  useEffect(() => {
    if (!applicationId) return;
    
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
    if (!newStatus || !applicationId) return;

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

  const handleContactApplicant = () => {
    if (application && application.applicant_email) {
      router.push(`/messaging/new?recipient=${encodeURIComponent(application.applicant_email)}`);
    } else {
      // Handle case where email is not available
      alert("Applicant email is not available");
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar1 userType="company" />
        <div className="container py-10">
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar1 userType="company" />
        <div className="container py-10">
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </div>
      </>
    );
  }

  if (!application) {
    return (
      <>
        <Navbar1 userType="company" />
        <div className="container py-10">
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Application not found</AlertDescription>
          </Alert>
          <Button variant="outline" onClick={() => router.push("/company/applications")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Applications
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <AuthRedirect />
      <Navbar1 userType="company" />
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => router.push("/company/applications")}
            className="flex items-center text-gray-500 hover:text-gray-700"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Applications
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {/* Application Header */}
          <div className="p-6 border-b">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{application.job_title}</h1>
                <div className="flex items-center mt-2 text-gray-500">
                  <User className="h-4 w-4 mr-2" />
                  <span className="font-medium text-gray-700">{application.applicant_name}</span>
                  <span className="mx-2">•</span>
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDate(application.applied_date)}</span>
                </div>
              </div>
              
              <Badge className={`text-sm px-3 py-1 ${getStatusClass(application.status)}`}>
                <div className="flex items-center">
                  {statusIcons[application.status.toLowerCase()]}
                  {application.status}
                </div>
              </Badge>
            </div>
          </div>
          
          {/* Tabs Navigation */}
          <div className="border-b">
            <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
              <div className="px-6">
                <TabsList className="grid grid-cols-3 w-full max-w-md">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="actions">Actions</TabsTrigger>
                </TabsList>
              </div>
            </Tabs>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {/* Details Tab */}
            {activeTab === "details" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-3">Applicant Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p className="font-medium">{application.applicant_name}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <a href={`mailto:${application.applicant_email}`} className="font-medium text-blue-600 hover:text-blue-800">
                            {application.applicant_email}
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {application.applicant_phone && (
                        <div className="flex items-center">
                          <Phone className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <a href={`tel:${application.applicant_phone}`} className="font-medium text-blue-600 hover:text-blue-800">
                              {application.applicant_phone}
                            </a>
                          </div>
                        </div>
                      )}
                      
                      {application.location && (
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium">{application.location}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {application.experience && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-3">Experience</h2>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="whitespace-pre-line">{application.experience}</p>
                    </div>
                  </div>
                )}
                
                {application.feedback && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-3">Feedback</h2>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="whitespace-pre-line">{application.feedback}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Documents Tab */}
            {activeTab === "documents" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-3">Application Documents</h2>
                  <div className="space-y-4">
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 border-b">
                        <h3 className="font-medium">Resume</h3>
                      </div>
                      <div className="p-4">
                        {application.resume_url ? (
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 text-blue-500 mr-2" />
                              <span>Applicant Resume</span>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" asChild>
                                <a href={application.resume_url} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4 mr-1" /> View
                                </a>
                              </Button>
                              <Button size="sm" variant="outline" asChild>
                                <a href={application.resume_url} download>
                                  <Download className="h-4 w-4 mr-1" /> Download
                                </a>
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center text-gray-500">
                            <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
                            <span>No resume attached</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 border-b">
                        <h3 className="font-medium">Cover Letter</h3>
                      </div>
                      <div className="p-4">
                        {application.cover_letter_url ? (
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 text-blue-500 mr-2" />
                              <span>Cover Letter</span>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" asChild>
                                <a href={application.cover_letter_url} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4 mr-1" /> View
                                </a>
                              </Button>
                              <Button size="sm" variant="outline" asChild>
                                <a href={application.cover_letter_url} download>
                                  <Download className="h-4 w-4 mr-1" /> Download
                                </a>
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center text-gray-500">
                            <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
                            <span>No cover letter attached</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Actions Tab */}
            {activeTab === "actions" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-3">Update Application Status</h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">Current Status:</p>
                      <Badge className={`text-sm px-3 py-1 ${getStatusClass(application.status)}`}>
                        <div className="flex items-center">
                          {statusIcons[application.status.toLowerCase()]}
                          {application.status}
                        </div>
                      </Badge>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">Change Status To:</p>
                      <div className="flex flex-wrap gap-2">
                        {["pending", "reviewing", "interview", "accepted", "rejected"].map((status) => (
                          <Button
                            key={status}
                            variant={newStatus === status ? "default" : "outline"}
                            size="sm"
                            className={newStatus !== status && application.status !== status ? getStatusClass(status) : ""}
                            onClick={() => handleStatusChange(status)}
                            disabled={application.status === "withdrawn" || isSubmitting || application.status === status}
                          >
                            <div className="flex items-center">
                              {statusIcons[status]}
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">Feedback to Applicant:</p>
                      <Textarea
                        placeholder="Provide feedback to the applicant..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        rows={4}
                        disabled={application.status === "withdrawn" || isSubmitting}
                        className="w-full"
                      />
                    </div>
                    
                    {newStatus && (
                      <div className="flex justify-end">
                        <Button onClick={handleSubmit} disabled={isSubmitting}>
                          {isSubmitting ? "Updating..." : "Update Application"}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-3">Contact Applicant</h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        variant="outline" 
                        className="flex items-center justify-center"
                        onClick={handleContactApplicant}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message Applicant
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="flex items-center justify-center"
                        asChild
                      >
                        <a href={`mailto:${application.applicant_email}`}>
                          <Mail className="h-4 w-4 mr-2" />
                          Email Applicant
                        </a>
                      </Button>
                      
                      {application.applicant_phone && (
                        <Button 
                          variant="outline" 
                          className="flex items-center justify-center"
                          asChild
                        >
                          <a href={`tel:${application.applicant_phone}`}>
                            <Phone className="h-4 w-4 mr-2" />
                            Call Applicant
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
  
  function getStatusClass(status: string): string {
    return statusColors[status.toLowerCase()] || "bg-gray-100 text-gray-800 border-gray-200";
  }
  
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
    }
  }
}