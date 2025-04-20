import React from 'react'

type FadeInProps = {
  children: React.ReactNode
}

export default function FadeIn({ children }: FadeInProps) {
  return <div className="fade-in-section">{children}</div>
}
