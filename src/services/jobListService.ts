// src/services/jobListService.ts
// Service to fetch job postings

export interface JobPosting {
  jobPostingId: number;
  jobTitle: string;
  jobDescription: string;
}

export async function fetchJobs(): Promise<JobPosting[]> {
  const response = await fetch('http://localhost:5090/api/JobPosting', {
    headers: { 'accept': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to fetch jobs');
  const data = await response.json();
  return data;
}
