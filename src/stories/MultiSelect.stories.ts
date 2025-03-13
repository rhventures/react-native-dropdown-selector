import type { Meta, StoryObj } from '@storybook/react';
import MultiSelect from '../components/MultiSelect';
import { action } from '@storybook/addon-actions';

const data = [
  { label: 'Item 1' },
  { label: 'Item 2' },
  { label: 'Item 3', priority: true },
  { label: 'Item 4' },
  { label: 'Item 5' },
];

const meta = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
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
    placeholderText: 'Select items',
  },
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholderText: 'Disabled MultiSelect',
  },
};

export const Searchable: Story = {
  args: {
    searchable: true,
    placeholderText: 'Searchable MultiSelect',
  },
};

export const WithPreselectedOptions: Story = {
  args: {
    defaultValue: [data[1], data[2]],
  },
};
