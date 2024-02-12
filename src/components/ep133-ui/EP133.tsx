import React, { useCallback, useEffect } from 'react'
import { SliderFresh as Slider } from './Slider'
import Knob from './Knob'
import Speaker from './Speaker'
import { Size, SquareButtonFresh as SquareButton, Type } from './Button'
import Cap from './Cap'
import { Colors } from '../../types'
import { IndicatorFresh as Indicator } from './Indicator'
import { Asterisk, CirclingArrow, InArrow, MinusSymbol, OutArrow, PlusSymbol, RightArrow } from './Symbols'
import * as Symbol from './Symbols'
import Display from './Display'

interface ButtonState {
  active: boolean
}

export enum BrickId {
  Output,
  Input,
  Sync,
  Midi,
  USB,
  SpeakerGrid,
  BatteryCover
}

export enum ButtonId {
  Sound,
  Main,
  Tempo,
  Sample,
  Timing,
  Erase,
  FX,
  Plus,
  Minus,
  Play,
  Record,
  Enter,
  ABank,
  BBank,
  CBank,
  DBank,
  Shift,
  Keys,
  Fader,
  Dot,
  Digit0,
  Digit1,
  Digit2,
  Digit3,
  Digit4,
  Digit5,
  Digit6,
  Digit7,
  Digit8,
  Digit9
}

export enum IndicatorId {
  ABank,
  BBank,
  CBank,
  DBank,
  Level,
  LPF,
  ATK,
  Tune,
  Pitch,
  HPF,
  Rel,
  Vel,
  Time,
  FX,
  Pan,
  Mod,
  Record1,
  Record2
}

export enum Icon {
  Battery,
  HighestFade,
  AButton,
  BButton,
  CButton,
  DButton,
  Sync,
  MIDI,
  USB,
  Bar,
  BPM,
  AudioGram,
  Timer,
  Stereo,
  CircleTL,
  CircleTR,
  CircleBR,
  CircleBL,
  HighLevel,
  GridCircleTL,
  GridCircleTR,
  GridCircleBR,
  GridCircleBL,
  Mute,
  HighFade,
  Copy,
  Paste,
  Diskette,
  Tic,
  Metronome,
  Scissor,
  Umbrella,
  RecordPlayer,
  HighMidLevel,
  Keyboard,
  LowFade,
  Note,
  Trim,
  Envelope,
  Rabbit,
  Record,
  Play,
  Repeat,
  Finger,
  FXLeft,
  FXRight,
  FX,
  VacuumTube,
  Microphone,
  LineIn,
  LowMidLevel,
  Q,
  Swing,
  Slider,
  LowestFade,
  Sound,
  BrainPerson,
  Main,
  SpinWheel,
  Tempo,
  Erase,
  System,
  Laptop,
  Clip,
  LowLevel,
  Boxer
}

export interface IconSet { [key: number]: GridIcon }
export interface DisplayMatrixProps {
  value?: string
  dotValue?: string
  backgroundColor?: string
  iconSet: IconSet
  iconMeta?: IconStates
  className?: string
  translucentIcons: boolean
}

interface GridIcon {
  id: string
  Symbol: JSX.Element
  col: number
  row: number
  width?: number
  height?: number
}

