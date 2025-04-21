// app/api/proxy/register/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const payload = {
      username: body.username,
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      password: body.password,
      confirm_password: body.confirm_password,
      role: body.role || 'Student' // Try different capitalization
    };
    
    console.log('Proxying request to backend:', {
      ...payload,
      password: '[REDACTED]',
      confirm_password: '[REDACTED]'
    });;
    
    // Use the correct URL without "student" in the path
    const response = await fetch('https://careerxhub.onrender.com/api/user/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    // Get the response data
    let data;
    try {
      const text = await response.text();
      console.log('Raw response:', text);
      data = text ? JSON.parse(text) : { message: 'Empty response' };
    } catch (e) {
      data = { message: 'Failed to parse response: ' + e.message };
    }
    
    console.log('Backend response:', response.status, data);
    
    // Return the response to the client
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}