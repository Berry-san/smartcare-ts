import React from 'react'

interface ButtonProps {
  text: string
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="py-5 text-white rounded w-60 bg-secondary"
    >
      {text}
    </button>
  )
}

export default Button
