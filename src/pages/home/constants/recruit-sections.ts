import type { RecruitSectionType } from '@/pages/home/types/recruit';

interface RecruitSection {
  type: RecruitSectionType;
  title: string;
  description: string;
  actionLabel: string;
  actionVariant: 'viewAll' | 'deadlineAlert';
  // 설명 뒤에 ' · N개'로 공고 수를 붙일지
  hasCount: boolean;
  // 공고가 하나도 없을 때 안내 문구
  emptyTitle: string;
  emptyDescription: string;
}

// 홈 공고 피드 섹션 3개 (제목 · 설명은 피그마 문구)
// 추천 빈 결과 제목은 기능명세서 FN-10 확정 문구, 나머지 빈 결과 문구는 명세에 없어 임시
export const RECRUIT_SECTIONS: RecruitSection[] = [
  {
    type: 'recommended',
    title: '내 조건에 맞는 추천 공고',
    description: '최근 활동과 희망 조건을 반영했어요.',
    actionLabel: '전체보기',
    actionVariant: 'viewAll',
    hasCount: false,
    emptyTitle: '조건에 맞는 공고가 없어요',
    emptyDescription: '내 키워드를 추가하면 맞춤 공고를 추천해 드려요.',
  },
  {
    type: 'viewedCompanies',
    title: '이전에 조회했었던 기업들',
    description: '이전에 조회해보았던 기업만 담아봤어요.',
    actionLabel: '전체보기',
    actionVariant: 'viewAll',
    hasCount: false,
    emptyTitle: '조회한 공고가 없어요',
    emptyDescription: '관심 있는 공고를 둘러보면 여기에 모아 드려요.',
  },
  {
    type: 'closingSoon',
    title: '마감 임박 공고',
    description: '48시간 안에 마감되는 공고',
    actionLabel: '마감 알림',
    actionVariant: 'deadlineAlert',
    hasCount: true,
    emptyTitle: '마감 임박 공고가 없어요',
    emptyDescription: '곧 마감되는 공고가 생기면 여기에서 알려 드려요.',
  },
];
