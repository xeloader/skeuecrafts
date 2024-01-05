import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import EP133 from '@/components/ep133-ui/EP133'
import type { EP133Props } from '@/components/ep133-ui/EP133'

const meta: Meta<typeof EP133> = {
  title: 'EP-133/EP-133',
  component: EP133,
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
type Story = StoryObj<typeof EP133>

export const Display: Story = {
  args: {
  }
} satisfies Meta<EP133Props>
