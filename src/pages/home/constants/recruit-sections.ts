import type { RecruitSectionType } from '@/pages/home/types/recruit';

interface RecruitSection {
  type: RecruitSectionType;
  title: string;
  description: string;
  actionLabel: string;
  actionVariant: 'viewAll' | 'deadlineAlert';
}

// 홈 공고 피드 섹션 3개 (피그마 문구 그대로)
export const RECRUIT_SECTIONS: RecruitSection[] = [
  {
    type: 'recommended',
    title: '내 조건에 맞는 추천 공고',
    description: '최근 활동과 희망 조건을 반영했어요.',
    actionLabel: '전체보기',
    actionVariant: 'viewAll',
  },
  {
    type: 'viewedCompanies',
    title: '이전에 조회했었던 기업들',
    description: '이전에 조회해보았던 기업만 담아봤어요.',
    actionLabel: '전체보기',
    actionVariant: 'viewAll',
  },
  {
    type: 'closingSoon',
    title: '마감 임박 공고',
    description: '48시간 안에 마감되는 공고 · 2개',
    actionLabel: '마감 알림',
    actionVariant: 'deadlineAlert',
  },
];
