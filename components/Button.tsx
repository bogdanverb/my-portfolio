import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}

export default function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={
        variant === 'primary'
          ? 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'
          : 'bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition'
      }
      {...props}
    >
      {children}
    </button>
  )
}
