import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import SegmentDisplay from '@/components/ep133-ui/SegmentDisplay'
import type { SegmentDisplayProps } from '@/components/ep133-ui/SegmentDisplay'

const meta: Meta<typeof SegmentDisplay> = {
  title: 'EP-133/SegmentDisplay',
  component: SegmentDisplay,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    children: {},
    dotValue: {}
  }
}

export default meta
type Story = StoryObj<typeof SegmentDisplay>

export const Display: Story = {
  args: {
    value: '123'
  }
} satisfies Meta<SegmentDisplayProps>
