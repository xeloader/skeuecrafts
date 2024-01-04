import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import DisplayMatrix from '@/components/ep133-ui/DisplayMatrix'
import type { DisplayMatrixProps } from '@/components/ep133-ui/DisplayMatrix'

const meta: Meta<typeof DisplayMatrix> = {
  title: 'EP-133/DisplayMatrix',
  component: DisplayMatrix,
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
type Story = StoryObj<typeof DisplayMatrix>

export const Display: Story = {
  args: {
    value: '123',
    lightMatrix: [{ glow: 1 }, { glow: 0.5 }, { glow: 0 }, { glow: 0.25 }, { glow: 1 }, {}, {}, { glow: 0.3 }]
  }
} satisfies Meta<DisplayMatrixProps>
