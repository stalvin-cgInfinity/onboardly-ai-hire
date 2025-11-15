// src/services/jobService.ts
// Service to post new jobs for admin

export interface PostJobPayload {
  JobTitle: string;
  JobDescription: string;
}

export async function postJob(payload: PostJobPayload): Promise<Response> {
  const response = await fetch('http://localhost:5090/api/JobPosting/PostJob', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return response;
}
