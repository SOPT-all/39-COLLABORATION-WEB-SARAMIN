import type { ApplyStatus } from '@/pages/home/types/recruit';
import type { CardJobTag } from '@/shared/components/card-job/card-job.types';

// 공고가 요구하는 서류와 내가 가진 서류예요. 드롭 영역 문구(서류 2/3 · 경력기술서 추가)에 써요.
export interface JobCardDocuments {
  requiredCount: number;
  matchedCount: number;
  missingNames: string[];
}

// 홈 공고 카드 한 장을 그리는 데 필요한 값이에요.
// 추천 · 조회한 공고 · 마감 임박 API 응답을 이 모양으로 바꿔서 같은 카드 목록으로 그려요.
export interface JobCardItem {
  id: number;
  companyName: string;
  title: string;
  companyBadge?: string;
  tags: CardJobTag[];
  conditions: string;
  benefit?: string;
  matchReason: string;
  deadline: string;
  updated: string;
  applyStatus: ApplyStatus;
  isBookmarked: boolean;
  // 서버가 서류 정보를 주지 않으면(지원한 공고 · 목 데이터) 없어요.
  documents?: JobCardDocuments;
  appliedAt?: string;
}
