import type {
  CompanyInfo,
  PowerLink,
  SearchResult,
} from '@/pages/search/types/search';

// API가 나오기 전까지 쓰는 검색 페이지 목 데이터예요. (피그마 예시 문구 그대로)

export const MOCK_SEARCH_RESULT_TOTAL = 729;
export const MOCK_COMPANY_TOTAL = 49094;

export const MOCK_SELECTED_FILTERS = ['서울', '경력 2–7년'];

export const MOCK_RELATED_KEYWORDS = [
  'UX 디자이너',
  'UIUX',
  '프로덕트 디자인',
  'Figma',
  '서비스 기획',
];

export const MOCK_MYFIT_KEYWORDS = [
  'Figma',
  'UX디자인',
  'Adobe XD',
  'UI',
  '프로덕트 디자인',
  'UX',
  '프로토타이핑',
];

export const MOCK_SEARCH_RESULTS: SearchResult[] = [
  {
    id: 1,
    matchCount: 2,
    deadline: 'D-4',
    matchedKeywords: 'Figma · 프로토타이핑',
    title: '[첫차]와 함께 할 프로덕트 디자이너를 찾습니다.',
    meta: '서울 강남구 · 신입·경력 · 학력무관 · 정규직',
    companyName: '(주)미스터픽',
    companyMeta: '관심기업 TOP 100',
    isBookmarked: false,
  },
  {
    id: 2,
    matchCount: 2,
    deadline: 'D-10',
    matchedKeywords: 'Sketch · UI 디자인',
    title: '[디자인스튜디오]에서 UX/UI 디자이너를 모집합니다.',
    meta: '부산 해운대구 · 신입·경력 · 학력무관 · 정규직',
    companyName: '디자인스튜디오',
    companyMeta: '관심기업 TOP 50',
    isBookmarked: false,
  },
  {
    id: 3,
    matchCount: 2,
    deadline: 'D-2',
    matchedKeywords: 'Adobe XD · 웹 디자인',
    title: '[크리에이티브 에이전시]에서 웹 디자이너를 찾습니다.',
    meta: '대전 유성구 · 신입·경력 · 학력무관 · 정규직',
    companyName: '크리에이티브 에이전시',
    companyMeta: '관심기업 TOP 200',
    isBookmarked: false,
  },
  {
    id: 4,
    matchCount: 2,
    deadline: 'D-5',
    matchedKeywords: 'Figma · 앱 디자인',
    title: '[테크 스타트업]에서 앱 디자이너를 모집합니다.',
    meta: '서울 마포구 · 신입·경력 · 학력무관 · 정규직',
    companyName: '테크 스타트업',
    companyMeta: '관심기업 TOP 30',
    isBookmarked: false,
  },
  {
    id: 5,
    matchCount: 2,
    deadline: 'D-8',
    matchedKeywords: 'InVision · UX 리서치',
    title: '[리서치 회사]에서 UX 리서처를 찾고 있습니다.',
    meta: '인천 남동구 · 신입·경력 · 학력무관 · 정규직',
    companyName: '리서치 회사',
    companyMeta: '관심기업 TOP 75',
    isBookmarked: false,
  },
  {
    id: 6,
    matchCount: 2,
    deadline: 'D-1',
    matchedKeywords: 'Adobe Illustrator · 그래픽 디자인',
    title: '[디자인 에이전시]에서 그래픽 디자이너를 모집합니다.',
    meta: '경기 성남시 · 신입·경력 · 학력무관 · 정규직',
    companyName: '디자인 에이전시',
    companyMeta: '관심기업 TOP 90',
    isBookmarked: false,
  },
  {
    id: 7,
    matchCount: 2,
    deadline: 'D-3',
    matchedKeywords: 'Canva · 소셜 미디어 디자인',
    title: '[마케팅 팀]에서 소셜 미디어 디자이너를 찾습니다.',
    meta: '서울 송파구 · 신입·경력 · 학력무관 · 정규직',
    companyName: '마케팅 팀',
    companyMeta: '관심기업 TOP 120',
    isBookmarked: false,
  },
];

export const MOCK_COMPANY_INFO: CompanyInfo = {
  name: '(주)어반플레이',
  factColumns: [
    [
      { label: '설립일', value: '2013년 12월 17일 (업력 14년차)' },
      { label: '업종', value: '인테리어 디자인업' },
      { label: '평균연봉', value: '4,744만원  전체 ›' },
      { label: '합격자료', value: '면접질문·후기 2건' },
    ],
    [
      { label: '대표자명', value: '홍주석' },
      { label: '재무정보', value: '매출액 202.4억 (2025년 기준)  전체 ›' },
      {
        label: '기업주소',
        value: '서울 서대문구 연희로5길 22, 지하 1층, 2층, 3층',
      },
    ],
  ],
  positions: [
    {
      title: '[콘텐츠유통팀] 판로개척 담당자',
      condition: '서울 서대문구 | 경력3년↑ | 대졸↑',
      deadline: '~11.01(일)',
    },
    {
      title: '[공간OS팀] 공간 기획자 (3년이상 8년이하)',
      condition: '서울 서대문구 | 경력 3~8년 | 대졸↑',
      deadline: '~12.01(화)',
    },
    {
      title: '[경영전략그룹] 제주 성산 기록상점 공간 운영 매니저',
      condition: '제주 제주시 | 경력무관 | 학력무관',
      deadline: '~11.20(금)',
    },
    {
      title: '[경영전략그룹] 브랜드 MD / 공간운영 매니저',
      condition: '서울 서대문구 | 경력3년↑ | 학력무관',
      deadline: '채용시',
    },
  ],
};

export const MOCK_POWER_LINK_COLUMNS: PowerLink[][] = [
  [
    {
      title: ['', '디자인', ' G마켓'],
      url: 'http://www.gmarket.co.kr',
      description: '디자인 쇼핑에 집중! 최대 5% 적립에 무료반품까지, 특별혜택',
    },
    {
      title: ['유명핫플레이스 홍보조형물제작'],
      url: 'https://blog.naver.com/airbible3',
      description:
        '2~4미터크기 4kg미만, 가벼운 무게로 안전설치가능, 디테일한 조형물 제작 가능',
    },
    {
      title: ['코아이디 페이지 ', '디자인'],
      url: 'https://coidstudio.com/',
      description:
        '아마존네이버 페이지 디자인 및 체계적인 기획, 내부 3D 렌더링 스튜디오 보유',
    },
  ],
  [
    {
      title: ['행사용 공기조형물 제작업체'],
      url: 'https://www.airbible.co.kr',
      description:
        '(주)에어바이블, 전기코드 꽂으면 2~5미터 이상 대형조형물 간단설치와 철거가능',
    },
    {
      title: ['캐릭터 맞춤 대형조형물 제작'],
      url: 'http://www.airbible.com',
      description:
        '전기코드 꽂아서 대형조형물 손쉬운설치, 여러번 반복사용과 간단 철거가능,A/S제공',
    },
    {
      title: ['기업과 사람을 위한 인쇄'],
      url: 'https://www.hanprinting.co.kr/',
      description: '기업사랑디자인은 확실히 다르기 때문에',
    },
  ],
];
