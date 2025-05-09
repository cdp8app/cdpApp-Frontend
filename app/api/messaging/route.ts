import { type NextRequest, NextResponse } from "next/server"

// Mock data for development until backend is ready
const MOCK_CONVERSATIONS = [
  {
    id: "1",
    participantId: "user1",
    participantName: "Victoria Benson",
    participantAvatar: "",
    lastMessage: "Hello there John, this is a test message",
    lastMessageTime: new Date().toISOString(),
    unreadCount: 2
  },
  {
    id: "2",
    participantId: "user2",
    participantName: "Big Star Tech",
    participantAvatar: "",
    lastMessage: "We would like to schedule an interview",
    lastMessageTime: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    unreadCount: 0
  },
  {
    id: "3",
    participantId: "user3",
    participantName: "Tech Solutions Inc",
    participantAvatar: "",
    lastMessage: "Thank you for your application",
    lastMessageTime: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    unreadCount: 1
  }
]

const MOCK_MESSAGES = {
  "1": [
    {
      id: "msg1",
      senderId: "user1",
      receiverId: "currentUser",
      content: "Hello there! I saw your profile and I'm impressed with your skills.",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: true
    },
    {
      id: "msg2",
      senderId: "user1",
      receiverId: "currentUser",
      content: "Would you be interested in discussing a potential job opportunity at our company?",
      timestamp: new Date(Date.now() - 3500000).toISOString(),
      read: true
    },
    {
      id: "msg3",
      senderId: "currentUser",
      receiverId: "user1",
      content: "Hi Victoria, thank you for reaching out! I would definitely be interested in learning more about the opportunity.",
      timestamp: new Date(Date.now() - 3400000).toISOString(),
      read: true
    },
    {
      id: "msg4",
      senderId: "user1",
      receiverId: "currentUser",
      content: "Great! We're looking for someone with your exact skill set. Can we schedule a call tomorrow?",
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      read: false
    }
  ],
  "2": [
    {
      id: "msg5",
      senderId: "user2",
      receiverId: "currentUser",
      content: "Hello! Thank you for applying to our Software Developer position.",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      read: true
    },
    {
      id: "msg6",
      senderId: "user2",
      receiverId: "currentUser",
      content: "We would like to schedule an interview with you next week. Are you available?",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: true
    }
  ],
  "3": [
    {
      id: "msg7",
      senderId: "user3",
      receiverId: "currentUser",
      content: "Thank you for your application to Tech Solutions Inc.",
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      read: true
    },
    {
      id: "msg8",
      senderId: "currentUser",
      receiverId: "user3",
      content: "Thank you for considering my application. I'm very excited about this opportunity!",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      read: true
    },
    {
      id: "msg9",
      senderId: "user3",
      receiverId: "currentUser",
      content: "We've reviewed your application and would like to move forward. Please complete our technical assessment.",
      timestamp: new Date(Date.now() - 43200000).toISOString(),
      read: false
    }
  ]
}

