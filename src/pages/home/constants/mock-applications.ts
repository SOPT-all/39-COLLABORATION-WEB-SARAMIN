import type { Application } from '@/pages/home/types/application';

// 지원 내역 API가 없어 목 데이터로 보여 줘요.
// 홈 공고 카드와 어긋나지 않게 서버에서 지원 완료(applied)인 공고와 지원 일시를 그대로 옮겼어요.
export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 1,
    receiptNumber: 'AP-20261112-0017',
    companyName: '무신사',
    positionName: '이커머스 프론트엔드 개발 인턴',
    packageName: '지원 패키지',
    appliedAt: '2026.11.12 10:00',
    applyChannel: '사람인 즉시 지원',
    submittedDocuments: [
      { name: '이력서', count: 1 },
      { name: '자기소개서', count: 1 },
    ],
    status: 'submitted',
  },
  {
    id: 2,
    receiptNumber: 'AP-20261101-0001',
    companyName: '카카오페이',
    positionName: '결제 플랫폼 백엔드 개발자 (Java·Spring)',
    packageName: '지원 패키지',
    appliedAt: '2026.11.01 15:00',
    applyChannel: '사람인 즉시 지원',
    submittedDocuments: [
      { name: '이력서', count: 1 },
      { name: '자기소개서', count: 1 },
      { name: '경력기술서', count: 1 },
    ],
    status: 'under_review',
  },
  {
    id: 3,
    receiptNumber: 'AP-20261029-0011',
    companyName: '당근',
    positionName: '백엔드 개발자 주니어 (Node.js)',
    packageName: '지원 패키지',
    appliedAt: '2026.10.29 15:00',
    applyChannel: '사람인 즉시 지원',
    submittedDocuments: [
      { name: '이력서', count: 1 },
      { name: '경력기술서', count: 1 },
    ],
    status: 'viewed',
  },
  {
    id: 4,
    receiptNumber: 'AP-20260929-0029',
    companyName: '현대오토에버',
    positionName: '모빌리티 백엔드 개발자 신입',
    packageName: '지원 패키지',
    appliedAt: '2026.09.29 15:00',
    applyChannel: '사람인 즉시 지원',
    submittedDocuments: [
      { name: '이력서', count: 1 },
      { name: '자기소개서', count: 1 },
    ],
    status: 'interview',
  },
];
