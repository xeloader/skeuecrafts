import React, { SVGProps, useEffect, useRef } from 'react'
import * as Symbol from './Symbols'
import { renderToStaticMarkup } from 'react-dom/server'
import { normalize } from '../../utils/numbers'

const markupToB64 = (markup: string): string => {
  return `data:image/svg+xml;base64,${window.btoa(markup)}`
}

interface InlineSVGProps {
  width?: number | string
  height?: number | string
  backgroundColor?: string
}

const inlineSVG = ({
  width = 64,
  height = 64,
  backgroundColor = 'black'
}: InlineSVGProps = {}): string => markupToB64(
  renderToStaticMarkup((
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'>
      <rect fill={backgroundColor} width={width} height={height} x='0' y='0' />
    </svg>
  ))
)

const CutoutFilter = (
  {
    id,
    width,
    height,
    backgroundColor
  }: {
    id: string
    backgroundColor: string
    width: number
    height: number
  }
): JSX.Element => {
  return (
    <filter id={id}>
      <feImage href={inlineSVG({ width, height, backgroundColor })} x='-2' y='-2' width={width + 4} height={height + 4} result='background' />
      <feComposite in='background' in2='SourceGraphic' operator='out' />
    </filter>
  )
}

interface GlowFilterProps extends InlineSVGProps {
  id: string
}

const GlowFilter = (
  {
    id,
    width,
    height,
    backgroundColor
  }: GlowFilterProps
): JSX.Element => {
  return (
    <filter id={id}>
      {/* glow */}
      <feGaussianBlur in='SourceGraphic' stdDeviation='2' result='coloredBlur' />
      <feComponentTransfer in='coloredBlur' result='lessProminentBlur'>
        <feFuncA type='linear' slope='0.25' />
      </feComponentTransfer>
      <feMerge result='glow-icon'>
        <feMergeNode in='lessProminentBlur' />
        <feMergeNode in='SourceGraphic' />
      </feMerge>
      {/* stencil */}
      <feImage href={inlineSVG({ width, height, backgroundColor })} x='-2' y='-2' width={width + 4} height={height + 4} result='background' />
      <feComposite in='glow-icon' in2='background' operator='add' />
    </filter>
  )
}

enum SegmentValue {
  One = '1',
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  Six = '6',
  Seven = '7',
  Eight = '8',
  Nine = '9',
  Zero = '0',
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G',
  I = 'I',
  K = 'K',
  L = 'L',
  M = 'M',
  N = 'N',
  O = 'O',
  P = 'P',
  R = 'R',
  S = 'S',
  T = 'T',
  U = 'U',
  V = 'V',
  X = 'X',
  Y = 'Y',
  h = 'h',
  o = 'o',
  n = 'n',
  Underscore = '_'
}

type SegmentIdentifier = 'left-bar' | 'right-bar' | 'bottom-hole' | 'top-hole' | 'bottom-bar' | 'top-bar' | 'left-bottom-arc' | 'right-bottom-arc' | 'left-top-arc' | 'right-top-arc' | 'dot'

type SegmentMatrix = {
  [key in SegmentIdentifier]?: boolean
}

