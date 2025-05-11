import type { NextRequest } from "next/server";
import { handleApiRequest } from "@/app/utils/api-utils";

// Mock data for a single internship
const MOCK_INTERNSHIP = {
  id: "1",
  title: "Frontend Development Intern",
  company: "Tech Solutions Inc.",
  location: "San Francisco, CA",
  description:
    "Join our team for a summer internship focused on web development.",
  requirements: ["JavaScript", "React", "HTML/CSS"],
  start_date: "2023-06-01",
  end_date: "2023-08-31",
  application_deadline: "2023-05-01",
  is_remote: false,
  is_paid: true,
  salary: "$20/hour",
  created_at: "2023-04-01T12:00:00Z",
  updated_at: "2023-04-01T12:00:00Z"
};

function extractIdFromRequest(request: NextRequest) {
  const segments = request.nextUrl.pathname.split("/");
  return segments[segments.length - 1];
}

export async function GET(
  request: NextRequest
) {
  const id = extractIdFromRequest(request);
  return handleApiRequest(
    request,
    `/api/internships/${id}/`,
    MOCK_INTERNSHIP
  );
}

export async function PUT(
  request: NextRequest
) {
  const id = extractIdFromRequest(request);
  return handleApiRequest(request, `/api/internships/${id}/`, {
    ...MOCK_INTERNSHIP,
    ...(await request.json())
  });
}

export async function PATCH(
  request: NextRequest
) {
  const id = extractIdFromRequest(request);
  return handleApiRequest(request, `/api/internships/${id}/`, {
    ...MOCK_INTERNSHIP,
    ...(await request.json())
  });
}

export async function DELETE(
  request: NextRequest
) {
  const id = extractIdFromRequest(request);
  return handleApiRequest(request, `/api/internships/${id}/`, {
    success: true,
    message: "Internship deleted successfully"
  });
}
