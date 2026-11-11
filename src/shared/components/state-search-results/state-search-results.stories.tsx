import type { Meta, StoryObj } from '@storybook/react-vite';

import BadgeMatch from '@/shared/components/badge/badge-match';
import StateSearchResults from '@/shared/components/state-search-results/state-search-results';

import IcBookmark from '@/shared/assets/icons/ic-bookmark.svg?react';

// Story-only visual examples. Service screens supply their owners' real components through slots.
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
  parameters: { layout: 'centered' },
  argTypes: {
    // Each story fixes its discriminant so controls cannot select a state without its required slots.
    contentState: { control: false },
    loadingSlot: { control: false },
    loaderSlot: { control: false },
    resultsSlot: { control: false },
    action: { control: false },
  },
} satisfies Meta<typeof StateSearchResults>;

export default meta;

type Story = StoryObj<typeof meta>;

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
export const Empty: Story = {
  args: {
    contentState: 'empty',
    action: { label: '필터 초기화', onClick: () => {} },
  },
};
export const Error: Story = {
  args: {
    contentState: 'error',
    action: { label: '다시 시도', onClick: () => {} },
  },
};
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
