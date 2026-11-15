// [스토리] SearchFilterField
// 상태 : search · location · briefcase · filters

import type { Meta, StoryObj } from '@storybook/react-vite';

import SearchFilterField from './search-filter-field';

const ICONS = ['search', 'location', 'briefcase', 'filters'] as const;

const LABELS = {
  search: '프로덕트 디자이너',
  location: '서울 전체',
  briefcase: '경력 무관',
  filters: '상세 조건',
} as const;

const meta = {
  title: 'Shared/Search/SearchFilterField',
  component: SearchFilterField,
  args: {
    icon: 'search',
    className: 'w-56',
  },
  argTypes: {
    icon: { control: 'select', options: ICONS },
  },
} satisfies Meta<typeof SearchFilterField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Search: Story = {};

export const Location: Story = {
  args: { icon: 'location', label: LABELS.location },
};

export const Briefcase: Story = {
  args: { icon: 'briefcase', label: LABELS.briefcase },
};

export const Filters: Story = {
  args: { icon: 'filters', label: LABELS.filters },
};

export const AllIcons: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      {ICONS.map((icon) => (
        <SearchFilterField
          key={icon}
          {...args}
          icon={icon}
          label={LABELS[icon]}
        />
      ))}
    </div>
  ),
};
