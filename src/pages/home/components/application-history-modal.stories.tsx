import { useState } from 'react';
import type { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MOCK_APPLICATIONS } from '@/pages/home/constants/mock-applications';
import { QUERY_KEYS } from '@/shared/constants/query-keys';

import ApplicationHistoryModal from './application-history-modal';

type ApplicationsState = 'success' | 'loading' | 'empty' | 'error';

const createStoryQueryClient = (state: ApplicationsState) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: Infinity, retry: false, retryOnMount: false },
    },
  });
  const queryKey = QUERY_KEYS.USER.applications;

  if (state === 'success')
    queryClient.setQueryData(queryKey, MOCK_APPLICATIONS);
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
      queryFn: () => Promise.reject(new Error('지원 내역 조회 실패')),
    });
  }

  return queryClient;
};

interface StoryProvidersProps {
  state: ApplicationsState;
  children: ReactNode;
}

const StoryProviders = ({ state, children }: StoryProvidersProps) => {
  const [queryClient] = useState(() => createStoryQueryClient(state));

  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );
};

const ModalPreview = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <button
        type="button"
        className="rounded-lg border border-border-default px-4 py-2 text-label-14 text-text-primary"
        onClick={() => setIsOpen(true)}
      >
        지원 내역 열기
      </button>
      <ApplicationHistoryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

const meta = {
  title: 'Pages/Home/ApplicationHistoryModal',
  component: ApplicationHistoryModal,
  parameters: { applicationsState: 'success' },
  decorators: [
    (Story, context) => (
      <StoryProviders
        state={context.parameters.applicationsState as ApplicationsState}
      >
        <Story />
      </StoryProviders>
    ),
  ],
  args: {
    isOpen: true,
    onClose: () => {},
  },
  render: () => <ModalPreview />,
} satisfies Meta<typeof ApplicationHistoryModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  parameters: { applicationsState: 'loading' },
};

export const Empty: Story = {
  parameters: { applicationsState: 'empty' },
};

export const ErrorState: Story = {
  name: 'Error',
  parameters: { applicationsState: 'error' },
};
