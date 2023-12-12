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

      {/* First Row */}
      <Symbol.Battery className='col-start-1 row-start-1 row-span-1 col-span-1' />
      <Symbol.HighestFade className='col-start-2 row-start-1 row-span-1 col-span-1' />
      <Symbol.AButton className='col-start-3 row-start-1 row-span-1 col-span-1' />
      <Symbol.SyncLabel className='col-start-4 row-start-1 row-span-1 col-span-1' />
      <Symbol.MIDIConnector className='col-start-5 row-start-1 row-span-1 col-span-1' />
      <Symbol.USBCable className='col-start-6 row-start-1 row-span-1 col-span-1' />
      <Symbol.BarLabel className='col-start-7 row-start-1 row-span-1 col-span-1' />
      <SegmentDisplay
        value={value}
        dotValue={dotValue}
        className='col-start-8 col-span-4 row-start-1 row-span-2 pr-1 -ml-1'
      />
      <Symbol.BPMLabel className='col-start-[12] row-start-1 col-span-1 row-span-1' />
      <Symbol.AudioGram className='col-start-[13] row-start-1 col-span-1 row-span-1' />
      <Symbol.Timer className='col-start-[14] row-start-1 col-span-1 row-span-1' />
      <Symbol.StereoLabel className='col-start-[15] row-start-1 col-span-1 row-span-1' />
      <Symbol.CirclePartTL className='col-start-[16] row-start-1 col-span-1 row-span-1' />
      <Symbol.CirclePartTR className='col-start-[17] row-start-1 col-span-1 row-span-1' />
      <Symbol.HighLevel className='col-start-[18] row-start-1 col-span-1 row-span-1' />
      <Symbol.GridCirclePartTL className='col-start-[19] row-start-1 col-span-1 row-span-1' />
      <Symbol.GridCirclePartTR className='col-start-[20] row-start-1 col-span-1 row-span-1' />

      {/* Second Row */}
      <Symbol.MuteLabel className='col-start-1 col-span-1 row-start-2 row-span-1' />
      <Symbol.HighFade className='col-start-2 col-span-1 row-start-2 row-span-1' />
      <Symbol.BButton className='col-start-3 col-span-1 row-start-2 row-span-1' />
      <Symbol.CopyLabel className='col-start-4 col-span-1 row-start-2 row-span-1' />
      <Symbol.PasteLabel className='col-start-5 col-span-1 row-start-2 row-span-1' />
      <Symbol.Diskette className='col-start-6 col-span-1 row-start-2 row-span-1' />
      <Symbol.TicLabel className='col-start-7 col-span-1 row-start-2 row-span-1' />
      <Symbol.Metronome className='col-start-[12] col-span-1 row-start-2 row-span-1' />
      <Symbol.ScissorCut className='col-start-[13] col-span-1 row-start-2 row-span-1' />
      <Symbol.Umbrella className='col-start-[14] col-span-1 row-start-2 row-span-1' />
      <Symbol.RecordPlayer className='col-start-[15] col-span-1 row-start-2 row-span-1' />
      <Symbol.CirclePartBL className='col-start-[16] col-span-1 row-start-2 row-span-1' />
      <Symbol.CirclePartBR className='col-start-[17] col-span-1 row-start-2 row-span-1' />
      <Symbol.HighMidLevel className='col-start-[18] col-span-1 row-start-2 row-span-1' />
      <Symbol.GridCirclePartBL className='col-start-[19] col-span-1 row-start-2 row-span-1' />
      <Symbol.GridCirclePartBR className='col-start-[20] col-span-1 row-start-2 row-span-1' />

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
