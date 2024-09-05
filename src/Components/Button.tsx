import React from 'react'

interface ButtonProps {
  text: string
  onClick?: () => void
  className?: string
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  className,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      className={`py-4 text-white rounded w-60 bg-secondary ${className}`}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button
