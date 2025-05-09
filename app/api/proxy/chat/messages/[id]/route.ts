import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // Fix: We don't need to await params, but we should handle it safely
  return proxyMessageRequest(request, params.id, "GET")
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  return proxyMessageRequest(request, params.id, "PUT")
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  return proxyMessageRequest(request, params.id, "PATCH")
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  return proxyMessageRequest(request, params.id, "DELETE")
}

async function proxyMessageRequest(request: NextRequest, id: string, method: string) {
  try {
    console.log(`Proxying ${method} request to /chat/messages/${id}/`)

    // Check if authorization header is present
    const authHeader = request.headers.get("authorization")
    console.log(authHeader ? "Using provided authorization header" : "No authorization header found")

    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com").replace(/\/$/, "")
    const url = `${baseUrl}/api/chat/messages/${id}/`

    // Get request body for non-GET requests
    let body = null
    if (method !== "GET" && request.body) {
      body = await request.text()
    }

    // Forward headers from the original request
    const headers = new Headers()
    request.headers.forEach((value, key) => {
      if (key.toLowerCase() !== "host") {
        headers.append(key, value)
      }
    })

    // Set content type if not already set
    if (!headers.has("Content-Type") && body) {
      headers.set("Content-Type", "application/json")
    }

    // Add authorization header if present
    if (authHeader) {
      headers.set("Authorization", authHeader)
    }

    // Forward cookies
    const cookie = request.headers.get("cookie")
    if (cookie) {
      headers.set("Cookie", cookie)
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

    // Create headers for the response
    const responseHeaders = new Headers()
    response.headers.forEach((value, key) => {
      responseHeaders.append(key, value)
    })

    return new NextResponse(responseData, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    })
  } catch (error) {
    console.error(`Error in ${method} /chat/messages/${id}/:`, error)
    return NextResponse.json(
      {
        error: `Failed to proxy ${method} request to /chat/messages/${id}/`,
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
