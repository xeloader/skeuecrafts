import React from 'react'

enum ButtonColor {
  LightGray,
  Gray,
  Dark,
  Orange
}

interface SquareButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  reflect: boolean
}

export function SquareButton ({

}: SquareButtonProps) {
  return (
    <button className='w-16 h-16'>
      
    </button>
  )
}