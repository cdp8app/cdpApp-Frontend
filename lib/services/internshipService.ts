// lib/services/internshipService.ts
import { clientFetch, getAuthHeader } from '../api';

export const internshipService = {
  async getInternships(filters = {}) {
    const queryParams = new URLSearchParams();
    
    // Add any filters to the query params
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, String(value));
    });
    
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return clientFetch(`/api/internships/${queryString}`, {
      headers: getAuthHeader(),
    });
  },
  
  async getInternshipById(id: string) {
    return clientFetch(`/api/internships/${id}/`, {
      headers: getAuthHeader(),
    });
  },
};