export const EP133Icons: IconSet = {
  [Icon.Battery]: { Symbol: Symbol.Battery, id: 'battery', col: 1, row: 1 },
  [Icon.HighestFade]: { Symbol: Symbol.HighestFade, id: 'highest-fade', col: 2, row: 1 },
  [Icon.AButton]: { Symbol: Symbol.AButton, id: 'a-button', col: 3, row: 1 },
  [Icon.Sync]: { Symbol: Symbol.SyncLabel, id: 'sync-label', col: 4, row: 1 },
  [Icon.MIDI]: { Symbol: Symbol.MIDIConnector, id: 'midi-connector', col: 5, row: 1 },
  [Icon.USB]: { Symbol: Symbol.USBCable, id: 'usb-cable', col: 6, row: 1 },
  [Icon.Bar]: { Symbol: Symbol.BarLabel, id: 'bar-label', col: 7, row: 1 },
  [Icon.BPM]: { Symbol: Symbol.BPMLabel, id: 'bpm-label', col: 12, row: 1 },
  [Icon.AudioGram]: { Symbol: Symbol.AudioGram, id: 'audiogram', col: 13, row: 1 },
  [Icon.Timer]: { Symbol: Symbol.Timer, id: 'timer', col: 14, row: 1 },
  [Icon.Stereo]: { Symbol: Symbol.StereoLabel, id: 'stereo-label', col: 15, row: 1 },
  [Icon.CircleTL]: { Symbol: Symbol.CirclePartTL, id: 'circle-part-tl', col: 16, row: 1 },
  [Icon.CircleTR]: { Symbol: Symbol.CirclePartTR, id: 'circle-part-tr', col: 17, row: 1 },
  [Icon.HighLevel]: { Symbol: Symbol.HighLevel, id: 'high-level', col: 18, row: 1 },
  [Icon.GridCircleTL]: { Symbol: Symbol.GridCirclePartTL, id: 'grid-circle-part-tl', col: 19, row: 1 },
  [Icon.GridCircleTR]: { Symbol: Symbol.GridCirclePartTR, id: 'grid-circle-part-tr', col: 20, row: 1 },
  [Icon.Mute]: { Symbol: Symbol.MuteLabel, id: 'mute-label', col: 1, row: 2 },
  [Icon.HighFade]: { Symbol: Symbol.HighFade, id: 'high-fade', col: 2, row: 2 },
  [Icon.BButton]: { Symbol: Symbol.BButton, id: 'b-button', col: 3, row: 2 },
  [Icon.Copy]: { Symbol: Symbol.CopyLabel, id: 'copy-label', col: 4, row: 2 },
  [Icon.Paste]: { Symbol: Symbol.PasteLabel, id: 'paste-label', col: 5, row: 2 },
  [Icon.Diskette]: { Symbol: Symbol.Diskette, id: 'diskette', col: 6, row: 2 },
  [Icon.Tic]: { Symbol: Symbol.TicLabel, id: 'tic-label', col: 7, row: 2 },
  [Icon.Metronome]: { Symbol: Symbol.Metronome, id: 'metronome', col: 12, row: 2 },
  [Icon.Scissor]: { Symbol: Symbol.ScissorCut, id: 'scissor-cut', col: 13, row: 2 },
  [Icon.Umbrella]: { Symbol: Symbol.Umbrella, id: 'umbrella', col: 14, row: 2 },
  [Icon.RecordPlayer]: { Symbol: Symbol.RecordPlayer, id: 'record-player', col: 15, row: 2 },
  [Icon.CircleBL]: { Symbol: Symbol.CirclePartBL, id: 'circle-part-bl', col: 16, row: 2 },
  [Icon.CircleBR]: { Symbol: Symbol.CirclePartBR, id: 'circle-part-br', col: 17, row: 2 },
  [Icon.HighMidLevel]: { Symbol: Symbol.HighMidLevel, id: 'high-mid-level', col: 18, row: 2 },
  [Icon.GridCircleBL]: { Symbol: Symbol.GridCirclePartBL, id: 'grid-circle-part-bl', col: 19, row: 2 },
  [Icon.GridCircleBR]: { Symbol: Symbol.GridCirclePartBR, id: 'grid-circle-part-br', col: 20, row: 2 },
  [Icon.Keyboard]: { Symbol: Symbol.Keyboard, id: 'keyboard', col: 1, row: 3 },
  [Icon.LowFade]: { Symbol: Symbol.LowFade, id: 'low-fade', col: 2, row: 3 },
  [Icon.CButton]: { Symbol: Symbol.CButton, id: 'c-button', col: 3, row: 3 },
  [Icon.Note]: { Symbol: Symbol.SampleNote, id: 'sample-note', col: 4, row: 3 },
  [Icon.Trim]: { Symbol: Symbol.SampleTrim, id: 'sample-trim', col: 5, row: 3 },
  [Icon.Envelope]: { Symbol: Symbol.SampleEnvelope, id: 'sample-envelope', col: 6, row: 3 },
  [Icon.Rabbit]: { Symbol: Symbol.Rabbit, col: 7, id: 'rabbit', row: 3 },
  [Icon.Record]: { Symbol: Symbol.RecordSymbol, id: 'record-symbol', col: 8, row: 3 },
  [Icon.Play]: { Symbol: Symbol.PlaySymbol, id: 'play-symbol', col: 9, row: 3 },
  [Icon.Repeat]: { Symbol: Symbol.RepeatSymbol, id: 'repeat-symbol', col: 10, row: 3 },
  [Icon.Finger]: { Symbol: Symbol.PointingFinger, id: 'pointing-finger', col: 11, row: 3 },
  [Icon.FXLeft]: { Symbol: Symbol.FXLeft, col: 12, id: 'fx-left', row: 3 },
  [Icon.FX]: { Symbol: Symbol.FXLabel, col: 13, id: 'fx-label', row: 3 },
  [Icon.FXRight]: { Symbol: Symbol.FXRight, id: 'fx-right', col: 14, row: 3 },
  [Icon.VacuumTube]: { Symbol: Symbol.VacuumTube, id: 'vacuum-tube', col: 15, row: 3 },
  [Icon.Microphone]: { Symbol: Symbol.Microphone, id: 'microphone', col: 16, row: 3 },
  [Icon.LineIn]: { Symbol: Symbol.LineIn, col: 17, id: 'line-in', row: 3 },
  [Icon.LowMidLevel]: { Symbol: Symbol.LowMidLevel, id: 'low-mid-level', col: 18, row: 3 },
  [Icon.Q]: { Symbol: Symbol.QLabel, id: 'q-label', col: 19, row: 3 },
  [Icon.Swing]: { Symbol: Symbol.FreeSwing, id: 'free-swing', col: 20, row: 3 },
  [Icon.Slider]: { Symbol: Symbol.Slider, id: 'slider', col: 1, row: 4 },
  [Icon.LowestFade]: { Symbol: Symbol.LowestFade, id: 'lowest-fade', col: 2, row: 4 },
  [Icon.DButton]: { Symbol: Symbol.DButton, id: 'd-button', col: 3, row: 4 },
  [Icon.Sound]: { Symbol: Symbol.SoundSign, id: 'sound-sign', col: 4, row: 4, width: 2 },
  [Icon.BrainPerson]: { Symbol: Symbol.BrainPerson, id: 'brain-person', col: 6, row: 4 },
  [Icon.Main]: { Symbol: Symbol.MainSign, id: 'main-sign', col: 7, row: 4, width: 2 },
  [Icon.SpinWheel]: { Symbol: Symbol.SpinWheel, id: 'spin-wheel', col: 9, row: 4 },
  [Icon.Tempo]: { Symbol: Symbol.TempoSign, id: 'tempo-sign', col: 10, row: 4, width: 2 },
  [Icon.Erase]: { Symbol: Symbol.EraseSign, id: 'erase-sign', col: 12, row: 4, width: 2 },
  [Icon.System]: { Symbol: Symbol.SystemSign, id: 'system-sign', col: 14, row: 4, width: 2 },
  [Icon.Laptop]: { Symbol: Symbol.Laptop, id: 'laptop', col: 16, row: 4 },
  [Icon.Clip]: { Symbol: Symbol.ClipWarning, id: 'clip-warning', col: 17, row: 4 },
  [Icon.LowLevel]: { Symbol: Symbol.LowLevel, id: 'low-level', col: 18, row: 4 },
  [Icon.Boxer]: { Symbol: Symbol.Boxer, id: 'boxer', col: 19, row: 4, width: 2 }
}

