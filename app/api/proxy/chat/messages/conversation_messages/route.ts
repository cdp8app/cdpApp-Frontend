import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Mock data for messages by conversation
const MOCK_MESSAGES = {
  "1": [
    {
      id: "1-1",
      content: "Hello! How can we help you with your career journey?",
      sender: {
        id: "system-1",
        name: "Career Services",
      },
      recipient: {
        id: "user-1",
        name: "You",
      },
      timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      is_read: false,
    },
    {
      id: "1-2",
      content: "I'm looking for internship opportunities in software development.",
      sender: {
        id: "user-1",
        name: "You",
      },
      recipient: {
        id: "system-1",
        name: "Career Services",
      },
      timestamp: new Date(Date.now() - 3500000).toISOString(), // 58 minutes ago
      is_read: true,
    },
    {
      id: "1-3",
      content:
        "Great! We have several companies looking for software development interns. Have you updated your profile with your skills and resume?",
      sender: {
        id: "system-1",
        name: "Career Services",
      },
      recipient: {
        id: "user-1",
        name: "You",
      },
      timestamp: new Date(Date.now() - 3400000).toISOString(), // 56 minutes ago
      is_read: true,
    },
  ],
  "2": [
    {
      id: "2-1",
      content: "Your profile has been updated successfully.",
      sender: {
        id: "system-2",
        name: "Technical Support",
      },
      recipient: {
        id: "user-1",
        name: "You",
      },
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      is_read: true,
    },
    {
      id: "2-2",
      content: "Thank you for the confirmation. Is there anything else I need to do?",
      sender: {
        id: "user-1",
        name: "You",
      },
      recipient: {
        id: "system-2",
        name: "Technical Support",
      },
      timestamp: new Date(Date.now() - 85000000).toISOString(), // 23.6 hours ago
      is_read: true,
    },
    {
      id: "2-3",
      content: "No, you're all set! Your profile is now visible to potential employers.",
      sender: {
        id: "system-2",
        name: "Technical Support",
      },
      recipient: {
        id: "user-1",
        name: "You",
      },
      timestamp: new Date(Date.now() - 84000000).toISOString(), // 23.3 hours ago
      is_read: true,
    },
  ],
  "3": [
    {
      id: "3-1",
      content: "We've found some new internship opportunities that match your profile.",
      sender: {
        id: "system-3",
        name: "Internship Coordinator",
      },
      recipient: {
        id: "user-1",
        name: "You",
      },
      timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      is_read: false,
    },
    {
      id: "3-2",
      content: "There are 3 new positions at tech companies in your area.",
      sender: {
        id: "system-3",
        name: "Internship Coordinator",
      },
      recipient: {
        id: "user-1",
        name: "You",
      },
      timestamp: new Date(Date.now() - 172700000).toISOString(), // 2 days ago
      is_read: false,
    },
  ],
}

export async function GET(request: NextRequest) {
  try {
    console.log("Handling GET request to /api/proxy/chat/messages/conversation_messages/")

    // Get conversation ID from query parameters
    const { searchParams } = new URL(request.url)
    const conversationId = searchParams.get("conversation_id")

    if (!conversationId) {
      return NextResponse.json({ error: "conversation_id is required" }, { status: 400 })
    }

    console.log(`Fetching messages for conversation: ${conversationId}`)

    // Check if authorization header is present
    const authHeader = request.headers.get("authorization")
    console.log(authHeader ? "Using provided authorization header" : "No authorization header found")

    // If no auth header, return mock data immediately
    if (!authHeader) {
      console.log("No authorization header provided - returning mock data")
      const mockData = MOCK_MESSAGES[conversationId as keyof typeof MOCK_MESSAGES] || []
      return NextResponse.json(mockData)
    }

    // First try to get data from the real backend
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com").replace(/\/$/, "")
    const url = `${baseUrl}/api/chat/messages/conversation_messages/?conversation_id=${conversationId}`

    console.log(`Attempting to fetch from backend: ${url}`)

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
          // Disable compression to avoid content decoding issues
          "Accept-Encoding": "identity",
        },
        cache: "no-store",
      })

      // If unauthorized, return a 401 with a clear error message
      if (response.status === 401) {
        console.log("Received 401 Unauthorized from backend")
        return NextResponse.json(
          {
            error: "Unauthorized",
            message: "Authentication required. Please log in again.",
          },
          { status: 401 },
        )
      }

      if (!response.ok) {
        throw new Error(`Backend returned status ${response.status}`)
      }

      // Try to get the response as text first to avoid decoding issues
      const responseText = await response.text()

      try {
        // Then parse it as JSON
        const data = JSON.parse(responseText)
        console.log("Successfully fetched real data from backend")
        return NextResponse.json(data)
      } catch (jsonError) {
        console.error("Error parsing JSON response:", jsonError)
        throw new Error("Invalid JSON response from backend")
      }
    } catch (error) {
      console.log(`Error fetching from backend: ${error instanceof Error ? error.message : "Unknown error"}`)

      // Return mock data as fallback
      const mockData = MOCK_MESSAGES[conversationId as keyof typeof MOCK_MESSAGES] || []
      console.log(`Returning ${mockData.length} mock messages for conversation ${conversationId}`)
      return NextResponse.json(mockData)
    }
  } catch (error) {
    console.error("Error in conversation_messages endpoint:", error)

    // Get conversation ID from query parameters for fallback
    try {
      const { searchParams } = new URL(request.url)
      const conversationId = searchParams.get("conversation_id") || "1"

      // Return mock data even in case of error
      const mockData = MOCK_MESSAGES[conversationId as keyof typeof MOCK_MESSAGES] || []
      return NextResponse.json(mockData)
    } catch (e) {
      // If all else fails, return an empty array
      return NextResponse.json([])
    }
  }
}
