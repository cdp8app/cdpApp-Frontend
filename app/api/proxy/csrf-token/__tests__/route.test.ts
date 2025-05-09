import { NextRequest } from "next/server";
import { GET, OPTIONS } from "../route";

// Mock fetch
global.fetch = jest.fn();

describe("CSRF Token API Route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET handler", () => {
    it("should return a CSRF token when backend request succeeds", async () => {
      // Mock successful fetch response
      const mockResponse = {
        ok: true,
        headers: {
          get: jest.fn().mockReturnValue("csrftoken=abc123; Path=/;")
        },
        json: jest.fn().mockResolvedValue({ csrf_token: "abc123" })
      };
      
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
      
      const request = new NextRequest("http://localhost:3000/api/proxy/csrf-token");
      const response = await GET(request);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data).toHaveProperty("csrfToken");
      expect(data.csrfToken).toBe("abc123");
    });
    
    it("should return a 200 response with empty CSRF token when backend request fails", async () => {
      // Mock failed fetch response
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: "Not Found"
      };
      
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
      
      const request = new NextRequest("http://localhost:3000/api/proxy/csrf-token");
      const response = await GET(request);
      const data = await response.json();
      
      expect(response.status).toBe(200); // We always return 200 to prevent cascading failures
      expect(data).toHaveProperty("csrfToken");
      expect(data.csrfToken).toBe("");
    });
    
    it("should handle network errors gracefully", async () => {
      // Mock network error
      (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));
      
      const request = new NextRequest("http://localhost:3000/api/proxy/csrf-token");
      const response = await GET(request);
      const data = await response.json();
      
      expect(response.status).toBe(200); // We always return 200 to prevent cascading failures
      expect(data).toHaveProperty("csrfToken");
      expect(data.csrfToken).toBe("");
      expect(data).toHaveProperty("error");
    });
  });
  
  describe("OPTIONS handler", () => {
    it("should return a 204 response with CORS headers", async () => {
      const response = await OPTIONS();
      
      expect(response.status).toBe(204);
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
      expect(response.headers.get("Access-Control-Allow-Methods")).toBe("GET, OPTIONS");
      expect(response.headers.get("Access-Control-Allow-Headers")).toContain("X-CSRF-Token");
    });
  });
});