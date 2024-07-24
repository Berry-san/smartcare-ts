import React, { useState, useEffect } from 'react'

const getGreeting = (): string => {
  const now = new Date()
  const hours = now.getHours()

  if (hours >= 0 && hours < 12) {
    return 'Good Morning'
  } else if (hours >= 12 && hours < 18) {
    return 'Good Afternoon'
  } else {
    return 'Good Evening,'
  }
}

const Greeting: React.FC = () => {
  const [greeting, setGreeting] = useState<string>(getGreeting())

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreeting())
    }, 1000 * 60) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return <h1>{greeting}, Bob</h1>
}

export default Greeting
