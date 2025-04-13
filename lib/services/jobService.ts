import { clientFetch, getAuthHeader } from '../api';

export const jobService = {
  async getJobs(filters = {}) {
    const queryParams = new URLSearchParams();
    
    // Add any filters to the query params
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, String(value));
    });
    
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return clientFetch(`/api/jobs/${queryString}`, {
      headers: getAuthHeader(),
    });
  },
  
  async getJobById(id: string) {
    return clientFetch(`/api/jobs/${id}/`, {
      headers: getAuthHeader(),
    });
  },
  
  async searchJobs(query: string) {
    return clientFetch(`/api/jobs/search/?q=${encodeURIComponent(query)}`, {
      headers: getAuthHeader(),
    });
  },
};