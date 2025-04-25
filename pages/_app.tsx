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
import Head from 'next/head';

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

  useEffect(() => {
    // Спеціальний скрипт для GitHub Pages перенаправлень
    const redirect = sessionStorage.getItem('redirect');
    if (redirect && redirect !== window.location.href) {
      sessionStorage.removeItem('redirect');
      const cleanUrl = redirect.replace(/\/my-portfolio\/?/, '/');
      router.replace(cleanUrl);
    }
  }, [router]);
  
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Head>
        {/* Цей скрипт допомагає з перенаправленнями на GitHub Pages */}
        <script 
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var isGitHubPages = window.location.hostname.includes('github.io');
                if(isGitHubPages && window.location.pathname === '/my-portfolio/') {
                  // Ми на корні GitHub Pages - все ок
                } else if(isGitHubPages && !window.location.pathname.includes('/my-portfolio/')) {
                  // Додаємо базовий шлях та перенаправляємо
                  window.location.href = '/my-portfolio' + window.location.pathname;
                }
              })();
            `
          }}
        />
      </Head>
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
