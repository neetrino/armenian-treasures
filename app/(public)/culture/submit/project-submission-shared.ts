export interface ProjectSubmissionState {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Record<string, string>;
}

export const PROJECT_SUBMISSION_INITIAL: ProjectSubmissionState = { status: 'idle' };

/** Sentinel value for the "General submission" select option (not a culture menu slug). */
export const GENERAL_CATEGORY_VALUE = '__general__';
