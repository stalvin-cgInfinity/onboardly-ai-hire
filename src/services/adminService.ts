// src/services/adminService.ts
// Service to fetch job applications for admin

export interface JobApplication {
  jobApplicationId: number;
  name: string;
  email: string;
  resumeUrl: string;
  position: string;
  appliedOn: string;
  jobPostingId: number;
  isApplicationProcessed: boolean;
}

export async function fetchApplications(): Promise<JobApplication[]> {
  const response = await fetch('http://localhost:5090/api/Application', {
    headers: { 'accept': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to fetch applications');
  const data = await response.json();
  return data;
}
