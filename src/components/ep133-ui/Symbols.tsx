import React from 'react'

export const TurnAroundArrowLeft = (props: any): JSX.Element => {
  return (
    <svg width='33' height='29' viewBox='0 0 33 29' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g filter='url(#filter0_dii_16_931)'>
        <path d='M17.5 1.15381H23C27.6944 1.15381 31.5 4.95939 31.5 9.65381V9.65381C31.5 14.3482 27.6944 18.1538 23 18.1538H17.5H2M2 18.1538L11 9.15381M2 18.1538L11 27.1538' stroke='#E0E0E0' stroke-width='2' />
      </g>
      <defs>
        <filter id='filter0_dii_16_931' x='0.0345334' y='-0.397473' width='33.0167' height='29.0854' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'>
          <feFlood flood-opacity='0' result='BackgroundImageFix' />
          <feColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha' />
          <feOffset dy='0.551282' />
          <feGaussianBlur stdDeviation='0.137821' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0' />
          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_16_931' />
          <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_16_931' result='shape' />
          <feColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha' />
          <feOffset dx='0.551282' dy='0.551282' />
          <feGaussianBlur stdDeviation='0.551282' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0' />
          <feBlend mode='normal' in2='shape' result='effect2_innerShadow_16_931' />
          <feColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha' />
          <feOffset dx='-0.551282' dy='-0.551282' />
          <feGaussianBlur stdDeviation='0.275641' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0' />
          <feBlend mode='normal' in2='effect2_innerShadow_16_931' result='effect3_innerShadow_16_931' />
        </filter>
      </defs>
    </svg>

  )
}
