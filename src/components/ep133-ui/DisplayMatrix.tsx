import React from 'react'
import SegmentDisplay from './SegmentDisplay'
import * as Symbol from './Symbols'
import classNames from 'classnames'

export interface DisplayMatrixProps {
  value?: string
  dotValue?: string
}

interface DisplayIconProps {
  glow?: number
  minGlow?: number
  Symbol: JSX.Element
  className: string
}

const DisplayIcon = ({
  Symbol,
  className,
  minGlow = 0.1,
  glow = 1
}: DisplayIconProps): JSX.Element => {
  return (
    <div className={classNames(className, '')}>
      <div
        style={{
          opacity: minGlow + ((1 - minGlow) * glow)
        }}
      >
        {React.cloneElement<Symbol.SVGWrapperProps>(Symbol, {
          Inject: (
            <>
              <g style={{ mixBlendMode: 'overlay' }}>
                <rect
                  y='5%'
                  x='5%'
                  width='90%'
                  height='90%'
                  fill="url('#lit-symbol')"
                  opacity='calc(var(--light-intensity) * 0.03)'
                />
              </g>
              <rect filter="url('#glow')" width='32' height='32' />
              <defs>
                <filter id='glow'>
                  <feGaussianBlur stdDeviation='2' result='coloredBlur' />
                  <feComponentTransfer in='coloredBlur' result='lessProminentBlur'>
                    <feFuncA type='linear' slope='0.65' />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode in='lessProminentBlur' />
                    <feMergeNode in='SourceGraphic' />
                  </feMerge>
                </filter>
                <radialGradient id='lit-symbol'>
                  <stop offset='35%' stop-color='white' />
                  <stop offset='100%' stop-color='transparent' />
                </radialGradient>
              </defs>
            </>
          ),
          style: {
            '--light-intensity': glow,
            transition: 'all',
            filter: glow > 0.1 ? 'url("#glow")' : ''
          }
        })}
      </div>
    </div>
  )
}

