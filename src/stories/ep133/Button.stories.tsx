import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Colors, SquareButton, Types } from '@/components/ep133-ui/Button'
import type { SquareButtonProps } from '@/components/ep133-ui/Button'
import { TurnAroundArrowLeft } from '@/components/ep133-ui/Symbols'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof SquareButton> = {
  title: 'EP-133/Button',
  component: SquareButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    color: {
      options: Colors,
      control: { type: 'radio' }
    },
    type: {
      options: Types,
      control: { type: 'radio' }
    },
    onClick: { action: 'clicked' },
    value: {
      control: { type: 'text' }
    },
    Value: {
      options: ['plus-sign', 'arrow-svg'],
      mapping: {
        'plus-sign': <span className='text-[3rem] leading-none'>+</span>,
        'arrow-svg': <TurnAroundArrowLeft className='w-32' />
      }
    },
    Symbol: {
      options: ['arrow-svg'],
      mapping: {
        'arrow-svg': <TurnAroundArrowLeft width='1.25rem' className='translate-y-4' />
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof SquareButton>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Dark: Story = {
  args: {
    value: '5',
    color: Colors.Dark
  }
} satisfies Meta<SquareButtonProps>
