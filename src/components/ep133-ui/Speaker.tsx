import classNames from 'classnames'
import React from 'react'

export default function Speaker (): JSX.Element {
  const ROWS = 12
  const COLS = 14
  const GRID_SIZE = [ROWS, COLS]
  return (
    <div className='relative h-full w-full grid grid-rows-12 grid-cols-14 overflow-hidden'>
      <div className='row-span-full col-span-full grid grid-cols-subgrid grid-rows-subgrid z-10'>
        {
          Array.from(Array(GRID_SIZE[0])).map((_, row) => {
            return Array.from(Array(GRID_SIZE[1])).map((_, col) => {
              const noShadow = (row === 0 || row === 1 || row === ROWS - 1 || row === ROWS - 2) && (col === 0 || col === 1 || col === COLS - 1 || col === COLS - 2)
              return (
                <div key={`${row}:${col}`}>
                  <div
                    className='h-full w-full'
                    style={{
                      gridColumnStart: col,
                      gridRowStart: row
                    }}
                  >
                    <div className='relative flex items-center justify-center'>
                      <svg width='26px' height='26px' preserveAspectRatio='none' viewBox='0 0 38 38' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path className='fill-[#858382]' fill-rule='evenodd' clip-rule='evenodd' d='M38 0H0V38H38V0ZM19 33C26.732 33 33 26.732 33 19C33 11.268 26.732 5 19 5C11.268 5 5 11.268 5 19C5 26.732 11.268 33 19 33Z' />
                      </svg>
                      <div className={classNames(
                        'absolute size-3/4 rounded-full bg-black/1',
                        !noShadow && 'shadow-[inset_2px_2px_8px_black,1px_1px_0px_rgba(255,255,255,0.4),-1px_-1px_0px_rgba(0,0,0,0.25)]',
                        noShadow && 'shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5),1px_1px_0px_rgba(255,255,255,0.4),-1px_-1px_0px_rgba(0,0,0,0.25)]'
                      )}
                      />
                    </div>
                  </div>
                </div>
              )
            })
          }).flat()
        }
      </div>
      <div className='w-full h-full absolute bg-[black]/40' />
      <div className='grid-cols-subgrid grid-rows-subgrid grid row-span-full col-span-full'>
        <div className='row-[1/3] col-span-2 bg-[white]/25' />
        <div className='row-[-3/-1] col-span-2 bg-[white]/25' />
        <div className='row-[-3/-1] col-[-3/-1] bg-[white]/25' />
        <div className='row-[1/3] col-[-3/-1] bg-[white]/25' />
      </div>
      <div className='bg-black/50 col-[3/-3] row-[2/-2] rounded-full flex items-center justify-center bg-gradient-to-br from-white/5'>
        <div className='bg-black/25 border border-1 border-white/20 w-1/2 h-1/2 rounded-full flex justify-center items-center shadow-[inset_4px_4px_4px_rgba(0,0,0,0.5)]'>
          <div className='bg-white/10 size-3/4 rounded-full shadow-[4px_4px_4px_rgba(0,0,0,0.25),inset_1px_1px_0px_rgba(255,255,255,0.2)] bg-gradient-to-br from-black/50 flex items-center justify-center'>
            <div className='rounded-full size-3/4 bg-gradient-to-br from-white/25 from-0% to-40%' />
          </div>
        </div>
      </div>
    </div>
  )
}
