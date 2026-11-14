export interface RecruitDetail {
  id: number;
  title: string;
  companyName: string;
}

// 공고 카드의 지원 상태 (오른쪽 상태 영역 · 지원 필터 바 기준)
export type ApplyStatus =
  | 'ready' // 바로 지원 가능
  | 'needsDocuments' // 서류 준비 필요
  | 'external' // 외부(홈페이지) 지원
  | 'applied' // 지원 완료
  | 'closed'; // 마감

// 지원 필터 바에서 고를 수 있는 상태 (마감은 필터에 없어요)
export type ApplyFilter = Exclude<ApplyStatus, 'closed'>;

// 홈 공고 피드의 섹션 종류
export type RecruitSectionType =
  'recommended' | 'viewedCompanies' | 'closingSoon';

// 홈 공고 카드에 필요한 데이터. API가 나오면 응답에 맞춰 필드를 조정해요.
export interface Recruit {
  id: number;
  companyName: string;
  title: string;
  tags: string[];
  conditions: string[];
  matchedConditionCount: number;
  deadline: string;
  applyStatus: ApplyStatus;
  isBookmarked: boolean;
}
