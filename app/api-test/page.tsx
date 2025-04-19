"use client"

import { useState } from "react"

export default function SimpleApiTest() {
  const [result, setResult] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState("https://careerxhub.onrender.com/swagger/")

  const testApi = async () => {
    setLoading(true)
    setResult("")

    try {
      // Using the browser's native fetch API
      const response = await fetch(url, {
        method: "GET",
        mode: "cors", // Important for CORS requests
        headers: {
          Accept: "application/json",
        },
      })

      const text = await response.text()
      setResult(`Status: ${response.status}\n\nResponse:\n${text.substring(0, 1000)}${text.length > 1000 ? "..." : ""}`)
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Simple API Test</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">API URL to Test:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          onClick={testApi}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Testing..." : "Test Connection"}
        </button>

        {result && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Result:</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96 whitespace-pre-wrap">{result}</pre>
          </div>
        )}

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Suggested URLs to Test:</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setUrl("https://careerxhub.onrender.com/swagger/")}
              >
                Swagger Documentation
              </button>
            </li>
            <li>
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setUrl("https://careerxhub.onrender.com/redoc/")}
              >
                ReDoc Documentation
              </button>
            </li>
            <li>
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setUrl("https://careerxhub.onrender.com/api/user/")}
              >
                User API
              </button>
            </li>
            <li>
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setUrl("https://careerxhub.onrender.com/api/jobs/")}
              >
                Jobs API
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
