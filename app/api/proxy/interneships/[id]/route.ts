import type { NextRequest } from "next/server";
import { handleApiRequest } from "@/app/utils/api-utils";

// Mock data for a single internship
const MOCK_INTERNSHIP = {
  id: "1",
  title: "Frontend Development Intern",
  company: "Tech Solutions Inc.",
  location: "San Francisco, CA",
  description: "Join our team for a summer internship focused on web development.",
  requirements: ["JavaScript", "React", "HTML/CSS"],
  start_date: "2023-06-01",
  end_date: "2023-08-31",
  application_deadline: "2023-05-01",
  is_remote: false,
  is_paid: true,
  salary: "$20/hour",
  created_at: "2023-04-01T12:00:00Z",
  updated_at: "2023-04-01T12:00:00Z",
};

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return handleApiRequest(request, `/api/internships/${params.id}/`, MOCK_INTERNSHIP);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  return handleApiRequest(request, `/api/internships/${params.id}/`, { ...MOCK_INTERNSHIP, ...(await request.json()) });
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  return handleApiRequest(request, `/api/internships/${params.id}/`, { ...MOCK_INTERNSHIP, ...(await request.json()) });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  return handleApiRequest(request, `/api/internships/${params.id}/`, {
    success: true,
    message: "Internship deleted successfully",
  });
}
