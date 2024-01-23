import { useState, useCallback } from 'react'

function useHoldButton (callback: () => void, duration: number): {
  onMouseDown: () => void
  onMouseUp: () => void
  onTouchStart: () => void
  onTouchEnd: () => void
} {
  const [timer, setTimer] = useState<NodeJS.Timeout>()

  const start = useCallback(() => {
    const timeoutId = setTimeout(callback, duration)
    setTimer(timeoutId)
  }, [callback, duration])

  const clear = useCallback(() => {
    clearTimeout(timer)
    setTimer(undefined)
  }, [timer, duration])

  return {
    onMouseDown: start,
    onMouseUp: clear,
    onTouchStart: start,
    onTouchEnd: clear
  }
}

export default useHoldButton
