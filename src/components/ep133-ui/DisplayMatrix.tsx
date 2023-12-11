import React from 'react'
import SegmentDisplay from './SegmentDisplay'
import * as Symbol from './Symbols'

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
      <Symbol.Battery className='col-start-1 col-span-1 row-start-1 row-span-1' />
      <SegmentDisplay value={value} dotValue={dotValue} className='h-16 col-start-8 col-span-4 row-start-1 row-span-2 pr-2 -ml-2' />
      {/* {Array.from(Array((20 * 4) - (4 * 2))).map((_, i) => <div key={i} className='bg-[red] w-6 h-6'>{i}</div>)} */}
      <Symbol.BPMLabel className='col-start-12 col-span-1' />
      <Symbol.RecordPlayer className='col-start-[15] col-span-1 row-start-2 row-span-1' />
      {/* Third Row */}
      <Symbol.Keyboard className='col-start-1 row-start-3 col-span-1 row-span-1' />
      <Symbol.LowFade className='col-start-2 row-start-3 col-span-1 row-span-1' />
      <Symbol.CButton className='col-start-3 row-start-3 col-span-1 row-span-1' />
      <Symbol.SampleNote className='col-start-4 row-start-3 col-span-1 row-span-1' />
      <Symbol.SampleTrim className='col-start-5 row-start-3 col-span-1 row-span-1' />
      <Symbol.SampleEnvelope className='col-start-6 row-start-3 col-span-1 row-span-1' />
      <Symbol.Rabbit className='col-start-7 row-start-3 col-span-1 row-span-1' />
      <Symbol.RecordSymbol className='col-start-8 row-start-3 col-span-1 row-span-1' />
      <Symbol.PlaySymbol className='col-start-9 row-start-3 col-span-1 row-span-1' />
      <Symbol.RepeatSymbol className='col-start-10 row-start-3 col-span-1 row-span-1' />
      <Symbol.PointingFinger className='col-start-[11] row-start-3 col-span-1 row-span-1' />
      <Symbol.FXLeft className='col-start-[12] row-start-3 col-span-1 row-span-1' />
      <Symbol.FXLabel className='col-start-[13] row-start-3 col-span-1 row-span-1' />
      <Symbol.FXRight className='col-start-[14] row-start-3 col-span-1 row-span-1' />
      <Symbol.VacuumTube className='col-start-[15] row-start-3 col-span-1 row-span-1' />
      <Symbol.Microphone className='col-start-[16] row-start-3 col-span-1 row-span-1' />
      <Symbol.LineIn className='col-start-[17] row-start-3 col-span-1 row-span-1' />
      <Symbol.LowMidLevel className='col-start-[18] row-start-3 col-span-1 row-span-1' />
      <Symbol.QLabel className='col-start-[19] row-start-3 col-span-1 row-span-1' />
      <Symbol.FreeSwing className='col-start-[20] row-start-3 col-span-1 row-span-1' />
      {/* Fourth Row */}
      <Symbol.Slider className='col-start-1 row-start-4 col-span-1 row-span-1' />
      <Symbol.LowestFade className='col-start-2 row-start-4 col-span-1 row-span-1' />
      <Symbol.DButton className='col-start-3 row-start-4 col-span-1 row-span-1' />
      <Symbol.SoundSign className='col-start-4 row-start-4 col-span-2 row-span-1' />
      <Symbol.BrainPerson className='col-start-6 row-start-4 col-span-1 row-span-1' />
      <Symbol.MainSign className='col-start-7 row-start-4 col-span-2 row-span-1' />
      <Symbol.SpinWheel className='col-start-9 row-start-4 col-span-1 row-span-1' />
      <Symbol.TempoSign className='col-start-[10] col-span-2 row-start-4 row-span-1' />
      <Symbol.EraseSign className='col-start-[12] col-span-2 row-start-4 row-span-1' />
      <Symbol.SystemSign className='col-start-[14] col-span-2 row-start-4 row-span-1' />
      <Symbol.Laptop className='col-start-[16] row-start-4 col-span-1 row-span-1' />
      <Symbol.ClipWarning className='col-start-[17] row-start-4 col-span-1 row-span-1' />
      <Symbol.LowLevel className='col-start-[18] row-start-4 col-span-1 row-span-1' />
      <Symbol.Boxer className='col-start-[19] col-span-2 row-start-4 row-span-1' />
    </div>
  )
}
