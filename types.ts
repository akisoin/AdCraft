export interface AdCopy {
  tone: string;
  headline: string;
  primaryTextParagraph: string;
  primaryTextBullets: string;
  description: string;
}

export interface AnalysisResult {
  ads: AdCopy[];
}

export enum LoadingState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}
