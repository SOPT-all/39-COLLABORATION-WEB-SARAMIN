import type { Meta, StoryObj } from '@storybook/react-vite';

import CardJobApplyReview from '@/shared/components/card-job-apply-review/card-job-apply-review';

// 최종 지원 확인 카드의 기본 UI와 버튼 동작을 확인하는 Storybook
// 재사용: CardJobApplyReview 내부에서 ModalButton 사용

const meta = {
  title: 'Shared/CardJobApplyReview',
  component: CardJobApplyReview,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    title: '지원 내용을 확인해 주세요',
    subtitle: '서연이화 · 프로덕트 디자이너',
    sectionLabel: '제출 서류',
    documentSummary: '이력서 1 · 자기소개서 1 · 경력기술서 1',
    consentLabel: '지원 서류 및 개인정보 제공에 동의합니다.',
    cancelLabel: '취소',
    submitLabel: '최종 지원하기',
    onCancel: () => {},
    onSubmit: () => {},
  },
  argTypes: {
    onCancel: { action: 'cancel' },
    onSubmit: { action: 'submit' },
  },
} satisfies Meta<typeof CardJobApplyReview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
