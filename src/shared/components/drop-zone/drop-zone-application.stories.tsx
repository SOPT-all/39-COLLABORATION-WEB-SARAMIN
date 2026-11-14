// [스토리] DropZoneApplication
// 위치 : Shared/DropZone/DropZoneApplication
// 상태 : status 12개마다 하나 + 12개를 피그마처럼 한 줄에 늘어놓은 AllStates

import type { Meta, StoryObj } from '@storybook/react-vite';

import DropZoneApplication from './drop-zone-application';
import { DROP_ZONE_APPLICATION_STATES } from './drop-zone-application-states';

const STATUSES = Object.keys(
  DROP_ZONE_APPLICATION_STATES,
) as (keyof typeof DROP_ZONE_APPLICATION_STATES)[];

const meta = {
  title: 'Shared/DropZone/DropZoneApplication',
  component: DropZoneApplication,
  args: { status: 'idle' },
  argTypes: {
    status: { control: 'select', options: STATUSES },
  },
} satisfies Meta<typeof DropZoneApplication>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Idle: Story = {};
export const DragReady: Story = { args: { status: 'dragReady' } };
export const DragOver: Story = { args: { status: 'dragOver' } };
export const Submitting: Story = { args: { status: 'submitting' } };
export const Success: Story = { args: { status: 'success' } };
export const Applied: Story = { args: { status: 'applied' } };
export const NeedsDocument: Story = { args: { status: 'needsDocument' } };
export const NeedsQuestions: Story = { args: { status: 'needsQuestions' } };
export const Error: Story = { args: { status: 'error' } };
export const External: Story = { args: { status: 'external' } };
export const Closed: Story = { args: { status: 'closed' } };
export const Ineligible: Story = { args: { status: 'ineligible' } };

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 bg-surface-default p-4">
      {STATUSES.map((status) => (
        <DropZoneApplication key={status} status={status} />
      ))}
    </div>
  ),
};
