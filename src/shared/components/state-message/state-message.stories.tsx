import type { Meta, StoryObj } from '@storybook/react-vite';

import StateMessage from '@/shared/components/state-message/state-message';

const meta = {
  title: 'Shared/StateMessage',
  component: StateMessage,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },

  // Story에서 공통으로 사용할 기본 props
  args: {
    kind: 'empty',
    scope: 'inline',
    title: '검색 결과가 없습니다',
    description: '검색어나 필터 조건을 조정해 주세요',
    action: { label: '필터 초기화', onClick: () => {} },
  },

  // Storybook에서 메시지 종류와 배치 형태를 변경할 수 있도록 설정
  argTypes: {
    kind: { control: 'select', options: ['empty', 'error', 'offline'] },
    scope: { control: 'radio', options: ['inline', 'section'] },
    action: { control: false },
  },
} satisfies Meta<typeof StateMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

// 검색 결과 없음 - 가로형
export const EmptyInline: Story = {};

// 오류 - 가로형
export const ErrorInline: Story = {
  args: {
    kind: 'error',
    title: '정보를 불러오지 못했습니다',
    description: '입력값은 유지됩니다. 잠시 후 다시 시도해 주세요',
    action: { label: '다시 시도', onClick: () => {} },
  },
};

// 네트워크 연결 문제 - 가로형
export const OfflineInline: Story = {
  args: {
    kind: 'offline',
    title: '네트워크 연결을 확인해 주세요',
    description: '연결되면 현재 상태에서 다시 불러올 수 있습니다',
    action: { label: '연결 재시도', onClick: () => {} },
  },
};

// 검색 결과 없음 - 세로형
export const EmptySection: Story = {
  args: { scope: 'section' },
};

// 오류 - 세로형
export const ErrorSection: Story = {
  args: { ...ErrorInline.args, scope: 'section' },
};

// 네트워크 연결 문제 - 세로형
export const OfflineSection: Story = {
  args: { ...OfflineInline.args, scope: 'section' },
};

// 6가지 상태를 한 화면에서 비교
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-5">
      <StateMessage
        kind="empty"
        scope="inline"
        title="검색 결과가 없습니다"
        description="검색어나 필터 조건을 조정해 주세요"
        action={{ label: '필터 초기화', onClick: () => {} }}
      />

      <StateMessage
        kind="error"
        scope="inline"
        title="정보를 불러오지 못했습니다"
        description="입력값은 유지됩니다. 잠시 후 다시 시도해 주세요"
        action={{ label: '다시 시도', onClick: () => {} }}
      />

      <StateMessage
        kind="offline"
        scope="inline"
        title="네트워크 연결을 확인해 주세요"
        description="연결되면 현재 상태에서 다시 불러올 수 있습니다"
        action={{ label: '연결 재시도', onClick: () => {} }}
      />

      <StateMessage
        kind="empty"
        scope="section"
        title="검색 결과가 없습니다"
        description="검색어나 필터 조건을 조정해 주세요"
        action={{ label: '필터 초기화', onClick: () => {} }}
      />

      <StateMessage
        kind="error"
        scope="section"
        title="정보를 불러오지 못했습니다"
        description="입력값은 유지됩니다. 잠시 후 다시 시도해 주세요"
        action={{ label: '다시 시도', onClick: () => {} }}
      />

      <StateMessage
        kind="offline"
        scope="section"
        title="네트워크 연결을 확인해 주세요"
        description="연결되면 현재 상태에서 다시 불러올 수 있습니다"
        action={{ label: '연결 재시도', onClick: () => {} }}
      />
    </div>
  ),
};
