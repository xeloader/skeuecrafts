import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Slider from '@/components/ep133-ui/Slider'
import type { SliderProps } from '@/components/ep133-ui/Slider'

const meta: Meta<typeof Slider> = {
  title: 'EP-133/Slider',
  component: Slider,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
  }
}

export default meta
type Story = StoryObj<typeof Slider>

export const Vertical: Story = {
  args: {
  }
} satisfies Meta<SliderProps>
