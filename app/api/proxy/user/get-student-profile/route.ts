import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    console.log("Student profile endpoint not available yet, returning mock data");
    return NextResponse.json({
      id: "mock-profile-1",
      user: "user-1",
      major: "Computer Science",
      university: "Example University",
      expected_graduation: "2024-05-15",
      skills: ["JavaScript", "React", "Node.js"],
      firstName: "John",
      lastName: "Doe",
    });
  } catch (error) {
    console.error("Error in student profile endpoint:", error);
    return NextResponse.json(
      { error: "Failed to fetch student profile", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
