import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Get the base API URL from environment variables
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com").replace(/\/$/, "")

    console.log(`Fetching CSRF token from ${baseUrl}/api/user/csrf-token/`)

    // Make a GET request to the backend to get a CSRF cookie
    const response = await fetch(`${baseUrl}/api/user/csrf-token/`, {
      method: "GET",
      credentials: "include",
      cache: "no-store", // Prevent caching
    })

    // Log the response status
    console.log(`CSRF token response status: ${response.status}`)

    // Get cookies from the response - getAll is not available, use get instead
    const setCookieHeader = response.headers.get("set-cookie")
    console.log(`Set-Cookie header: ${setCookieHeader ? "found" : "not found"}`)

    let csrfToken = ""

    // Try to extract the CSRF token from the cookies
    if (setCookieHeader) {
      const cookies = setCookieHeader.split(",")
      for (const cookieString of cookies) {
        const csrfMatch = cookieString.match(/csrftoken=([^;]+)/)
        if (csrfMatch && csrfMatch[1]) {
          csrfToken = csrfMatch[1]
          console.log(`Found CSRF token in cookie: ${csrfToken}`)
          break
        }
      }
    }

    // If we couldn't get a token from cookies, try to get it from the response body
    if (!csrfToken && response.status === 200) {
      try {
        const data = await response.json()
        if (data.csrfToken) {
          csrfToken = data.csrfToken
          console.log(`Found CSRF token in response body: ${csrfToken}`)
        }
      } catch (e) {
        console.log("Response body is not JSON or doesn't contain csrfToken")
      }
    }

    // If we still don't have a token, generate a mock one
    if (!csrfToken) {
      csrfToken = `csrf-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`
      console.log(`Generated mock CSRF token: ${csrfToken}`)
    }

    // Create the response
    const nextResponse = NextResponse.json({ csrfToken })

    // Forward cookies if available
    if (setCookieHeader) {
      nextResponse.headers.set("Set-Cookie", setCookieHeader)
    }

    return nextResponse
  } catch (error) {
    console.error("Error in CSRF token route handler:", error)

    // Generate a mock token as fallback
    const csrfToken = `csrf-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`
    console.log(`Generated mock CSRF token after error: ${csrfToken}`)

    return NextResponse.json({
      csrfToken,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    })
  }
}
