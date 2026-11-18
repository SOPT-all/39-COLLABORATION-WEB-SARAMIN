// [스토리] DocumentUploadModal
// 위치 : Pages/Home/DocumentUploadModal
// 상태 : 파일을 고르면 업로드 → 서류 확인 (Default) · 업로드 실패 (UploadFailed)
//        파일은 드롭 영역에 끌어다 놓거나 "파일 선택"으로 골라요.

import { type ReactNode, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { createMockUploadDocument } from '@/pages/home/api/create-mock-upload-document';

import DocumentUploadModal from './document-upload-modal';

interface StoryQueryClientProviderProps {
  children: ReactNode;
}

const StoryQueryClientProvider = ({
  children,
}: StoryQueryClientProviderProps) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const meta = {
  title: 'Pages/Home/DocumentUploadModal',
  component: DocumentUploadModal,
  decorators: [
    (Story) => (
      <StoryQueryClientProvider>
        <Story />
      </StoryQueryClientProvider>
    ),
  ],
  args: {
    isOpen: true,
    onClose: () => {},
  },
} satisfies Meta<typeof DocumentUploadModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const UploadFailed: Story = {
  args: { uploadDocument: createMockUploadDocument('error') },
};
