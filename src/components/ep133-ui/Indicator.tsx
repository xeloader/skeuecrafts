import classNames from 'classnames'
import React from 'react'

export interface IndicatorFreshProps {
  state?: 'on' | 'off'
  children?: JSX.Element
}

export function IndicatorFresh ({
  state = 'off'
}: IndicatorFreshProps): JSX.Element {
  return (
    <div className='flex flex-row items-center text-xl font-ep133'>
      <div
        className={classNames(
          'transition-all',
          state === 'on' && 'bg-[radial-gradient(circle_at_60%_60%,rgb(255,119,47)_0%,rgb(234,43,7)_65%)]',
          state === 'off' && 'bg-[linear-gradient(135deg,#2D2D2D_0%,#504E4D_100%)]',
          // 'before:bg-[linear-gradient(rgba(0,0,0,0.04)_-38.76%,rgba(0,0,0,0)_100%)]',
          'size-4 rounded-full',
          'shadow-[1px_1px_0px_rgba(255,255,255,0.3),-1px_-1px_0px_rgba(0,0,0,0.1),inset_1px_1px_0px_rgba(0,0,0,0.15)]'
        )}
      />
    </div>
  )
}

export interface IndicatorProps {
  state?: 'on' | 'off'
  children?: JSX.Element
}

export default function Indicator ({
  state = 'off'
}: IndicatorProps): JSX.Element {
  return (
    <div
      className={classNames(
        'transition-all',
        'bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_-38.76%,rgba(0,0,0,0)_100%),radial-gradient(56%_56%_at_50%_60%,rgba(255,112,31,0.84)_0%,rgba(255,110,51,0)_100%),#E22600]',
        'size-1/3 rounded-full',
        state === 'on' && 'bg-[#E22600]',
        state === 'off' && 'bg-[#2A2A2A]'
      )}
    />
  )
}