function getMatrixFor (value?: SegmentValue): SegmentMatrix {
  switch (value) {
    case '1': return { 'right-bar': true }
    case '2': return { 'top-bar': true, 'right-top-arc': true, 'left-bottom-arc': true, 'bottom-bar': true }
    case '3': return { 'top-bar': true, 'right-top-arc': true, 'right-bottom-arc': true, 'bottom-bar': true }
    case '4': return { 'left-top-arc': true, 'right-top-arc': true, 'right-bottom-arc': true }
    case 'S':
    case '5':
      return { 'top-bar': true, 'left-top-arc': true, 'right-bottom-arc': true, 'bottom-bar': true }
    case '6': return { 'top-bar': true, 'left-top-arc': true, 'right-bottom-arc': true, 'bottom-bar': true, 'left-bottom-arc': true }
    case '7': return { 'top-bar': true, 'right-bar': true }
    case '8': return { 'top-bar': true, 'bottom-bar': true, 'left-bottom-arc': true, 'right-bottom-arc': true, 'left-top-arc': true, 'right-top-arc': true }
    case '9': return { 'top-bar': true, 'bottom-bar': true, 'right-bottom-arc': true, 'left-top-arc': true, 'right-top-arc': true }
    case 'O':
    case '0':
      return { 'top-bar': true, 'bottom-bar': true, 'right-bar': true, 'left-bar': true }

    case 'A': return { 'top-bar': true, 'left-top-arc': true, 'right-top-arc': true, 'left-bottom-arc': true, 'right-bottom-arc': true }
    case 'B': return { 'top-bar': true, 'right-top-arc': true, 'right-bottom-arc': true, 'bottom-bar': true, 'left-bar': true }
    case 'C': return { 'top-bar': true, 'bottom-bar': true, 'left-bar': true }
    case 'D': return { 'bottom-hole': true, 'top-hole': true, 'top-bar': true, 'bottom-bar': true, 'right-bar': true }
    case 'E': return { 'top-bar': true, 'bottom-bar': true, 'left-top-arc': true, 'left-bottom-arc': true }
    case 'F': return { 'top-bar': true, 'left-top-arc': true, 'left-bottom-arc': true }
    case 'G': return { 'top-bar': true, 'bottom-bar': true, 'left-bar': true, 'right-bottom-arc': true }
    case 'I': return { 'top-hole': true, 'bottom-hole': true }
    case 'K': return { 'top-hole': true, 'bottom-hole': true, 'right-top-arc': true, 'right-bottom-arc': true }
    case 'L': return { 'left-bar': true, 'bottom-bar': true }
    case 'M': return { 'left-top-arc': true, 'right-top-arc': true, 'right-bar': true, 'left-bar': true }
    case 'N': return { 'left-bar': true, 'left-top-arc': true, 'right-bar': true, 'right-bottom-arc': true }
    case 'P': return { 'top-bar': true, 'left-bar': true, 'right-top-arc': true }
    case 'R': return { 'left-bar': true, 'top-bar': true, 'right-top-arc': true, 'right-bottom-arc': true }
    case 'T': return { 'top-hole': true, 'bottom-hole': true, 'top-bar': true }
    case 'U': return { 'left-bar': true, 'right-bar': true, 'bottom-bar': true }
    case 'V': return { 'left-bar': true, 'left-bottom-arc': true, 'right-top-arc': true }
    case 'X': return { 'left-top-arc': true, 'right-top-arc': true, 'right-bottom-arc': true, 'left-bottom-arc': true }
    case 'Y': return { 'left-top-arc': true, 'right-top-arc': true, 'bottom-hole': true }

    case 'n': return { 'left-bottom-arc': true, 'right-bottom-arc': true }
    case 'h': return { 'left-bar': true, 'left-bottom-arc': true, 'right-bottom-arc': true }
    case 'o': return { 'bottom-bar': true, 'left-bottom-arc': true, 'right-bottom-arc': true }
    case SegmentValue.Underscore: return { 'bottom-bar': true }
    default:
      return {}
  }
}

interface SegmentNumberProps {
  matrix: SegmentMatrix
  activeProps?: any
  inactiveProps?: any
  dot?: boolean
  id?: string
  hideDot?: boolean
}

