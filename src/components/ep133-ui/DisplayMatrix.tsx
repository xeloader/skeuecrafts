import React, { CSSProperties, ReactElement, useCallback } from 'react'
import SegmentDisplay from './SegmentDisplay'
import classNames from 'classnames'
import { SVGWrapperProps } from './Symbols'

import { renderToString } from 'react-dom/server'

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

interface LedBasedIconProps extends DisplayIconProps {
  uuid: string
}

const LedBasedIcon = ({
  Symbol,
  className,
  uuid,
  style,
  glow = 1,
  minGlow = 0.1
}: LedBasedIconProps): JSX.Element => {
  console.log('rendering')
  const tag = useCallback((str: string): string => `${str}_${uuid}`, [uuid])
  return (
    <div className={classNames(className, '')} style={style}>
      <div
        style={{
          opacity: minGlow + ((1 - minGlow) * glow)
        }}
      >
        {React.cloneElement<SVGWrapperProps>(
          Symbol,
          {
            // data:image/svg+xml;utf8,
            Render: (SVGContent, { width, height, ...props }) => {
              // const svgBase = renderToString(<svg {...props} width={width} height={height} />)
              // const cutoutBase = `${svgBase.replace('</svg>', `<rect id='${tag('overlay')}' fill='red' width='${width as string}' height='${height as string}' x='0' y='0' /></svg>`)}`
              // const cutout = svgBase.replace('</svg>', renderToString(SVGContent as ReactElement) + '</svg>')
              return (
                <>
                  <g>
                    <g filter={`url(#${tag('exclude')})`}>
                      <rect id={tag('overlay')} fill='red' width={width} height={height} x='0' y='0' />
                      <use id={tag('cutout')} href={`#${tag('icon')}`} />
                    </g>
                    <use href={`#${tag('icon')}`} />
                  </g>
                  <defs>
                    <filter id={`${tag('exclude')}`}>
                      <feImage href={`#${tag('overlay')}`} x='0' y='0' width={width} height={height} result={tag('keep')} />
                      <feImage href={`#${tag('cutout')}`} x='0' y='0' width={width} height={height} result={tag('cut')} />
                      <feComposite in={tag('keep')} in2={tag('cut')} operator='out' />
                    </filter>
                    <g id={tag('icon')}>
                      {SVGContent}
                    </g>
                  </defs>
                </>
              )
            }
          }
        )}
      </div>
    </div>
  )
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
          <LedBasedIcon
            key={key}
            uuid={key}
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
