import React, { useEffect, useRef, useState } from 'react'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

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

// Хук для получения размеров окна
function useWindowSize() {
  const [size, setSize] = useState({ width: 1920, height: 1080 });
  useEffect(() => {
    function update() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return size;
}

// Живая SVG-сеть с useMemo для оптимизации
function NetworkSVG({ width, height }: { width: number; height: number }) {
  // Адаптируем сетку для мобильных устройств
  const isMobile = width < 768;
  const cols = isMobile ? 4 : 6;
  const rows = 10;
  const xStep = width / (cols - 1);
  const yStep = height / (rows - 1);

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
      width={width}
      height={height}
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
      className={`py-6 px-4 md:px-10 bg-white dark:bg-gray-900 backdrop-blur-xl shadow-2xl flex items-center border-b border-gray-200 dark:border-gray-800 rounded-b-2xl sticky top-0 z-50 transition-all duration-300 ${
        showNavbar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      } ${mobileOpen ? 'md:translate-y-0 md:opacity-100 -translate-y-full opacity-0' : ''}`}
      style={{ willChange: 'transform, opacity' }}
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
      {/* Мобильный бургер с повышенным z-index - отслеживаем его положение */}
      <div className="flex md:hidden flex-1 justify-end items-center relative z-[102]" id="burger-container">
        <button
          aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
          className="p-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg transition-all duration-200 focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {/* Обе иконки имеют одинаковый размер и центрирование */}
          <div className="w-7 h-7 flex flex-col justify-center items-center">
            {mobileOpen ? (
              // Крестик с такой же толщиной как и полоски бургера
              <>
                <span className="absolute w-7 h-1 bg-primary rounded transition-all duration-300 transform rotate-45" />
                <span className="absolute w-7 h-1 bg-primary rounded transition-all duration-300 transform -rotate-45" />
              </>
            ) : (
              // Стандартный бургер при закрытом меню
              <>
                <span className="block w-7 h-1 bg-primary rounded mb-1.5" />
                <span className="block w-7 h-1 bg-primary rounded mb-1.5" />
                <span className="block w-7 h-1 bg-primary rounded" />
              </>
            )}
          </div>
        </button>
      </div>
    </header>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  const [showNavbar, setShowNavbar] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false) // Новое состояние для анимации
  const lastScroll = useRef(0)
  const userScrolled = useRef(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(3000)

  const { theme, setTheme } = useTheme()
  const { width, height } = useWindowSize()

  // Обработчик для плавного открытия/закрытия меню
  const handleToggleMenu = (open: boolean) => {
    if (open) {
      // Сначала показываем меню
      setMenuVisible(true);
      // На мобильных - скрыть навбар (на десктопе оставить)
      if (width < 768) {
        setShowNavbar(false);
      }
      // Блокируем прокрутку
      document.body.style.overflow = 'hidden';
      // Небольшая задержка для правильной анимации
      setTimeout(() => setMobileOpen(true), 10);
    } else {
      // Сначала анимируем закрытие
      setMobileOpen(false);
      // Через 200мс показываем навбар
      setTimeout(() => {
        // Проверяем нужно ли показать навбар после закрытия меню
        const current = window.scrollY;
        if (current <= 80 || width >= 768) {
          setShowNavbar(true);
        }
      }, 200);
      // Разрешаем прокрутку
      document.body.style.overflow = '';
      // Затем удаляем из DOM после завершения анимации
      setTimeout(() => setMenuVisible(false), 300);
    }
  };

  // Измерение высоты контента
  useEffect(() => {
    const updateContentHeight = () => {
      if (contentRef.current) {
        // Берём максимум из реальной высоты и 3000px
        const newHeight = Math.max(contentRef.current.scrollHeight, 3000);
        setContentHeight(newHeight);
      }
    };
    
    updateContentHeight();
    
    // Перерассчитываем при изменении размера окна
    window.addEventListener('resize', updateContentHeight);
    
    // И через небольшую задержку для уверенности, что всё загрузилось
    const timer = setTimeout(updateContentHeight, 500);
    
    return () => {
      window.removeEventListener('resize', updateContentHeight);
      clearTimeout(timer);
    };
  }, [children]);

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

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div 
      ref={contentRef}
      className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-secondary dark:text-gray-100 transition-colors duration-300 relative overflow-x-hidden"
    >
      {/* SVG-сеть на всю страницу, скроллится вместе с контентом */}
      <div className="absolute inset-0 w-full pointer-events-none z-0">
        <NetworkSVG width={width} height={contentHeight} />
      </div>
      {/* Navbar (адаптивный) */}
      <Navbar
        showNavbar={showNavbar}
        theme={theme ?? 'light'}
        toggleTheme={toggleTheme}
        mobileOpen={mobileOpen}
        setMobileOpen={(open) => handleToggleMenu(open)}
      />
      {/* Overlay и меню с плавным закрытием */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
          menuVisible ? 'pointer-events-auto' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!menuVisible}
        tabIndex={-1}
        onClick={() => handleToggleMenu(false)}
        style={{ willChange: 'opacity' }}
      >
        {/* Плавное появление/исчезновение фона */}
        <div 
          className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Меню с крестиком в правом углу, сдвинутым левее для соответствия с бургером */}
        <nav
          className={`fixed top-0 right-0 h-screen w-[320px] max-w-[85vw] flex flex-col p-8 pt-16 gap-0 bg-white dark:bg-gray-900 shadow-2xl rounded-l-2xl border-l border-gray-200 dark:border-gray-800 transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ zIndex: 100, willChange: 'transform' }}
          onClick={e => e.stopPropagation()}
        >
          {/* Крестик в правом углу, корректируем положение статической величиной */}
          <button
            aria-label="Закрыть меню"
            className="absolute p-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg transition-all duration-200 focus:outline-none hover:scale-105 md:hidden"
            onClick={() => handleToggleMenu(false)}
            style={{ 
              right: '18px', // Подкорректировали позицию вправо/влево
              top: '20px'    // Подкорректировали позицию вверх/вниз
            }}
          >
            <div className="w-7 h-7 flex flex-col justify-center items-center">
              <span className="absolute w-7 h-1 bg-primary rounded transition-all duration-300 transform rotate-45" />
              <span className="absolute w-7 h-1 bg-primary rounded transition-all duration-300 transform -rotate-45" />
            </div>
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
                  onClick={() => handleToggleMenu(false)}
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
            <CustomThemeToggle theme={theme ?? 'light'} toggle={toggleTheme} />
          </div>
        </nav>
      </div>
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
      <SpeedInsights />
    </div>
  )
}

export default Layout
