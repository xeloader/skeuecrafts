import React from 'react'

export default function USBCable (): JSX.Element {
  return (
    <div className='flex flex-col items-center w-12'>
      <div className='bg-gradient-to-r w-3/4 h-6 border-1 border-gray border-r border-l border-t from-white from-10% via-[#7D7E7F] via-20% to-white to-90% ' />
      <div className='bg-black/10 h-16 w-full' />
      <div className='bg-[gray] h-32 w-1/6' />
    </div>
  )
}
