import React from 'react'

interface ButtonProps {
  text: string
  onClick?: () => void
  className?: string
}

const Button: React.FC<ButtonProps> = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`py-4 text-white rounded w-60 bg-secondary ${className}`}
    >
      {text}
    </button>
  )
}

export default Button
