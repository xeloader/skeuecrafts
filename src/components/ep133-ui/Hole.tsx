import React from 'react'

interface HoleProps {
  children: JSX.Element | JSX.Element[]
}

export default function Hole ({
  children
}: HoleProps): JSX.Element {
  return (
    <div className='group/hole'>
      <div className='group-hover/hole:opacity-90 opacity-100 transition-all group-active/hole:opacity-0'>
        <div className='absolute left-0 bottom-0 w-3 h-[1px] shadow-[0px_1px_1px_rgba(255,255,255,var(--light-intensity))]' />
        <div className='absolute right-0 bottom-0 w-1 h-[1px] shadow-[0px_1px_1px_rgba(255,255,255,var(--light-intensity))]' />
        <div className='absolute right-0 top-0 w-[1px] h-6 shadow-[1px_0px_1px_rgba(255,255,255,var(--light-intensity))]' />
      </div>
      <div className='w-full h-full absolute shadow-[1px_1px_1px_rgba(255,255,255,calc(0.8*var(--light-intensity)))] transition-all opacity-0 group-active/hole:opacity-100' />
      <div className='flex flex-col items-center justify-center rounded-[1px] bg-[#050404]'>
        {children}
      </div>
    </div>
  )
}
