import classNames from 'classnames'
import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import DisplayMatrix from './DisplayMatrix'
import { SliderFresh as Slider } from './Slider'
import { KnobFresh as Knob } from './Knob'
import Speaker from './Speaker'
import { Size, SquareButtonFresh as SquareButton, Type } from './Button'
import Cap from './Cap'
import { Colors } from '@/types'
import { IndicatorFresh as Indicator } from './Indicator'

export interface EP133Props {
}

const CornerCircle = (): JSX.Element => (
  <div className='rounded-full size-2/3 bg-gradient-to-b from-[#E6E1DF] to-[#EEEBE9] shadow-[inset_1px_1px_0px_rgba(0,0,0,0.25),inset_-1px_-1px_0px_rgba(255,255,255,0.5)]' />
)

export default function EP133 ({
}: EP133Props): JSX.Element {
  return (
    <div className='grid grid-rows-30 grid-cols-22 h-[1520px] w-[1100px] bg-[#B7B4B3] font-ep133'>
      <div className='grid grid-cols-subgrid row-span-1 col-span-full bg-ep133-gray-light'>
        <div className='col-start-2 col-span-2 row-span-1 row-start-1'>
          <div className='size-full bg-white/50'>
            <p>OUTPUT</p>
          </div>
        </div>
        <div className='col-start-6 col-span-2 row-span-1 row-start-1'>
          <div className='size-full text-white bg-ep133-orange'>
            <p>INPUT</p>
          </div>
        </div>
        <div className='col-start-9 col-span-5 row-span-1 row-start-1 grid grid-cols-subgrid bg-black text-white'>
          <div className='col-start-2'>
            <p>SYNC</p>
          </div>
          <div className='col-start-4'>
            <p>MIDI</p>
          </div>
        </div>
        <div className='col-start-[17] col-span-2 row-span-1 row-start-1 bg-black/50 text-white'>
          <p>USB</p>
        </div>
        <div className='col-start-[20] col-span-2 row-span-1 row-start-1'>
          <p>POWER</p>
        </div>
      </div>
      <div className='grid grid-rows-subgrid grid-cols-subgrid row-span-6 row-start-2 col-[1/-8] bg-[#EBE7E5] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]'>
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
          <p className='text-6xl leading-none'>K.O.II</p>
        </div>
        <div className='col-start-2 row-start-3 col-span-full flex items-center'>
          <p className='text-ep133-orange text-3xl'>サンプラー</p>
        </div>
        <div className='col-start-2 row-[-1/-2] col-span-full flex items-center'>
          <p className='text-3xl'>64 MB SAMPLER COMPOSER</p>
        </div>
      </div>
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

      <div className='row-start-[16] col-start-[16] row-span-3 col-span-1'>
        <div className='grid grid-rows-6 h-full'>
          <div className='row-start-2 row-span-3 flex items-center justify-center'>
            <p className='-rotate-90 text-ep133-orange'>GAIN</p>
          </div>
        </div>
      </div>

      <div className='row-start-[14] col-start-[17] col-span-2 flex items-center justify-center'>
        <p>BPM</p>
      </div>
      <div className='row-start-[15] row-span-2 col-start-[17] col-span-2'>
        <Knob color={Colors.Orange} />
      </div>
      <div className='row-start-[14] col-start-[20] col-span-2 flex items-center justify-center'>
        <p>METRONOME</p>
      </div>
      <div className='row-start-[16] col-start-[22] row-span-3 col-span-1'>
        <div className='grid grid-rows-6 h-full'>
          <div className='row-start-2 row-span-3 flex items-center justify-center'>
            <p className='-rotate-90 text-plastic-black'>SWING</p>
          </div>
        </div>
      </div>
      <div className='row-start-[15] row-span-2 col-start-[20] col-span-2'>
        <Knob color={Colors.Dark} />
      </div>
      <div className='row-start-[14] col-start-[2] col-span-2 flex items-center justify-center'>
        <p>VOLUME</p>
      </div>
      <div className='row-start-[15] row-span-2 col-start-[2] col-span-2'>
        <Knob color={Colors.LightGray} />
      </div>
      <div className='row-start-[15] row-span-2 col-start-[5] col-span-2'>
        <SquareButton
          color={Colors.Dark}
          size={Size.Small}
          type={Type.CapText}
          holeProps={{ fullShadow: true }}
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
          value='KEYS'
        />
      </div>
      <div className='row-start-[17] row-span-1 col-start-[5] col-span-1 items-center justify-center flex'>
        <Indicator state='on' />
      </div>
      <div className='row-start-[18] row-span-2 col-start-[5] col-span-2'>
        <SquareButton
          color={Colors.Gray}
          size={Size.Square}
          type={Type.CapDual}
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
          value='7'
        />
      </div>
      <div className='row-start-[20] row-span-1 col-start-[8] col-span-1 flex items-center justify-center'>
        <Indicator state='on' />
      </div>
      <div className='row-start-[20] row-span-1 col-start-[9] col-span-1 flex items-center justify-center'>
        <p>LPF</p>
      </div>

      <div className='row-start-[17] row-span-1 col-start-[11] col-span-2 flex items-center justify-center'>
        <div className='w-1/2 h-full flex justify-center items-center'>
          <Indicator state='off' />
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
          value='8'
        />
      </div>
      <div className='row-start-[20] row-span-1 col-start-[11] col-span-1 flex items-center justify-center'>
        <Indicator state='on' />
      </div>
      <div className='row-start-[20] row-span-1 col-start-[12] col-span-1 flex items-center justify-center'>
        <p>HPF</p>
      </div>

      <div className='row-start-[17] row-span-1 col-start-[14] col-span-2 flex items-center justify-center'>
        <div className='w-1/2 h-full flex justify-center items-center'>
          <Indicator state='on' />
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
          value='9'
        />
      </div>
      <div className='row-start-[20] row-span-1 col-start-[14] col-span-1 flex items-center justify-center'>
        <Indicator state='off' />
      </div>
      <div className='row-start-[20] row-span-1 col-start-[15] col-span-1 flex items-center justify-center'>
        <p>-&gt; FX</p>
      </div>

      <div className='row-start-[18] row-span-2 col-start-[17] col-span-2'>
        <SquareButton
          color={Colors.Orange}
          size={Size.Small}
          type={Type.CapText}
          holeProps={{ fullShadow: true }}
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
          value='4'
        />
      </div>

      <div className='row-start-[23] row-span-1 col-start-[8] col-span-2 flex items-center justify-center'>
        <div className='w-1/2 h-full flex justify-center items-center'>
          <Indicator state='off' />
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
          value='5'
        />
      </div>
      <div className='row-start-[23] row-span-1 col-start-[11] col-span-2 flex items-center justify-center'>
        <div className='w-1/2 h-full flex justify-center items-center'>
          <Indicator state='off' />
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
          value='6'
        />
      </div>
      <div className='row-start-[23] row-span-1 col-start-[14] col-span-2 flex items-center justify-center'>
        <div className='w-1/2 h-full flex justify-center items-center'>
          <Indicator state='off' />
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
          value='-'
        />
      </div>

      <div className='row-start-[24] row-span-2 col-start-[20] col-span-2'>
        <SquareButton
          color={Colors.LightGray}
          size={Size.Square}
          type={Type.CapCenter}
          value='+'
        />
      </div>

      <div className='row-start-[26] row-span-1 col-start-[17] col-span-2 flex items-center justify-center'>
        <div className='w-1/2 h-full flex justify-center items-center'>
          <Indicator state='off' />
        </div>
        <div className='w-1/2 h-full flex justify-center items-center'>
          <Indicator state='on' />
        </div>
      </div>

      <div className='row-start-[27] row-span-2 col-start-[17] col-span-2'>
        <SquareButton
          color={Colors.Orange}
          size={Size.Square}
          type={Type.CapText}
          value='RECORD'
        />
      </div>

      <div className='row-start-[27] row-span-2 col-start-[20] col-span-2'>
        <SquareButton
          color={Colors.DarkGray}
          size={Size.Square}
          type={Type.CapText}
          value='PLAY'
        />
      </div>

      <div className='row-start-[24] row-span-2 col-start-[8] col-span-2'>
        <SquareButton
          color={Colors.Dark}
          size={Size.Square}
          type={Type.CapDual}
          value='1'
        />
      </div>
      <div className='row-start-[26] row-span-1 col-start-[8] col-span-2 flex items-center justify-center'>
        <div className='w-1/2 h-full flex justify-center items-center'>
          <Indicator state='off' />
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
          value='2'
        />
      </div>
      <div className='row-start-[26] row-span-1 col-start-[11] col-span-2 flex items-center justify-center'>
        <div className='w-1/2 h-full flex justify-center items-center'>
          <Indicator state='on' />
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
          value='3'
        />
      </div>
      <div className='row-start-[26] row-span-1 col-start-[14] col-span-2 flex items-center justify-center'>
        <div className='w-1/2 h-full flex justify-center items-center'>
          <Indicator state='off' />
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
          value='·'
        />
      </div>
      <div className='row-start-[27] row-span-2 col-start-[11] col-span-2'>
        <SquareButton
          color={Colors.Dark}
          size={Size.Square}
          type={Type.CapDual}
          value='0'
        />
      </div>
      <div className='row-start-[27] row-span-2 col-start-[14] col-span-2'>
        <SquareButton
          color={Colors.Dark}
          size={Size.Square}
          type={Type.CapText}
          value='ENTER'
        />
      </div>

      <div className='row-start-[20] row-span-1 col-start-[5] col-span-1 items-center justify-center flex'>
        <Indicator />
      </div>
      <div className='row-start-[21] row-span-2 col-start-[5] col-span-2'>
        <SquareButton
          color={Colors.Gray}
          size={Size.Square}
          type={Type.CapDual}
          value='B'
        />
      </div>
      <div className='row-start-[23] row-span-1 col-start-[5] col-span-1 items-center justify-center flex'>
        <Indicator />
      </div>
      <div className='row-start-[24] row-span-2 col-start-[5] col-span-2'>
        <SquareButton
          color={Colors.Gray}
          size={Size.Square}
          type={Type.CapDual}
          value='C'
        />
      </div>
      <div className='row-start-[26] row-span-1 col-start-[5] col-span-1 items-center justify-center flex'>
        <Indicator />
      </div>
      <div className='row-start-[27] row-span-2 col-start-[5] col-span-2'>
        <SquareButton
          color={Colors.Gray}
          size={Size.Square}
          type={Type.CapDual}
          value='D'
        />
      </div>
      <div className='row-start-[20] row-span-1 col-start-[2] col-span-2'>
        <SquareButton
          color={Colors.Dark}
          size={Size.Small}
          type={Type.CapText}
          value='FADER'
        />
      </div>
      <div className='row-start-[22] row-span-5 col-start-[2] col-span-2'>
        <Slider />
      </div>
      <div className='row-start-[28] row-span-1 col-start-[2] col-span-2'>
        <SquareButton
          color={Colors.Gray}
          size={Size.Small}
          type={Type.CapText}
          value='SHIFT'
        />
      </div>
    </div>
  )
}
