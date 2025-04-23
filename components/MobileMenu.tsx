import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ path: string; label: string }>;
}

export default function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  const router = useRouter();
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  // Создаем портал для меню только на клиенте
  useEffect(() => {
    if (typeof document !== 'undefined') {
      setPortalElement(document.body);
    }

    // При маршрутизации закрываем меню
    router.events.on('routeChangeStart', onClose);
    return () => {
      router.events.off('routeChangeStart', onClose);
    };
  }, [onClose, router.events]);

  // Предотвращаем прокрутку при открытом меню
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!portalElement || !isOpen) {
    return null;
  }

  return createPortal(
    <motion.div
      className="fixed inset-0 z-40 md:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Overlay для закрытия по клику */}
      <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />

      {/* Содержимое меню */}
      <motion.div
        className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-gray-900 shadow-xl overflow-y-auto"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Кнопка закрытия (хрестик) */}
        <motion.button 
          className="absolute top-6 right-6 p-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
          onClick={onClose}
          whileTap={{ scale: 0.9 }}
          aria-label="Close menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>

        <div className="pt-20 pb-6 px-6">
          <nav>
            <ul className="space-y-6">
              {navItems.map(item => (
                <motion.li 
                  key={item.path} 
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link 
                    href={item.path}
                    className={`
                      block text-xl font-medium
                      ${router.asPath === item.path 
                        ? 'text-primary' 
                        : 'text-gray-600 dark:text-gray-300'}
                    `}
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
        </div>
      </motion.div>
    </motion.div>,
    portalElement
  );
}
