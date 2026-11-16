// [스토리] ApplyFlowModal
// 위치 : Pages/Home/ApplyFlowModal
// 상태 : 단계별 모달 5개 + 목 제출 함수로 처음부터 끝까지 눌러 보는 Flow

import { type ReactNode, useState } from 'react';
import { MemoryRouter } from 'react-router';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { createMockSubmitApplication } from '@/pages/home/api/create-mock-submit-application';
import ApplicationHistoryModal from '@/pages/home/components/application-history-modal';
import { useApplyFlow } from '@/pages/home/hooks/use-apply-flow';
import type { ApplyResult, ApplyTarget } from '@/pages/home/types/apply-flow';

import ApplyFlowModal from './apply-flow-modal';

const MOCK_TARGET: ApplyTarget = {
  recruitId: 1,
  companyName: '카카오페이',
  positionName: '프로덕트 디자이너',
  documentSummary: '이력서 1 · 자기소개서 1 · 경력기술서 1',
};

const noop = () => {};

const meta = {
  title: 'Pages/Home/ApplyFlowModal',
  component: ApplyFlowModal,
  args: {
    step: 'review',
    target: MOCK_TARGET,
    onClose: noop,
    onSubmit: noop,
    onRetry: noop,
    onViewHistory: noop,
  },
  argTypes: {
    step: {
      control: 'select',
      options: ['review', 'submitting', 'success', 'error', 'unknown'],
    },
  },
} satisfies Meta<typeof ApplyFlowModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Review: Story = {};

export const Submitting: Story = { args: { step: 'submitting' } };

export const Success: Story = { args: { step: 'success' } };

export const Failed: Story = { args: { step: 'error' } };

export const Unknown: Story = { args: { step: 'unknown' } };

interface ApplyFlowDemoProps {
  result: ApplyResult;
}

const ApplyFlowDemo = ({ result }: ApplyFlowDemoProps) => {
  const { step, target, openApplyFlow, closeApplyFlow, submit } = useApplyFlow({
    submitApplication: createMockSubmitApplication(result),
  });
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleViewHistory = () => {
    closeApplyFlow();
    setIsHistoryOpen(true);
  };

  return (
    <>
      <button
        type="button"
        className="rounded-lg bg-blue-90 px-4 py-2 text-label-14 text-white"
        onClick={() => openApplyFlow(MOCK_TARGET)}
      >
        지원 패키지 드롭하기
      </button>
      <ApplyFlowModal
        step={step}
        target={target}
        onClose={closeApplyFlow}
        onSubmit={submit}
        onRetry={submit}
        onViewHistory={handleViewHistory}
      />
      <ApplicationHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />
    </>
  );
};

// 지원 내역 모달이 목 지원 내역을 불러오고 공고 찾기로 이동할 수 있게 감싸요.
interface FlowProvidersProps {
  children: ReactNode;
}

const FlowProviders = ({ children }: FlowProvidersProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );
};

// 버튼을 눌러 드롭을 흉내 내요. result로 제출 결과(성공 · 실패 · 결과 모름)를 고를 수 있어요.
// 지원 내역 보기를 누르면 지원 내역 모달로 넘어가요.
export const Flow: StoryObj<ApplyFlowDemoProps> = {
  args: { result: 'success' },
  argTypes: {
    result: { control: 'radio', options: ['success', 'error', 'unknown'] },
  },
  render: (args) => (
    <FlowProviders>
      <ApplyFlowDemo {...args} />
    </FlowProviders>
  ),
};
