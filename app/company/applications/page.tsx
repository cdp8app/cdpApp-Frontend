"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/app/Components/ui/card";
import { Button } from "@/app/Components/ui/button";
import { Badge } from "@/app/Components/ui/badge";
import { 
  AlertCircle, 
  Search, 
  User, 
  Calendar, 
  ChevronDown, 
  FileText, 
  Clock, 
  Filter, 
  Plus,
  CheckCircle2,
  XCircle,
  Clock3
} from "lucide-react";
import { Alert, AlertDescription } from "@/app/Components/ui/alert";
import { Input } from "@/app/Components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/Components/ui/tabs";
import Link from "next/link";
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
  status: string
  applied_date: string
  job_id: number
}

export default function CompanyApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [jobFilter, setJobFilter] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    async function fetchApplications() {
      try {
        const response = await fetch("/api/proxy/applications");

        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }

        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setError("Failed to load applications. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchApplications();
  }, []);

  // Filter applications based on search term, status filter, job filter, and active tab
  const filteredApplications = applications.filter((app) => {
    // Add null checks for properties that might be undefined
    const matchesSearch =
      (app.job_title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (app.applicant_name?.toLowerCase() || "").includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter ? (app.status?.toLowerCase() || "") === statusFilter.toLowerCase() : true;
    const matchesJob = jobFilter ? app.job_id === jobFilter : true;
    
    // Filter by tab
    const matchesTab = 
      activeTab === "all" ? true :
        activeTab === "pending" ? (app.status?.toLowerCase() || "") === "pending" :
          activeTab === "reviewing" ? (app.status?.toLowerCase() || "") === "reviewing" :
            activeTab === "interview" ? (app.status?.toLowerCase() || "") === "interview" :
              activeTab === "accepted" ? (app.status?.toLowerCase() || "") === "accepted" :
                activeTab === "rejected" ? (app.status?.toLowerCase() || "") === "rejected" : true;

    return matchesSearch && matchesStatus && matchesJob && matchesTab;
  });

  // Get unique statuses for filter with null check
  const statuses = Array.from(
    new Set(
      applications
        .filter(app => app.status) // Filter out undefined status
        .map((app) => app.status.toLowerCase())
    )
  );

  // Get unique jobs for filter with null check
  const jobs = Array.from(
    new Map(
      applications
        .filter(app => app.job_id && app.job_title) // Filter out undefined job_id or job_title
        .map((app) => [app.job_id, app.job_title])
    ).entries()
  ).map(([id, title]) => ({ id, title }));

  // Count applications by status
  const statusCounts = applications.reduce((counts: Record<string, number>, app) => {
    const status = app.status?.toLowerCase() || "unknown";
    counts[status] = (counts[status] || 0) + 1;
    return counts;
  }, {});

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

  return (
    <>
      <AuthRedirect />
      <Navbar1 userType="company" />
      
      <div className="container py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
            <p className="text-gray-500 mt-1">Review and manage applications to your job postings</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button onClick={() => router.push("/company/jobs/post")} className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Post New Job
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <TabsList className="mb-4 sm:mb-0">
                <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  All ({applications.length})
                </TabsTrigger>
                <TabsTrigger value="pending" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
                  Pending ({statusCounts["pending"] || 0})
                </TabsTrigger>
                <TabsTrigger value="reviewing" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                  Reviewing ({statusCounts["reviewing"] || 0})
                </TabsTrigger>
                <TabsTrigger value="interview" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                  Interview ({statusCounts["interview"] || 0})
                </TabsTrigger>
                <TabsTrigger value="accepted" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
                  Accepted ({statusCounts["accepted"] || 0})
                </TabsTrigger>
                <TabsTrigger value="rejected" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                  Rejected ({statusCounts["rejected"] || 0})
                </TabsTrigger>
              </TabsList>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search applicants or jobs..."
                  className="pl-9 w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              {jobs.length > 1 && (
                <div className="w-full sm:w-auto">
                  <select 
                    className="w-full sm:w-[200px] h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    value={jobFilter?.toString() || ""}
                    onChange={(e) => setJobFilter(e.target.value ? parseInt(e.target.value) : null)}
                  >
                    <option value="">All Jobs</option>
                    {jobs.map((job) => (
                      <option key={job.id} value={job.id.toString()}>
                        {job.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <TabsContent value="all" className="mt-0">
              {renderApplicationsList(filteredApplications)}
            </TabsContent>
            
            <TabsContent value="pending" className="mt-0">
              {renderApplicationsList(filteredApplications)}
            </TabsContent>
            
            <TabsContent value="reviewing" className="mt-0">
              {renderApplicationsList(filteredApplications)}
            </TabsContent>
            
            <TabsContent value="interview" className="mt-0">
              {renderApplicationsList(filteredApplications)}
            </TabsContent>
            
            <TabsContent value="accepted" className="mt-0">
              {renderApplicationsList(filteredApplications)}
            </TabsContent>
            
            <TabsContent value="rejected" className="mt-0">
              {renderApplicationsList(filteredApplications)}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
  
  function renderApplicationsList(applications: Application[]) {
    if (applications.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <div className="rounded-full bg-gray-100 p-3 mb-4">
            <Search className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No applications found</h3>
          <p className="text-sm text-gray-500 text-center mt-1 mb-4 max-w-md">
            {applications.length === 0
              ? "You haven't received any applications yet. Post a job to start receiving applications."
              : "No applications match your search criteria. Try adjusting your filters."}
          </p>
          {applications.length === 0 && (
            <Button onClick={() => router.push("/company/jobs/post")}>
              <Plus className="mr-2 h-4 w-4" />
              Post a New Job
            </Button>
          )}
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        {applications.map((application) => (
          <Link href={`/company/applications/${application.id}`} key={application.id}>
            <Card className="cursor-pointer hover:shadow-md transition-shadow border-l-4 hover:border-primary" 
              style={{ borderLeftColor: getStatusColor(application.status) }}>
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="font-medium text-lg">{application.job_title || "Untitled Job"}</h3>
                      <Badge className={`ml-3 ${application.status ? getStatusClass(application.status) : "bg-gray-100"}`}>
                        <div className="flex items-center">
                          {application.status && statusIcons[application.status.toLowerCase()]}
                          {application.status || "Unknown"}
                        </div>
                      </Badge>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <User className="mr-2 h-4 w-4" />
                      <span className="font-medium">{application.applicant_name || "Unknown Applicant"}</span>
                      <span className="mx-2">•</span>
                      <Clock className="mr-1 h-4 w-4" />
                      <span>
                        {application.applied_date 
                          ? formatDate(application.applied_date)
                          : "Unknown date"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Button variant="outline" size="sm" className="ml-auto">
                      View Details
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    );
  }
  
  function getStatusColor(status: string): string {
    const statusLower = status?.toLowerCase() || "";
    switch (statusLower) {
    case "pending": return "#f59e0b"; // Amber
    case "reviewing": return "#3b82f6"; // Blue
    case "interview": return "#8b5cf6"; // Purple
    case "accepted": return "#10b981"; // Green
    case "rejected": return "#ef4444"; // Red
    case "withdrawn": return "#6b7280"; // Gray
    default: return "#d1d5db"; // Gray
    }
  }
  
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