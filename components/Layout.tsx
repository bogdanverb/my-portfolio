import React, { useEffect, useRef, useState } from 'react'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

import usePageLoad from '../hooks/usePageLoad';
import Header from './Header';
import Footer from './Footer';
import WebBackground from './WebBackground';

function Preloader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-gray-900 transition-opacity duration-500">
      <div className="relative">
        <div className="text-3xl md:text-4xl font-black tracking-tighter animate-pulse">
          <span className="text-primary">Script</span>
          <span className="text-accent relative">
            XX
            <span className="absolute -top-1 right-0 text-xs text-primary opacity-70">™</span>
          </span>
        </div>
        <div className="mt-6 md:mt-8 flex justify-center">
          <div className="w-48 md:w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ 
                width: ["0%", "40%", "60%", "80%", "100%"],
              }}
              transition={{ 
                duration: 2, 
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>
        </div>
        <div className="mt-4 md:mt-6 flex justify-center gap-2">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary"
              initial={{ scale: 0.5, opacity: 0.3 }}
              animate={{ 
                scale: [0.5, 1, 0.5], 
                opacity: [0.3, 1, 0.3],
              }}
              transition={{ 
                duration: 1.5, 
                delay: i * 0.2, 
                repeat: Infinity, 
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        <div className="mt-3 md:mt-4 text-center text-xs md:text-sm text-gray-600 dark:text-gray-400">
          Loading your experience
        </div>
      </div>
    </div>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const isLoading = usePageLoad(1000); // 1 секунда минимальной загрузки
  const [webBackgroundFailed, setWebBackgroundFailed] = useState(false);
  
  // Простой обработчик ошибок для WebBackground
  const handleWebBackgroundError = () => {
    console.log("WebBackground failed to load, using fallback background");
    setWebBackgroundFailed(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Альтернативный фон на случай, если WebBackground не работает */}
      {webBackgroundFailed && (
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800" />
      )}
      
      {/* Используем error boundary для WebBackground */}
      <ErrorBoundary fallback={null} onError={handleWebBackgroundError}>
        <WebBackground />
      </ErrorBoundary>
      
      <Header />
      <main className="flex-1">
        {isLoading ? (
          <Preloader />
        ) : (
          children
        )}
      </main>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

// Простой компонент ErrorBoundary для отлова ошибок
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode; onError?: () => void },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Error in component:", error);
    if (this.props.onError) {
      this.props.onError();
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default Layout;