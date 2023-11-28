import React, { StyleHTMLAttributes } from 'react'

import ButtonTextureDark from '@/images/ep133/texture-noise-dark.png'

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
  color: Colors
}

type ButtonStyles = {
  [key in Colors]?: {
    base: React.CSSProperties,
    texture: React.CSSProperties
  }
}

const buttonStyles: ButtonStyles = {
  [Colors.Dark]: {
    base: {
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.22) -2.94%, rgba(255, 255, 255, 0.22) 37.53%, rgba(255, 255, 255, 0) 50.8%, rgba(255, 255, 255, 0) 105%), #171717',
      boxShadow: 'inset 2px 2px 2px rgba(255, 255, 255, 0.2)',
      borderRadius: '0.5rem',
      padding: '0.15rem'
    },
    texture: {
      backgroundImage: `url(${ButtonTextureDark})`,
      backgroundSize: '75%',
      opacity: 0.1
    }
  }
}

type HoleStyles = { [key in Environment]?: React.CSSProperties }

const holeStyles: HoleStyles = {
  [Environment.Dark]: {
    boxShadow: '1px 1px 1px rgba(255,255,255,0.2)'
  }
}

interface HoleProps {
  children?: JSX.Element,
  environment?: Environment
}

export function Hole ({
  children,
  environment = Environment.Dark
}: HoleProps) {
  return (
    <div className='relative'>
      <div 
        style={holeStyles?.[environment]}
        className='flex flex-col items-center justify-center p-[2px] bg-[#050404]'>
        {children}
      </div>
    </div>
  )
}

export function SquareButton ({
  color
}: SquareButtonProps) {
  return (
    <Hole>
      <div className='relative'>
        <button className='z-10 relative w-24 h-24 flex flex-col items-center bg-[#171717] justify-center bg-gradient-to-br from-white/50 to-60% to-black/50 rounded-2 p-[0.1rem] shadow-[inset_2px_2px_2px_rgba(255,255,255,0.1)]'>
          <div className='absolute -bottom-3 -right-2 w-24 h-24 bg-black blur-[0.5rem] z-0 rounded-2 opacity-80'></div>
          <div className='relative h-full w-full overflow-hidden rounded-[calc(0.5rem-1px)]'>
            <div 
              className='absolute z-10 h-full w-full'
              style={buttonStyles?.[color]?.texture}>
            </div>
            <div 
              className='w-full h-full bg-[#1E1E1E]'>
            </div>
          </div>
        </button>
      </div>
    </Hole>
  )
}