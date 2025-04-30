import api from "../api";

// // lib/services/JobService.ts
// import { clientFetch, getAuthHeader } from "../api";

export const JobService = {
  // Fetch all Jobs for a specific user
  getJobs: async (userId: string) => {
    const response = await api.get(`/api/Job/${userId}/`);
    return response.data;
  },
    
  // Fetch a specific Job by ID
  getJobById: async (JobId: string) => {
    const response = await api.get(`/api/Job/${JobId}/`);
    return response.data;
  },
    
  // Create a new Job
  createJob: async (data: any) => {
    const response = await api.post("/api/Job/", data);
    return response.data;
  },
    
  // Update an existing Job
  updateJob: async (JobId: string, data: any) => {
    const response = await api.put(`/api/Job/${JobId}/`, data);
    return response.data;
  },
    
  // Delete an Job
  deleteJob: async (JobId: string) => {
    const response = await api.delete(`/api/Job/${JobId}/`);
    return response.data;
  },

};