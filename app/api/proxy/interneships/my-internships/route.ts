import type { NextRequest } from "next/server";
import { handleApiRequest } from "@/app/utils/api-utils";

// Mock data for my internships
const MOCK_MY_INTERNSHIPS = [
  {
    id: "1",
    title: "Frontend Development Intern",
    company: "Web Solutions Inc.",
    location: "Boston, MA",
    start_date: "2023-06-01",
    end_date: "2023-08-31",
    status: "Completed",
    description: "Worked on developing responsive web applications using React and Next.js.",
  },
  {
    id: "2",
    title: "Backend Engineering Intern",
    company: "Server Systems Co.",
    location: "Remote",
    start_date: "2023-09-15",
    end_date: "2023-12-15",
    status: "In Progress",
    description: "Developing RESTful APIs using Django and PostgreSQL.",
  },
  {
    id: "3",
    title: "Data Science Intern",
    company: "Analytics Insights",
    location: "New York, NY",
    start_date: "2024-01-10",
    end_date: "2024-04-10",
    status: "Upcoming",
    description: "Will be working on machine learning models for predictive analytics.",
  },
];

export async function GET(request: NextRequest) {
  return handleApiRequest(request, "/api/internships/my-internships/", MOCK_MY_INTERNSHIPS);
}
