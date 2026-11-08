# AGENTS.md

AI 코딩 에이전트(Codex, Claude Code 등)가 이 저장소에서 작업할 때 따르는 규칙이에요.
이 파일이 **규칙의 단일 원본**이에요. `CLAUDE.md`는 이 파일을 import 하니, 규칙을 바꿀 때는 여기만 수정해요.

## 프로젝트 개요

- SOPT 39기 합동 세미나 웹 파트, 사람인 클론 프로젝트 (React SPA)
- 저장소: `SOPT-all/39-COLLABORATION-WEB-SARAMIN`

## 기술 스택

| 분류 | 기술 |
| --- | --- |
| UI · 언어 | React 19, TypeScript |
| 빌드 | Vite |
| 패키지 매니저 | **pnpm만 사용** (npm, yarn 금지) |
| 라우팅 | React Router v8 (`react-router`, `react-router/dom`) |
| 서버 상태 | TanStack Query |
| 네트워크 | axios (인스턴스 · 인터셉터는 `shared/api/config`) |
| 스타일 | Tailwind CSS v4, `cn` 유틸 (clsx + tailwind-merge) |
| SVG | SVGR (여러 색상으로 쓰는 아이콘만 `currentColor`) |
| UI 문서화 | Storybook |
| 린트 · 포맷 | ESLint + Prettier (`prettier-plugin-tailwindcss`) |
| 배포 | Vercel, CI는 GitHub Actions |

- 환경: Node.js 26 (`.nvmrc`), pnpm 12 (`packageManager` 필드)
- 환경 변수는 `VITE_` 접두어 사용 (예: `VITE_API_BASE_URL`). `.env`는 커밋하지 않아요.
- 위 목록에 없는 패키지는 **사용자에게 먼저 확인받고** 설치해요.

## 명령어

```bash
pnpm install
pnpm dev            # 개발 서버
pnpm build          # 타입 검사 + 프로덕션 빌드
pnpm lint           # ESLint 검사 (자동 수정: pnpm lint:fix)
pnpm format         # Prettier 적용 (검사만: pnpm format:check)
pnpm storybook      # Storybook
```

작업을 마치면 `pnpm lint`, `pnpm format:check`, `pnpm build`가 통과하는지 확인해요.

## 폴더 구조

```
src
├── app
│   ├── layout          # 공통 레이아웃 (Header, Footer)
│   ├── App.tsx
│   └── main.tsx
├── pages
│   └── recruit-detail  # 페이지별 폴더
│       ├── api         # 페이지 전용 API 함수 · 쿼리 훅
│       ├── components  # 페이지 전용 컴포넌트
│       ├── constants
│       ├── hooks
│       ├── types
│       ├── utils
│       └── recruit-detail-page.tsx
├── routes
│   └── router.tsx
└── shared
    ├── api/config      # axios 인스턴스, queryClient
    ├── assets/icons
    ├── components      # 공통 컴포넌트 (컴포넌트별 폴더)
    ├── constants
    ├── hooks
    ├── styles          # global.css, 테마 토큰
    ├── types
    └── utils           # cn 등
```

- 한 페이지에서만 쓰면 `pages/페이지명/` 안에, 두 페이지 이상에서 쓰면 `shared/`로 올려요.

## 코드 컨벤션

### 이름

- 폴더 · 파일명: **kebab-case** (`search-bar/search-bar.tsx`, `use-recruit-list.ts`). 폴더명은 가능하면 복수형.
- 컴포넌트 · 타입 · 인터페이스: PascalCase / 변수 · 함수: camelCase / 상수: `UPPER_SNAKE_CASE`
- boolean은 `is` · `has` · `can` 접두어, 배열은 복수형 (`recruits`)
- 줄임말 대신 의미가 분명한 이름 (`btn` ❌ → `button` ⭕). 매직 넘버는 상수로 분리.
- 함수는 동사 + 명사, 접두어 통일: `get`(조회) · `create`(생성) · `check`(조건 검사) · `convert`(변환) · `filter`(필터링) · `is`(boolean 반환)
- 이벤트 핸들러는 `handle~`, Props로 넘길 때는 `on~` (`handleClick` → `onClick`)

