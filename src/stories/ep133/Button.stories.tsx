import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Colors } from '@/types'
import { SquareButton, Type, Size } from '@/components/ep133-ui/Button'
import type { SquareButtonProps } from '@/components/ep133-ui/Button'
import { TurnAroundArrowLeft } from '@/components/ep133-ui/Symbols'
import Cap from '@/components/ep133-ui/Cap'

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
      options: Type,
      control: { type: 'radio' }
    },
    size: {
      options: Size,
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
export const Square: Story = {
  args: {
    value: '5',
    color: Colors.Dark
  }
} satisfies Meta<SquareButtonProps>

export const Small: Story = {
  args: {
    value: 'KEYS',
    size: Size.Small,
    color: Colors.Gray,
    type: Type.CapText
  }
} satisfies Meta<SquareButtonProps>

export const SmallWithCap: Story = {
  args: {
    value: 'SHIFT',
    size: Size.Small,
    color: Colors.Orange,
    type: Type.CapText,
    children: <Cap value='COMMIT' color={Colors.Orange} />
  }
} satisfies Meta<SquareButtonProps>

export const SmallWithChild: Story = {
  args: {
    value: 'SHIFT',
    size: Size.Small,
    color: Colors.Orange,
    type: Type.CapText,
    children: <p className='h-12 flex flex-col items-center justify-center text-plastic-white'>I AM AI</p>
  }
} satisfies Meta<SquareButtonProps>
