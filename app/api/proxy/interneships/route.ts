import type { NextRequest } from "next/server";
import { handleApiRequest } from "@/app/utils/api-utils";

// Mock data for internships
const MOCK_INTERNSHIPS = [
  {
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
  },
  {
    id: "2",
    title: "Data Science Intern",
    company: "Data Analytics Co.",
    location: "Remote",
    description: "Work with our data science team on real-world machine learning projects.",
    requirements: ["Python", "Machine Learning", "Statistics"],
    start_date: "2023-06-15",
    end_date: "2023-09-15",
    application_deadline: "2023-05-15",
    is_remote: true,
    is_paid: true,
    salary: "$22/hour",
    created_at: "2023-04-05T12:00:00Z",
    updated_at: "2023-04-05T12:00:00Z",
  },
  {
    id: "3",
    title: "UX Design Intern",
    company: "Creative Designs",
    location: "New York, NY",
    description: "Help design user experiences for our mobile applications.",
    requirements: ["Figma", "UI/UX Principles", "Prototyping"],
    start_date: "2023-07-01",
    end_date: "2023-10-01",
    application_deadline: "2023-06-01",
    is_remote: false,
    is_paid: true,
    salary: "$18/hour",
    created_at: "2023-04-10T12:00:00Z",
    updated_at: "2023-04-10T12:00:00Z",
  },
];

export async function GET(request: NextRequest) {
  return handleApiRequest(request, "/api/internships/", MOCK_INTERNSHIPS);
}

export async function POST(request: NextRequest) {
  return handleApiRequest(request, "/api/internships/", { id: "new-internship", ...(await request.json()) });
}
