import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import CardJob from '@/shared/components/card-job/card-job';
import type {
  CardJobProps,
  CardJobState,
} from '@/shared/components/card-job/card-job.types';

import kakaopayLogo from './kakaopay-story.png';

// TODO: 종현님 DropZoneApplication 머지 후 applicationSlot에 연결
// 현재는 Storybook 전용 임시 지원 영역과 스켈레톤 UI 사용

// 카드 상태별 지원 영역 안내 문구
const APPLICATION_LABELS = {
  default: '패키지 놓고 지원',
  drag_ready: '지원 가능한 공고',
  drag_over: '놓으면 바로 지원',
  success: '지원 완료',
  needs_document: '서류 1개 필요',
  submitting: '지원 요건 확인 중',
  error: '지원하지 못했어요',
  external: '홈페이지 지원',
  closed: '접수 마감',
  needs_questions: '질문 2개 필요',
  applied: '지원 완료',
  ineligible: '지원 조건 미충족',
  loading: '',
} satisfies Record<CardJobState, string>;

// DropZoneApplication 머지 전까지 사용할 임시 지원 영역
const renderApplicationExample = (state: CardJobState) => (
  <div className="flex h-full flex-col items-center justify-center gap-2 border-l border-border-default bg-surface-subtle px-2.5 text-center">
    <span className="text-label-12 text-text-primary">
      {APPLICATION_LABELS[state]}
    </span>
    <span className="text-caption-11 text-text-tertiary">지원 영역 예시</span>
  </div>
);

// 실제 스켈레톤 컴포넌트 연결 전 로딩 상태를 확인하기 위한 임시 UI
const renderLoadingExample = () => (
  <div aria-hidden className="flex h-full flex-col gap-3 p-4">
    <div className="flex items-center gap-3">
      <div className="size-10 shrink-0 rounded-full bg-surface-subtle" />
      <div className="flex flex-1 flex-col gap-2">
        <div className="h-2.5 w-34 rounded-md bg-surface-subtle" />
        <div className="h-2 w-23 rounded-md bg-surface-subtle" />
      </div>
      <div className="size-6 rounded-full bg-surface-subtle" />
    </div>

    <div className="h-4 w-80 rounded-md bg-surface-subtle" />
    <div className="h-3 w-60 rounded-md bg-surface-subtle" />

    <div className="flex gap-2">
      <div className="h-6 w-20 rounded-lg bg-surface-subtle" />
      <div className="h-6 w-16 rounded-lg bg-surface-subtle" />
      <div className="h-6 w-18 rounded-lg bg-surface-subtle" />
    </div>

    <div className="flex justify-between">
      <div className="h-2.5 w-30 rounded-md bg-surface-subtle" />
      <div className="h-2.5 w-22 rounded-md bg-surface-subtle" />
    </div>
  </div>
);

// 북마크와 상세보기 클릭 동작을 확인하는 Storybook 전용 컴포넌트
const InteractiveExample = (args: CardJobProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [detailCount, setDetailCount] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <CardJob
        {...args}
        applicationSlot={renderApplicationExample(args.state ?? 'default')}
        isBookmarked={isBookmarked}
        onBookmarkChange={setIsBookmarked}
        onViewDetail={() => setDetailCount((count) => count + 1)}
      />
      <p aria-live="polite" className="text-body-14">
        상세보기 요청: {detailCount}회 · 북마크:{' '}
        {isBookmarked ? '선택' : '해제'}
      </p>
    </div>
  );
};

const meta = {
  title: 'Shared/CardJob',
  component: CardJob,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    company: '카카오페이',
    companyBadge: '기업인증',
    jobTitle: 'Product Designer (결제·송금)',
    logo: (
      <div className="relative size-8 overflow-hidden rounded-lg">
        <img
          src={kakaopayLogo}
          alt=""
          className="absolute top-[-45.31%] left-[-86.31%] h-[200.22%] w-[272.3%] max-w-none"
        />
      </div>
    ),
    tags: [
      { id: 'role', label: 'Product Design', variant: 'role' },
      { id: 'skill', label: 'Figma', variant: 'skill' },
      { id: 'benefit', label: '유연근무', variant: 'benefit' },
    ],
    conditions: '성남 분당 · 3~7년 · 정규직',
    benefit: '대졸↑ · 유연근무 · 점심 지원',
    matchReason: '내 조건 4개 일치',
    deadline: 'D-3',
    updated: '2일 전 등록',
    state: 'default',
    isBookmarked: false,
    onBookmarkChange: () => {},
    onViewDetail: () => {},
    applicationSlot: renderApplicationExample('default'),
    loadingSlot: renderLoadingExample(),
  },
  argTypes: {
    state: { control: 'select', options: Object.keys(APPLICATION_LABELS) },
    logo: { control: false },
    applicationSlot: { control: false },
    loadingSlot: { control: false },
    onViewDetail: { action: 'viewDetail' },
    onBookmarkChange: { action: 'bookmarkChange' },
  },
  render: (args) => (
    <CardJob
      {...args}
      applicationSlot={renderApplicationExample(args.state ?? 'default')}
    />
  ),
} satisfies Meta<typeof CardJob>;

export default meta;

type Story = StoryObj<typeof meta>;

// 카드의 13가지 상태
export const Default: Story = {};

export const DragReady: Story = {
  args: { state: 'drag_ready' },
};

export const DragOver: Story = {
  args: { state: 'drag_over' },
};

export const Success: Story = {
  args: { state: 'success' },
};

export const NeedsDocument: Story = {
  args: { state: 'needs_document' },
};

export const Submitting: Story = {
  args: { state: 'submitting' },
};

export const Error: Story = {
  args: { state: 'error' },
};

export const External: Story = {
  args: { state: 'external' },
};

export const Closed: Story = {
  args: { state: 'closed' },
};

export const NeedsQuestions: Story = {
  args: { state: 'needs_questions' },
};

export const Applied: Story = {
  args: { state: 'applied' },
};

export const Ineligible: Story = {
  args: { state: 'ineligible' },
};

export const Loading: Story = {
  args: { state: 'loading' },
};

// 북마크 선택 상태
export const Bookmarked: Story = {
  name: 'Example - Bookmarked',
  args: { isBookmarked: true },
};

// 선택적인 정보가 없는 경우
export const WithoutOptionalContent: Story = {
  name: 'Example - Without Optional Content',
  args: {
    companyBadge: undefined,
    benefit: undefined,
    tags: [{ id: 'role', label: 'Product Design', variant: 'role' }],
  },
};

// 긴 채용 공고 제목
export const LongTitle: Story = {
  name: 'Example - Long Title',
  args: {
    jobTitle:
      '사용자의 결제와 송금 경험을 함께 개선할 프로덕트 디자이너를 찾습니다',
  },
};

// 북마크 클릭 및 공고 상세보기 동작 확인
export const Interactive: Story = {
  name: 'Example - Interactive',
  render: (args) => <InteractiveExample {...args} />,
};

// 카드의 13가지 상태를 한 화면에서 비교
export const AllStates: Story = {
  name: 'All States',
  render: (args) => (
    <div className="grid grid-cols-2 gap-6 p-5">
      {(Object.keys(APPLICATION_LABELS) as CardJobState[]).map((state) => (
        <div key={state} className="flex flex-col gap-2">
          <p className="text-label-14 text-text-secondary">{state}</p>
          <CardJob
            {...args}
            state={state}
            applicationSlot={renderApplicationExample(state)}
          />
        </div>
      ))}
    </div>
  ),
};
