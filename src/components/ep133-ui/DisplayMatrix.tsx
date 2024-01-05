import React, { CSSProperties } from 'react'
import SegmentDisplay from './SegmentDisplay'
import * as Symbol from './Symbols'
import classNames from 'classnames'

export interface DisplayMatrixProps {
  value?: string
  dotValue?: string
  lightMatrix?: DisplayIconState[]
  className?: string
}

interface DisplayIconProps {
  glow?: number
  minGlow?: number
  Symbol: JSX.Element
  className: string
  style: CSSProperties
}

const DisplayIcon = ({
  Symbol,
  className,
  style,
  minGlow = 0.1,
  glow = 1
}: DisplayIconProps): JSX.Element => {
  return (
    <div className={classNames(className, '')} style={style}>
      <div
        style={{
          opacity: minGlow + ((1 - minGlow) * glow)
        }}
      >
        {React.cloneElement<Symbol.SVGWrapperProps>(Symbol, {
          Inject: (
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
          ),
          className: '[&>*]:transition-all',
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

interface DisplayIconState {
  glow?: number
}

interface GridIcon {
  Symbol: JSX.Element
  col: number
  row: number
  width?: number
  height?: number
}

const ICON_GRID: GridIcon[] = [
  { Symbol: Symbol.Battery, col: 1, row: 1 },
  { Symbol: Symbol.HighestFade, col: 2, row: 1 },
  { Symbol: Symbol.AButton, col: 3, row: 1 },
  { Symbol: Symbol.SyncLabel, col: 4, row: 1 },
  { Symbol: Symbol.MIDIConnector, col: 5, row: 1 },
  { Symbol: Symbol.USBCable, col: 6, row: 1 },
  { Symbol: Symbol.BarLabel, col: 7, row: 1 },
  { Symbol: Symbol.BPMLabel, col: 12, row: 1 },
  { Symbol: Symbol.AudioGram, col: 13, row: 1 },
  { Symbol: Symbol.Timer, col: 14, row: 1 },
  { Symbol: Symbol.StereoLabel, col: 15, row: 1 },
  { Symbol: Symbol.CirclePartTL, col: 16, row: 1 },
  { Symbol: Symbol.CirclePartTR, col: 17, row: 1 },
  { Symbol: Symbol.HighLevel, col: 18, row: 1 },
  { Symbol: Symbol.GridCirclePartTL, col: 19, row: 1 },
  { Symbol: Symbol.GridCirclePartTR, col: 20, row: 1 },
  { Symbol: Symbol.MuteLabel, col: 1, row: 2 },
  { Symbol: Symbol.HighFade, col: 2, row: 2 },
  { Symbol: Symbol.BButton, col: 3, row: 2 },
  { Symbol: Symbol.CopyLabel, col: 4, row: 2 },
  { Symbol: Symbol.PasteLabel, col: 5, row: 2 },
  { Symbol: Symbol.Diskette, col: 6, row: 2 },
  { Symbol: Symbol.TicLabel, col: 7, row: 2 },
  { Symbol: Symbol.Metronome, col: 12, row: 2 },
  { Symbol: Symbol.ScissorCut, col: 13, row: 2 },
  { Symbol: Symbol.Umbrella, col: 14, row: 2 },
  { Symbol: Symbol.RecordPlayer, col: 15, row: 2 },
  { Symbol: Symbol.CirclePartBL, col: 16, row: 2 },
  { Symbol: Symbol.CirclePartBR, col: 17, row: 2 },
  { Symbol: Symbol.HighMidLevel, col: 18, row: 2 },
  { Symbol: Symbol.GridCirclePartBL, col: 19, row: 2 },
  { Symbol: Symbol.GridCirclePartBR, col: 20, row: 2 },
  { Symbol: Symbol.Keyboard, col: 1, row: 3 },
  { Symbol: Symbol.LowFade, col: 2, row: 3 },
  { Symbol: Symbol.CButton, col: 3, row: 3 },
  { Symbol: Symbol.SampleNote, col: 4, row: 3 },
  { Symbol: Symbol.SampleTrim, col: 5, row: 3 },
  { Symbol: Symbol.SampleEnvelope, col: 6, row: 3 },
  { Symbol: Symbol.Rabbit, col: 7, row: 3 },
  { Symbol: Symbol.RecordSymbol, col: 8, row: 3 },
  { Symbol: Symbol.PlaySymbol, col: 9, row: 3 },
  { Symbol: Symbol.RepeatSymbol, col: 10, row: 3 },
  { Symbol: Symbol.PointingFinger, col: 11, row: 3 },
  { Symbol: Symbol.FXLeft, col: 12, row: 3 },
  { Symbol: Symbol.FXLabel, col: 13, row: 3 },
  { Symbol: Symbol.FXRight, col: 14, row: 3 },
  { Symbol: Symbol.VacuumTube, col: 15, row: 3 },
  { Symbol: Symbol.Microphone, col: 16, row: 3 },
  { Symbol: Symbol.LineIn, col: 17, row: 3 },
  { Symbol: Symbol.LowMidLevel, col: 18, row: 3 },
  { Symbol: Symbol.QLabel, col: 19, row: 3 },
  { Symbol: Symbol.FreeSwing, col: 20, row: 3 },
  { Symbol: Symbol.Slider, col: 1, row: 4 },
  { Symbol: Symbol.LowestFade, col: 2, row: 4 },
  { Symbol: Symbol.DButton, col: 3, row: 4 },
  { Symbol: Symbol.SoundSign, col: 4, row: 4, width: 2 },
  { Symbol: Symbol.BrainPerson, col: 6, row: 4 },
  { Symbol: Symbol.MainSign, col: 7, row: 4, width: 2 },
  { Symbol: Symbol.SpinWheel, col: 9, row: 4 },
  { Symbol: Symbol.TempoSign, col: 10, row: 4, width: 2 },
  { Symbol: Symbol.EraseSign, col: 12, row: 4, width: 2 },
  { Symbol: Symbol.SystemSign, col: 14, row: 4, width: 2 },
  { Symbol: Symbol.Laptop, col: 16, row: 4 },
  { Symbol: Symbol.ClipWarning, col: 17, row: 4 },
  { Symbol: Symbol.LowLevel, col: 18, row: 4 },
  { Symbol: Symbol.Boxer, col: 19, row: 4, width: 2 }
]

export default function DisplayMatrix ({
  value = '',
  dotValue,
  className,
  lightMatrix = []
}: DisplayMatrixProps): JSX.Element {
  return (
    <div className={classNames('grid grid-cols-subgrid grid-rows-4 gap-1', className)}>

      {ICON_GRID.map((icon, i) => {
        return (
          <DisplayIcon
            key={i}
            Symbol={icon.Symbol}
            {...lightMatrix[i] ?? { glow: 0 }}
            style={{
              gridColumnStart: icon.col,
              gridColumnEnd: `span ${icon.width ?? 1}`,
              gridRowStart: icon.row,
              gridRowEnd: `span ${icon.height ?? 1}`
            }}
          />
        )
      })}

      <SegmentDisplay
        value={value}
        dotValue={dotValue}
        className='col-start-8 col-span-4 row-start-1 row-span-2'
      />

    </div>
  )
}
