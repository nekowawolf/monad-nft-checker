export interface Project {
  id: string;
  name: string;
  image: string;
  checkerUrl: string;
  xUrl: string;
  apiUrl: string;
}

export interface EligibilityResult {
  eligible: boolean;
  message?: string;
  details?: string;
}

export interface ProjectCheckResult {
  project: Project;
  eligibility: EligibilityResult;
}