export type ButtonStates = {
  [key in ButtonId]?: ButtonState
}

interface IndicatorState {
  state?: boolean
}

export type IndicatorStates = {
  [key in IndicatorId]?: IndicatorState
}

export interface EP133Props {
  title?: string
  subtitle?: string
  bottomTitle?: string
  poweredOn?: boolean
  onPowerClick?: (isPowered: boolean) => void
  onVolumeChange?: (volume: number) => void
  onXChange?: (value: number) => void
  onYChange?: (value: number) => void
  onSliderChange?: (value: number) => void
  buttons: ButtonStates
  indicators: IndicatorStates
  onButtonClick: (button: ButtonId) => void
  icons: { [key: number]: { glow?: number } }
  displayValue: string
  displayDotValue: string
  onBrickClick?: (brick: BrickId) => void
  onButtonHold: (button: ButtonId) => void
  displayAnimation: string
}

const CornerCircle = (): JSX.Element => (
  <div className='rounded-full size-2/3 bg-gradient-to-b from-[#E6E1DF] to-[#EEEBE9] shadow-[inset_1px_1px_0px_rgba(0,0,0,0.25),inset_-1px_-1px_0px_rgba(255,255,255,0.5)]' />
)

export default function EP133 ({
  poweredOn = true,
  onPowerClick,
  onVolumeChange,
  onXChange,
  onYChange,
  onSliderChange,
  buttons = {},
  indicators = {},
  icons = {},
  displayValue,
  displayDotValue,
  onButtonClick,
  onBrickClick,
  title,
  subtitle,
  bottomTitle,
  onButtonHold,
  displayAnimation
}: EP133Props): JSX.Element {
  const handleButtonClick = useCallback((button: ButtonId) => {
    return () => {
      onButtonClick?.(button)
    }
  }, [onButtonClick])
  const handleButtonHold = useCallback((button: ButtonId) => {
    return () => {
      onButtonHold?.(button)
    }
  }, [onButtonClick])
  const handleBrickClick = useCallback((brick: BrickId) => {
    return () => {
      onBrickClick?.(brick)
    }
  }, [onBrickClick])
  return (
    <div
      className='grid grid-rows-30 grid-cols-22 h-[1520px] w-[1100px] font-ep133 pt-4'
    >
      <div className='col-span-full row-span-full bg-[#B7B4B3]' />
      <div className='grid grid-cols-4 col-[-4/-2] row-start-1 -translate-y-full h-2/6'>
        <div
          onClick={() => onPowerClick?.(!poweredOn)}
          style={{ transform: poweredOn ? 'translateX(100%)' : 'translateX(0%)' }}
          className='transition-all col-start-2 col-span-2 w-1/2 h-full rounded-t-1 bg-gradient-to-r from-[#FEA459] via-[#FFC385] via-10% to-ep133-orange to-50% shadow-[inset_0px_-1px_1px_rgba(0,0,0,0.25)]'
        />
      </div>
      <div className='grid grid-cols-subgrid row-start-1 row-span-1 col-span-full bg-ep133-gray-light'>
        <div className='col-start-2 col-span-2 row-span-1 row-start-1'>
          <div className='size-full bg-white/50 text-plastic-black pb-[1px]' onClick={handleBrickClick(BrickId.Output)}>
            <div className='h-full flex items-center justify-center shadow-[inset_-1px_-1px_0_rgba(0,0,0,0.05),0_1px_0_1px_rgba(0,0,0,0.15),inset_1px_1px_1px_rgba(255,255,255,0.5),3px_2px_8px_rgba(0,0,0,0.25)]'>
              <p>OUTPUT</p>
            </div>
          </div>
        </div>
        <div className='col-start-6 col-span-2 row-span-1 row-start-1]'>
          <div className='size-full bg-ep133-orange text-plastic-white pb-[1px]' onClick={handleBrickClick(BrickId.Input)}>
            <div className='h-full flex items-center justify-center shadow-[inset_8px_8px_16px_rgba(255,145,0,0.5),inset_-1px_-1px_0_rgba(0,0,0,0.05),0_1px_0_1px_rgba(0,0,0,0.15),inset_1px_1px_1px_rgba(255,255,255,0.5),3px_2px_8px_rgba(0,0,0,0.25)]'>
              <p>INPUT</p>
            </div>
          </div>
        </div>
        <div className='col-start-9 col-span-5 grid grid-cols-subgrid grid-rows-subgrid row-span-1 row-start-1'>
          <div className='col-span-full grid grid-cols-subgrid grid-rows-subgrid bg-gradient-to-b bg-black from-white/10 to-100% text-white shadow-[inset_-1px_-1px_0_rgba(0,0,0,0.05),0_1px_0_1px_rgba(0,0,0,0.15),inset_1px_1px_1px_rgba(255,255,255,0.5),3px_2px_8px_rgba(0,0,0,0.25)]'>
            <div className='col-span-2 flex items-start justify-center text-[0.5rem] pt-1'>I</div>
            <div className='col-start-2 col-span-2 flex items-start justify-center text-[0.5rem] pt-1'>O</div>
            <div className='col-start-2' onClick={handleBrickClick(BrickId.Sync)}>
              <div className='h-full flex items-center justify-center'>
                <p>SYNC</p>
              </div>
            </div>
            <div className='col-start-3 col-span-2 flex items-start justify-center text-[0.5rem] pt-1'>I</div>
            <div className='col-start-4 col-span-2 flex items-start justify-center text-[0.5rem] pt-1'>O</div>
            <div className='col-start-4' onClick={handleBrickClick(BrickId.Midi)}>
              <div className='h-full flex items-center justify-center'>
                <p>MIDI</p>
              </div>
            </div>
          </div>
        </div>
        <div className='col-start-[17] col-span-2 row-span-1 row-start-1'>
          <div className='size-full bg-ep133-gray-dark text-plastic-white pb-[1px]' onClick={handleBrickClick(BrickId.USB)}>
            <div className='h-full flex items-center justify-center shadow-[inset_-1px_-1px_0_rgba(0,0,0,0.05),0_1px_0_1px_rgba(0,0,0,0.25),inset_1px_1px_1px_rgba(255,255,255,0.5),3px_2px_8px_rgba(0,0,0,0.25)]'>
              <p>USB</p>
            </div>
          </div>
        </div>
        <div
          onClick={() => onPowerClick?.(!poweredOn)}
          className='col-start-[20] col-span-2 row-span-1 row-start-1'
        >
          <div className='h-full flex items-center justify-center'>
            <p>POWER</p>
          </div>
        </div>
      </div>
      <div
        onClick={handleBrickClick(BrickId.BatteryCover)}
        className='grid grid-rows-subgrid grid-cols-subgrid row-span-6 row-start-2 col-[1/-8] bg-[#EBE7E5] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]'
      >
        <div className='col-start-1 row-start-1 flex items-center justify-center'>
          <CornerCircle />
        </div>
        <div className='col-[-2/-1] row-start-1 flex items-center justify-center'>
          <CornerCircle />
        </div>
        <div className='col-[-2/-1] row-[-1/-2] flex items-center justify-center'>
          <CornerCircle />
        </div>
        <div className='col-start-1 row-[-1/-2] flex items-center justify-center'>
          <CornerCircle />
        </div>
        <div className='col-start-2 row-start-2 col-span-full flex items-center'>
          <p className='text-6xl leading-none'>{title ?? 'K.O.II'}</p>
        </div>
        <div className='col-start-2 row-start-3 col-span-full flex items-center'>
          <p className='text-ep133-orange text-3xl'>{subtitle ?? 'サンプラー'}</p>
        </div>
        <div className='col-start-2 row-[-1/-2] col-span-full flex items-center'>
          <p className='text-3xl'>{bottomTitle ?? '64 MB SAMPLER COMPOSER'}</p>
        </div>
      </div>
      <div className='col-[-8/-1] row-span-6 row-start-2' onClick={handleBrickClick(BrickId.SpeakerGrid)}>
        <Speaker />
      </div>
      <div className='grid grid-cols-subgrid grid-rows-subgrid col-start-1 row-span-6 row-start-8 col-span-full'>
        <div className='grid grid-cols-subgrid grid-rows-subgrid bg-ep133-dark col-span-full row-span-full shadow-[inset_0px_0.5px_0px_rgba(255,255,255,0.1),0px_-0.5px_0.5px_rgba(0,0,0,0.15),0px_9px_12px_rgba(0,0,0,0.4)]'>
          <div className='col-start-1 row-span-full row-start-1'>
            <div className='bg-white/5 h-full w-4 shadow-[1px_0px_0px_rgba(255,255,255,0.1)]' />
          </div>
          <div className='-col-start-1 row-span-full flex justify-end'>
            <div className='bg-white/5 h-full w-4 shadow-[-1px_0px_0px_rgba(255,255,255,0.1)]' />
          </div>
          {/* <div className='col-[2/-2] row-[2/-2] bg-ep133-dark z-0' /> */}
          <div className='col-[2/-2] row-[2/-2] z-10'>
            {/* <DisplayMatrix
              translucentIcons={false}
              value={displayValue}
              backgroundColor='#1A1A1A'
              dotValue={displayDotValue}
              iconSet={EP133Icons}
              iconMeta={icons}
              className='h-full'
            /> */}
            <Display
              animation={displayAnimation}
              displayValue={displayValue}
              dotValue={displayDotValue}
              iconMeta={icons}
              iconSet={EP133Icons}
              backgroundColor='#1A1A1A'
            />
          </div>
        </div>
      </div>

      <div className='row-start-[16] col-start-[16] row-span-3 col-span-1'>
        <div className='grid grid-rows-12 grid-cols-4 h-full'>
          <div className='row-start-1 row-span-3 flex col-[2/-2]'>
            <div className='w-1/2' />
            <div className='w-1/2 border-l border-t border-l-ep133-orange border-t-ep133-orange border-l-1 border-t-1' />
          </div>
          <div className='row-start-3 col-span-full row-span-6 flex items-center justify-center'>
            <p className=' -rotate-90 text-ep133-orange'>GAIN</p>
          </div>
          <div className='row-start-8 row-span-3 flex col-[2/-2]'>
            <div className='w-1/2' />
            <div className='w-1/2 border-l border-b border-l-ep133-orange border-b-ep133-orange border-l-1 border-b-1' />
          </div>
        </div>
      </div>

      <div className='row-start-[14] col-start-[12] grid-rows-4 col-span-10 grid grid-cols-44'>
        <div className='flex flex-col col-[1/25] row-[2/-2]'>
          <div className='flex-1' />
          <div className='flex-1 border-l border-t border-l-plastic-black border-t-plastic-black border-l-1 border-t-1' />
        </div>
        <div className='col-start-[25] col-span-4 row-span-full flex items-center justify-center'>
          <p>BPM</p>
        </div>
        <div className='flex flex-col col-[29/36] row-[2/-2]'>
          <div className='flex-1' />
          <div className='flex-1 border-t border-t-plastic-black border-t-1' />
        </div>
        <div className='col-start-[36] col-span-10 row-span-full flex items-center justify-center'>
          <p>METRONOME</p>
        </div>
      </div>
      <div className='row-start-[15] row-span-2 col-start-[17] col-span-2'>
        <Knob
          onChange={onXChange}
          color={Colors.Orange}
        />
      </div>
      <div className='row-start-[16] col-start-[22] row-span-3 col-span-1'>
        <div className='grid grid-rows-12 h-full grid-cols-4'>
          <div className='row-start-1 row-span-3 flex col-[2/-2]'>
            <div className='w-1/2 border-r border-t border-r-plastic-black border-t-plastic-black border-r-1 border-t-1' />
            <div className='w-1/2' />
          </div>
          <div className='row-start-3 col-span-full row-span-6 flex items-center justify-center'>
            <p className='-rotate-90 text-plastic-black'>SWING</p>
          </div>
          <div className='row-start-8 row-span-3 flex col-[2/-2]'>
            <div className='w-1/2 border-r border-b border-r-plastic-black border-b-plastic-black border-r-1 border-b-1' />
            <div className='w-1/2' />
          </div>
        </div>
      </div>
      <div className='row-start-[15] row-span-2 col-start-[20] col-span-2'>
        <Knob
          onChange={onYChange}
          color={Colors.Dark}
        />
      </div>
      <div className='row-start-[14] col-start-[2] col-span-2 flex items-center justify-center'>
        <p>VOLUME</p>
      </div>
      <div className='row-start-[15] row-span-2 col-start-[2] col-span-2'>
        <Knob
          onChange={onVolumeChange}
          min={0}
          max={100}
          color={Colors.LightGray}
        />
      </div>
      <div className='row-start-[15] row-span-2 col-start-[5] col-span-2'>
        <SquareButton
          color={Colors.Dark}
          size={Size.Small}
          type={Type.CapText}
          holeProps={{ fullShadow: true }}
          onClick={handleButtonClick(ButtonId.Sound)}
          onHold={handleButtonHold(ButtonId.Sound)}
          value='SOUND'
        >
          <Cap
            color={Colors.LightGray}
            value='EDIT'
          />
        </SquareButton>
      </div>
      <div className='row-start-[15] row-span-2 col-start-[8] col-span-2'>
        <SquareButton
          color={Colors.Dark}
          size={Size.Small}
          type={Type.CapText}
          holeProps={{ fullShadow: true }}
          onClick={handleButtonClick(ButtonId.Main)}
          onHold={handleButtonHold(ButtonId.Main)}
          value='MAIN'
        >
          <Cap
            color={Colors.Orange}
            value='COMMIT'
          />
        </SquareButton>
      </div>
      <div className='row-start-[15] row-span-2 col-start-[11] col-span-2'>
        <SquareButton
          color={Colors.Dark}
          size={Size.Small}
          type={Type.CapText}
          holeProps={{ fullShadow: true }}
          onClick={handleButtonClick(ButtonId.Tempo)}
          onHold={handleButtonHold(ButtonId.Tempo)}
          value='TEMPO'
        >
          <Cap
            color={Colors.DarkGray}
            value='LOOP'
          />
        </SquareButton>
      </div>
      <div className='row-start-[18] row-span-1 col-start-[2] col-span-2'>
        <SquareButton
          color={Colors.Dark}
          size={Size.Small}
          type={Type.CapText}
          onClick={handleButtonClick(ButtonId.Keys)}
          value='KEYS'
        />
      </div>
      <div className='row-start-[17] row-span-1 col-start-[5] col-span-1 items-center justify-center flex'>
        <Indicator state={indicators?.[IndicatorId.ABank]?.state === true ? 'on' : 'off'} />
      </div>
      <div className='row-start-[18] row-span-2 col-start-[5] col-span-2'>
        <SquareButton
          color={Colors.Gray}
          size={Size.Square}
          type={Type.CapDual}
          onClick={handleButtonClick(ButtonId.ABank)}
          Symbol={<div className='size-4 *:size-full'><Asterisk className='fill-plastic-white' /></div>}
          className='cursor-cell'
          value='A'
        />
      </div>

      <div className='row-start-[17] row-span-1 col-start-[8] col-span-2 flex items-center justify-center'>
        <div className='w-1/2 h-full flex justify-center items-center'>
          <Indicator state='off' />
        </div>
        <div className='w-1/2'>
          <p>LEVEL</p>
        </div>
      </div>

      <div className='row-start-[18] row-span-2 col-start-[8] col-span-2'>
        <SquareButton
          color={Colors.Dark}
          size={Size.Square}
          type={Type.CapDual}
          onClick={handleButtonClick(ButtonId.Digit7)}
          value='7'
        />
      </div>
      <div className='row-start-[20] row-span-1 col-start-[8] col-span-1 flex items-center justify-center'>
        <Indicator state={indicators?.[IndicatorId.LPF]?.state === true ? 'on' : 'off'} />
      </div>
      <div className='row-start-[20] row-span-1 col-start-[9] col-span-1 flex items-center justify-center'>
        <p>LPF</p>
      </div>

      <div className='row-start-[17] row-span-1 col-start-[11] col-span-2 flex items-center justify-center'>
        <div className='w-1/2 h-full flex justify-center items-center'>
          <Indicator state={indicators?.[IndicatorId.Pitch]?.state === true ? 'on' : 'off'} />
        </div>
        <div className='w-1/2'>
          <p>PITCH</p>
        </div>
      </div>
      <div className='row-start-[18] row-span-2 col-start-[11] col-span-2'>
        <SquareButton
          color={Colors.Dark}
          size={Size.Square}
          type={Type.CapDual}
          onClick={handleButtonClick(ButtonId.Digit8)}
          value='8'
        />
      </div>
      <div className='row-start-[20] row-span-1 col-start-[11] col-span-1 flex items-center justify-center'>
        <Indicator state={indicators?.[IndicatorId.HPF]?.state === true ? 'on' : 'off'} />
      </div>
      <div className='row-start-[20] row-span-1 col-start-[12] col-span-1 flex items-center justify-start'>
        <p>HPF</p>
      </div>

      <div className='row-start-[17] row-span-1 col-start-[14] col-span-2 flex items-center justify-center'>
        <div className='w-1/2 h-full flex justify-center items-center'>
          <Indicator state={indicators?.[IndicatorId.Time]?.state === true ? 'on' : 'off'} />
        </div>
        <div className='w-1/2'>
          <p>TIME</p>
        </div>
      </div>
      <div className='row-start-[18] row-span-2 col-start-[14] col-span-2'>
        <SquareButton
          color={Colors.Dark}
          size={Size.Square}
          type={Type.CapDual}
          onClick={handleButtonClick(ButtonId.Digit9)}
          value='9'
        />
      </div>
      <div className='row-start-[20] row-span-1 col-start-[14] col-span-1 flex items-center justify-center'>
        <Indicator state={indicators?.[IndicatorId.FX]?.state === true ? 'on' : 'off'} />
      </div>
      <div className='row-start-[20] row-span-1 col-start-[15] col-span-1 flex items-center justify-start'>
        <div className='flex items-baseline gap-1'>
          <div className='h-3 *:size-full'>
            <RightArrow className='fill-plastic-black' />
          </div>
          <p className='leading-none'>FX</p>
        </div>
      </div>

      <div className='row-start-[17] col-start-[17] col-span-2'>
        <div className='flex h-full items-center justify-center text-center text-md'>
          <p className='bg-ep133-orange rounded-md text-ep133-gray size-5 shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.1),inset_-1px_-1px_0px_rgba(0,0,0,0.05)]'>X</p>
        </div>
      </div>

      <div className='row-start-[17] col-start-[20] col-span-2'>
        <div className='flex h-full items-center justify-center text-center text-md'>
          <p className='bg-ep133-dark rounded-md text-ep133-gray size-5 shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.1),inset_-1px_-1px_0px_rgba(0,0,0,0.05)]'>Y</p>
        </div>
      </div>

      <div className='row-start-[18] row-span-2 col-start-[17] col-span-2'>
        <SquareButton
          color={Colors.Orange}
          size={Size.Small}
          type={Type.CapText}
          holeProps={{ fullShadow: true }}
          onClick={handleButtonClick(ButtonId.Sample)}
          value='SAMPLE'
        >
          <Cap
            color={Colors.LightGray}
            value='CHOP'
          />
        </SquareButton>
      </div>

      <div className='row-start-[18] row-span-2 col-start-[20] col-span-2'>
        <SquareButton
          color={Colors.Dark}
          size={Size.Small}
          type={Type.CapText}
          holeProps={{ fullShadow: true }}
          onClick={handleButtonClick(ButtonId.Timing)}
          value='TIMING'
        >
          <Cap
            color={Colors.LightGray}
            value='CORRECT'
          />
        </SquareButton>
      </div>

      <div className='row-start-[21] row-span-2 col-start-[8] col-span-2'>
        <SquareButton
          color={Colors.Dark}
          size={Size.Square}
          type={Type.CapDual}
          onClick={handleButtonClick(ButtonId.Digit4)}
          value='4'
        />
      </div>

      <div className='row-start-[23] row-span-1 col-start-[8] col-span-2 flex items-center justify-center'>
        <div className='w-1/2 h-full flex justify-center items-center'>
          <Indicator state={indicators?.[IndicatorId.ATK]?.state === true ? 'on' : 'off'} />
        </div>
        <div className='w-1/2'>
          <p>ATK</p>
        </div>
      </div>

      <div className='row-start-[21] row-span-2 col-start-[11] col-span-2'>
        <SquareButton
          color={Colors.Dark}
          size={Size.Square}
          type={Type.CapDual}
          onClick={handleButtonClick(ButtonId.Digit5)}
          value='5'
        />
      </div>
      <div className='row-start-[23] row-span-1 col-start-[11] col-span-2 flex items-center justify-center'>
        <div className='w-1/2 h-full flex justify-center items-center'>
          <Indicator state={indicators?.[IndicatorId.Rel]?.state === true ? 'on' : 'off'} />
        </div>
        <div className='w-1/2'>
          <p>REL</p>
        </div>
      </div>

      <div className='row-start-[21] row-span-2 col-start-[14] col-span-2'>
        <SquareButton
          color={Colors.Dark}
          size={Size.Square}
          type={Type.CapDual}
          onClick={handleButtonClick(ButtonId.Digit6)}
          value='6'
        />
      </div>
      <div className='row-start-[23] row-span-1 col-start-[14] col-span-2 flex items-center justify-center'>
        <div className='w-1/2 h-full flex justify-center items-center'>
          <Indicator state={indicators?.[IndicatorId.Pan]?.state === true ? 'on' : 'off'} />
        </div>
        <div className='w-1/2'>
          <p>PAN</p>
        </div>
      </div>

      <div className='row-start-[21] row-span-2 col-start-[17] col-span-2'>
        <SquareButton
          color={Colors.Dark}
          size={Size.Small}
          holeProps={{ fullShadow: true }}
          type={Type.CapText}
          onClick={handleButtonClick(ButtonId.FX)}
          value='FX'
        >
          <Cap
            color={Colors.LightGray}
            value='OUTPUT'
          />
        </SquareButton>
      </div>

      <div className='row-start-[21] row-span-2 col-start-[20] col-span-2'>
        <SquareButton
          color={Colors.LightGray}
          size={Size.Small}
          holeProps={{ fullShadow: true }}
          type={Type.CapText}
          onClick={handleButtonClick(ButtonId.Erase)}
          value='ERASE'
        >
          <Cap
            color={Colors.LightGray}
            value='SYSTEM'
          />
        </SquareButton>
      </div>

      <div className='row-start-[24] row-span-2 col-start-[17] col-span-2'>
        <SquareButton
          color={Colors.LightGray}
          size={Size.Square}
          type={Type.CapCenter}
          onClick={handleButtonClick(ButtonId.Minus)}
          Value={<div className='size-6 *:size-full'><MinusSymbol className='fill-plastic-black' /></div>}
        />
      </div>

      <div className='row-start-[24] row-span-2 col-start-[20] col-span-2'>
        <SquareButton
          color={Colors.LightGray}
          onClick={handleButtonClick(ButtonId.Plus)}
          size={Size.Square}
          type={Type.CapCenter}
          Value={<div className='size-7 *:size-full'><PlusSymbol className='fill-plastic-black' /></div>}
        />
      </div>

      <div className='row-start-[26] row-span-1 col-start-[17] col-span-2 flex items-center justify-center'>
        <div className='w-1/2 h-full flex justify-center items-center'>
          <Indicator state={indicators?.[IndicatorId.Record1]?.state === true ? 'on' : 'off'} />
        </div>
        <div className='w-1/2 h-full flex justify-center items-center'>
          <Indicator state={indicators?.[IndicatorId.Record2]?.state === true ? 'on' : 'off'} />
        </div>
      </div>

      <div className='row-start-[27] row-span-2 col-start-[17] col-span-2'>
        <SquareButton
          color={Colors.Orange}
          size={Size.Square}
          type={Type.CapText}
          onClick={handleButtonClick(ButtonId.Record)}
          value='RECORD'
        />
      </div>

      <div className='row-start-[27] row-span-2 col-start-[20] col-span-2'>
        <SquareButton
          color={Colors.DarkGray}
          size={Size.Square}
          type={Type.CapText}
          onClick={handleButtonClick(ButtonId.Play)}
          value='PLAY'
        />
      </div>

      <div className='row-start-[24] row-span-2 col-start-[8] col-span-2'>
        <SquareButton
          color={Colors.Dark}
          size={Size.Square}
          type={Type.CapDual}
          onClick={handleButtonClick(ButtonId.Digit1)}
          value='1'
        />
      </div>
      <div className='row-start-[26] row-span-1 col-start-[8] col-span-2 flex items-center justify-center'>
        <div className='w-1/2 h-full flex justify-center items-center'>
          <Indicator state={indicators?.[IndicatorId.Tune]?.state === true ? 'on' : 'off'} />
        </div>
        <div className='w-1/2'>
          <p>TUNE</p>
        </div>
      </div>

      <div className='row-start-[24] row-span-2 col-start-[11] col-span-2'>
        <SquareButton
          color={Colors.Dark}
          size={Size.Square}
          type={Type.CapDual}
          onClick={handleButtonClick(ButtonId.Digit2)}
          value='2'
        />
      </div>
      <div className='row-start-[26] row-span-1 col-start-[11] col-span-2 flex items-center justify-center'>
        <div className='w-1/2 h-full flex justify-center items-center'>
          <Indicator state={indicators?.[IndicatorId.Vel]?.state === true ? 'on' : 'off'} />
        </div>
        <div className='w-1/2'>
          <p>VEL</p>
        </div>
      </div>

      <div className='row-start-[24] row-span-2 col-start-[14] col-span-2'>
        <SquareButton
          color={Colors.Dark}
          size={Size.Square}
          type={Type.CapDual}
          onClick={handleButtonClick(ButtonId.Digit3)}
          value='3'
        />
      </div>
      <div className='row-start-[26] row-span-1 col-start-[14] col-span-2 flex items-center justify-center'>
        <div className='w-1/2 h-full flex justify-center items-center'>
          <Indicator state={indicators?.[IndicatorId.Mod]?.state === true ? 'on' : 'off'} />
        </div>
        <div className='w-1/2'>
          <p>MOD</p>
        </div>
      </div>

      <div className='row-start-[27] row-span-2 col-start-[8] col-span-2'>
        <SquareButton
          color={Colors.Dark}
          size={Size.Square}
          type={Type.CapDual}
          onClick={handleButtonClick(ButtonId.Dot)}
          Value={<div className='bg-white/90 rounded-full size-[0.4rem] mt-2' />}
        />
      </div>
      <div className='row-start-[27] row-span-2 col-start-[11] col-span-2'>
        <SquareButton
          color={Colors.Dark}
          size={Size.Square}
          type={Type.CapDual}
          onClick={handleButtonClick(ButtonId.Digit0)}
          value='0'
        />
      </div>
      <div className='row-start-[27] row-span-2 col-start-[14] col-span-2'>
        <SquareButton
          color={Colors.Dark}
          size={Size.Square}
          type={Type.CapText}
          onClick={handleButtonClick(ButtonId.Enter)}
          value='ENTER'
        />
      </div>

      <div className='row-start-[20] row-span-1 col-start-[5] col-span-1 items-center justify-center flex'>
        <Indicator state={indicators?.[IndicatorId.BBank]?.state === true ? 'on' : 'off'} />
      </div>
      <div className='row-start-[21] row-span-2 col-start-[5] col-span-2'>
        <SquareButton
          color={Colors.Gray}
          size={Size.Square}
          type={Type.CapDual}
          Symbol={<div className='w-4 *:size-full'><CirclingArrow className='fill-plastic-white' /></div>}
          onClick={handleButtonClick(ButtonId.BBank)}
          value='B'
        />
      </div>
      <div className='row-start-[23] row-span-1 col-start-[5] col-span-1 items-center justify-center flex'>
        <Indicator state={indicators?.[IndicatorId.CBank]?.state === true ? 'on' : 'off'} />
      </div>
      <div className='row-start-[24] row-span-2 col-start-[5] col-span-2'>
        <SquareButton
          color={Colors.Gray}
          size={Size.Square}
          type={Type.CapDual}
          Symbol={<div className='w-4 *:size-full'><OutArrow className='fill-plastic-white' /></div>}
          onClick={handleButtonClick(ButtonId.CBank)}
          value='C'
        />
      </div>
      <div className='row-start-[26] row-span-1 col-start-[5] col-span-1 items-center justify-center flex'>
        <Indicator state={indicators?.[IndicatorId.DBank]?.state === true ? 'on' : 'off'} />
      </div>
      <div className='row-start-[27] row-span-2 col-start-[5] col-span-2'>
        <SquareButton
          color={Colors.Gray}
          size={Size.Square}
          type={Type.CapDual}
          onClick={handleButtonClick(ButtonId.DBank)}
          Symbol={<div className='w-4 *:size-full'><InArrow className='fill-plastic-white' /></div>}
          value='D'
        />
      </div>
      <div className='row-start-[20] row-span-1 col-start-[2] col-span-2'>
        <SquareButton
          color={Colors.Dark}
          size={Size.Small}
          type={Type.CapText}
          onClick={handleButtonClick(ButtonId.Fader)}
          value='FADER'
        />
      </div>
      <div className='row-start-[22] row-span-5 col-start-[2] col-span-2'>
        <Slider onChange={onSliderChange} />
      </div>
      <div className='row-start-[28] row-span-1 col-start-[2] col-span-2'>
        <SquareButton
          color={Colors.Gray}
          size={Size.Small}
          type={Type.CapText}
          onClick={handleButtonClick(ButtonId.Shift)}
          value='SHIFT'
        />
      </div>
    </div>
  )
}
