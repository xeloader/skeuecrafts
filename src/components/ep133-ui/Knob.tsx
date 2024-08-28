import { Colors } from '../../types'
import classNames from 'classnames'
import React, { FC, KeyboardEvent, SVGAttributes, useCallback, useEffect, useMemo, useRef, useState } from 'react'

export interface KnobProps {
  step?: number
  max?: number
  min?: number
  color: Colors
  value?: number
  onChange?: (value: number) => void
}

interface BaseKnobProps {
  reflectClassName: string
  baseClassName: string
  baseShadowClassName?: string
  knobClassName: string
  knobShadowClassName?: string
  knobReflectClassName?: string
  reflected?: boolean
  children?: JSX.Element | JSX.Element[]
}

export function BaseKnob ({
  reflectClassName,
  reflected = false,
  baseClassName,
  baseShadowClassName,
  knobReflectClassName,
  knobClassName,
  knobShadowClassName,
  children
}: BaseKnobProps): JSX.Element {
  return (
    <div className='relative w-24 h-24 flex flex-col items-center justify-center'>
      <div className='absolute w-full h-full rounded-full bg-black/50 translate-x-1 translate-y-1 blur-[0.25rem]' />
      {reflected && (
        <div className={classNames(
          'absolute w-full h-full rounded-full opacity-15 -translate-x-1 -translate-y-1 blur-[0.2rem] mix-blend-plus-lighter',
          reflectClassName
        )}
        />
      )}
      <div className={classNames(
        'absolute w-full h-full rounded-full z-10 bg-gradient-to-br',
        baseShadowClassName
      )}
      />
      <div className={classNames(
        'absolute rounded-full w-full h-full flex flex-col items-center justify-center',
        baseClassName
      )}
      >
        <div className={classNames(
          'absolute translate-x-3 translate-y-3 rounded-[100%] rotate-45 w-16 h-10 bg-black/25 blur-sm',
          knobShadowClassName
        )}
        />
        <div className={classNames(
          'absolute translate-x-3 translate-y-3 rounded-[100%] rotate-45 w-8 h-8 bg-black/25 blur-sm',
          knobShadowClassName
        )}
        />
        <div className='relative w-12 h-12'>
          <div className={classNames(
            'absolute h-full w-full rounded-full z-10',
            knobReflectClassName
          )}
          />
          <div className={classNames(
            'rounded-full w-full h-full outline outline-1 outline-black/5 p-2',
            knobClassName
          )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

function OrangeKnob (props: KnobProps): JSX.Element {
  return (
    <BaseKnob
      reflectClassName='bg-ep133-orange'
      baseClassName='bg-ep133-orange'
      knobClassName='bg-ep133-orange'
      baseShadowClassName='mix-blend-plus-lighter shadow-[inset_1px_1px_0px_rgba(255,255,255,0.3),inset_3px_3px_3px_rgba(255,255,255,0.2),inset_-1px_-1px_0px_rgba(255,255,255,0.2)] from-white/10'
      knobReflectClassName='shadow-[inset_1px_1px_0px_rgba(255,255,255,0.5),inset_3px_3px_3px_rgba(255,255,255,0.2),inset_-2px_-2px_0px_rgba(0,0,0,0.1),inset_-1px_-1px_0px_rgba(255,255,255,0.1)] bg-gradient-to-br from-white/10'
      reflected
      {...props}
    />
  )
}

function DarkKnob (props: KnobProps): JSX.Element {
  return (
    <BaseKnob
      reflectClassName='bg-ep133-dark'
      baseClassName='bg-ep133-dark outline outline-1 outline-black/50'
      knobClassName='bg-ep133-dark'
      baseShadowClassName='shadow-[inset_1px_1px_0px_rgba(255,255,255,0.3),inset_-1px_-1px_0px_rgba(255,255,255,0.2)] from-white/5'
      knobReflectClassName='shadow-[inset_1px_1px_0px_rgba(255,255,255,0.3),inset_-2px_-2px_0px_rgba(0,0,0,0.25),inset_-1px_-1px_0px_rgba(255,255,255,0.1)]'
      {...props}
    />
  )
}

function LightKnob (props: KnobProps): JSX.Element {
  return (
    <BaseKnob
      reflectClassName='bg-ep133-gray-light'
      baseClassName='bg-ep133-gray-light'
      knobClassName='bg-ep133-gray-light'
      baseShadowClassName='shadow-[inset_2px_2px_0px_rgba(255,255,255,0.2),inset_3px_3px_3px_rgba(255,255,255,0.05),inset_-1px_-1px_0px_rgba(255,255,255,0.2)] from-white/5'
      knobReflectClassName='shadow-[inset_1px_1px_0px_rgba(255,255,255,0.25),inset_3px_3px_3px_rgba(255,255,255,0.05),inset_-2px_-2px_0px_rgba(0,0,0,0.1),inset_-1px_-1px_0px_rgba(255,255,255,0.1)] bg-gradient-to-br from-white/5'
      {...props}
    />
  )
}

function wrapperForColor (color: Colors): FC<KnobProps> {
  if (color === Colors.Dark) {
    return DarkKnob
  } else if (color === Colors.LightGray) {
    return LightKnob
  }
  return OrangeKnob
}

export default function Knob ({
  step = 1,
  max = 100,
  min = -100,
  color,
  value: userValue,
  onChange: handleChange
}: KnobProps): JSX.Element {
  const timeout = useRef<any>()

  const prevValue = useRef<number>(0)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [value, setValue] = useState<number>(0)

  useEffect(() => {
    if (userValue != null) {
      setValue(userValue)
    }
  }, [userValue])

  const Wrapper = useMemo(() => {
    return wrapperForColor(color)
  }, [color])

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

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    const keyedStep = e.shiftKey
      ? step * 10
      : step
    if (e.key === 'ArrowLeft') {
      setValue(val => val - keyedStep)
    } else if (e.key === 'ArrowRight') {
      setValue(val => val + keyedStep)
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { // not activating on tab
      if (timeout.current != null) {
        clearTimeout(timeout.current)
      }
      setIsDragging(true)
      timeout.current = setTimeout(() => setIsDragging(false), 1000)
    }
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
      role='spinbutton'
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuenow={value}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={classNames(
        'relative cursor-ew-resize select-none',
        isDragging && 'opacity-80',
        !isDragging && 'hover:opacity-90'
      )}
      onMouseDown={handleDrag}
    >
      <Wrapper>
        <svg
          viewBox='0 0 26 26' className={classNames(
            'transition-all duration-500 ease-out w-full h-full opacity-0',
            isDragging && 'opacity-100'
          )}
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle r='12' cx='13' cy='13' className='stroke-white/25 fill-transparent stroke-2' {...progressCircle} />
        </svg>
      </Wrapper>
    </div>
  )
}
