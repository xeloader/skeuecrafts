import classNames from 'classnames'
import React, { useCallback, useEffect, useRef, useState } from 'react'

export interface KnobProps {
  step: number
}

export default function Knob ({
  step = 10
}): JSX.Element {
  const prevValue = useRef<number>(0)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [value, setValue] = useState<number>(0)

  const handleDrag = useCallback(() => {
    prevValue.current = 0
    setIsDragging(true)
  }, [])

  const handleMouseMove = useCallback((event: MouseEvent): any => {
    const mx = event.clientX
    if (isDragging && prevValue.current !== mx) {
      const isIncreasing = prevValue.current < mx
      const add = isIncreasing
        ? step
        : -step
      prevValue.current = mx
      setValue(value => value + add)
    }
  }, [isDragging, step])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])
  return (

    <div>
      <p
        className={classNames(
          'cursor-ew-resize select-none',
          isDragging && 'bg-[blue]'
        )}
        onMouseDown={handleDrag}
      >{value} {isDragging ? 'dragging' : 'nope'}
      </p>
    </div>
  )
}
