import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Analytics } from "@vercel/analytics/react"

// Альтернативные современные иконки для ThemeToggle (минимализм, tech)
function CustomThemeToggle({ theme, toggle }: { theme: string; toggle: () => void }) {
  // SSR-safe: не показываем SVG до первого эффекта на клиенте
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md hover:scale-110 transition-all duration-200"
    >
      {mounted && theme === 'dark' && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79Z"
            stroke="#6366f1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      )}
      {mounted && theme === 'light' && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="5" stroke="#FF5733" strokeWidth="2" />
          <g stroke="#6366f1" strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </g>
        </svg>
      )}
    </button>
  )
}

// Живая SVG-сеть с useMemo для оптимизации
function NetworkSVG() {
  const cols = 6
  const rows = 10
  const width = 1920
  const height = 5000
  const xStep = width / (cols - 1)
  const yStep = height / (rows - 1)

  // Мемоизация точек и линий
  const { points, lines } = React.useMemo(() => {
    const points: { x: number; y: number; key: string }[] = []
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const rx = i === 0 || i === cols - 1 ? 0 : Math.sin(j + i) * 18
        const ry = j === 0 || j === rows - 1 ? 0 : Math.cos(i + j) * 18
        points.push({
          x: Math.round(i * xStep + rx),
          y: Math.round(j * yStep + ry),
          key: `${i}-${j}`,
        })
      }
    }
    const lines: { x1: number; y1: number; x2: number; y2: number; key: string; group: number }[] = []
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const idx = i * rows + j
        if (i < cols - 1) {
          const right = (i + 1) * rows + j
          lines.push({
            x1: points[idx].x,
            y1: points[idx].y,
            x2: points[right].x,
            y2: points[right].y,
            key: `h-${i}-${j}`,
            group: (i + j) % 5,
          })
        }
        if (j < rows - 1) {
          const down = i * rows + (j + 1)
          lines.push({
            x1: points[idx].x,
            y1: points[idx].y,
            x2: points[down].x,
            y2: points[down].y,
            key: `v-${i}-${j}`,
            group: (i + j + 1) % 5,
          })
        }
        if (i < cols - 1 && j < rows - 1) {
          const diag = (i + 1) * rows + (j + 1)
          lines.push({
            x1: points[idx].x,
            y1: points[idx].y,
            x2: points[diag].x,
            y2: points[diag].y,
            key: `d1-${i}-${j}`,
            group: (i * j) % 5,
          })
        }
        if (i > 0 && j < rows - 1) {
          const diag = (i - 1) * rows + (j + 1)
          lines.push({
            x1: points[idx].x,
            y1: points[idx].y,
            x2: points[diag].x,
            y2: points[diag].y,
            key: `d2-${i}-${j}`,
            group: (i * j + 2) % 5,
          })
        }
      }
    }
    return { points, lines }
  }, [cols, rows, width, height, xStep, yStep])

  return (
    <svg
      className="absolute left-0 top-0 w-full pointer-events-none select-none"
      style={{ minHeight: '100vh', zIndex: 0 }}
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      preserveAspectRatio="none"
    >
      {/* Линии с увеличенной яркостью (меньше прозрачности) */}
      {lines.map((line, idx) => (
        <motion.line
          key={line.key}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke={idx % 3 === 0 ? "#6366f1" : "#FF5733"}
          strokeWidth={1.1}
          strokeLinecap="round"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{
            opacity: [
              0,
              0.22 + 0.10 * (line.group === 0 ? 1 : 0),
              0.28 + 0.12 * (line.group === 1 ? 1 : 0),
              0.18 + 0.15 * (line.group === 2 ? 1 : 0),
              0.21 + 0.13 * (line.group === 3 ? 1 : 0),
              0.19 + 0.13 * (line.group === 4 ? 1 : 0),
              0,
            ],
            pathLength: [0, 1, 0.97, 1],
          }}
          transition={{
            delay: 0.1 + (line.group) * 0.13,
            duration: 6 + (line.group),
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}
      {/* Точки (оставляем как есть, они уже достаточно яркие) */}
      {points.map((pt, idx) => (
        <motion.circle
          key={pt.key}
          cx={pt.x}
          cy={pt.y}
          r={idx % 7 === 0 ? 5 : 3}
          fill={idx % 2 === 0 ? "#6366f1" : "#FF5733"}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{
            opacity: [0, 0.32, 0.18, 0.32],
            scale: [1, 1.18, 1],
          }}
          transition={{
            delay: 0.2 + (idx % 10) * 0.03,
            duration: 6 + (idx % 5),
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}
    </svg>
  )
}

function Navbar({
  showNavbar,
  theme,
  toggleTheme,
  mobileOpen,
  setMobileOpen,
}: {
  showNavbar: boolean
  theme: string
  toggleTheme: () => void
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
}) {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/skills", label: "Skills" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`py-6 px-4 md:px-10 bg-white dark:bg-gray-900 backdrop-blur-xl shadow-2xl flex items-center border-b border-gray-200 dark:border-gray-800 rounded-b-2xl sticky top-0 z-20 transition-transform duration-500 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={{ willChange: 'transform' }}
    >
      {/* Desktop меню */}
      <nav className="hidden md:flex gap-8 flex-1 text-lg font-semibold">
        {navLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-primary transition-all duration-200 hover:drop-shadow-glow"
            onClick={() => {}}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="hidden md:flex items-center gap-2 ml-6">
        <CustomThemeToggle theme={theme} toggle={toggleTheme} />
      </div>
      {/* Мобильный бургер */}
      <div className="flex md:hidden flex-1 justify-end items-center">
        <button
          aria-label="Открыть меню"
          className={`p-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg transition-all duration-200 focus:outline-none ${
            mobileOpen ? 'scale-90' : 'scale-100'
          }`}
          onClick={() => setMobileOpen(true)}
        >
          {/* Анимированный бургер */}
          <span className="block w-7 h-1 bg-primary rounded transition-all duration-300 mb-1" style={{ transform: mobileOpen ? 'rotate(45deg) translateY(8px)' : 'none' }} />
          <span className={`block w-7 h-1 bg-primary rounded transition-all duration-300 mb-1 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className="block w-7 h-1 bg-primary rounded transition-all duration-300" style={{ transform: mobileOpen ? 'rotate(-45deg) translateY(-8px)' : 'none' }} />
        </button>
      </div>
    </header>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  const [showNavbar, setShowNavbar] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastScroll = useRef(0)
  const userScrolled = useRef(false)

  // Инициализация темы по классу html (фикс бага с несоответствием темы)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      if (document.documentElement.classList.contains('dark')) return 'dark'
      return 'light'
    }
    // SSR fallback
    return 'light'
  })

  useEffect(() => {
    const checkScroll = () => {
      const current = window.scrollY
      lastScroll.current = current
      if (current <= 0) {
        setShowNavbar(true)
        setShowScrollTop(false)
      } else if (current > 80) {
        setShowNavbar(false)
        setShowScrollTop(true)
      } else {
        setShowNavbar(true)
        setShowScrollTop(false)
      }
    }

    checkScroll()

    let ticking = false
    const handleScroll = () => {
      const current = window.scrollY
      if (!userScrolled.current && current > 0) {
        userScrolled.current = true
      }
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!userScrolled.current || current <= 0) {
            setShowNavbar(true)
            setShowScrollTop(false)
          } else if (current > lastScroll.current && current > 80) {
            setShowNavbar(false)
            setShowScrollTop(true)
          } else if (current < lastScroll.current) {
            setShowNavbar(true)
            if (current < 80) setShowScrollTop(false)
          }
          lastScroll.current = current
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', checkScroll)
    window.addEventListener('load', checkScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkScroll)
      window.removeEventListener('load', checkScroll)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const html = document.documentElement
      if (theme === 'dark') {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    }
  }, [theme])

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-secondary dark:text-gray-100 transition-colors duration-300 relative overflow-x-hidden">
      {/* SVG-сеть на всю страницу, скроллится вместе с контентом */}
      <div className="absolute inset-0 w-full pointer-events-none z-0">
        <NetworkSVG />
      </div>
      {/* Navbar (адаптивный) */}
      <Navbar
        showNavbar={showNavbar}
        theme={theme}
        toggleTheme={toggleTheme}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      {/* Overlay и меню на самом верхнем уровне */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50"
          aria-hidden="true"
          tabIndex={-1}
          onClick={() => setMobileOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40 transition-opacity duration-300" />
          <nav
            className="absolute top-0 right-0 h-screen w-[320px] max-w-full flex flex-col p-8 gap-0 animate-slide-in bg-white dark:bg-gray-900 shadow-2xl rounded-l-2xl border-l border-gray-200 dark:border-gray-800"
            style={{
              opacity: 1,
              zIndex: 9999,
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              aria-label="Закрыть меню"
              className="self-end mb-6 p-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow transition-all duration-200 hover:scale-110 flex items-center justify-center"
              onClick={() => setMobileOpen(false)}
            >
              {/* SVG-крестик */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <line x1="6" y1="6" x2="18" y2="18" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="18" y1="6" x2="6" y2="18" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </button>
            <div className="flex flex-col gap-0">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/skills", label: "Skills" },
                { href: "/projects", label: "Projects" },
                { href: "/blog", label: "Blog" },
                { href: "/resume", label: "Resume" },
                { href: "/contact", label: "Contact" },
              ].map((link, idx, arr) => (
                <React.Fragment key={link.href}>
                  <a
                    href={link.href}
                    className="text-lg font-semibold py-3 px-2 rounded transition-all duration-200 hover:bg-primary/10 hover:text-primary flex items-center group"
                    style={{
                      animation: `fadeInSection 0.4s cubic-bezier(0.4,0,0.2,1) ${0.08 * idx + 0.1}s both`
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                  {idx < arr.length - 1 && (
                    <div className="border-b border-gray-200 dark:border-gray-700 mx-2" />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="mt-8">
              <CustomThemeToggle theme={theme} toggle={toggleTheme} />
            </div>
          </nav>
        </div>
      )}
      {/* Кнопка "вверх" */}
      <button
        aria-label="Scroll to top"
        onClick={handleScrollTop}
        className={`fixed right-6 bottom-8 z-40 bg-primary text-white rounded-full shadow-lg p-3 transition-all duration-500 hover:bg-accent focus:outline-none ${
          showScrollTop ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-8'
        }`}
        style={{ boxShadow: '0 4px 16px 0 #6366f1a0', willChange: 'opacity, transform' }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <motion.path
            d="M12 19V5M12 5L6 11M12 5l6 6"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        </svg>
      </button>
      {/* Контент с плавной анимацией появления секций */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="fade-in-section">{children}</div>
      </main>
      {/* Футер без анимации */}
      <footer className="py-10 px-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 text-center mt-12 shadow-inner rounded-t-2xl relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"></div>
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-2/3 h-24 bg-gradient-to-r from-primary/30 via-accent/20 to-secondary/10 blur-2xl opacity-40 animate-pulse" />
        <p className="mb-2 text-lg font-medium relative z-10">
          © {new Date().getFullYear()} <span className="text-primary font-bold">Bohdan Verbovyi</span>. All rights reserved.
        </p>
        <p className="relative z-10">
          Made with <span className="text-red-400 animate-pulse">❤️</span> using{' '}
          <a href="https://nextjs.org" className="text-primary hover:underline font-semibold transition-all duration-200 hover:drop-shadow-glow">Next.js</a>
        </p>
      </footer>
      <Analytics />
    </div>
  )
}

export default Layout
