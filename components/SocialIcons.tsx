import React from 'react'

const socials = [
  { href: 'https://github.com/your-github', label: 'GitHub', icon: '🐙' },
  { href: 'https://t.me/your-telegram', label: 'Telegram', icon: '✈️' },
  { href: 'mailto:your@email.com', label: 'Email', icon: '✉️' },
  { href: 'https://linkedin.com/in/your-linkedin', label: 'LinkedIn', icon: '💼' },
  // { href: 'https://instagram.com/your-instagram', label: 'Instagram', icon: '📸' },
]

export default function SocialIcons() {
  return (
    <div className="flex gap-4 mt-6">
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="text-2xl hover:scale-110 transition"
        >
          {s.icon}
        </a>
      ))}
    </div>
  )
}
