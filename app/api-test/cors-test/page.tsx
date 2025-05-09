"use client";

import { useState } from "react";

interface TestResult {
  success: boolean;
  status?: number;
  data?: any;
  error?: string;
  timing?: number;
}

export default function CorsTestPage() {
  const [directResult, setDirectResult] = useState<TestResult | null>(null);
  const [proxyResult, setProxyResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState<{direct: boolean, proxy: boolean}>({direct: false, proxy: false});
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("Password123!");
  const [firstName, setFirstName] = useState("Test");
  const [lastName, setLastName] = useState("User");

  // Test direct API call (should fail with CORS error)
  const testDirectApi = async () => {
    setLoading(prev => ({...prev, direct: true}));
    setDirectResult(null);
    const startTime = performance.now();

    try {
      // Using the browser's native fetch API directly to the external API
      // This should fail with a CORS error
      const response = await fetch("https://careerxhub.onrender.com/api/user/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          confirm_password: password,
          first_name: firstName,
          last_name: lastName,
          username: email,
          role: "Student",
          userType: "student"
        }),
      });

      const data = await response.json();
      const endTime = performance.now();
      
      setDirectResult({
        success: response.ok,
        status: response.status,
        data,
        timing: Math.round(endTime - startTime)
      });
    } catch (error) {
      const endTime = performance.now();
      setDirectResult({
        success: false,
        error: error instanceof Error ? error.message : String(error),
        timing: Math.round(endTime - startTime)
      });
    } finally {
      setLoading(prev => ({...prev, direct: false}));
    }
  };

  // Test API call through proxy (should succeed)
  const testProxyApi = async () => {
    setLoading(prev => ({...prev, proxy: true}));
    setProxyResult(null);
    const startTime = performance.now();

    try {
      // Using the browser's native fetch API through our Next.js API proxy
      const response = await fetch("/api/proxy/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          confirm_password: password,
          first_name: firstName,
          last_name: lastName,
          username: email,
          role: "Student",
          userType: "student"
        }),
      });

      const data = await response.json();
      const endTime = performance.now();
      
      setProxyResult({
        success: response.ok,
        status: response.status,
        data,
        timing: Math.round(endTime - startTime)
      });
    } catch (error) {
      const endTime = performance.now();
      setProxyResult({
        success: false,
        error: error instanceof Error ? error.message : String(error),
        timing: Math.round(endTime - startTime)
      });
    } finally {
      setLoading(prev => ({...prev, proxy: false}));
    }
  };

  // Format JSON for display
  const formatJson = (data: any) => {
    try {
      return JSON.stringify(data, null, 2);
    } catch (e) {
      return String(data);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">CORS Test Page</h1>
        <p className="mb-4 text-gray-600">
          This page tests the CORS configuration by making requests to the API directly and through the proxy.
          The direct request should fail with a CORS error, while the proxy request should succeed.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Test Configuration</h2>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">First Name:</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Last Name:</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Test Actions</h2>
            <p className="text-sm text-gray-600">
              Click the buttons below to test the API calls. The direct call should fail with a CORS error,
              while the proxy call should succeed.
            </p>
            
            <div className="space-y-2">
              <button
                onClick={testDirectApi}
                disabled={loading.direct}
                className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                {loading.direct ? "Testing Direct API..." : "Test Direct API Call (Should Fail)"}
              </button>
              
              <button
                onClick={testProxyApi}
                disabled={loading.proxy}
                className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                {loading.proxy ? "Testing Proxy API..." : "Test Proxy API Call (Should Succeed)"}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Direct API Result */}
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Direct API Result:</h2>
            {loading.direct ? (
              <div className="text-center py-4">Loading...</div>
            ) : directResult ? (
              <div>
                <div className={`mb-2 font-semibold ${directResult.success ? "text-green-600" : "text-red-600"}`}>
                  {directResult.success ? "Success" : "Failed"} 
                  {directResult.status ? ` (Status: ${directResult.status})` : ""}
                  {directResult.timing ? ` - ${directResult.timing}ms` : ""}
                </div>
                
                {directResult.error ? (
                  <div className="bg-red-50 border border-red-200 p-3 rounded">
                    <div className="font-semibold text-red-700">Error:</div>
                    <div className="text-red-600 whitespace-pre-wrap">{directResult.error}</div>
                  </div>
                ) : directResult.data ? (
                  <pre className="bg-gray-100 p-3 rounded overflow-auto max-h-96 whitespace-pre-wrap text-sm">
                    {formatJson(directResult.data)}
                  </pre>
                ) : null}
              </div>
            ) : (
              <div className="text-gray-500 italic">No test run yet</div>
            )}
          </div>

          {/* Proxy API Result */}
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Proxy API Result:</h2>
            {loading.proxy ? (
              <div className="text-center py-4">Loading...</div>
            ) : proxyResult ? (
              <div>
                <div className={`mb-2 font-semibold ${proxyResult.success ? "text-green-600" : "text-red-600"}`}>
                  {proxyResult.success ? "Success" : "Failed"} 
                  {proxyResult.status ? ` (Status: ${proxyResult.status})` : ""}
                  {proxyResult.timing ? ` - ${proxyResult.timing}ms` : ""}
                </div>
                
                {proxyResult.error ? (
                  <div className="bg-red-50 border border-red-200 p-3 rounded">
                    <div className="font-semibold text-red-700">Error:</div>
                    <div className="text-red-600 whitespace-pre-wrap">{proxyResult.error}</div>
                  </div>
                ) : proxyResult.data ? (
                  <pre className="bg-gray-100 p-3 rounded overflow-auto max-h-96 whitespace-pre-wrap text-sm">
                    {formatJson(proxyResult.data)}
                  </pre>
                ) : null}
              </div>
            ) : (
              <div className="text-gray-500 italic">No test run yet</div>
            )}
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">How This Works</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Direct API Call:</strong> Makes a request directly to the external API at 
              <code className="mx-1 px-1 bg-gray-200 rounded">https://careerxhub.onrender.com/api/user/register/</code>. 
              This should fail with a CORS error because the browser blocks cross-origin requests that don&apos;t have the proper CORS headers.
            </li>
            <li>
              <strong>Proxy API Call:</strong> Makes a request to our Next.js API route at 
              <code className="mx-1 px-1 bg-gray-200 rounded">/api/proxy/register</code>, 
              which forwards the request to the external API. This should succeed because the request is made from the server, 
              which isn&apos;t subject to the same CORS restrictions as the browser.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}