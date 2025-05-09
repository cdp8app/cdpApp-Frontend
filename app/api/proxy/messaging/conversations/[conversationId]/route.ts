import { NextResponse } from "next/server"

// Mock data for messages
const MOCK_MESSAGES = {
  "1": [
    {
      id: "1",
      content: "Hello! How can we help you with your career journey?",
      sender: "system",
      timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      isRead: false,
    },
    {
      id: "2",
      content: "I'm looking for internship opportunities in software development.",
      sender: "user",
      timestamp: new Date(Date.now() - 3500000).toISOString(), // 58 minutes ago
      isRead: true,
    },
    {
      id: "3",
      content:
        "Great! We have several companies looking for software development interns. Have you updated your profile with your skills and resume?",
      sender: "system",
      timestamp: new Date(Date.now() - 3400000).toISOString(), // 56 minutes ago
      isRead: true,
    },
  ],
  "2": [
    {
      id: "1",
      content: "Your profile has been updated successfully.",
      sender: "system",
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      isRead: true,
    },
    {
      id: "2",
      content: "Thank you for the confirmation. Is there anything else I need to do?",
      sender: "user",
      timestamp: new Date(Date.now() - 85000000).toISOString(), // 23.6 hours ago
      isRead: true,
    },
    {
      id: "3",
      content: "No, you're all set! Your profile is now visible to potential employers.",
      sender: "system",
      timestamp: new Date(Date.now() - 84000000).toISOString(), // 23.3 hours ago
      isRead: true,
    },
  ],
  "3": [
    {
      id: "1",
      content: "We've found some new internship opportunities that match your profile.",
      sender: "system",
      timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      isRead: false,
    },
    {
      id: "2",
      content: "There are 3 new positions at tech companies in your area.",
      sender: "system",
      timestamp: new Date(Date.now() - 172700000).toISOString(), // 2 days ago
      isRead: false,
    },
  ],
}

export async function GET(request: Request, { params }: { params: { conversationId: string } }) {
  try {
    const conversationId = params.conversationId
    console.log(`Handling GET request to /api/proxy/messaging/conversations/${conversationId}/messages`)

    // First try to get data from the real backend
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com").replace(/\/$/, "")
    const url = `${baseUrl}/api/chat/conversations/${conversationId}/messages`

    console.log(`Attempting to fetch from backend: ${url}`)

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Successfully fetched real data from backend")
        return NextResponse.json(data)
      }

      console.log(`Backend returned status ${response.status}, falling back to mock data`)
    } catch (error) {
      console.log(`Error fetching from backend: ${error instanceof Error ? error.message : "Unknown error"}`)
    }

    // If we get here, either the backend request failed or returned an error
    // Return mock data instead
    const messages = MOCK_MESSAGES[conversationId as keyof typeof MOCK_MESSAGES] || []
    console.log(`Returning ${messages.length} mock messages for conversation ${conversationId}`)
    return NextResponse.json(messages)
  } catch (error) {
    console.error("Error in messages endpoint:", error)
    return NextResponse.json(
      { error: "Failed to fetch messages", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export async function POST(request: Request, { params }: { params: { conversationId: string } }) {
  try {
    const conversationId = params.conversationId
    console.log(`Handling POST request to /api/proxy/messaging/conversations/${conversationId}/messages`)

    // Parse the request body
    const body = await request.json()
    const { content } = body

    if (!content) {
      return NextResponse.json({ error: "Message content is required" }, { status: 400 })
    }

    // First try to send to the real backend
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com").replace(/\/$/, "")
    const url = `${baseUrl}/api/chat/conversations/${conversationId}/messages`

    console.log(`Attempting to send message to backend: ${url}`)

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Successfully sent message to backend")
        return NextResponse.json(data)
      }

      console.log(`Backend returned status ${response.status}, returning mock response`)
    } catch (error) {
      console.log(`Error sending to backend: ${error instanceof Error ? error.message : "Unknown error"}`)
    }

    // If we get here, either the backend request failed or returned an error
    // Return a mock response instead
    const mockResponse = {
      id: `mock-${Date.now()}`,
      content,
      sender: "user",
      timestamp: new Date().toISOString(),
      isRead: true,
      conversationId,
    }

    console.log("Returning mock message response")
    return NextResponse.json(mockResponse)
  } catch (error) {
    console.error("Error in send message endpoint:", error)
    return NextResponse.json(
      { error: "Failed to send message", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
