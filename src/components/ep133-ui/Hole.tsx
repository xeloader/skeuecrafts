import classNames from 'classnames'
import React from 'react'

export interface HoleProps {
  children?: JSX.Element | JSX.Element[] | Array<JSX.Element | undefined>
  fullShadow?: boolean
  isHovered?: boolean
  isActive?: boolean
}

export default function Hole ({
  children,
  fullShadow = false,
  isHovered,
  isActive
}: HoleProps): JSX.Element {
  return (
    <div className={classNames(
      'group/hole',
      isHovered === true && 'is-hovered',
      isActive === true && 'is-active'
    )}
    >
      <div className={classNames(

      )}
      >
        {!fullShadow && (
          <div className='group-hover/hole:opacity-90 opacity-100 transition-all group-active/hole:opacity-0'>
            <div className='absolute left-0 bottom-0 w-3 h-[1px] shadow-[0px_1px_1px_rgba(255,255,255,var(--light-intensity))]' />
            <div className='absolute right-0 bottom-0 w-1 h-[1px] shadow-[0px_1px_1px_rgba(255,255,255,var(--light-intensity))]' />
            <div className='absolute right-0 top-0 w-[1px] h-6 shadow-[1px_0px_1px_rgba(255,255,255,var(--light-intensity))]' />
          </div>
        )}
        <div className={classNames(
          'w-full h-full absolute shadow-[1px_1px_0.5px_rgba(255,255,255,calc(0.8*var(--light-intensity)))] transition-all group-active/hole:opacity-100',
          !fullShadow && isActive === false && 'opacity-0',
          fullShadow && 'opacity-100'
        )}
        />
      </div>
      <div className='flex flex-col items-center justify-center rounded-[1px] bg-[#050404]'>
        {children}
      </div>
    </div>
  )
}
