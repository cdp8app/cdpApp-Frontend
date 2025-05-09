"use client";

import { useState, useEffect } from "react";

export default function CSRFTokenTest() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<string | null>(null);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("/api/proxy/csrf-token", {
          method: "GET",
          credentials: "include",
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setCsrfToken(data.csrfToken || "No CSRF token found in response");
        setTestResult("CSRF token fetched successfully");
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        setTestResult("Failed to fetch CSRF token");
      } finally {
        setLoading(false);
      }
    };
    
    fetchCsrfToken();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">CSRF Token Test</h1>
      
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">Test Result</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <div className="text-red-600">
            <p className="font-bold">Error:</p>
            <p>{error}</p>
          </div>
        ) : (
          <div className="text-green-600">
            <p>{testResult}</p>
          </div>
        )}
      </div>
      
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">CSRF Token</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <pre className="bg-gray-100 p-3 rounded overflow-x-auto">
            {csrfToken || "No token received"}
          </pre>
        )}
      </div>
      
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Refresh Test
      </button>
    </div>
  );
}