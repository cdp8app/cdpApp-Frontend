import api from "../api";

// // lib/services/internshipService.ts
// import { clientFetch, getAuthHeader } from "../api";

export const internshipService = {
  // Fetch all internships for a specific user
  getInternships: async (userId: string) => {
    const response = await api.get(`/api/internship/${userId}/`);
    return response.data;
  },
    
  // Fetch a specific internship by ID
  getInternshipById: async (internshipId: string) => {
    const response = await api.get(`/api/internship/${internshipId}/`);
    return response.data;
  },
    
  // Create a new internship
  createInternship: async (data: any) => {
    const response = await api.post("/api/internship/", data);
    return response.data;
  },
    
  // Update an existing internship
  updateInternship: async (internshipId: string, data: any) => {
    const response = await api.put(`/api/internship/${internshipId}/`, data);
    return response.data;
  },
    
  // Delete an internship
  deleteInternship: async (internshipId: string) => {
    const response = await api.delete(`/api/internship/${internshipId}/`);
    return response.data;
  },

};