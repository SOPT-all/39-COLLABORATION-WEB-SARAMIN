import type { Meta, StoryObj } from '@storybook/react-vite';

import RowSearchResult from '@/shared/components/row/row-search-result';
import LoaderBar from '@/shared/components/skeleton/loader-bar';
import SkeletonSearchResultItem from '@/shared/components/skeleton/skeleton-search-result-item';
import StateSearchResults from '@/shared/components/state-search-results/state-search-results';

// 최초 로딩에 사용할 스켈레톤 목록
const loadingContent = (
  <div className="flex flex-col gap-3">
    <SkeletonSearchResultItem />
    <SkeletonSearchResultItem />
  </div>
);

// 갱신 중 기존 검색 결과를 유지하기 위한 예시 데이터
const refreshingContent = (
  <div className="flex flex-col gap-3">
    <RowSearchResult />
    <RowSearchResult
      matchCount={3}
      deadline="D-7"
      matchedKeywords="React · TypeScript · 협업"
      title="프론트엔드 개발자를 모집합니다"
      meta="서울 강남구 · 신입 · 학력무관 · 정규직"
      companyName="예시 기업"
      companyMeta="채용 진행 중"
    />
  </div>
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
    loadingSlot: loadingContent,
  },
};

// 검색 결과 없음
export const Empty: Story = {
  args: {
    contentState: 'empty',
    action: {
      label: '필터 초기화',
      onClick: () => {},
    },
  },
};

// 검색 결과 조회 오류
export const Error: Story = {
  args: {
    contentState: 'error',
    action: {
      label: '다시 시도',
      onClick: () => {},
    },
  },
};

// 기존 검색 결과를 유지하면서 갱신
export const Refreshing: Story = {
  args: {
    contentState: 'refreshing',
    loaderSlot: <LoaderBar />,
    resultsSlot: refreshingContent,
  },
};

// 검색 결과가 많을 때 최소 높이가 늘어나는지 확인
export const ManyResults: Story = {
  args: {
    contentState: 'refreshing',
    loaderSlot: <LoaderBar />,
    resultsSlot: (
      <div className="flex flex-col gap-3">
        {[
          { id: 'job-1', title: '프론트엔드 개발자' },
          { id: 'job-2', title: 'React 개발자' },
          { id: 'job-3', title: '웹 서비스 개발자' },
          { id: 'job-4', title: 'TypeScript 개발자' },
          { id: 'job-5', title: '주니어 프론트엔드 개발자' },
          { id: 'job-6', title: 'UI 개발자' },
          { id: 'job-7', title: '웹 프론트엔드 엔지니어' },
          { id: 'job-8', title: '서비스 개발자' },
          { id: 'job-9', title: 'React 엔지니어' },
          { id: 'job-10', title: '프론트엔드 엔지니어' },
        ].map((job) => (
          <RowSearchResult key={job.id} title={job.title} />
        ))}
      </div>
    ),
  },
};

// 네 가지 검색 결과 상태를 한 화면에서 비교
export const AllStates: Story = {
  args: {
    contentState: 'empty',
  },
  render: () => (
    <div className="flex flex-col gap-6 p-5">
      <StateSearchResults contentState="loading" loadingSlot={loadingContent} />

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
        loaderSlot={<LoaderBar />}
        resultsSlot={refreshingContent}
      />
    </div>
  ),
};
