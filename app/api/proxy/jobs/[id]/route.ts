import type { NextRequest } from "next/server";
import { handleApiRequest } from "@/app/utils/api-utils";

// Mock data for a single job
const MOCK_JOB = {
  id: "1",
  title: "Frontend Developer",
  company: "Tech Solutions Inc.",
  location: "San Francisco, CA",
  type: "Full-time",
  salary_range: "$80,000 - $100,000",
  description: "We are looking for a skilled Frontend Developer to join our team...",
  requirements: ["3+ years of experience with React", "Strong JavaScript skills", "Experience with responsive design"],
  posted_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
  application_deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
};

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return handleApiRequest(request, `/api/jobs/${params.id}/`, MOCK_JOB);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  return handleApiRequest(request, `/api/jobs/${params.id}/`, { ...MOCK_JOB, ...(await request.json()) });
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  return handleApiRequest(request, `/api/jobs/${params.id}/`, { ...MOCK_JOB, ...(await request.json()) });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  return handleApiRequest(request, `/api/jobs/${params.id}/`, { success: true, message: "Job deleted successfully" });
}
