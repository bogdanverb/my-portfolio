import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    // Проверяем, первая ли это загрузка
    const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');
    
    if (hasLoadedBefore) {
      // Если не первая загрузка, показываем короткий прелоадер
      setIsFirstLoad(false);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300); // короткая задержка для навигации между страницами
      return () => clearTimeout(timer);
    } else {
      // Первая загрузка - полная анимация
      sessionStorage.setItem('hasLoadedBefore', 'true');
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500); // дольше для первого впечатления
      return () => clearTimeout(timer);
    }
  }, [router.pathname]);
  
  if (!isLoading) return null;
  
  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isFirstLoad ? (
          // Расширенная анимация для первой загрузки
          <>
            <motion.div 
              className="relative w-24 h-24"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.div 
                className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-2 border-4 border-accent border-b-transparent rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
            <motion.p 
              className="mt-6 text-xl font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              ScriptXX
            </motion.p>
            <motion.p 
              className="mt-2 text-sm text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Loading...
            </motion.p>
          </>
        ) : (
          // Упрощенная анимация для навигации
          <motion.div 
            className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
