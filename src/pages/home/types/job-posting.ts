import type { Keyword } from '@/shared/types/keyword';

// 서버가 주는 값 그대로예요. 화면용 변환은 공통 유틸로 해요.
export type DeadlineType = '마감 일자 마감' | '채용 시 마감';
export type JobPostingStatus = '모집 중' | '모집 마감';

// 추천 · 조회한 공고 · 마감 임박 API가 같은 모양으로 돌려줘요.
export interface JobPosting {
  id: number;
  title: string;
  companyName: string;
  companyAddress: string;
  companyCertified: boolean;
  hireType: string;
  requiredEducation: string;
  minCareerYears: number;
  maxCareerYears: number;
  deadlineType: DeadlineType;
  // '채용 시 마감'이면 null이에요.
  deadlineAt: string | null;
  status: JobPostingStatus;
  keywords: string[];
  matchedKeywordCount: number;
  applied: boolean;
  // 이미 지원한 공고는 서류 정보와 postedAt이 null로 와요.
  requiredDocumentCount: number | null;
  matchedDocumentCount: number | null;
  missingDocuments: string[] | null;
  postedAt: string | null;
  appliedAt: string | null;
}

export interface RecommendedJobPostings {
  myFitKeywords: Keyword[];
  jobPostings: JobPosting[];
}

// 공고 목록 API 3개가 같이 받는 쿼리예요. 서버 최대값은 50이에요.
export interface JobPostingListParams {
  size?: number;
}
