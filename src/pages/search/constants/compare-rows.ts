import { MOCK_COMPARE_DETAILS } from '@/pages/search/constants/mock-compare-details';
import type { CompareJobDetail } from '@/pages/search/types/compare';
import type { CompareJob } from '@/shared/types/compare-job';

// 비교 표의 행이에요. MY FIT 행은 항상 맨 위에 고정이라 여기 없고 열 컴포넌트가 따로 그려요.
// 공고 마감 ~ 학력은 서버 공고 값, 나머지는 서버에 없어 공고 id별 목 데이터로 채워요.
// 값이 없으면 '미기재'로 보여 줘요.
export type CompareRowKey =
  | 'deadline'
  | 'region'
  | 'schedule'
  | 'hireType'
  | 'career'
  | 'education'
  | 'salary'
  | 'process'
  | 'preference'
  | 'welfare'
  | 'companySize'
  | 'averageSalary'
  | 'remoteWork'
  | 'headcount';

interface CompareRow {
  label: string;
  heightClassName: string;
  getValue: (job: CompareJob) => string | null;
}

const getDetail =
  (key: keyof CompareJobDetail) =>
  ({ id }: CompareJob) =>
    MOCK_COMPARE_DETAILS[id]?.[key] ?? null;

export const COMPARE_ROWS: Record<CompareRowKey, CompareRow> = {
  deadline: {
    label: '공고 마감',
    heightClassName: 'h-9.5',
    getValue: ({ deadline }) => deadline,
  },
  region: {
    label: '근무지역',
    heightClassName: 'h-9.5',
    getValue: ({ region }) => region,
  },
  schedule: {
    label: '근무일시',
    heightClassName: 'h-9.5',
    getValue: getDetail('schedule'),
  },
  hireType: {
    label: '근무형태',
    heightClassName: 'h-9.5',
    getValue: ({ hireType }) => hireType,
  },
  career: {
    label: '지원 경력',
    heightClassName: 'h-9.5',
    getValue: ({ career }) => career,
  },
  education: {
    label: '학력',
    heightClassName: 'h-9.5',
    getValue: ({ education }) => education,
  },
  salary: {
    label: '급여',
    heightClassName: 'h-9.5',
    getValue: getDetail('salary'),
  },
  process: {
    label: '전형 절차',
    heightClassName: 'h-13.25',
    getValue: getDetail('process'),
  },
  preference: {
    label: '우대사항',
    heightClassName: 'h-13',
    getValue: getDetail('preference'),
  },
  welfare: {
    label: '복지 혜택',
    heightClassName: 'h-9.5',
    getValue: getDetail('welfare'),
  },
  companySize: {
    label: '기업 규모',
    heightClassName: 'h-9.5',
    getValue: getDetail('companySize'),
  },
  averageSalary: {
    label: '평균 연봉',
    heightClassName: 'h-9.5',
    getValue: getDetail('averageSalary'),
  },
  remoteWork: {
    label: '재택 · 유연근무',
    heightClassName: 'h-9.5',
    getValue: getDetail('remoteWork'),
  },
  headcount: {
    label: '모집 인원',
    heightClassName: 'h-9.5',
    getValue: getDetail('headcount'),
  },
};

// 처음 보여 줄 항목과 순서 (피그마 검색/공고 비교 모달). "기본값으로 되돌리기"도 이 순서로 돌아가요.
export const DEFAULT_COMPARE_ROW_KEYS: CompareRowKey[] = [
  'deadline',
  'region',
  'schedule',
  'hireType',
  'career',
  'education',
  'salary',
  'process',
  'preference',
];

// 비교 항목 편집의 "추가할 수 있는 항목" 순서
export const ALL_COMPARE_ROW_KEYS: CompareRowKey[] = [
  ...DEFAULT_COMPARE_ROW_KEYS,
  'welfare',
  'companySize',
  'averageSalary',
  'remoteWork',
  'headcount',
];

export const MISSING_VALUE_LABEL = '미기재';

// 바로 지원 확인창에 보여 줄 제출 서류 (홈 지원 패키지와 같은 3종)
export const COMPARE_APPLY_DOCUMENT_SUMMARY =
  '이력서 1 · 자기소개서 1 · 경력기술서 1';