const SegmentNumber = ({
  matrix,
  dot,
  hideDot = false,
  activeProps,
  inactiveProps,
  ...rootProps
}: SegmentNumberProps): JSX.Element => {
  return (
    <g {...rootProps}>
      <path {...matrix['left-bar'] === true ? activeProps : inactiveProps} name='left-bar' d='M13.5599 26.8531L24.1955 16.0129L25.9628 16.7585V122.247L24.1955 122.993L13.5599 112.152V26.8531Z' />
      <path {...matrix['right-bar'] === true ? activeProps : inactiveProps} name='right-bar' d='M99.0377 16.0118L109.673 26.852V112.151L99.0377 122.987L97.2704 122.246V16.7574L99.0377 16.0118Z' />
      <path {...matrix['bottom-hole'] === true ? activeProps : inactiveProps} name='bottom-hole' d='M55.4197 83.7214V122.16L61.6212 124.268L67.8226 122.16V83.7214L61.6212 80.562L55.4197 83.7214Z' />
      <path {...matrix['top-hole'] === true ? activeProps : inactiveProps} name='top-hole' d='M55.4197 16.8483L61.6212 14.7406L67.8226 16.8483V55.2869L61.6212 58.4463L55.4197 55.2869V16.8483Z' />
      <path {...matrix['bottom-bar'] === true ? activeProps : inactiveProps} name='bottom-bar' d='M61.9556 126.362H41.4574L34.4785 133.474L39.9071 139H83.308L88.7366 133.474L81.7577 126.362H61.9556Z' />
      <path {...matrix['left-bottom-arc'] === true ? activeProps : inactiveProps} name='left-bottom-arc' d='M60.0572 77.3985L41.4574 87.9327V121.63L32.2864 131.108L29.0591 127.949V80.9588L46.1085 71.0798H60.0572V77.3985Z' />
      <path {...matrix['right-bottom-arc'] === true ? activeProps : inactiveProps} name='right-bottom-arc' d='M63.158 77.3985L81.7623 87.9327V121.63L90.9334 131.108L94.1652 127.949V80.9588L77.1112 71.0798H63.158V77.3985Z' />
      <path {...matrix['left-top-arc'] === true ? activeProps : inactiveProps} name='left-top-arc' d='M60.0572 61.6019L41.4574 51.072V17.3747L32.2864 7.89648L29.0591 11.0559V58.0416L46.1085 67.9207H60.0572V61.6019Z' />
      <path {...matrix['right-top-arc'] === true ? activeProps : inactiveProps} name='right-top-arc' d='M63.158 61.6019L81.7623 51.072V17.3747L90.9334 7.89648L94.1652 11.0559V58.0416L77.1112 67.9207H63.158V61.6019Z' />
      <path {...matrix['top-bar'] === true ? activeProps : inactiveProps} name='top-bar' d='M88.7366 5.53004L81.7577 12.6376H61.6075H41.4574L34.4785 5.53004L39.9071 0H83.308L88.7366 5.53004Z' />
      {!hideDot && <path {...(matrix.dot === true || dot === true) ? activeProps : inactiveProps} name='dot' d='M14.1883 132.669C14.1883 136.66 11.0107 139.897 7.09188 139.897C3.17756 139.897 0 136.66 0 132.669C0 128.677 3.17756 125.441 7.09188 125.441C11.0107 125.441 14.1883 128.677 14.1883 132.669Z' />}
    </g>
  )
}

interface LedIconProps extends DisplayIconState, SVGProps<SVGElement> {
  filter?: string
  ledColor?: string
}

// remove pollution filter from mixBlendMode

const LedIcon = ({
  glow = 0,
  filter,
  translucent,
  ledColor,
  ...rootProps
}: LedIconProps): JSX.Element => {
  const _glow = normalize(glow, 0, 1, 0.15, 1)
  return (
    <g>
      <rect
        fill={ledColor}
        opacity={translucent !== true
          ? glow
          : 0}
        className='transition-opacity duration-100'
        {...rootProps}
      />
      <use
        {...rootProps}
        filter={filter}
        className='duration-200 '
        style={{ mixBlendMode: 'darken' }}
      />
    </g>
  )
}

const animations = {
  startup: {
    fill: 'url(#startup)',
    durationMs: 650,
    repeatCount: 'infinite'
  }
}

interface DisplayProps {
  ledColor?: string
  displayValue?: string
  displayDots?: string
  backgroundColor?: string
  animation?: string
  iconMeta: IconStates
  iconSet: IconSet
}

export interface IconStates { [key: number]: DisplayIconState }
// export interface IconSet { [key: number]: GridIcon }
interface DisplayIconState {
  glow?: number
  translucent?: boolean
}

const GridX = [5, 94, 182, 271, 359, 447, 535, 623, 710, 799, 888, 976, 1064, 1152, 1241, 1330, 1419, 1506, 1595, 1683]
const GridY = [7, 95, 184, 272]
const blockWidth = 64
const blockHeight = 64

