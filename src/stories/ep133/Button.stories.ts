import type { Meta, StoryObj } from '@storybook/react';

import { Colors, SquareButton } from '@/components/ep133-ui/Button';
import type { SquareButtonProps } from '@/components/ep133-ui/Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof SquareButton> = {
  title: 'EP-133/Button',
  component: SquareButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    color: {
      options: Colors,
      control: { type: 'radio' },
    }
  },
};

export default meta;
type Story = StoryObj<typeof SquareButton>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Dark: Story = {
  args: {
    color: Colors.Dark
  },
} satisfies Meta<SquareButtonProps>;