import React from 'react'

import DarkNoiseTexture from '@/images/ep133/texture-noise-dark.png'

export enum Colors {
  LightGray = 'light-gray',
  Gray = 'gray',
  Dark = 'dark',
  Orange = 'orange'
}

export interface CapProps {
  value: string | JSX.Element
  symbol: string | JSX.Element
}

export const CapCenter = ({
  value
}: Pick<CapProps, 'value'>): JSX.Element => {
  return (
    <div className='flex flex-row items-center justify-center h-full'>
      <p className='text-3xl text-plastic-white'>{value}</p>
    </div>
  )
}

export const CapText = ({
  value
}: Pick<CapProps, 'value'>): JSX.Element => {
  return (
    <div className='flex flex-row text-center items-start justify-center'>
      <p className='text-xl text-plastic-white'>{value}</p>
    </div>
  )
}

export const CapDual = ({
  value,
  symbol
}: Partial<CapProps>): JSX.Element => {
  return (
    <div className='grid grid-cols-3 h-full w-full'>
      <div className='flex flex-col justify-between leading-none text-plastic-white'>
        <p className='text-[1.8rem] self-center text-shadow-2xs'>{value}</p>
        <p className='self-start'>{symbol}</p>
      </div>
    </div>
  )
}

export interface SquareButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: Colors
  value: string
  symbol?: string
  lightIntensity?: number
  Value: JSX.Element
  Symbol: JSX.Element
}

export function SquareButton ({
  value,
  symbol,
  lightIntensity = 0.9,
  onClick,
  Value,
  Symbol
}: SquareButtonProps): JSX.Element {
  const style = { '--light-intensity': lightIntensity } as React.CSSProperties // eslint-disable-line
  const _value = Value != null ? Value : value
  const _symbol = Symbol != null ? Symbol : symbol
  return (
    <div
      style={style}
      className='relative group/button ease-out font-ep133 [&_*]:duration-100 [&_*]:transition-all'
    >
      <div className='group-hover/button:opacity-90 opacity-100 transition-all group-active/button:opacity-0'>
        <div className='absolute left-0 bottom-0 w-3 h-[1px] shadow-[0px_1px_1px_rgba(255,255,255,var(--light-intensity))]' />
        <div className='absolute right-0 bottom-0 w-1 h-[1px] shadow-[0px_1px_1px_rgba(255,255,255,var(--light-intensity))]' />
        <div className='absolute right-0 top-0 w-[1px] h-6 shadow-[1px_0px_1px_rgba(255,255,255,var(--light-intensity))]' />
      </div>
      <div className='w-full h-full absolute shadow-[1px_1px_1px_rgba(255,255,255,0.8)] transition-all opacity-0 group-active/button:opacity-100' />
      <div className='flex flex-col items-center justify-center p-[2px] rounded-[1px] bg-[#050404]'>
        <div className='relative'>
          <button
            onClick={onClick}
            className='z-10 relative w-24 h-24 flex flex-col items-center bg-[#171717] justify-center bg-gradient-to-br from-white/50 to-60% to-black/50 rounded-2 p-[0.1rem] shadow-[inset_2px_2px_2px_rgba(255,255,255,0.1)] group-active/button:from-white/10 transition-all'
          >
            <div className='absolute mt-[0.5px] ml-[0.5px] w-8 h-8 rounded-tl-2 left-0 top-0 from-white/75 to-25% bg-gradient-to-br group-active/button:opacity-0' />
            <div className='absolute w-24 h-24 bg-black z-0 rounded-2 opacity-80 transition-all group-hover/button:-bottom-2.5 group-hover/button:-right-1.5 group-hover/button:blur-[0.4rem] -bottom-3 -right-2 blur-[0.5rem] group-active/button:opacity-0 group-active/button:blur-[0.1rem]' />
            <div className='relative h-full w-full overflow-hidden rounded-[calc(0.5rem-1px)]'>
              <div className='absolute z-20 h-full w-full group-hover/button:-translate-y-[0.5px] group-hover/button:-translate-x-[0.5px] group-active/button:-translate-y-[1.5px] group-active/button:-translate-x-[1.5px]'>
                <div className='px-[0.8rem] py-[0.7rem] w-full h-full'>
                  {/* <CapText value={_value} /> */}
                  {/* <CapCenter value={_value} /> */}
                  <CapDual symbol={_symbol} value={_value} />
                </div>
              </div>
              <img src={DarkNoiseTexture} className='absolute z-10 h-full w-full opacity-5' />
              <div className='w-full h-full bg-[#1E1E1E]' />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
