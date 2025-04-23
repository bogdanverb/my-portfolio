import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import MobileMenu from './MobileMenu';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export default function Header() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prevPathRef = useRef(router.asPath);
  
  // Отслеживаем скролл для изменения стиля навбара
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Закрываем мобильное меню при изменении маршрута
  useEffect(() => {
    if (prevPathRef.current !== router.asPath) {
      setMobileMenuOpen(false);
      prevPathRef.current = router.asPath;
    }
  }, [router.asPath]);
  
  // Проверяем активность вкладки
  const isActive = (path: string) => {
    if (path === '/') {
      return router.asPath === path;
    }
    return router.asPath.startsWith(path);
  };
  
  return (
    <>
      <header className={`
        py-4 px-6 fixed top-0 left-0 right-0 z-30 transition-all duration-300
        ${scrolled 
          ? 'backdrop-blur-md bg-white/80 dark:bg-gray-900/80 shadow-md' 
          : 'bg-transparent'}
      `}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="text-xl font-bold text-gray-800 dark:text-white">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Script
              </span>
              <span>XX</span>
            </Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navItems.map(item => (
                <motion.li key={item.path}>
                  <Link 
                    href={item.path}
                    className={`
                      px-3 py-2 rounded-md transition-colors relative
                      ${isActive(item.path)
                        ? 'text-primary font-medium' 
                        : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'}
                    `}
                  >
                    {item.label}
                    {isActive(item.path) && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Mobile Menu Button */}
            <motion.button
              className="block md:hidden focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              whileTap={{ scale: 0.9 }}
            >
              <div className="relative w-6 h-5">
                <motion.span
                  className="absolute h-0.5 w-full bg-current rounded-lg"
                  animate={{ 
                    top: mobileMenuOpen ? "50%" : "0", 
                    rotate: mobileMenuOpen ? -45 : 0,
                    translateY: mobileMenuOpen ? "-50%" : 0 
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                />
                <motion.span
                  className="absolute h-0.5 w-full bg-current rounded-lg"
                  animate={{ 
                    opacity: mobileMenuOpen ? 0 : 1,
                    top: "50%",
                    translateY: "-50%" 
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                />
                <motion.span
                  className="absolute h-0.5 w-full bg-current rounded-lg"
                  animate={{ 
                    top: mobileMenuOpen ? "50%" : "100%", 
                    rotate: mobileMenuOpen ? 45 : 0,
                    translateY: mobileMenuOpen ? "-50%" : "-100%" 
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </header>
      
      {/* Используем новый компонент мобильного меню через портал */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu 
            isOpen={mobileMenuOpen} 
            onClose={() => setMobileMenuOpen(false)} 
            navItems={navItems}
          />
        )}
      </AnimatePresence>
    </>
  );
}
