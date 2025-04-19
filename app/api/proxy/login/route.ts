// app/api/proxy/login/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, userType } = body;

    // Validate input
    if (!email || !password || !userType) {
      return NextResponse.json(
        { message: 'Email, password, and user type are required' },
        { status: 400 }
      );
    }

    // Call the actual API
    const response = await fetch('https://careerxhub.onrender.com/api/user/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // Get the response data
    const data = await response.json();

    // If the response was not OK, return the error
    if (!response.ok) {
      return NextResponse.json(
        { message: data.detail || 'Login failed' },
        { status: response.status }
      );
    }

    // Return the successful response
    return NextResponse.json(data);
  } catch (error) {
    console.error('Login proxy error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}