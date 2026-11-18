import { MOCK_COMPARE_DETAILS } from '@/pages/search/constants/mock-compare-details';
import type { CompareJob } from '@/shared/types/compare-job';

// 비교 표의 행 (피그마 검색/공고 비교 모달 순서). MY FIT 행은 열 컴포넌트가 따로 그려요.
// 공고 마감 ~ 학력은 서버 공고 값, 근무일시 · 급여 · 전형 절차 · 우대사항은 서버에 없어 공고 id별 목 데이터로 채워요.
// 값이 없으면 '미기재'로 보여 줘요.
interface CompareRow {
  key: string;
  label: string;
  heightClassName: string;
  getValue: (job: CompareJob) => string | null;
}

export const COMPARE_ROWS: CompareRow[] = [
  {
    key: 'deadline',
    label: '공고 마감',
    heightClassName: 'h-9.5',
    getValue: ({ deadline }) => deadline,
  },
  {
    key: 'region',
    label: '근무지역',
    heightClassName: 'h-9.5',
    getValue: ({ region }) => region,
  },
  {
    key: 'schedule',
    label: '근무일시',
    heightClassName: 'h-9.5',
    getValue: ({ id }) => MOCK_COMPARE_DETAILS[id]?.schedule ?? null,
  },
  {
    key: 'hireType',
    label: '근무형태',
    heightClassName: 'h-9.5',
    getValue: ({ hireType }) => hireType,
  },
  {
    key: 'career',
    label: '지원 경력',
    heightClassName: 'h-9.5',
    getValue: ({ career }) => career,
  },
  {
    key: 'education',
    label: '학력',
    heightClassName: 'h-9.5',
    getValue: ({ education }) => education,
  },
  {
    key: 'salary',
    label: '급여',
    heightClassName: 'h-9.5',
    getValue: ({ id }) => MOCK_COMPARE_DETAILS[id]?.salary ?? null,
  },
  {
    key: 'process',
    label: '전형 절차',
    heightClassName: 'h-13.25',
    getValue: ({ id }) => MOCK_COMPARE_DETAILS[id]?.process ?? null,
  },
  {
    key: 'preference',
    label: '우대사항',
    heightClassName: 'h-13',
    getValue: ({ id }) => MOCK_COMPARE_DETAILS[id]?.preference ?? null,
  },
];

export const MISSING_VALUE_LABEL = '미기재';

// 바로 지원 확인창에 보여 줄 제출 서류 (홈 지원 패키지와 같은 3종)
export const COMPARE_APPLY_DOCUMENT_SUMMARY =
  '이력서 1 · 자기소개서 1 · 경력기술서 1';
