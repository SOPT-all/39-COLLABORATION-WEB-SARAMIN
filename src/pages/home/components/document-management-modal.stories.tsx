// [스토리] DocumentManagementModal
// 위치 : Pages/Home/DocumentManagementModal
// 상태 : 목록 · 불러오는 중 · 서류 없음 · 불러오기 실패

import { type ReactNode, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MOCK_DOCUMENT_FILES } from '@/pages/home/constants/mock-document-files';
import { QUERY_KEYS } from '@/shared/constants/query-keys';

import DocumentManagementModal from './document-management-modal';

type DocumentFilesState = 'success' | 'loading' | 'empty' | 'error';

const createStoryQueryClient = (state: DocumentFilesState) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: Infinity, retry: false, retryOnMount: false },
    },
  });
  const queryKey = QUERY_KEYS.USER.documentFiles;

  if (state === 'success') {
    queryClient.setQueryData(queryKey, MOCK_DOCUMENT_FILES);
  }
  if (state === 'empty') queryClient.setQueryData(queryKey, []);
  if (state === 'loading') {
    void queryClient.prefetchQuery({
      queryKey,
      queryFn: () => new Promise(() => {}),
    });
  }
  if (state === 'error') {
    void queryClient.prefetchQuery({
      queryKey,
      queryFn: () => Promise.reject(new Error('서류 조회 실패')),
    });
  }

  return queryClient;
};

interface StoryProvidersProps {
  state: DocumentFilesState;
  children: ReactNode;
}

const StoryProviders = ({ state, children }: StoryProvidersProps) => {
  const [queryClient] = useState(() => createStoryQueryClient(state));

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const noop = () => {};

const meta = {
  title: 'Pages/Home/DocumentManagementModal',
  component: DocumentManagementModal,
  parameters: { documentFilesState: 'success' },
  decorators: [
    (Story, context) => (
      <StoryProviders
        state={context.parameters.documentFilesState as DocumentFilesState}
      >
        <Story />
      </StoryProviders>
    ),
  ],
  args: {
    isOpen: true,
    onClose: noop,
    onAddDocumentClick: noop,
  },
} satisfies Meta<typeof DocumentManagementModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  parameters: { documentFilesState: 'loading' },
};

export const Empty: Story = {
  parameters: { documentFilesState: 'empty' },
};

export const ErrorState: Story = {
  name: 'Error',
  parameters: { documentFilesState: 'error' },
};
