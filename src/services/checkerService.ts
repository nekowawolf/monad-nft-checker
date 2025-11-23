import { Project, EligibilityResult, ProjectCheckResult } from '@/types';

export const projects: Project[] = [
  {
    id: 'meowwn',
    name: 'Meowwnads',
    image: 'https://pbs.twimg.com/profile_images/1873575423906299904/lTXCfeTr_400x400.jpg',
    checkerUrl: 'https://meowwn.ad/checker/',
    xUrl: 'https://x.com/meowwnads',
    apiUrl: `${typeof window === 'undefined' ? 'http://localhost:3000' : ''}/api/check?address=`,
  },
];

export async function checkEligibility(
  address: string,
  project: Project
): Promise<EligibilityResult> {
  try {
    console.log('Fetching from:', `${project.apiUrl}${address}`);
    
    const response = await fetch(`${project.apiUrl}${address}`);
    
    if (!response.ok) {
      console.log('Response not OK:', response.status);
      return {
        eligible: false,
        message: 'Unable to check eligibility',
      };
    }

    const data = await response.json();
    console.log('API Response data:', data);
    
    if (data.ok === true && data.message && data.message.includes('Congratulations')) {
      return {
        eligible: true,
        message: 'You are eligible!',
        details: data.message.replace(/<br>/g, ' - '),
      };
    }
    
    if (data.error) {
      return {
        eligible: false,
        message: 'Service Error',
        details: data.message || data.error,
      };
    }
    
    return {
      eligible: false,
      message: 'Not eligible',
      details: data.message || 'No eligibility information available.',
    };
  } catch (error) {
    console.error(`Error checking eligibility for ${project.name}:`, error);
    return {
      eligible: false,
      message: 'Error checking eligibility',
      details: 'Failed to connect to the checker API.',
    };
  }
}

export async function checkAllProjects(address: string): Promise<ProjectCheckResult[]> {
  const results: ProjectCheckResult[] = [];

  const checkPromises = projects.map(async (project) => {
    const eligibility = await checkEligibility(address, project);
    return {
      project,
      eligibility,
    };
  });

  const allResults = await Promise.all(checkPromises);
  
  return allResults.filter((result) => result.eligibility.eligible);
}