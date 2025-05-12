import { cache } from "react";

// Use cache to optimize server-side fetching
const fetchApiData = cache(async (url: string) => {
  try {
    // Use absolute timeout and error handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(url, {
      headers: {
        "Accept": "application/json",
        "User-Agent": "next-server-component",
      },
      signal: controller.signal,
      // Remove next: { revalidate: 0 } as it can cause build issues
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return `Error: ${response.status} ${response.statusText}`;
    }

    const text = await response.text();
    return text.substring(0, 1000) + (text.length > 1000 ? "..." : "");
  } catch (error) {
    // More robust error handling
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        return "Error: Request timed out";
      }
      return `Error: ${(error as Error).message}`;
    }
    return `Error: ${String(error)}`;
  }
});

export default async function ServerApiTest() {
  // Wrap in try-catch to prevent build failures
  let swaggerResult = "Not fetched";
  let userApiResult = "Not fetched";

  try {
    // Fetch in parallel to improve performance
    [swaggerResult, userApiResult] = await Promise.all([
      fetchApiData("https://careerxhub.onrender.com/swagger/"),
      fetchApiData("https://careerxhub.onrender.com/api/user/")
    ]);
  } catch (error) {
    console.error("Fetching API data failed", error);
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Server-Side API Test</h1>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Swagger Documentation:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60 whitespace-pre-wrap">
            {swaggerResult}
          </pre>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">User API:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60 whitespace-pre-wrap">
            {userApiResult}
          </pre>
        </div>
        
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">What This Means:</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>If both tests fail, there might be network connectivity issues between Vercel and Render</li>
            <li>If Swagger works but the API doesn&apos;t, the API endpoints likely require authentication</li>
            <li>If both work from the server but not the client, it&apos;s likely a CORS issue</li>
          </ul>
        </div>
      </div>
    </div>
  );
}