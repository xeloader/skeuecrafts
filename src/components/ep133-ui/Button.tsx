import React, { StyleHTMLAttributes, useState } from 'react'

const DarkNoiseTexture = require('@/images/ep133/texture-noise-dark.png')

export enum Colors {
  LightGray = 'light-gray',
  Gray = 'gray',
  Dark = 'dark',
  Orange = 'orange'
}

export enum Environment {
  Light = 'light',
  Dark = 'dark'
}

export interface SquareButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: Colors,
  symbol?: string
}

type ButtonStyles = {
  [key in Colors]?: {
    base: React.CSSProperties,
    texture: React.CSSProperties
  }
}

interface SquareButtonState {
  active: boolean,
  hover: boolean
}

export function SquareButton ({
  color,
  value,
  symbol
}: SquareButtonProps) {
  const style = { "--light-intensity": 0.9 } as React.CSSProperties;
  return (
    <div className='relative group/button ease-linear font-ep133' style={style}>
      <div className='group-hover/button:opacity-90 opacity-100 transition-all'>
        <div className='absolute left-0 bottom-0 w-3 h-[1px] shadow-[0px_1px_1px_rgba(255,255,255,var(--light-intensity))]'/>
        <div className='absolute right-0 bottom-0 w-1 h-[1px] shadow-[0px_1px_1px_rgba(255,255,255,var(--light-intensity))]' />
        <div className='absolute right-0 top-0 w-[1px] h-6 shadow-[1px_0px_1px_rgba(255,255,255,var(--light-intensity))]' />
      </div>
      <div className='w-full h-full absolute shadow-[1px_1px_1px_rgba(255,255,255,0.8)] transition-all opacity-0' />
      <div className='flex flex-col items-center justify-center p-[2px] rounded-[1px] bg-[#050404]'>
        <div className='relative'>
          <button className='z-10 relative w-24 h-24 flex flex-col items-center bg-[#171717] justify-center bg-gradient-to-br from-white/50 to-60% to-black/50 rounded-2 p-[0.1rem] shadow-[inset_2px_2px_2px_rgba(255,255,255,0.1)]'>
            <div className="absolute mt-[0.5px] ml-[0.5px] w-8 h-8 rounded-tl-2 left-0 top-0 from-white/75 to-25% bg-gradient-to-br" />
            <div className='absolute w-24 h-24 bg-black z-0 rounded-2 opacity-80 transition-all group-hover/button:-bottom-2 group-hover/button:-right-1 group-hover/button:blur-[0.4rem] -bottom-3 -right-2 blur-[0.5rem]' />
            <div className='relative h-full w-full overflow-hidden rounded-[calc(0.5rem-1px)]'>
              <div className='absolute z-20 h-full w-full'>
                <div className='grid grid-cols-2 h-full w-full'>
                  <div className='flex flex-col justify-between px-[0.8rem] py-[0.7rem] leading-none text-plastic-white'>
                    <p className='text-[1.8rem] self-center text-shadow-2xs'>{value}</p>
                    <p className='self-start'>{symbol}</p>
                  </div>
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