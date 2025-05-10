import type { NextRequest } from "next/server";
import { handleApiRequest } from "@/app/utils/api-utils";

// Mock data for my jobs
const MOCK_MY_JOBS = [
  {
    id: "1",
    title: "Software Engineer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    status: "Applied",
    applied_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
  },
  {
    id: "2",
    title: "Frontend Developer",
    company: "Web Solutions Co.",
    location: "Remote",
    type: "Full-time",
    status: "Interview",
    applied_date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days ago
  },
  {
    id: "3",
    title: "UX Designer",
    company: "Creative Designs",
    location: "New York, NY",
    type: "Full-time",
    status: "Rejected",
    applied_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
  },
];

export async function GET(request: NextRequest) {
  return handleApiRequest(request, "/api/jobs/my-jobs/", MOCK_MY_JOBS);
}
export async function POST(request: NextRequest) {
  return handleApiRequest(request, "/api/jobs/my-jobs/", { id: "new-job", ...(await request.json()) });
}