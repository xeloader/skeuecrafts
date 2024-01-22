import React, { FunctionComponent } from 'react'
import { Colors } from '../../types'
import classNames from 'classnames'

interface CapProps {
  value?: string
  color: Colors
}

interface BaseProps {
  color: Colors
  value?: string
  className: string
}

function BaseCap ({
  className,
  value
}: Partial<BaseProps>): JSX.Element {
  return (
    <div className={classNames(
      className,
      'h-12 flex flex-col items-center justify-center w-full rounded-sm'
    )}
    >
      <p className='text-lg'>{value}</p>
    </div>
  )
}

function OrangeCap ({
  ...props
}: Partial<BaseProps>): JSX.Element {
  return (
    <BaseCap
      {...props}
      className='bg-ep133-orange text-plastic-white shadow-[inset_1px_1px_0px_rgba(255,255,255,0.2),inset_-1px_-1px_0px_rgba(0,0,0,0.05),inset_0px_8px_16px_rgba(255,145,0,0.5)]'
    />
  )
}
function DarkGrayCap ({
  ...props
}: Partial<BaseProps>): JSX.Element {
  return (
    <BaseCap
      {...props}
      className='bg-ep133-gray-dark text-plastic-white shadow-[inset_1px_1px_0px_rgba(255,255,255,0.2),inset_-1px_-1px_0px_rgba(0,0,0,0.05)]'
    />
  )
}

function LightGrayCap ({
  ...props
}: Partial<BaseProps>): JSX.Element {
  return (
    <BaseCap
      {...props}
      className='bg-ep133-gray-light text-plastic-black shadow-[inset_1px_1px_0px_rgba(255,255,255,0.2),inset_-1px_-1px_0px_rgba(0,0,0,0.05)]'
    />
  )
}

function wrapperForColor (color: Colors): FunctionComponent<Partial<BaseProps>> {
  if (color === Colors.DarkGray) {
    return DarkGrayCap
  } else if (color === Colors.LightGray) {
    return LightGrayCap
  }
  return OrangeCap
}

export default function Cap ({
  color,
  value = ''
}: CapProps): JSX.Element {
  const CapWrapper = wrapperForColor(color)
  return (
    <CapWrapper value={value} />
  )
}
