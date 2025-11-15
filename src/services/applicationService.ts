// src/services/applicationService.ts
// Handles API calls related to job applications

export interface ApplicationPayload {
  Name: string;
  Email: string;
  Position: string;
  JobPostingId: string;
  Resume: File;
}

export async function applyForJob(payload: ApplicationPayload): Promise<Response> {
  const formData = new FormData();
  formData.append('Name', payload.Name);
  formData.append('Email', payload.Email);
  formData.append('Position', payload.Position);
  formData.append('JobPostingId', payload.JobPostingId);
  formData.append('Resume', payload.Resume);

  const response = await fetch('http://localhost:5090/api/Application/apply', {
    method: 'POST',
    body: formData,
  });

  return response;
}
