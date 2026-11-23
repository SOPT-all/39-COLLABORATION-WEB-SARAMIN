// [스토리] ModalApplyFlow
// 위치 : Shared/Modal/ModalApplyFlow
// 상태 : 단계별 모달 5개 + 목 제출 함수로 처음부터 끝까지 눌러 보는 Flow

import type { Meta, StoryObj } from '@storybook/react-vite';

import { createMockSubmitApplication } from '@/shared/api/create-mock-submit-application';
import { useApplyFlow } from '@/shared/hooks/use-apply-flow';
import type { ApplyResult, ApplyTarget } from '@/shared/types/apply-flow';

import ModalApplyFlow from './modal-apply-flow';

const MOCK_TARGET: ApplyTarget = {
  recruitId: 1,
  companyName: '카카오페이',
  positionName: '결제 플랫폼 백엔드 개발자 (Java·Spring)',
  documentSummary: '이력서 1 · 자기소개서 1 · 경력기술서 1',
};

const noop = () => {};

const meta = {
  title: 'Shared/Modal/ModalApplyFlow',
  component: ModalApplyFlow,
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
} satisfies Meta<typeof ModalApplyFlow>;

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

  return (
    <>
      <button
        type="button"
        className="rounded-lg bg-blue-90 px-4 py-2 text-label-14 text-white"
        onClick={() => openApplyFlow(MOCK_TARGET)}
      >
        지원 패키지 드롭하기
      </button>
      <ModalApplyFlow
        step={step}
        target={target}
        onClose={closeApplyFlow}
        onSubmit={submit}
        onRetry={submit}
        // 지원 내역 모달은 홈 페이지에 있어서 여기서는 창만 닫아요.
        onViewHistory={closeApplyFlow}
      />
    </>
  );
};

// 버튼을 눌러 드롭을 흉내 내요. result로 제출 결과(성공 · 실패 · 결과 모름)를 고를 수 있어요.
export const Flow: StoryObj<ApplyFlowDemoProps> = {
  args: { result: 'success' },
  argTypes: {
    result: { control: 'radio', options: ['success', 'error', 'unknown'] },
  },
  render: (args) => <ApplyFlowDemo {...args} />,
};
