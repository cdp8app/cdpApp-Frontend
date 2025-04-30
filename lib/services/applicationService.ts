import api from "../api";

// // lib/services/applicationService.ts
// import { clientFetch, getAuthHeader } from "../api";

export const applicationService = {
  // Fetch all applications for a specific user
  getApplications: async (userId: string) => {
    const response = await api.get(`/api/application/${userId}/`);
    return response.data;
  },
    
  // Fetch a specific application by ID
  getApplicationById: async (applicationId: string) => {
    const response = await api.get(`/api/application/${applicationId}/`);
    return response.data;
  },
    
  // Create a new application
  createApplication: async (data: any) => {
    const response = await api.post("/api/application/", data);
    return response.data;
  },
    
  // Update an existing application
  updateApplication: async (applicationId: string, data: any) => {
    const response = await api.put(`/api/application/${applicationId}/`, data);
    return response.data;
  },
    
  // Delete an application
  deleteApplication: async (applicationId: string) => {
    const response = await api.delete(`/api/application/${applicationId}/`);
    return response.data;
  },

};