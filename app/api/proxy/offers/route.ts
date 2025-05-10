import type { NextRequest } from "next/server";
import { handleApiRequest } from "@/app/utils/api-utils";

// Mock data for offers
const MOCK_OFFERS = [
  {
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
  },
  {
    id: "2",
    position: "Data Scientist",
    company: "Data Analytics Co.",
    candidate: {
      id: "c2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
    },
    location: "Remote",
    salary: "$95,000",
    benefits: ["Health Insurance", "Flexible Hours", "Professional Development Budget"],
    status: "Accepted",
    offer_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    expiration_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
  {
    id: "3",
    position: "UX Designer",
    company: "Creative Designs",
    candidate: {
      id: "c3",
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
    },
    location: "New York, NY",
    salary: "$85,000",
    benefits: ["Health Insurance", "Gym Membership", "Unlimited PTO"],
    status: "Declined",
    offer_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
    expiration_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
  },
];

export async function GET(request: NextRequest) {
  return handleApiRequest(request, "/api/offers/", MOCK_OFFERS);
}

export async function POST(request: NextRequest) {
  return handleApiRequest(request, "/api/offers/", { id: "new-offer", ...(await request.json()) });
}
