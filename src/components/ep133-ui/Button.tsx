import React, { FunctionComponent } from 'react'

import classNames from 'classnames'

export enum Colors {
  LightGray = 'light-gray',
  Gray = 'gray',
  Dark = 'dark',
  Orange = 'orange',
  CheeseDoodled = 'cheese-doodled',
}

export enum Types {
  CapDual = 'cap-dual',
  CapCenter = 'cap-center',
  CapText = 'cap-text'
}

export interface CapProps {
  value?: string | JSX.Element
  valueClassName?: string
  symbol?: string | JSX.Element
  symbolClassName?: string
}

export const CapCenter = ({
  value,
  valueClassName
}: CapProps): JSX.Element => {
  return (
    <div className='flex flex-row items-center justify-center h-full'>
      <p className={classNames(
        'text-3xl',
        valueClassName
      )}
      >{value}
      </p>
    </div>
  )
}

export const CapText = ({
  value,
  valueClassName
}: CapProps): JSX.Element => {
  return (
    <div className='flex flex-row text-center items-start justify-center'>
      <p className={classNames(
        'text-xl',
        valueClassName
      )}
      >{value}
      </p>
    </div>
  )
}

export const CapDual = ({
  value,
  valueClassName,
  symbol,
  symbolClassName
}: Partial<CapProps>): JSX.Element => {
  return (
    <div className='grid grid-cols-3 h-full w-full'>
      <div className='flex flex-col justify-between leading-none'>
        <p className={classNames(
          'text-[1.8rem] self-center text-shadow-2xs',
          valueClassName
        )}
        >{value}
        </p>
        <p className={classNames(
          'self-start leading-none',
          symbolClassName
        )}
        >{symbol}
        </p>
      </div>
    </div>
  )
}

interface HoleProps {
  children: JSX.Element
}

export const Hole = ({
  children
}: HoleProps): JSX.Element => {
  return (
    <div>
      <div className='group-hover/button:opacity-90 opacity-100 transition-all group-active/button:opacity-0'>
        <div className='absolute left-0 bottom-0 w-3 h-[1px] shadow-[0px_1px_1px_rgba(255,255,255,var(--light-intensity))]' />
        <div className='absolute right-0 bottom-0 w-1 h-[1px] shadow-[0px_1px_1px_rgba(255,255,255,var(--light-intensity))]' />
        <div className='absolute right-0 top-0 w-[1px] h-6 shadow-[1px_0px_1px_rgba(255,255,255,var(--light-intensity))]' />
      </div>
      <div className='w-full h-full absolute shadow-[1px_1px_1px_rgba(255,255,255,0.8)] transition-all opacity-0 group-active/button:opacity-100' />
      <div className='flex flex-col items-center justify-center p-[2px] rounded-[1px] bg-[#050404]'>
        {children}
      </div>
    </div>
  )
}

interface BaseButtonProps
  extends Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  shadow?: boolean
  reflected?: boolean
  className?: string
  frontClassName?: string
  reflectClassName?: string
  valueClassName?: string
  type?: Types
  Texture?: JSX.Element
  value?: string | JSX.Element
  symbol?: string | JSX.Element
}

export function BaseButton ({
  shadow = true,
  reflected = false,
  className,
  type,
  value,
  symbol,
  Texture,
  reflectClassName,
  frontClassName,
  valueClassName,
  onClick
}: BaseButtonProps): JSX.Element {
  return (
    <div className='relative'>
      {shadow && <div className='absolute w-full h-full bg-black z-0 rounded-2 opacity-80 transition-all group-hover/button:-bottom-2.5 group-hover/button:-right-1.5 group-hover/button:blur-[0.4rem] -bottom-3 -right-2 blur-[0.5rem] group-active/button:opacity-0 group-active/button:blur-[0.1rem]' />}
      {reflected && (
        <div>
          <div className={classNames(
            'absolute w-full h-full z-0 rounded-2 opacity-20 transition-all group-hover/button:-top-2 group-hover/button:-left-1 group-hover/button:blur-[0.4rem] -top-2.5 -left-1.5 blur-[0.5rem] group-active/button:-top-1 group-active/button:-left-0.5 group-active/button:opacity-20 group-active/button:blur-[0.1rem] mix-blend-plus-lighter',
            reflectClassName
          )}
          />
          <div className={classNames(
            'absolute w-full h-full z-0 rounded-2 opacity-20 transition-all group-hover/button:top-1 group-hover/button:-right-0.5 group-hover/button:blur-[0.2rem] top-2 -right-1.5 blur-[0.2rem] group-active/button:top-1 group-active/button:-right-1 group-active/button:opacity-10 group-active/button:blur-[0.1rem] mix-blend-plus-lighter',
            reflectClassName
          )}
          />
        </div>
      )}
      <button
        onClick={onClick}
        className={classNames(
          'z-10 relative w-24 h-24 flex flex-col items-center justify-center p-[0.1rem] rounded-2 bg-gradient-to-br',
          className
        )}
      >
        <div className='absolute mt-[0.5px] ml-[0.5px] w-8 h-8 rounded-tl-2 left-0 top-0 from-white/75 to-25% bg-gradient-to-br group-active/button:opacity-0' />
        <div className='relative h-full w-full overflow-hidden rounded-[calc(0.5rem-1px)]'>
          <div className='absolute z-20 h-full w-full group-hover/button:-translate-y-[0.5px] group-hover/button:-translate-x-[0.5px] group-active/button:-translate-y-[1.5px] group-active/button:-translate-x-[1.5px]'>
            <div className='px-[0.8rem] py-[0.7rem] w-full h-full'>
              {type === Types.CapText && <CapText value={value} valueClassName={valueClassName} />}
              {type === Types.CapCenter && <CapCenter value={value} valueClassName={valueClassName} />}
              {type === Types.CapDual && <CapDual symbol={symbol} value={value} symbolClassName={valueClassName} valueClassName={valueClassName} />}
            </div>
          </div>
          {(Texture != null) && (
            <div className='absolute z-10 h-full w-full'>
              {Texture}
            </div>
          )}
          <div className={classNames(
            'w-full h-full rounded-2',
            frontClassName
          )}
          />
        </div>
      </button>
    </div>
  )
}

