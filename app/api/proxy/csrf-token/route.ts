import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Create a mock CSRF token since the backend doesn't have this endpoint
    const csrfToken = `csrf-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    
    console.log("Generated mock CSRF token:", csrfToken);
    
    // Return the mock token
    return NextResponse.json({ csrfToken });
  } catch (error) {
    console.error("Error in CSRF token route handler:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}