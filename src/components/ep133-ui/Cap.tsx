import React from 'react'
import { Colors } from '@/types'

interface CapProps {
  value?: string
  color: Colors
}

export default function Cap ({
  color,
  value = ''
}: CapProps): JSX.Element {
  return (
    <div className='bg-ep133-orange h-12 flex flex-col items-center justify-center w-full rounded-sm shadow-[inset_1px_1px_0px_rgba(255,255,255,0.2),inset_-1px_-1px_0px_rgba(0,0,0,0.05)]'>
      <p className='text-lg text-plastic-white'>{value}</p>
    </div>
  )
}