export function DarkSquareButton ({
  ...rootProps
}: BaseButtonProps): JSX.Element {
  return (
    <BaseButton
      className='bg-[#171717] from-white/50 to-60% to-black/50 shadow-[inset_2px_2px_2px_rgba(255,255,255,0.1)] group-active/button:from-white/10'
      frontClassName='bg-[#1E1E1E]'
      valueClassName='text-plastic-white'
      Texture={<div className='group-active/button:bg-[-1px_-1px] w-full h-full bg-texture-noise-dark bg-[length:80%] opacity-10 mix-blend-screen' />}
      {...rootProps}
    />
  )
}

export function OrangeSquareButton ({
  ...rootProps
}: BaseButtonProps): JSX.Element {
  return (
    <BaseButton
      className='bg-[#F72900] from-white/50 to-60% to-black/50 shadow-[inset_2px_2px_2px_rgba(255,255,255,0.1)] group-active/button:from-white/10 group-active/button:to-black/50'
      frontClassName='bg-[#F72900] shadow-[inset_-8px_-8px_16px_rgba(0,0,0,0.06),inset_0_0_3px_rgba(255,255,255,0.7),inset_8px_8px_16px_rgba(255,145,0,0.5)] group-active/button:shadow-[inset_-8px_-8px_16px_rgba(0,0,0,0.06),inset_0_0_3px_rgba(255,255,255,0.7),inset_4px_4px_8px_rgba(255,145,0,0.25)]'
      reflectClassName='bg-[#F72900]'
      valueClassName='text-plastic-white'
      reflected
      {...rootProps}
    />
  )
}

const TextureLightButton = <div className='mix-blend-multiply group-active/button:bg-[-1px_-1px] w-full h-full bg-texture-grip-dark bg-[length:50%] opacity-5' />

export function CheeseDoodledButton ({
  ...rootProps
}: BaseButtonProps): JSX.Element {
  return (
    <BaseButton
      className='bg-[#BFBEBD] from-white/50 to-60% to-black/50 shadow-[inset_2px_2px_2px_rgba(255,255,255,0.1)] group-active/button:from-white/10 group-active/button:to-black/50'
      frontClassName='bg-[#BFBEBD] shadow-[inset_-8px_-8px_16px_rgba(0,0,0,0.06),inset_0_0_3px_rgba(255,255,255,0.7),inset_8px_8px_16px_rgba(255,145,0,0.5)]'
      valueClassName='text-plastic-white'
      Texture={TextureLightButton}
      {...rootProps}
    />
  )
}

export function GraySquareButton ({
  ...rootProps
}: BaseButtonProps): JSX.Element {
  return (
    <BaseButton
      className='bg-[#BFBEBD] from-white from-45% to-50% to-black/30 shadow-[inset_2px_2px_2px_rgba(255,255,255,0.25)]'
      frontClassName='bg-[#BFBEBD] shadow-[inset_0px_0px_2px_rgba(255,255,255,0.2)]'
      valueClassName='text-plastic-white'
      Texture={TextureLightButton}
      {...rootProps}
    />
  )
}

export function LightGraySquareButton ({
  ...rootProps
}: BaseButtonProps): JSX.Element {
  return (
    <BaseButton
      className='bg-[#CAC9C9] from-white from-45% to-50% to-black/30 shadow-[inset_2px_2px_2px_rgba(255,255,255,0.25)]'
      frontClassName='bg-[#CAC9C9] shadow-[inset_0px_0px_2px_rgba(255,255,255,0.2)]'
      valueClassName='text-plastic-black'
      Texture={TextureLightButton}
      {...rootProps}
    />
  )
}

function buttonWrapperForColor (color: Colors): FunctionComponent<BaseButtonProps> {
  if (color === Colors.Dark) {
    return DarkSquareButton
  } else if (color === Colors.Orange) {
    return OrangeSquareButton
  } else if (color === Colors.Gray) {
    return GraySquareButton
  } else if (color === Colors.LightGray) {
    return LightGraySquareButton
  } else if (color === Colors.CheeseDoodled) { // 🥚
    return CheeseDoodledButton
  } else {
    return DarkSquareButton
  }
}

export interface SquareButtonProps
  extends Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  color?: Colors
  type?: Types
  value: string
  symbol?: string
  lightIntensity?: number
  Value: JSX.Element
  Symbol: JSX.Element
}

export function SquareButton ({
  color = Colors.Dark,
  value,
  symbol,
  lightIntensity = 0.9,
  onClick,
  type = Types.CapCenter,
  Value,
  Symbol
}: SquareButtonProps): JSX.Element {
  const style = { '--light-intensity': lightIntensity } as React.CSSProperties // eslint-disable-line
  const _value = Value != null ? Value : value
  const _symbol = Symbol != null ? Symbol : symbol
  const ButtonWrapper = buttonWrapperForColor(color)

  return (
    <div
      style={style}
      className='relative group/button ease-out font-ep133 [&_*]:duration-100 [&_*]:transition-all'
    >
      <Hole>
        <ButtonWrapper
          type={type}
          value={_value}
          symbol={_symbol}
          onClick={onClick}
        />
      </Hole>
    </div>
  )
}