export interface IconSet {
  [key: number]: GridIcon
}

interface GridIcon {
  Symbol: JSX.Element
  col: number
  row: number
  width?: number
  height?: number
}

export default function Display ({
  backgroundColor = 'black',
  iconSet,
  displayValue = '',
  displayDots = '',
  ledColor = 'white',
  animation,
  iconMeta
}: DisplayProps): JSX.Element {
  const startAnimation = useRef<SVGAnimateElement>()
  const activeProps = {
    fill: "url('#lit-segment')",
    filter: "url('#segment-glow')"
  }
  const inactiveProps = {
    fill: "url('#unlit-segment')"
  }
  const screenFill = animation != null
    ? `url(#${animation})`
    : 'url(#standby)'
  const gradientStopOpacity = 0.9
  useEffect(() => {
    if (animation === 'startup' && startAnimation?.current != null) {
      startAnimation.current.beginElement()
    }
  }, [animation])
  return (
    <div>
      <svg width='100%' height='100%' viewBox='0 0 1752 343' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g id='screen'>
          <rect id='base' x='2' y='2' width='1748' height='339' fill={screenFill} />
          <path id='pollution-filter' fill={backgroundColor} fill-rule='evenodd' clip-rule='evenodd' d='M0 0H1752V343H0V0ZM5 7H69V71H5V7ZM1040 7H976V71H1040V7ZM94 7H158V71H94V7ZM1128 7H1064V71H1128V7ZM182 7H246V71H182V7ZM1216 7H1152V71H1216V7ZM271 7H335V71H271V7ZM1305 7H1241V71H1305V7ZM359 7H423V71H359V7ZM1394 7H1330V71H1394V7ZM447 7H511V71H447V7ZM1483 7H1419V71H1483V7ZM535 7H599V71H535V7ZM1570 7H1506V71H1570V7ZM1595 7H1659V71H1595V7ZM1747 7H1683V71H1747V7ZM5 95H69V159H5V95ZM1040 95H976V159H1040V95ZM94 95H158V159H94V95ZM1128 95H1064V159H1128V95ZM182 95H246V159H182V95ZM1216 95H1152V159H1216V95ZM271 95H335V159H271V95ZM1305 95H1241V159H1305V95ZM359 95H423V159H359V95ZM1394 95H1330V159H1394V95ZM447 95H511V159H447V95ZM1483 95H1419V159H1483V95ZM535 95H599V159H535V95ZM1570 95H1506V159H1570V95ZM1595 95H1659V159H1595V95ZM1747 95H1683V159H1747V95ZM5 184H69V248H5V184ZM1040 184H976V248H1040V184ZM94 184H158V248H94V184ZM1128 184H1064V248H1128V184ZM182 184H246V248H182V184ZM1216 184H1152V248H1216V184ZM271 184H335V248H271V184ZM1305 184H1241V248H1305V184ZM359 184H423V248H359V184ZM1394 184H1330V248H1394V184ZM447 184H511V248H447V184ZM1483 184H1419V248H1483V184ZM535 184H599V248H535V184ZM687 184H623V248H687V184ZM710 184H774V248H710V184ZM863 184H799V248H863V184ZM888 184H952V248H888V184ZM1570 184H1506V248H1570V184ZM1595 184H1659V248H1595V184ZM1747 184H1683V248H1747V184ZM5 272H69V336H5V272ZM1126 280H978V328H1126V280ZM94 272H158V336H94V272ZM246 272H182V336H246V272ZM1154 280H1302V328H1154V280ZM421 280H273V328H421V280ZM1330 272H1394V336H1330V272ZM511 272H447V336H511V272ZM1419 272H1483V336H1419V272ZM685 280H537V328H685V280ZM710 272H774V336H710V272ZM950 280H802V328H950V280ZM1506 272H1570V336H1506V272ZM1747 271H1595V336H1747V271Z' />
          <g id='matrix'>
            <use href='#first-number' x='621' y='13' />
            <use href='#second-number' x='726' y='13' />
            <use href='#third-number' x='833' y='13' />
          </g>
          <g id='icons'>
            {Object.entries(iconSet)
              .map(([name, meta]) => {
                const lightMeta = iconMeta[Number(name)] ?? { glow: 0 }
                const width = meta.width ?? 1
                const widthPx = meta.widthPx ??
                  (meta.width ?? 1) * blockWidth
                const heightPx = meta.heightPx ??
                  (meta.height ?? 1) * blockHeight
                return (
                  <LedIcon
                    key={name}
                    href={`#${meta.id}`}
                    x={GridX[meta.col - 1]}
                    y={GridY[meta.row - 1]}
                    width={widthPx}
                    ledColor={ledColor}
                    height={heightPx}
                    filter={`url(#cutout-${width}b)`}
                    translucent={animation != null}
                    glow={lightMeta.glow}
                  />
                )
              })}
          </g>
        </g>
        <defs>
          <GlowFilter id='cutout-1b' width='64' height='64' backgroundColor={backgroundColor} />
          <GlowFilter id='cutout-2b' width='192' height='64' backgroundColor={backgroundColor} />
          <GlowFilter id='cutout-boxer' width='152' height='72' backgroundColor={backgroundColor} />

          <SegmentNumber id='first-number' hideDot activeProps={activeProps} inactiveProps={inactiveProps} matrix={getMatrixFor(displayValue[0])} />
          <SegmentNumber id='second-number' activeProps={activeProps} inactiveProps={inactiveProps} matrix={getMatrixFor(displayValue[1])} />
          <SegmentNumber id='third-number' activeProps={activeProps} inactiveProps={inactiveProps} matrix={getMatrixFor(displayValue[2])} />

          <radialGradient id='myGradient'>
            <stop offset='10%' stop-color='gold' />
            <stop offset='95%' stop-color='red' />
          </radialGradient>

          <linearGradient id='standby'>
            <stop offset='0' stopColor={backgroundColor} stopOpacity={gradientStopOpacity} />
            <stop offset='1' stopColor={backgroundColor} stopOpacity={gradientStopOpacity} />
          </linearGradient>

          <linearGradient id='startup' y1='-0.25' y2='-0.75'>
            <animateTransform
              ref={startAnimation}
              attributeName='gradientTransform'
              attributeType='XML'
              type='translate'
              from='-2'
              to='1.5'
              fill='freeze'
              restart='always'
              dur={`${(animations.startup.durationMs / 1000).toFixed(2)}s`}
              repeatCount='indefinite'
            />
            <stop offset='0' stopColor={backgroundColor} stopOpacity={gradientStopOpacity} />
            <stop offset='0.05' stopColor={backgroundColor} stopOpacity={gradientStopOpacity} />
            <stop offset='0.25' stopColor={ledColor} />
            <stop offset='0.5' stopColor={ledColor} />
            <stop offset='0.55' stopColor={ledColor} />
            <stop offset='0.95' stopColor={backgroundColor} stopOpacity={gradientStopOpacity} />
            <stop offset='1' stopColor={backgroundColor} stopOpacity={gradientStopOpacity} />
          </linearGradient>

          <filter id='segment-glow'>
            <feGaussianBlur stdDeviation='2' />
            <feComponentTransfer result='coloredBlur'>
              <feFuncA type='linear' slope='1' />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in='blur' />
              <feMergeNode in='SourceGraphic' />
            </feMerge>
          </filter>
          <radialGradient id='lit-segment'>
            <stop offset='0%' stop-color='#EAFAFF' />
            <stop offset='100%' stop-color='#B9CDE2' />
          </radialGradient>
          <radialGradient id='unlit-segment'>
            <stop offset='0%' stop-color='#313131' />
            <stop offset='100%' stop-color='#2C2C2C' />
          </radialGradient>

          {/* symbols */}
          {Object.entries(iconSet)
            .map(([name, meta]: [string, GridIcon]) => {
              return (
                React.cloneElement(meta.Symbol, { contentOnly: false, id: meta.id })
              )
            })}
        </defs>
      </svg>

    </div>
  )
}
