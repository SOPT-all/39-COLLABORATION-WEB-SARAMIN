import type { Meta, StoryObj } from '@storybook/react-vite';

import BadgeMatch from '@/shared/components/badge/badge-match';
import StateSearchResults from '@/shared/components/state-search-results/state-search-results';

import IcBookmark from '@/shared/assets/icons/ic-bookmark.svg?react';

// 팀원 컴포넌트 머지 전까지 Storybook에서는 임시 UI로 상태 확인
// TODO: 종현님 SkeletonSearchResultItem → loadingSlot
// TODO: 종현님 LoadingBar → loaderSlot
// TODO: 희진님 RowSearchResult → resultsSlot

// 최초 로딩 상태에서 사용할 임시 스켈레톤 UI
const renderSkeletonRowExample = () => (
  <div
    aria-hidden
    className="flex h-41 w-full shrink-0 items-start gap-4 border-b border-border-default bg-surface-default p-4"
  >
    <div className="size-10 shrink-0 rounded-full bg-surface-subtle" />
    <div className="flex min-w-0 flex-1 flex-col gap-3">
      <div className="h-3 w-55 rounded-md bg-surface-subtle" />
      <div className="h-4 w-115 rounded-md bg-surface-subtle" />
      <div className="h-3 w-90 rounded-md bg-surface-subtle" />
      <div className="flex gap-2">
        <div className="h-6 w-18 rounded-lg bg-surface-subtle" />
        <div className="h-6 w-22 rounded-lg bg-surface-subtle" />
        <div className="h-6 w-16 rounded-lg bg-surface-subtle" />
      </div>
    </div>
    <div className="flex shrink-0 flex-col items-end gap-3">
      <div className="h-8 w-18 rounded-lg bg-surface-subtle" />
      <div className="h-3 w-24 rounded-md bg-surface-subtle" />
    </div>
  </div>
);

// 검색 결과가 갱신 중일 때 표시할 임시 공고 UI
const renderResultRowExample = () => (
  <article className="flex h-41.25 w-full shrink-0 flex-col border-b border-border-default bg-surface-default pt-4">
    <div className="flex h-7 shrink-0 items-start justify-between px-4">
      <BadgeMatch matchCount={2} />
      <span className="h-5 w-12.5 text-center text-body-12 text-[#ff4d4f]">
        D-4
      </span>
    </div>
    <p className="h-8 shrink-0 px-4 pt-3 text-body-12 text-text-secondary">
      <span className="text-[#16a36a]">일치</span>
      {'  '}Figma · 프로토타이핑
    </p>
    <div className="flex h-22 shrink-0 items-center gap-3 px-4 pb-4">
      <IcBookmark aria-hidden className="shrink-0 text-gray-70" />
      <div className="flex w-160 shrink-0 flex-col gap-1">
        <h3 className="text-heading-20 text-text-primary">
          [첫차]와 함께 할 프로덕트 디자이너를 찾습니다.
        </h3>
        <p className="h-5 text-body-14 text-text-secondary">
          서울 강남구 · 신입·경력 · 학력무관 · 정규직
        </p>
      </div>
      <div className="flex w-47.5 shrink-0 flex-col gap-0.75 text-right">
        <p className="text-title-16 text-text-primary">(주)미스터픽</p>
        <p className="h-5 text-body-12 text-text-tertiary">관심기업 TOP 100</p>
      </div>
    </div>
  </article>
);

const meta = {
  title: 'Shared/StateSearchResults',
  component: StateSearchResults,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    // 상태별 필수 slot이 다르므로 각 Story에서 상태를 고정
    contentState: { control: false },
    loadingSlot: { control: false },
    loaderSlot: { control: false },
    resultsSlot: { control: false },
    action: { control: false },
  },
} satisfies Meta<typeof StateSearchResults>;

export default meta;

type Story = StoryObj<typeof meta>;

// 최초 검색 결과 로딩
export const Loading: Story = {
  args: {
    contentState: 'loading',
    loadingSlot: (
      <div className="flex flex-col gap-3">
        {renderSkeletonRowExample()}
        {renderSkeletonRowExample()}
      </div>
    ),
  },
};

// 검색 결과 없음
export const Empty: Story = {
  args: {
    contentState: 'empty',
    action: { label: '필터 초기화', onClick: () => {} },
  },
};

// 검색 결과 조회 오류
export const Error: Story = {
  args: {
    contentState: 'error',
    action: { label: '다시 시도', onClick: () => {} },
  },
};

// 기존 검색 결과를 유지하면서 갱신
export const Refreshing: Story = {
  args: {
    contentState: 'refreshing',
    loaderSlot: (
      <div aria-hidden className="h-1 w-full rounded-sm bg-surface-subtle">
        <div className="h-1 w-70 rounded-sm bg-action-primary" />
      </div>
    ),
    resultsSlot: (
      <div className="flex flex-col gap-3">
        {renderResultRowExample()}
        {renderResultRowExample()}
      </div>
    ),
  },
};

// 네 가지 검색 결과 상태를 한 화면에서 비교
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-5">
      <StateSearchResults
        contentState="loading"
        loadingSlot={
          <div className="flex flex-col gap-3">
            {renderSkeletonRowExample()}
            {renderSkeletonRowExample()}
          </div>
        }
      />

      <StateSearchResults
        contentState="empty"
        action={{
          label: '필터 초기화',
          onClick: () => {},
        }}
      />

      <StateSearchResults
        contentState="error"
        action={{
          label: '다시 시도',
          onClick: () => {},
        }}
      />

      <StateSearchResults
        contentState="refreshing"
        loaderSlot={
          <div aria-hidden className="h-1 w-full rounded-sm bg-surface-subtle">
            <div className="h-1 w-70 rounded-sm bg-action-primary" />
          </div>
        }
        resultsSlot={
          <div className="flex flex-col gap-3">
            {renderResultRowExample()}
            {renderResultRowExample()}
          </div>
        }
      />
    </div>
  ),
};
