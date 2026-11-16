import type { Application } from '@/pages/home/types/application';

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 1,
    receiptNumber: 'AP-20261107-0142',
    companyName: '카카오페이',
    positionName: '프로덕트 디자이너',
    packageName: '지원 패키지',
    appliedAt: '2026.11.07 14:32',
    applyChannel: '사람인 즉시 지원',
    submittedDocuments: [
      { name: '이력서', count: 1 },
      { name: '자기소개서', count: 1 },
      { name: '경력기술서', count: 1 },
    ],
    status: 'under_review',
  },
  {
    id: 2,
    receiptNumber: 'AP-20261028-0087',
    companyName: '네이버',
    positionName: 'UX 디자이너',
    packageName: '지원 패키지',
    appliedAt: '2026.10.28 09:10',
    applyChannel: '사람인 즉시 지원',
    submittedDocuments: [
      { name: '이력서', count: 1 },
      { name: '포트폴리오', count: 1 },
    ],
    status: 'viewed',
  },
  {
    id: 3,
    receiptNumber: 'AP-20261015-0331',
    companyName: '토스',
    positionName: 'Product Designer',
    packageName: '제품 디자인 패키지',
    appliedAt: '2026.10.15 18:02',
    applyChannel: '사람인 즉시 지원',
    submittedDocuments: [
      { name: '이력서', count: 1 },
      { name: '포트폴리오', count: 1 },
    ],
    status: 'interview',
  },
  {
    id: 4,
    receiptNumber: 'AP-20260930-0209',
    companyName: '당근',
    positionName: '프로덕트 디자이너',
    packageName: '지원 패키지',
    appliedAt: '2026.09.30 11:45',
    applyChannel: '사람인 즉시 지원',
    submittedDocuments: [
      { name: '이력서', count: 1 },
      { name: '자기소개서', count: 1 },
    ],
    status: 'submitted',
  },
];
