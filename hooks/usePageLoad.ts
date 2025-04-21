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
    // Переменная для хранения времени начала загрузки
    let startTime = Date.now();

    // Обработчики событий роутера
    const handleStart = () => {
      // Если это новый переход, запускаем загрузку и сбрасываем таймер
      startTime = Date.now();
      setLoading(true);
    };

    const handleComplete = () => {
      // Вычисляем, сколько времени прошло с начала загрузки
      const timeElapsed = Date.now() - startTime;
      
      // Если прошло меньше минимального времени, показываем загрузку еще какое-то время
      if (timeElapsed < minimumLoadingTime) {
        setTimeout(() => {
          setLoading(false);
        }, minimumLoadingTime - timeElapsed);
      } else {
        // Иначе завершаем загрузку сразу
        setLoading(false);
      }
    };

    // При первой загрузке страницы
    if (typeof window !== 'undefined') {
      if (document.readyState === 'complete') {
        const timeElapsed = Date.now() - startTime;
        
        if (timeElapsed < minimumLoadingTime) {
          setTimeout(() => {
            setLoading(false);
          }, minimumLoadingTime - timeElapsed);
        } else {
          setLoading(false);
        }
      } else {
        // Если страница еще не полностью загружена, добавляем обработчик события загрузки
        const handleLoad = () => {
          const timeElapsed = Date.now() - startTime;
          
          if (timeElapsed < minimumLoadingTime) {
            setTimeout(() => {
              setLoading(false);
            }, minimumLoadingTime - timeElapsed);
          } else {
            setLoading(false);
          }
        };
        
        window.addEventListener('load', handleLoad);
        return () => {
          window.removeEventListener('load', handleLoad);
        };
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
