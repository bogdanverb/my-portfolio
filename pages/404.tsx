import { useEffect } from 'react';
import { useRouter } from 'next/router';
import SEOHead from '../components/SEOHead';
import FadeIn from '../components/FadeIn';
import Link from 'next/link';

export default function NotFound() {
  const router = useRouter();
  
  // Якщо ми на GitHub Pages і запит неправильний, спробуємо перенаправити з урахуванням basePath
  useEffect(() => {
    // Перевіряємо, чи ми на GitHub Pages
    const isGitHubPages = window.location.hostname.includes('github.io');
    
    if (isGitHubPages) {
      // Отримуємо поточний шлях без basePath
      const path = window.location.pathname.replace('/my-portfolio', '');
      
      // Якщо шлях не починається з /my-portfolio і ми на GitHub Pages
      if (!window.location.pathname.startsWith('/my-portfolio')) {
        window.location.href = `/my-portfolio${path}`;
      }
    }
  }, []);
  
  return (
    <>
      <SEOHead title="404 - Page Not Found" noindex={true} />
      
      <div className="min-h-screen flex items-center justify-center p-4">
        <FadeIn>
          <div className="text-center max-w-lg mx-auto">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-6">Сторінку не знайдено</h2>
            <p className="mb-8 text-gray-600 dark:text-gray-300">
              Схоже, сторінка, яку ви шукаєте, не існує або була переміщена.
            </p>
            
            <Link 
              href="/" 
              className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition"
            >
              Повернутися на головну
            </Link>
          </div>
        </FadeIn>
      </div>
    </>
  );
}
