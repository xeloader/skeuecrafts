import classNames from 'classnames'
import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'

export interface SliderProps {
  onChange?: (value: number) => void
  value?: number
}

export default function Slider ({
  onChange,
  value: userValue
}: SliderProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState<number>(50)
  const [focused, setFocused] = useState<boolean>(false)
  const handleProgressChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    if (userValue == null) {
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
    <div className='relative flex flex-col items-center justify-center h-full group/slider'>
      <datalist id='values' className='opacity-0'>
        <option value='50' label='middle' />
      </datalist>
      <input
        ref={inputRef}
        orient='vertical'
        type='range'
        value={value}
        list='values'
        className={classNames(
          'w-12 opacity-0 z-20 h-[125%]',
          'cursor-grab active:cursor-grabbing'
        )}
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
          <div className='relative flex items-center justify-center'>
            <div className={classNames(
              'absolute bg-[black]/55 z-100 h-[135%] w-3/4 rounded-full -rotate-60 origin-center blur-[0.5rem] translate-x-3 translate-y-5',
              'transition-all',
              'group-hover/slider:h-[130%] group-hover/slider:bg-[black]/45'
            )}
            />
            <div
              className={classNames(
                'size-12 z-10 relative bg-[#747272] rounded-full shadow-[inset_1px_1px_0px_rgba(255,255,255,0.65),-1px_-1px_1px_rgba(0,0,0,0.1),inset_-1px_-1px_1px_rgba(255,255,255,0.50),inset_-2px_-2px_3px_rgba(0,0,0,0.75),inset_2px_2px_3px_rgba(255,255,255,0.25),2px_2px_2px_rgba(0,0,0,0.15),1px_1px_1px_rgba(0,0,0,0.25)]',
                focused && 'outline outline-[black] ring'
              )}
            >
              <div className='size-full -translate-x-[1px] -translate-y-[1px] rounded-full shadow-[inset_-1px_-1px_0px_rgba(0,0,0,0.25)]' />
            </div>
          </div>
        </div>
      </div>
      <div className='absolute z-0 h-full flex flex-col items-center justify-center'>
        <div className='w-[5rem] h-[1px] bg-plastic-black' />
        <div className='absolute rounded-full bg-plastic-black shadow-[1px_1px_1px_0.5px_rgba(255,255,255,0.75),inset_0px_30px_30px_rgba(0,0,0,1)] w-4 h-full' />
      </div>
    </div>
  )
}
