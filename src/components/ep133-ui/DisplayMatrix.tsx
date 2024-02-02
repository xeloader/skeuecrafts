import React, { CSSProperties, ReactElement, useCallback } from 'react'
import SegmentDisplay from './SegmentDisplay'
import classNames from 'classnames'
import { SVGWrapperProps } from './Symbols'

import { renderToStaticMarkup } from 'react-dom/server'
import { normalize } from '../../utils/numbers'

export interface IconStates { [key: number]: DisplayIconState }
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
  backgroundColor?: string
}

const inlineSVG = (markup: string): string => {
  return `data:image/svg+xml;base64,${window.btoa(markup)}`
}

// minGlow + ((1 - minGlow) * glow)

const LedBasedIcon = ({
  Symbol,
  className,
  uuid,
  style,
  backgroundColor = 'black',
  glow = 1,
  minGlow = 0.1
}: LedBasedIconProps): JSX.Element => {
  const tag = useCallback((str: string): string => `${str}_${uuid}`, [uuid])
  const normGlow = normalize(glow, minGlow, 1, 0.15, 1)
  return (
    <div className={classNames(className, '')} style={style}>
      <div>
        {React.cloneElement<SVGWrapperProps>(
          Symbol,
          {
            // data:image/svg+xml;utf8,
            Render: (SVGContent, { width, height, ...props }) => {
              const svgBase = renderToStaticMarkup(<svg width={width} height={height} {...props} />)
              const cutoutBase = `${svgBase.replace('</svg>', renderToStaticMarkup(<rect id={tag('overlay')} fill={backgroundColor} width={width as string} height={height as string} x='0' y='0' />) + '</svg>')}`
              const cutout = svgBase.replace('</svg>', renderToStaticMarkup(SVGContent as ReactElement) + '</svg>')
              return (
                <>
                  <g>
                    {/* <rect fill='black' width={width} height={height} /> */}
                    {/* <rect x='1' y='1' fill='white' width={width} height={height} style={{ opacity: normGlow }} /> */}
                    <rect filter={`url(#${tag('exclude')})`} fill='black' width={width} height={height} />
                    <use href={`#${tag('icon')}`} style={{ mixBlendMode: 'multiply' }} />
                  </g>
                  <defs>
                    <filter id={`${tag('exclude')}`}>
                      <feImage href={`${inlineSVG(cutoutBase)}`} x='0' y='0' width={width} height={height} result={tag('keep')} />
                      <feImage href={`${inlineSVG(cutout)}`} x='0' y='0' width={width} height={height} result={tag('cut')} />
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
  translucent?: boolean
}

export default function DisplayMatrix ({
  value = '',
  dotValue,
  className,
  iconSet,
  backgroundColor,
  translucentIcons,
  iconMeta = {}
}: DisplayMatrixProps): JSX.Element {
  return (
    <div className={classNames('grid grid-cols-subgrid grid-rows-4 gap-1', className)}>

      {Object.entries(iconSet).map(([key, icon], i) => {
        const name = Number(key)
        const meta = iconMeta?.[name] ?? { glow: 0, translucent: false }
        const Wrapper = (meta.translucent === true || translucentIcons) ? LedBasedIcon : DisplayIcon
        return (
          <Wrapper
            key={key}
            uuid={key}
            backgroundColor={backgroundColor}
            Symbol={icon.Symbol}
            {...meta}
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
