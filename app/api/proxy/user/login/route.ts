import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Get login data from request
    const loginData = await request.json()
    console.log("Proxying login request to backend:", {
      ...loginData,
      password: loginData.password ? "[REDACTED]" : undefined,
    })

    // Get the base API URL
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com").replace(/\/$/, "")
    const loginUrl = `${baseUrl}/api/user/login/`

    // First, we need to get the CSRF cookie from Django
    // Make a GET request to the login page or another endpoint to get the CSRF cookie
    console.log("Fetching CSRF cookie from backend...")
    const csrfResponse = await fetch(`${baseUrl}/api/csrf-cookie/`, {
      method: "GET",
      credentials: "include", // Important: This ensures cookies are sent and stored
    })

    // Extract the CSRF token from the cookie
    const cookies = csrfResponse.headers.getSetCookie()
    let csrfToken = ""

    for (const cookie of cookies) {
      if (cookie.includes("csrftoken=")) {
        const match = cookie.match(/csrftoken=([^;]+)/)
        if (match && match[1]) {
          csrfToken = match[1]
          console.log("Found CSRF token in cookie:", csrfToken)
          break
        }
      }
    }

    if (!csrfToken) {
      console.warn("No CSRF token found in cookies, attempting login without it")
    }

    // Now make the actual login request with the CSRF token
    const loginResponse = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken, // Include the CSRF token in the header
        Cookie: `csrftoken=${csrfToken}`, // Also include it in the cookie
      },
      body: JSON.stringify(loginData),
      credentials: "include", // Important: This ensures cookies are sent and stored
    })

    // Get the response content
    const responseText = await loginResponse.text()
    console.log("Raw login response:", responseText)

    // Try to parse as JSON
    let responseData
    try {
      responseData = JSON.parse(responseText)
    } catch (e) {
      // If not valid JSON, return error with the HTML content
      return NextResponse.json(
        {
          message: `Failed to parse response: ${e instanceof Error ? e.message : "Unknown error"}`,
          html: responseText.substring(0, 500) + (responseText.length > 500 ? "..." : ""),
        },
        { status: loginResponse.status },
      )
    }

    console.log("Backend login response:", loginResponse.status, responseData)

    // Return the response
    return NextResponse.json(responseData, { status: loginResponse.status })
  } catch (error) {
    console.error("Login proxy error:", error)
    return NextResponse.json(
      {
        message: "An error occurred during login",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
