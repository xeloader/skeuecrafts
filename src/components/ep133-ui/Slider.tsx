import classNames from 'classnames'
import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'

export interface SliderFreshProps {
  onChange?: (value: number) => void
  value?: number
}

export function SliderFresh ({
  onChange,
  value: userValue
}: SliderFreshProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState<number>(50)
  const [focused, setFocused] = useState<boolean>(false)
  const handleProgressChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (userValue == null) {
      const value = Number(event.target.value)
      setValue(value)
    }
    onChange?.(value)
  }, [userValue])
  useEffect(() => {
    if (userValue != null) {
      setValue(userValue)
    }
  }, [userValue])
  return (
    <div className='relative flex flex-col items-center justify-center h-full'>
      <datalist id='values' className='opacity-0'>
        <option value='50' label='middle' />
      </datalist>
      <input
        ref={inputRef}
        orient='vertical'
        type='range'
        list='values'
        className='w-12 opacity-0 z-20'
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={handleProgressChange}
        style={{
          appearance: 'slider-vertical'
        } as unknown as CSSProperties}
      />
      <div className='absolute h-full z-10'>
        <div
          style={{ top: `${100 - value}%` }}
          className='absolute -translate-y-[50%] -translate-x-[50%]'
        >
          <div
            className={classNames(
              'w-11 h-11 bg-[#747272] rounded-full',
              focused && 'outline-[blue] outline-1 outline'
            )}
          />
        </div>
      </div>
      <div className='absolute z-0 h-full flex flex-col items-center justify-center'>
        <div className='w-[4.5rem] h-[1px] bg-plastic-black' />
        <div className='absolute rounded-full bg-plastic-black shadow-[1px_1px_1px_0.5px_rgba(255,255,255,0.75),inset_0px_30px_30px_rgba(0,0,0,1)] w-3 h-full' />
      </div>
    </div>
  )
}

export interface SliderProps {
  onChange?: (value: number) => void
  value?: number
  min?: number
  max?: number
}

export default function Slider ({
  onChange,
  value: userValue,
  min = 0,
  max = 100
}: SliderProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState<number>(50)
  const [focused, setFocused] = useState<boolean>(false)
  const handleProgressChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (userValue == null) {
      const value = Number(event.target.value)
      setValue(value)
    }
    onChange?.(value)
  }, [userValue])
  useEffect(() => {
    if (userValue != null) {
      setValue(userValue)
    }
  }, [userValue])
  return (
    <div className='relative flex flex-col items-center justify-center'>
      <datalist id='values' className='opacity-0'>
        <option value='50' label='middle' />
      </datalist>
      <input
        ref={inputRef}
        orient='vertical'
        type='range'
        list='values'
        className='w-12 opacity-0 z-20'
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={handleProgressChange}
        style={{
          appearance: 'slider-vertical'
        } as unknown as CSSProperties}
      />
      <div className='absolute h-full z-10'>
        <div
          style={{ top: `${100 - value}%` }}
          className='absolute -translate-y-[50%] -translate-x-[50%]'
        >
          <div
            className={classNames(
              'w-11 h-11 bg-[#747272] rounded-full',
              focused && 'outline-[blue] outline-1 outline'
            )}
          />
        </div>
      </div>
      <div className='absolute z-0 h-full flex flex-col items-center justify-center'>
        <div className='w-[4.5rem] h-[1px] bg-plastic-black' />
        <div className='absolute rounded-full bg-plastic-black shadow-[1px_1px_1px_0.5px_rgba(255,255,255,0.75),inset_0px_30px_30px_rgba(0,0,0,1)] w-3 h-full' />
      </div>
    </div>
  )
}
