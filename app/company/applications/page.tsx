"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/app/Components/ui/card";
import { Button } from "@/app/Components/ui/button";
import { Badge } from "@/app/Components/ui/badge";
import { AlertCircle, Search, User, Calendar, ChevronDown } from "lucide-react";
import { Alert, AlertDescription } from "@/app/Components/ui/alert";
import { Input } from "@/app/Components/ui/input";
import Link from "next/link";
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

  // Filter applications based on search term, status filter, and job filter
  const filteredApplications = applications.filter((app) => {
    // Add null checks for properties that might be undefined
    const matchesSearch =
      (app.job_title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (app.applicant_name?.toLowerCase() || "").includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter ? (app.status?.toLowerCase() || "") === statusFilter.toLowerCase() : true;
    const matchesJob = jobFilter ? app.job_id === jobFilter : true;

    return matchesSearch && matchesStatus && matchesJob;
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

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <AuthRedirect />
      <div className="container py-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Applications</h1>
          <p className="text-muted-foreground mt-1">Review and manage applications to your job postings</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by job title or applicant name..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div>
              <div className="text-sm font-medium mb-2">Filter by status</div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={statusFilter === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(null)}
                >
                  All Statuses
                </Button>
                {statuses.map((status) => (
                  <Button
                    key={status}
                    variant={statusFilter === status ? "default" : "outline"}
                    size="sm"
                    className={statusFilter === status ? "" : (statusColors[status] || "")}
                    onClick={() => setStatusFilter(status === statusFilter ? null : status)}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {jobs.length > 1 && (
              <div>
                <div className="text-sm font-medium mb-2">Filter by job</div>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={jobFilter === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setJobFilter(null)}
                  >
                    All Jobs
                  </Button>
                  {jobs.map((job) => (
                    <Button
                      key={job.id}
                      variant={jobFilter === job.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setJobFilter(job.id === jobFilter ? null : job.id)}
                    >
                      {job.title}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {filteredApplications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <div className="rounded-full bg-muted p-3 mb-4">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No applications found</h3>
              <p className="text-sm text-muted-foreground text-center mt-1 mb-4">
                {applications.length === 0
                  ? "You haven't received any applications yet."
                  : "No applications match your search criteria."}
              </p>
              {applications.length === 0 && (
                <Button onClick={() => router.push("/company/jobs/post")}>Post a New Job</Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((application) => (
              <Link href={`/company/applications/${application.id}`} key={application.id}>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-medium">{application.job_title || "Untitled Job"}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <User className="mr-1 h-4 w-4" />
                          {application.applicant_name || "Unknown Applicant"}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-sm text-muted-foreground">
                          <Calendar className="inline mr-1 h-4 w-4" />
                          {application.applied_date 
                            ? new Date(application.applied_date).toLocaleDateString() 
                            : "Unknown date"}
                        </div>

                        <Badge className={application.status 
                          ? (statusColors[application.status.toLowerCase()] || "bg-gray-100") 
                          : "bg-gray-100"}>
                          {application.status || "Unknown"}
                        </Badge>

                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}