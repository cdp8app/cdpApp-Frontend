"use client"

import { useState, useEffect } from "react"

export default function SwaggerViewer() {
  const [swaggerData, setSwaggerData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSwaggerData() {
      try {
        const response = await fetch("https://careerxhub.onrender.com/swagger/?format=json")
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
        setSwaggerData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchSwaggerData()
  }, [])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">Loading Swagger Documentation...</h1>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">Error Loading Swagger Documentation</h1>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  // Extract all available endpoints from the Swagger data
  const endpoints = swaggerData
    ? Object.keys(swaggerData.paths).map((path) => ({
        path,
        methods: Object.keys(swaggerData.paths[path]).filter((key) => key !== "parameters"),
      }))
    : []

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">API Endpoints from Swagger</h1>

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Base URL: {swaggerData?.basePath || "/api"}</h2>
          <p>Host: {swaggerData?.host || "careerxhub.onrender.com"}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Available Endpoints:</h2>
          <div className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">Endpoint</th>
                  <th className="px-4 py-2 text-left">Methods</th>
                  <th className="px-4 py-2 text-left">Full URL</th>
                </tr>
              </thead>
              <tbody>
                {endpoints.map((endpoint, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-2 font-mono">{endpoint.path}</td>
                    <td className="px-4 py-2">
                      {endpoint.methods.map((method) => (
                        <span
                          key={method}
                          className={`inline-block px-2 py-1 rounded text-xs font-bold mr-1 ${
                            method === "get"
                              ? "bg-blue-100 text-blue-800"
                              : method === "post"
                                ? "bg-green-100 text-green-800"
                                : method === "put"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : method === "delete"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {method.toUpperCase()}
                        </span>
                      ))}
                    </td>
                    <td className="px-4 py-2 font-mono text-xs">
                      https://{swaggerData?.host || "careerxhub.onrender.com"}
                      {swaggerData?.basePath || "/api"}
                      {endpoint.path}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Next Steps:</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use the endpoints listed above in your API client</li>
            <li>
              Make sure to include the base path (<code>{swaggerData?.basePath || "/api"}</code>) in your requests
            </li>
            <li>Check if endpoints require authentication</li>
            <li>Test endpoints using the simple API test component</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
