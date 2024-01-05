import classNames from 'classnames'
import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import DisplayMatrix from './DisplayMatrix'
import Slider from './Slider'
import Knob from './Knob'
import Speaker from './Speaker'

export interface EP133Props {
}

export default function EP133 ({
}: EP133Props): JSX.Element {
  return (
    <div className='grid grid-rows-30 grid-cols-22 h-[100vh] w-[73vh] bg-ep133-gray'>
      <div className='grid grid-rows-subgrid row-span-1 col-span-full bg-ep133-gray-light' />
      <div className='grid grid-rows-subgrid row-span-6 row-start-2 col-[1/-8] bg-ep133-gray-light shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]' />
      <div className='col-[-8/-1] row-span-6 row-start-2'>
        <Speaker />
      </div>
      <div className='grid grid-cols-subgrid grid-rows-subgrid col-start-1 row-span-6 row-start-8 col-span-full'>
        <div className='grid grid-cols-subgrid grid-rows-subgrid bg-ep133-dark col-span-full row-span-full shadow-[inset_0px_0.5px_0px_rgba(255,255,255,0.1),0px_-0.5px_0.5px_rgba(0,0,0,0.15),0px_3px_3px_rgba(0,0,0,0.4)]'>
          <div className='col-start-1 row-span-full row-start-1'>
            <div className='bg-white/5 h-full w-1 shadow-[0.5px_0px_0px_rgba(255,255,255,0.1)]' />
          </div>
          <div className='-col-start-1 row-span-full flex justify-end'>
            <div className='bg-white/5 h-full w-1 shadow-[-0.5px_0px_0px_rgba(255,255,255,0.1)]' />
          </div>
          <div className='col-[2/-2] row-[2/-2]'>
            <DisplayMatrix className='h-full' />
          </div>
        </div>
      </div>
      <div className='row-start-[13] row-span-4 col-start-2 col-span-4'>
        <Knob />
      </div>
    </div>
  )
}
