// lib/services/applicationService.ts
import { clientFetch, getAuthHeader } from '../api';

export const applicationService = {
  async getMyApplications() {
    return clientFetch('/api/applications/my-applications/', {
      headers: getAuthHeader(),
    });
  },
  
  async applyToJob(jobId: string, applicationData: any) {
    return clientFetch('/api/applications/job/', {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify({
        job_id: jobId,
        ...applicationData,
      }),
    });
  },
  
  async applyToInternship(internshipId: string, applicationData: any) {
    return clientFetch('/api/applications/internship/', {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify({
        internship_id: internshipId,
        ...applicationData,
      }),
    });
  },
  
  async getApplicationStatus(applicationId: string) {
    return clientFetch(`/api/applications/${applicationId}/status/`, {
      headers: getAuthHeader(),
    });
  },
};