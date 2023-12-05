import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Indicator from '@/components/ep133-ui/Indicator'
import type { IndicatorProps } from '@/components/ep133-ui/Indicator'

const meta: Meta<typeof Indicator> = {
  title: 'EP-133/Indicator',
  component: Indicator,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
  }
}

export default meta
type Story = StoryObj<typeof Indicator>

export const On: Story = {
  args: {
    state: 'on'
  }
} satisfies Meta<IndicatorProps>

export const WithText: Story = {
  args: {
    children: <p>LOL</p>
  }
} satisfies Meta<IndicatorProps>
