import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Knob from '@/components/ep133-ui/Knob'
import type { KnobProps } from '@/components/ep133-ui/Knob'

const meta: Meta<typeof Knob> = {
  title: 'EP-133/Knob',
  component: Knob,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof Knob>

export const Display: Story = {
  args: {
    step: 2
  }
} satisfies Meta<KnobProps>
