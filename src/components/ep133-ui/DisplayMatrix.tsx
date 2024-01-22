import React, { CSSProperties } from 'react'
import SegmentDisplay from './SegmentDisplay'
import classNames from 'classnames'
import { SVGWrapperProps } from './Symbols'

export interface IconStates { [key: number]: DisplayIconState }
export interface IconSet { [key: number]: GridIcon }
export interface DisplayMatrixProps {
  value?: string
  dotValue?: string
  iconSet: IconSet
  iconMeta?: IconStates
  className?: string
}

interface GridIcon {
  Symbol: JSX.Element
  col: number
  row: number
  width?: number
  height?: number
}

interface DisplayIconProps {
  glow?: number
  minGlow?: number
  Symbol: JSX.Element
  className?: string
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
        {React.cloneElement<SVGWrapperProps>(Symbol, {
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

export default function DisplayMatrix ({
  value = '',
  dotValue,
  className,
  iconSet,
  iconMeta = {}
}: DisplayMatrixProps): JSX.Element {
  return (
    <div className={classNames('grid grid-cols-subgrid grid-rows-4 gap-1', className)}>

      {Object.entries(iconSet).map(([key, icon], i) => {
        const name = Number(key)
        return (
          <DisplayIcon
            key={key}
            Symbol={icon.Symbol}
            {...iconMeta?.[name] ?? { glow: 0 }}
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
