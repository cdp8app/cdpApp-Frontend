import type { NextRequest } from "next/server";
import { handleApiRequest } from "@/app/utils/api-utils";

// Mock data for a single offer
const MOCK_OFFER = {
  id: "1",
  position: "Software Engineer",
  company: "Tech Innovations Inc.",
  candidate: {
    id: "c1",
    name: "John Doe",
    email: "john.doe@example.com",
  },
  location: "San Francisco, CA",
  salary: "$90,000",
  benefits: ["Health Insurance", "401k", "Remote Work Options"],
  status: "Pending",
  offer_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  expiration_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
};

function extractIdFromRequest(request: NextRequest) {
  const segments = request.nextUrl.pathname.split("/");
  return segments[segments.length - 1];
}

export async function GET(request: NextRequest) {
  const id = extractIdFromRequest(request);
  return handleApiRequest(request, `/api/offers/${id}/`, MOCK_OFFER);
}

export async function PUT(request: NextRequest) {
  const id = extractIdFromRequest(request);
  return handleApiRequest(request, `/api/offers/${id}/`, { ...MOCK_OFFER, ...(await request.json()) });
}

export async function PATCH(request: NextRequest) {
  const id = extractIdFromRequest(request);
  return handleApiRequest(request, `/api/offers/${id}/`, { ...MOCK_OFFER, ...(await request.json()) });
}

export async function DELETE(request: NextRequest) {
  const id = extractIdFromRequest(request);
  return handleApiRequest(request, `/api/offers/${id}/`, {
    success: true,
    message: "Offer deleted successfully",
  });
}
