import type { Meta, StoryObj } from '@storybook/react';
import Select from '../components/Select';
import { action } from '@storybook/addon-actions';

const data = [
  { label: 'Option 1' },
  { label: 'Option 2' },
  { label: 'Option 3', priority: true },
  { label: 'Option 4' },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    data: { control: 'object' },
    onSelect: { action: 'onSelect' },
    disabled: { control: 'boolean' },
    searchable: { control: 'boolean' },
    placeholderText: { control: 'text' },
  },
  args: {
    data,
    onSelect: action('onSelect'),
    placeholderText: 'Select an option',
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholderText: 'Disabled Select',
  },
};

export const Searchable: Story = {
  args: {
    searchable: true,
    placeholderText: 'Searchable Select',
  },
};

export const WithPreselectedOption: Story = {
  args: {
    defaultValue: data[3],
  },
};
