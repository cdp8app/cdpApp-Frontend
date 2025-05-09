"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/app/Components/ui/card"
import { Button } from "@/app/Components/ui/button"
import { Loader2, RefreshCw, CheckCircle, XCircle } from "lucide-react"

export default function StatusPage() {
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const checkStatus = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/status")

      if (!response.ok) {
        throw new Error(`Failed to check status: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      setStatus(data)
    } catch (err) {
      console.error("Error checking status:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkStatus()
  }, [])

  return (
    <div className="container py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>API Status</span>
            <Button
              onClick={checkStatus}
              disabled={loading}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              {loading ? "Checking..." : "Refresh"}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading && !status ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-10 w-10 animate-spin text-Gold0" />
              <p className="mt-4 text-center text-muted-foreground">Checking API status...</p>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <h3 className="font-medium mb-2 text-red-700">Error</h3>
              <p className="text-red-600">{error}</p>
            </div>
          ) : status ? (
            <>
              <div className="p-4 bg-gray-100 rounded-md">
                <h3 className="font-medium mb-2">Environment</h3>
                <p>
                  <strong>Base URL:</strong> {status.baseUrl}
                </p>
                <p>
                  <strong>NEXT_PUBLIC_API_URL:</strong> {status.environment.NEXT_PUBLIC_API_URL}
                </p>
                <p>
                  <strong>Timestamp:</strong> {new Date(status.timestamp).toLocaleString()}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Endpoint Status</h3>
                {Object.entries(status.results).map(([endpoint, result]: [string, any]) => (
                  <div key={endpoint} className="p-3 border rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm">{endpoint}</span>
                      {result.error ? (
                        <div className="flex items-center text-red-600">
                          <XCircle className="h-5 w-5 mr-1" />
                          Error
                        </div>
                      ) : result.ok ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="h-5 w-5 mr-1" />
                          OK
                        </div>
                      ) : (
                        <div className="flex items-center text-amber-600">
                          <XCircle className="h-5 w-5 mr-1" />
                          {result.status} {result.statusText}
                        </div>
                      )}
                    </div>
                    {result.error && <p className="mt-1 text-sm text-red-600">{result.error}</p>}
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">Use this page to check the status of the backend API endpoints.</p>
        </CardFooter>
      </Card>
    </div>
  )
}