export default function DisplayMatrix ({
  value = '',
  dotValue
}: DisplayMatrixProps): JSX.Element {
  return (
    <div className='grid grid-cols-20 grid-rows-4 gap-2'>

      {/* First Row */}
      <DisplayIcon glow={0} Symbol={Symbol.Timer} className='col-start-1 row-start-1 row-span-1 col-span-1' />
      <DisplayIcon glow={0} Symbol={Symbol.HighestFade} className='col-start-2 row-start-1 row-span-1 col-span-1' />
      <DisplayIcon glow={0.5} Symbol={Symbol.AButton} className='col-start-3 row-start-1 row-span-1 col-span-1' />
      <DisplayIcon Symbol={Symbol.SyncLabel} className='col-start-4 row-start-1 row-span-1 col-span-1' />
      <DisplayIcon Symbol={Symbol.MIDIConnector} className='col-start-5 row-start-1 row-span-1 col-span-1' />
      <DisplayIcon Symbol={Symbol.USBCable} className='col-start-6 row-start-1 row-span-1 col-span-1' />
      <DisplayIcon Symbol={Symbol.BarLabel} className='col-start-7 row-start-1 row-span-1 col-span-1' />
      <SegmentDisplay
        value={value}
        dotValue={dotValue}
        className='col-start-8 col-span-4 row-start-1 row-span-2 pr-1 -ml-1'
      />
      <DisplayIcon Symbol={Symbol.BPMLabel} className='col-start-[12] row-start-1 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.AudioGram} className='col-start-[13] row-start-1 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.Timer} className='col-start-[14] row-start-1 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.StereoLabel} className='col-start-[15] row-start-1 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.CirclePartTL} className='col-start-[16] row-start-1 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.CirclePartTR} className='col-start-[17] row-start-1 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.HighLevel} className='col-start-[18] row-start-1 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.GridCirclePartTL} className='col-start-[19] row-start-1 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.GridCirclePartTR} className='col-start-[20] row-start-1 col-span-1 row-span-1' />

      {/* Second Row */}
      <DisplayIcon Symbol={Symbol.MuteLabel} className='col-start-1 col-span-1 row-start-2 row-span-1' />
      <DisplayIcon Symbol={Symbol.HighFade} className='col-start-2 col-span-1 row-start-2 row-span-1' />
      <DisplayIcon Symbol={Symbol.BButton} className='col-start-3 col-span-1 row-start-2 row-span-1' />
      <DisplayIcon Symbol={Symbol.CopyLabel} className='col-start-4 col-span-1 row-start-2 row-span-1' />
      <DisplayIcon Symbol={Symbol.PasteLabel} className='col-start-5 col-span-1 row-start-2 row-span-1' />
      <DisplayIcon Symbol={Symbol.Diskette} className='col-start-6 col-span-1 row-start-2 row-span-1' />
      <DisplayIcon Symbol={Symbol.TicLabel} className='col-start-7 col-span-1 row-start-2 row-span-1' />
      <DisplayIcon Symbol={Symbol.Metronome} className='col-start-[12] col-span-1 row-start-2 row-span-1' />
      <DisplayIcon Symbol={Symbol.ScissorCut} className='col-start-[13] col-span-1 row-start-2 row-span-1' />
      <DisplayIcon Symbol={Symbol.Umbrella} className='col-start-[14] col-span-1 row-start-2 row-span-1' />
      <DisplayIcon Symbol={Symbol.RecordPlayer} className='col-start-[15] col-span-1 row-start-2 row-span-1' />
      <DisplayIcon Symbol={Symbol.CirclePartBL} className='col-start-[16] col-span-1 row-start-2 row-span-1' />
      <DisplayIcon Symbol={Symbol.CirclePartBR} className='col-start-[17] col-span-1 row-start-2 row-span-1' />
      <DisplayIcon Symbol={Symbol.HighMidLevel} className='col-start-[18] col-span-1 row-start-2 row-span-1' />
      <DisplayIcon Symbol={Symbol.GridCirclePartBL} className='col-start-[19] col-span-1 row-start-2 row-span-1' />
      <DisplayIcon Symbol={Symbol.GridCirclePartBR} className='col-start-[20] col-span-1 row-start-2 row-span-1' />

      {/* Third Row */}
      <DisplayIcon Symbol={Symbol.Keyboard} className='col-start-1 row-start-3 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.LowFade} className='col-start-2 row-start-3 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.CButton} className='col-start-3 row-start-3 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.SampleNote} className='col-start-4 row-start-3 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.SampleTrim} className='col-start-5 row-start-3 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.SampleEnvelope} className='col-start-6 row-start-3 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.Rabbit} className='col-start-7 row-start-3 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.RecordSymbol} className='col-start-8 row-start-3 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.PlaySymbol} className='col-start-9 row-start-3 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.RepeatSymbol} className='col-start-10 row-start-3 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.PointingFinger} className='col-start-[11] row-start-3 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.FXLeft} className='col-start-[12] row-start-3 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.FXLabel} className='col-start-[13] row-start-3 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.FXRight} className='col-start-[14] row-start-3 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.VacuumTube} className='col-start-[15] row-start-3 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.Microphone} className='col-start-[16] row-start-3 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.LineIn} className='col-start-[17] row-start-3 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.LowMidLevel} className='col-start-[18] row-start-3 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.QLabel} className='col-start-[19] row-start-3 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.FreeSwing} className='col-start-[20] row-start-3 col-span-1 row-span-1' />

      {/* Fourth Row */}
      <DisplayIcon Symbol={Symbol.Slider} className='col-start-1 row-start-4 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.LowestFade} className='col-start-2 row-start-4 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.DButton} className='col-start-3 row-start-4 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.SoundSign} className='col-start-4 row-start-4 col-span-2 row-span-1' />
      <DisplayIcon Symbol={Symbol.BrainPerson} className='col-start-6 row-start-4 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.MainSign} className='col-start-7 row-start-4 col-span-2 row-span-1' />
      <DisplayIcon Symbol={Symbol.SpinWheel} className='col-start-9 row-start-4 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.TempoSign} className='col-start-[10] col-span-2 row-start-4 row-span-1' />
      <DisplayIcon Symbol={Symbol.EraseSign} className='col-start-[12] col-span-2 row-start-4 row-span-1' />
      <DisplayIcon Symbol={Symbol.SystemSign} className='col-start-[14] col-span-2 row-start-4 row-span-1' />
      <DisplayIcon Symbol={Symbol.Laptop} className='col-start-[16] row-start-4 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.ClipWarning} className='col-start-[17] row-start-4 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.LowLevel} className='col-start-[18] row-start-4 col-span-1 row-span-1' />
      <DisplayIcon Symbol={Symbol.Boxer} className='col-start-[19] col-span-2 row-start-4 row-span-1' />
    </div>
  )
}
