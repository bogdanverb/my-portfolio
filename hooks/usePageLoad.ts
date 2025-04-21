import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 * Хук для отслеживания загрузки страницы и перехода между страницами
 * @param minimumLoadingTime Минимальное время показа прелоадера в мс (для плавности UX)
 * @returns Состояние загрузки страницы
 */
export default function usePageLoad(minimumLoadingTime = 1000) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Обработчики событий роутера
    const handleStart = (url: string) => {
      // Если это не первая загрузка (проверка через !document.readyState === 'complete')
      if (document.readyState === 'complete') {
        setLoading(true);
      }
    };

    const handleComplete = (url: string) => {
      // Добавляем минимальное время для прелоадера
      const startTime = Date.now();
      const timeElapsed = Date.now() - startTime;
      
      if (timeElapsed < minimumLoadingTime) {
        setTimeout(() => {
          setLoading(false);
        }, minimumLoadingTime - timeElapsed);
      } else {
        setLoading(false);
      }
    };

    // При первой загрузке страницы
    if (document.readyState === 'complete') {
      const startTime = Date.now();
      const timeElapsed = Date.now() - startTime;
      
      if (timeElapsed < minimumLoadingTime) {
        setTimeout(() => {
          setLoading(false);
        }, minimumLoadingTime - timeElapsed);
      } else {
        setLoading(false);
      }
    }

    // Добавляем обработчики маршрутизации
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [minimumLoadingTime, router]);

  return loading;
}