### 컴포넌트

- 화살표 함수 + `default export`, 한 파일에 한 컴포넌트
- 시맨틱 태그 우선 (`section`, `header`, `main`, `nav`, `article`, `footer`), 의미 없는 래퍼는 Fragment
- children 없으면 self-closing, `button`에는 `type` 필수
- 리스트 key에 랜덤 값 금지. 동적 리스트는 고유 id, index는 정적 리스트에서만

```tsx
import type { ComponentProps, KeyboardEvent } from 'react';

import { cn } from '@/shared/utils/cn';

interface SearchBarProps extends ComponentProps<'input'> {
  onSearch: (keyword: string) => void;
}

const SearchBar = ({ onSearch, className, ...props }: SearchBarProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch(e.currentTarget.value);
  };

  return (
    <input
      className={cn('h-12 rounded-lg border px-4', className)}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
};

export default SearchBar;
```

### 함수 · 훅 · export

- 함수는 화살표 함수
- 커스텀 훅은 `use` 접두어 + `named export` (`useRecruitList`)
- 유틸 · 상수도 `named export`

### 타입

- `interface` 우선, 유니온 · 튜플 · 리터럴만 `type`
- Props 타입은 `~Props` 접미사
- `any` 금지 → `unknown` 후 타입 좁히기
- 타입만 가져올 때는 `import type`
- 컴포넌트 관련 타입은 같은 폴더에, 커지면 `types.ts`로 분리

### 스타일 (Tailwind)

- 색상 · 폰트 · 간격은 `shared/styles` 테마 토큰 사용, 임의 값(`text-[#333]`) 지양
- 조건부 클래스나 외부 `className` 병합은 `cn` 사용
- 클래스가 길어지면 variant 객체로 분리
- 클래스 순서는 Prettier가 정렬하니 직접 맞추지 않아요

### import

- `../` 상대경로 대신 절대경로 `@/`
- 순서(`simple-import-sort`가 정렬): React · 외부 라이브러리 → `@/` 내부 모듈 → `./` → 스타일 · 에셋

## Git 워크플로우

- `main`: 배포 브랜치, `dev`: 통합 브랜치. **둘 다 직접 push 금지.**
- 순서: **이슈 생성 → `dev`에서 브랜치 생성 → 커밋 → `dev`로 PR**
- 브랜치: `타입/이슈번호/기능명` (번호는 `#` 없이, 기능명은 영어 kebab-case) — 예: `feat/12/search-bar`
  - 타입: `init`, `feat`, `fix`, `refactor`, `docs`, `perf`
- 커밋 · PR · 이슈 제목: `타입: 작업 내용` — 한국어, 구체적으로, 마침표 없이
  - 커밋 타입: `init`, `feat`, `fix`, `refactor`, `style`, `chore`, `docs`, `rename`, `remove`, `hotfix`
  - ⭕ `fix: 검색어 입력 시 필터가 초기화되는 문제 수정` / ❌ `fix: 자잘한 오류 수정`
- 커밋은 기능 단위로 작게 나눠요.
- PR은 하나의 기능만, 변경 1000줄 이내. 본문에 `close #이슈번호`, 라벨 필수. 2명 이상 approve 후 머지.
- PR · 이슈 본문은 `.github`의 템플릿을 따라요. (이슈: Feature / Fix / Refactor)

## 에이전트 작업 규칙

- 요청받은 범위만 작업해요. 다른 담당자의 초기 세팅 작업(ESLint, 라우터, Tailwind 토큰 등)을 임의로 건드리지 않아요.
- 새 파일은 위 폴더 구조와 네이밍을 따라 만들고, 기존 코드의 패턴을 먼저 확인해요.
- 커밋 · push · PR 생성은 사용자가 요청했을 때만 해요. `main`, `dev`에 직접 push하지 않아요.
- `.env`, 시크릿, 개인 설정 파일은 커밋하지 않아요.
- 의존성 추가, 설정 파일 변경처럼 팀 전체에 영향이 있는 변경은 먼저 사용자에게 확인받아요.
