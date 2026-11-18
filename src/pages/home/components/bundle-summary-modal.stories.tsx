// [스토리] BundleSummaryModal
// 위치 : Pages/Home/BundleSummaryModal
// 상태 : 서류 3/3 준비 · 서류 부족

import type { Meta, StoryObj } from '@storybook/react-vite';

import BundleSummaryModal from './bundle-summary-modal';

const noop = () => {};

const meta = {
  title: 'Pages/Home/BundleSummaryModal',
  component: BundleSummaryModal,
  args: {
    isOpen: true,
    onClose: noop,
    onDocumentManageClick: noop,
    myDocuments: { hasResume: true, hasCoverLetter: true, hasCareer: true },
  },
} satisfies Meta<typeof BundleSummaryModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Ready: Story = {};

export const NeedsDocument: Story = {
  args: {
    myDocuments: { hasResume: true, hasCoverLetter: true, hasCareer: false },
  },
};