// Helper function to proxy requests to the backend chat API
async function proxyToBackend(request: NextRequest, path: string, method: string) {
  try {
    // Get the base API URL from environment variables
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com").replace(/\/$/, "")
    
    // Map frontend paths to backend paths
    let backendPath = path
    
    // Handle specific path mappings
    if (path === '' || path === '/') {
      backendPath = '/messages'
    } else if (path === '/conversations') {
      backendPath = '/messages/conversations'
    } else if (path.startsWith('/conversations/')) {
      const conversationId = path.split('/').pop()
      backendPath = `/messages/conversations/${conversationId}`
    } else if (path === '/unread/count') {
      backendPath = '/messages/unread/count'
    } else if (!path.startsWith('/messages')) {
      // If path doesn't start with /messages, add it
      backendPath = `/messages${path}`
    }
    
    // Construct the full URL - Using the chat API endpoint
    const url = `${baseUrl}/api/chat${backendPath}`
    
    console.log(`Proxying ${method} request to backend: ${url}`)
    
    // Get request body for non-GET requests
    let body = null
    if (method !== "GET" && request.body) {
      body = await request.text()
      console.log(`Request body: ${body.substring(0, 200)}${body.length > 200 ? "..." : ""}`)
    }
    
    // Forward headers from the original request
    const headers = new Headers()
    request.headers.forEach((value, key) => {
      // Skip host header to avoid CORS issues
      if (key.toLowerCase() !== "host") {
        headers.append(key, value)
      }
    })
    
    // Set content type if not already set
    if (!headers.has("Content-Type") && body) {
      headers.set("Content-Type", "application/json")
    }
    
    // Add authorization header if available
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem("authToken")
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
    }
    
    // Make the request to the backend API
    const response = await fetch(url, {
      method,
      headers,
      body,
      credentials: "include",
    })
    
    // Get response data
    const responseData = await response.text()
    console.log(`Response status: ${response.status} ${response.statusText}`)
    console.log(`Response data: ${responseData.substring(0, 200)}${responseData.length > 200 ? "..." : ""}`)
    
    // Create headers for the response
    const responseHeaders = new Headers()
    response.headers.forEach((value, key) => {
      responseHeaders.append(key, value)
    })
    
    // Return the response
    return new NextResponse(responseData, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    })
  } catch (error) {
    console.error("API Proxy Error:", error)
    return NextResponse.json(
      {
        error: "Failed to proxy request to backend API",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  // Get the path from the URL
  const url = new URL(request.url)
  const path = url.pathname.replace('/api/messaging', '')
  
  console.log(`Handling GET request for messaging path: ${path}`)
  
  // Check if we should use the backend API or mock data
  const useBackendApi = process.env.USE_BACKEND_CHAT_API === 'true'
  
  if (useBackendApi) {
    // Proxy the request to the backend chat API
    return proxyToBackend(request, path, "GET")
  }
  
  // Otherwise use mock data
  try {
    // Handle different messaging endpoints
    if (path === '' || path === '/') {
      // Return all conversations
      return NextResponse.json(MOCK_CONVERSATIONS, { status: 200 })
    } 
    else if (path === '/conversations') {
      // Return all conversations
      return NextResponse.json(MOCK_CONVERSATIONS, { status: 200 })
    }
    else if (path.startsWith('/conversations/')) {
      // Extract conversation ID
      const conversationId = path.split('/').pop()
      
      if (conversationId && MOCK_MESSAGES[conversationId]) {
        return NextResponse.json(MOCK_MESSAGES[conversationId], { status: 200 })
      } else {
        return NextResponse.json({ error: 'Conversation not found' }, { status: 404 })
      }
    }
    else if (path === '/unread/count') {
      // Calculate unread count
      const unreadCount = MOCK_CONVERSATIONS.reduce(
        (total, conversation) => total + conversation.unreadCount, 
        0
      )
      return NextResponse.json({ count: unreadCount }, { status: 200 })
    }
    else {
      return NextResponse.json({ error: 'Endpoint not found' }, { status: 404 })
    }
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const url = new URL(request.url)
  const path = url.pathname.replace('/api/messaging', '')
  
  console.log(`Handling POST request for messaging path: ${path}`)
  
  // Check if we should use the backend API or mock data
  const useBackendApi = process.env.USE_BACKEND_CHAT_API === 'true'
  
  if (useBackendApi) {
    // Proxy the request to the backend chat API
    return proxyToBackend(request, path, "POST")
  }
  
  // Otherwise use mock data
  try {
    // Parse the request body
    const body = await request.json()
    
    if (path === '' || path === '/') {
      // Handle sending a new message
      const { receiverId, content } = body
      
      if (!receiverId || !content) {
        return NextResponse.json({ error: 'receiverId and content are required' }, { status: 400 })
      }
      
      // Create a new message
      const newMessage = {
        id: `msg${Date.now()}`,
        senderId: "currentUser",
        receiverId,
        content,
        timestamp: new Date().toISOString(),
        read: false
      }
      
      return NextResponse.json(newMessage, { status: 201 })
    }
    else if (path.startsWith('/messages/')) {
      // Handle other message operations
      return NextResponse.json({ error: 'Not implemented yet' }, { status: 501 })
    }
    else {
      return NextResponse.json({ error: 'Endpoint not found' }, { status: 404 })
    }
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  const url = new URL(request.url)
  const path = url.pathname.replace('/api/messaging', '')
  
  console.log(`Handling PATCH request for messaging path: ${path}`)
  
  // Check if we should use the backend API or mock data
  const useBackendApi = process.env.USE_BACKEND_CHAT_API === 'true'
  
  if (useBackendApi) {
    // Proxy the request to the backend chat API
    return proxyToBackend(request, path, "PATCH")
  }
  
  // Otherwise use mock data
  try {
    if (path.match(/\/messages\/[\w-]+\/read$/)) {
      // Handle marking a message as read
      const messageId = path.split('/')[2]
      
      return NextResponse.json({ success: true, messageId }, { status: 200 })
    }
    else {
      return NextResponse.json({ error: 'Endpoint not found' }, { status: 404 })
    }
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}