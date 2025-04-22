"use client";

import { useState } from "react";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"

export default function AdvancedApiTest() {
  const [url, setUrl] = useState("https://careerxhub.onrender.com/api/user/student/");
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [requestBody, setRequestBody] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const testApi = async () => {
    setLoading(true);
    setResult("");

    try {
      const headers: HeadersInit = {
        Accept: "application/json",
      };

      if (method !== "GET") {
        headers["Content-Type"] = "application/json";
      }

      if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
      }

      const options: RequestInit = {
        method,
        headers,
        mode: "cors",
      };

      if (method !== "GET" && requestBody) {
        try {
          options.body = JSON.stringify(JSON.parse(requestBody));
        } catch (e) {
          setResult(`Error parsing JSON request body: ${e instanceof Error ? e.message : String(e)}`);
          setLoading(false);
          return;
        }
      }

      const response = await fetch(url, options);
      const text = await response.text();

      let formattedResponse = "";
      try {
        // Try to parse and format JSON response
        const json = JSON.parse(text);
        formattedResponse = JSON.stringify(json, null, 2);
      } catch {
        // If not JSON, use the raw text
        formattedResponse = text;
      }

      setResult(
        `Status: ${response.status} ${response.statusText}\n\nHeaders:\n${formatHeaders(
          response.headers,
        )}\n\nResponse:\n${formattedResponse}`,
      );
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  const formatHeaders = (headers: Headers): string => {
    const result: string[] = [];
    headers.forEach((value, key) => {
      result.push(`${key}: ${value}`);
    });
    return result.join("\n");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Advanced API Test</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="md:col-span-3">
            <label className="block text-sm font-medium mb-1">API URL:</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Method:</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as HttpMethod)}
              className="w-full p-2 border rounded"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Auth Token (if needed):</label>
          <input
            type="text"
            value={authToken}
            onChange={(e) => setAuthToken(e.target.value)}
            placeholder="JWT or Bearer token"
            className="w-full p-2 border rounded"
          />
        </div>

        {method !== "GET" && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Request Body (JSON):</label>
            <textarea
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
              rows={5}
              className="w-full p-2 border rounded font-mono text-sm"
              placeholder='{"key": "value"}'
            />
          </div>
        )}

        <button
          onClick={testApi}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Testing..." : "Test API"}
        </button>

        {result && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Result:</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96 whitespace-pre-wrap font-mono text-sm">
              {result}
            </pre>
          </div>
        )}

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Common Endpoints to Try:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <button
              className="text-blue-600 hover:underline text-left"
              onClick={() => setUrl("https://careerxhub.onrender.com/api/user/student/")}
            >
              /api/user/student/
            </button>
            <button
              className="text-blue-600 hover:underline text-left"
              onClick={() => setUrl("https://careerxhub.onrender.com/api/jobs/")}
            >
              /api/jobs/
            </button>
            <button
              className="text-blue-600 hover:underline text-left"
              onClick={() => setUrl("https://careerxhub.onrender.com/api/internships/")}
            >
              /api/internships/
            </button>
            <button
              className="text-blue-600 hover:underline text-left"
              onClick={() => setUrl("https://careerxhub.onrender.com/api/applications/applications/")}
            >
              /api/applications/applications/
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
