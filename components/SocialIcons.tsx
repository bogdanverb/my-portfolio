import React from 'react'
import { Github, Linkedin, Mail, Instagram } from './ModernIcons'

export default function SocialIcons() {
  return (
    <div className="flex gap-4">
      <a
        href="https://github.com/bogdanverb"
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-white/80 dark:bg-gray-900/80 rounded-full p-3 shadow-lg hover:scale-110 transition-all duration-200 border border-gray-200 dark:border-gray-800 hover:border-primary"
        aria-label="GitHub профиль"
        title="Посетить GitHub профиль"
      >
        <Github className="w-6 h-6 text-gray-700 dark:text-gray-200 group-hover:text-primary transition" />
      </a>
      <a
        href="https://www.linkedin.com/in/scriptxx/"
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-white/80 dark:bg-gray-900/80 rounded-full p-3 shadow-lg hover:scale-110 transition-all duration-200 border border-gray-200 dark:border-gray-800 hover:border-primary"
        aria-label="LinkedIn профиль"
        title="Посетить LinkedIn профиль"
      >
        <Linkedin className="w-6 h-6 text-gray-700 dark:text-gray-200 group-hover:text-primary transition" />
      </a>
      <a
        href="mailto:bogdan.verb1@gmail.com"
        className="group bg-white/80 dark:bg-gray-900/80 rounded-full p-3 shadow-lg hover:scale-110 transition-all duration-200 border border-gray-200 dark:border-gray-800 hover:border-primary"
        aria-label="Отправить письмо"
        title="Отправить письмо на почту"
      >
        <Mail className="w-6 h-6 text-gray-700 dark:text-gray-200 group-hover:text-primary transition" />
      </a>
      <a
        href="https://www.instagram.com/bogdan_verboviy/"
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-white/80 dark:bg-gray-900/80 rounded-full p-3 shadow-lg hover:scale-110 transition-all duration-200 border border-gray-200 dark:border-gray-800 hover:border-primary"
        aria-label="Instagram профиль"
        title="Посетить Instagram профиль"
      >
        <Instagram className="w-6 h-6 text-gray-700 dark:text-gray-200 group-hover:text-primary transition" />
      </a>
    </div>
  )
}
