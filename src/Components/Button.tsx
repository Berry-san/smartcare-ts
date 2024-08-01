const Button: React.FC<{ text: string }> = ({ text }) => {
  return (
    <button className="py-5 w-60 rounded bg-secondary text-white">
      {text}
    </button>
  )
}

export default Button
