import classNames from 'classnames'
import React, { SVGAttributes, useCallback, useEffect, useRef, useState } from 'react'

export interface KnobProps {
  step?: number
  max?: number
  min?: number
  onChange?: (value: number) => void
}

export default function Knob ({
  step = 1,
  max = 100,
  min = -100,
  onChange: handleChange
}: KnobProps): JSX.Element {
  const prevValue = useRef<number>(0)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [value, setValue] = useState<number>(0)

  const handleDrag = useCallback(() => {
    prevValue.current = 0
    setIsDragging(true)
  }, [])

  const handleMouseMove = useCallback((event: MouseEvent): any => {
    const mx = event.clientX
    if (isDragging && prevValue.current !== mx) {
      const isIncreasing = prevValue.current < mx
      const add = isIncreasing
        ? step
        : -step
      prevValue.current = mx
      setValue(value => {
        const newValue = Math.min(Math.max(value + add, min), max)
        handleChange?.(newValue)
        return newValue
      })
    }
  }, [isDragging, step, min, max, handleChange])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])
  const progress = 1 - ((value - min) / (max - min))
  const progressRadius = 12
  const progressCircle: SVGAttributes<SVGCircleElement> = {
    strokeDashoffset: progress * (2 * Math.PI * progressRadius),
    strokeDasharray: (2 * Math.PI * progressRadius) / 4
  }
  return (

    <div
      className={classNames(
        'relative cursor-ew-resize select-none',
        isDragging && 'opacity-80',
        !isDragging && 'hover:opacity-90'
      )}
      onMouseDown={handleDrag}
    >
      <div className='relative w-20 h-20 flex flex-col items-center justify-center'>
        <div className='absolute w-full h-full rounded-full bg-black/50 translate-x-1 translate-y-1 blur-[0.25rem]' />
        <div className='absolute w-full h-full rounded-full bg-ep133-orange/10 -translate-x-1 -translate-y-1 blur-[0.25rem]' />
        <div className='absolute w-full h-full rounded-full z-10 mix-blend-plus-lighter shadow-[inset_1px_1px_0px_rgba(255,255,255,0.3),inset_3px_3px_3px_rgba(255,255,255,0.2),inset_-1px_-1px_0px_rgba(255,255,255,0.2)] bg-gradient-to-br from-white/10' />
        <div className='absolute rounded-full w-full h-full bg-ep133-orange flex flex-col items-center justify-center'>
          <div className='absolute translate-x-3 translate-y-3 rounded-[100%] rotate-45 w-16 h-10 bg-black/25 blur-sm' />
          <div className='relative w-10 h-10'>
            <div className='absolute h-full w-full rounded-full mix-blend-plus-lighter z-10 shadow-[inset_1px_1px_0px_rgba(255,255,255,0.5),inset_3px_3px_3px_rgba(255,255,255,0.2),inset_-3px_-3px_3px_rgba(0,0,0,0.1),inset_-1px_-1px_0px_rgba(255,255,255,0.1)] bg-gradient-to-br from-white/10' />
            <div className='rounded-full w-full h-full bg-ep133-orange outline outline-1 outline-black/5 p-2'>
              <svg
                viewBox='0 0 26 26' className={classNames(
                  'transition-all duration-500 ease-out w-full h-full opacity-0',
                  isDragging && 'opacity-100'
                )}
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle r='12' cx='13' cy='13' className='stroke-white/25 fill-transparent stroke-2' {...progressCircle} />
              </svg>
              {progress}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
