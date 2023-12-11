import React from 'react'
import SegmentDisplay from './SegmentDisplay'

export interface DisplayMatrixProps {
  value?: string
  dotValue?: string
}

export default function DisplayMatrix ({
  value = '',
  dotValue
}: DisplayMatrixProps): JSX.Element {
  return (
    <div
      className='grid grid-cols-20 grid-rows-4 gap-2'
    >
      <SegmentDisplay value={value} dotValue={dotValue} className='h-16 col-start-8 col-end-[12] row-start-1 row-end-3 pr-2 -ml-2' />
      {Array.from(Array((20 * 4) - (4 * 2))).map((_, i) => <div key={i} className='bg-[red] w-6 h-6'>{i}</div>)}
    </div>
  )
}
