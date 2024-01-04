import classNames from 'classnames'
import React, { useMemo, useState } from 'react'

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

interface SegmentDisplayMatrix {
  segments: [SegmentMatrix, SegmentMatrix, SegmentMatrix]
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
  activeColor?: string
  inactiveColor?: string
  dot?: boolean
  hideDot?: boolean
}

export function SegmentNumber ({
  matrix = {},
  dot,
  activeColor = "url('#lit-segment')",
  inactiveColor = "url('#unlit-segment')",
  hideDot = false
}: SegmentNumberProps): JSX.Element {
  const activeProps = {
    fill: activeColor,
    filter: "url('#segment-glow')"
  }
  const inactiveProps = {
    fill: inactiveColor
  }
  return (
    <svg width='100%' height='100%' viewBox='0 0 113 143' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g id='segments' className='[&>*]:transition-all'>
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
      <defs>
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
      </defs>
    </svg>

  )
}

// returns segments with dots in value accounted for
function valueToDotSegments (value?: string): SegmentMatrix[] {
  if (value == null) return []
  let ptr = 0
  const segments = []
  while (ptr <= value.length) {
    const cur = value[ptr]
    const prev = value[ptr - 1]
    if (cur === '.') {
      ptr += 1
      continue
    }
    const shouldDot = prev === '.'
    const segment = {
      ...getMatrixFor(value[ptr] as SegmentValue),
      dot: shouldDot
    }
    segments.push(segment)
    ptr += 1
  }
  return segments
}

function valueToSegments (value?: string): SegmentMatrix[] {
  if (value == null) return []
  return value.split('')
    .map((char) => getMatrixFor(char as SegmentValue))
}

export interface SegmentDisplayProps {
  value?: string
  dotValue?: string
  displayLength?: number
  className?: string
}

export default function SegmentDisplay ({
  value = '',
  dotValue = '',
  displayLength = 3,
  className
}: SegmentDisplayProps): JSX.Element {
  const segments = useMemo<SegmentMatrix[]>(() => {
    return valueToSegments(value)
  }, [value, displayLength])
  return (
    <div className={classNames(
      'flex flex-row',
      className
    )}
    >
      {Array.from(Array(displayLength))
        .map((_, i) => (
          <SegmentNumber
            key={i}
            dot={dotValue[i - 1] === '.'}
            matrix={segments[i]}
            hideDot={i === 0}
          />
        ))}
    </div>
  )
}
