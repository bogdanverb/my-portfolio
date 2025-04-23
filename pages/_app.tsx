import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { AnimatePresence } from 'framer-motion';
import Preloader from '../components/Preloader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WebBackground from '../components/WebBackground';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import PageTransition from '../components/PageTransition';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Обработчик завершения загрузки
    const handleComplete = () => {
      // Используем RAF для синхронизации с браузерной отрисовкой
      requestAnimationFrame(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      });
    };
    
    // Обработчик начала загрузки
    const handleStart = () => {
      setIsLoading(true);
    };
    
    // Инициализация: первая загрузка
    handleComplete();
    
    // Обработка перемещений между страницами
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
    };
  }, [router]);
  
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {isLoading && <Preloader />}
      <WebBackground />
      
      {/* Фиксированные элементы вынесены за пределы AnimatePresence */}
      <Header />
      
      <AnimatePresence 
        mode="wait"
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <PageTransition key={router.asPath}>
          <main className="pt-20 min-h-screen">
            <Component {...pageProps} />
          </main>
        </PageTransition>
      </AnimatePresence>
      
      <Footer />
    </ThemeProvider>
  );
}

export default MyApp;
