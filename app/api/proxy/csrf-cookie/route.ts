import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get the base API URL
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "https://careerxhub.onrender.com").replace(/\/$/, "");

    // Try multiple endpoints to get a CSRF cookie
    const endpoints = [
      "/user/login/",
      "/csrf-cookie/",
      "/api/csrf-cookie/",
      "/api/user/login/",
      "/auth/login/",
      "/api/auth/login/"
    ];
    
    let csrfToken = "";
    let cookies = "";
    let foundEndpoint = false;
    
    // Try each endpoint until we get a successful response
    for (const endpoint of endpoints) {
      try {
        console.log(`Attempting to get CSRF cookie from ${baseUrl}${endpoint}`);
        
        const response = await fetch(`${baseUrl}${endpoint}`, {
          method: "GET",
          headers: {
            "Accept": "text/html,application/json,*/*"
          },
          credentials: "include"
        });
        
        if (response.ok) {
          // Extract the CSRF token from the cookie
          const responseCookies = response.headers.get("set-cookie");
          
          if (responseCookies) {
            const csrfCookie = responseCookies.split(";").find(cookie => cookie.trim().startsWith("csrftoken="));
            if (csrfCookie) {
              csrfToken = csrfCookie.split("=")[1];
              cookies = responseCookies;
              console.log(`Successfully extracted CSRF cookie from ${endpoint}:`, csrfToken);
              foundEndpoint = true;
              break;
            }
          }
          
          // If we got a successful response but no CSRF token in cookies, try to get it from the response body
          try {
            const data = await response.json();
            if (data && data.csrfToken) {
              csrfToken = data.csrfToken;
              console.log(`Got CSRF token from response body at ${endpoint}:`, csrfToken);
              foundEndpoint = true;
              break;
            }
          } catch (e) {
            // Not JSON or no token in response, continue to next endpoint
          }
        } else {
          console.log(`Failed to get CSRF cookie from ${endpoint}: ${response.status} ${response.statusText}`);
        }
      } catch (endpointError) {
        console.warn(`Error trying endpoint ${endpoint}:`, endpointError);
      }
    }
    
    if (!foundEndpoint) {
      console.log("Failed to get CSRF cookie from any endpoint, generating fallback token");
      
      // Generate a Django-compatible CSRF token
      csrfToken = generateDjangoStyleToken();
      console.log("Using fallback CSRF token:", csrfToken);
    }
    
    // Create response headers with the cookie if we have one
    const headers = new Headers();
    if (cookies) {
      headers.append("Set-Cookie", cookies);
    } else {
      // If we don't have a real cookie, set a fallback one
      const fallbackCookie = `csrftoken=${csrfToken}; Path=/; SameSite=Lax; Max-Age=31449600`;
      headers.append("Set-Cookie", fallbackCookie);
    }
    
    // Return the token
    return NextResponse.json({ 
      csrfToken,
      success: true,
      source: foundEndpoint ? "server" : "generated"
    }, { headers });
  } catch (error) {
    console.error("CSRF cookie error:", error);
    
    // Generate a fallback token
    const csrfToken = generateDjangoStyleToken();
    console.log("Using fallback CSRF token due to error:", csrfToken);
    
    // Set a fallback cookie
    const headers = new Headers();
    const fallbackCookie = `csrftoken=${csrfToken}; Path=/; SameSite=Lax; Max-Age=31449600`;
    headers.append("Set-Cookie", fallbackCookie);
    
    return NextResponse.json(
      {
        csrfToken,
        success: true,
        source: "generated",
        warning: "Using generated CSRF token due to error"
      },
      { 
        status: 200,
        headers
      },
    );
  }
}

// Generate a token that looks like a Django CSRF token
// Django CSRF tokens are 64 characters of [a-zA-Z0-9]
function generateDjangoStyleToken(): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let token = "";
  for (let i = 0; i < 64; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}