import classNames from 'classnames'
import React from 'react'

export interface IndicatorProps {
  state?: 'on' | 'off'
  children?: JSX.Element
}

export default function Indicator ({
  state = 'off',
  children
}: IndicatorProps): JSX.Element {
  return (
    <div className='flex flex-row gap-6 items-center text-xl font-ep133'>
      <div
        className={classNames(
          'transition-all',
          'bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_-38.76%,rgba(0,0,0,0)_100%),radial-gradient(56%_56%_at_50%_60%,rgba(255,112,31,0.84)_0%,rgba(255,110,51,0)_100%),#E22600]',
          'w-4 h-4 rounded-full',
          state === 'on' && 'bg-[#E22600]',
          state === 'off' && 'bg-[#2A2A2A]'
        )}
      />
      {children != null && <div>{children}</div>}
    </div>
  )
}
