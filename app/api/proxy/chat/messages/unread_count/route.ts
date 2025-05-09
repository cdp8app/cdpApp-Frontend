import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  try {
    console.log("Handling GET request to /api/proxy/chat/messages/unread_count/")

    // Check if authorization header is present
    const authHeader = request.headers.get("authorization")
    console.log(authHeader ? "Using provided authorization header" : "No authorization header found")

    // First try to get data from the real backend
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com").replace(/\/$/, "")
    const url = `${baseUrl}/api/chat/messages/unread_count/`

    console.log(`Attempting to fetch from backend: ${url}`)

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(authHeader ? { Authorization: authHeader } : {}),
        },
        cache: "no-store",
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Successfully fetched real unread count from backend")
        return NextResponse.json(data)
      }

      console.log(`Backend returned status ${response.status}, falling back to mock data`)
    } catch (error) {
      console.log(`Error fetching from backend: ${error instanceof Error ? error.message : "Unknown error"}`)
    }

    // If we get here, either the backend request failed or returned an error
    // Return mock data instead
    console.log("Returning mock unread count data")
    return NextResponse.json({ count: 3 })
  } catch (error) {
    console.error("Error in unread_count endpoint:", error)
    return NextResponse.json(
      { error: "Failed to fetch unread count", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
