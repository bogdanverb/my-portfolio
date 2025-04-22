import React, { useState } from 'react'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from 'next-themes'

import usePageLoad from '../hooks/usePageLoad'
import Header from './Header'
import Footer from './Footer'
import WebBackground from './WebBackground'
import PageTransition from './PageTransition'
import Preloader from './Preloader'

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

function Layout({ children }: { children: React.ReactNode }) {
  const isLoading = usePageLoad(600); // Уменьшено время загрузки для лучшего UX
  const [webBackgroundFailed, setWebBackgroundFailed] = useState(false);
  
  // Простой обработчик ошибок для WebBackground
  const handleWebBackgroundError = () => {
    console.log("WebBackground failed to load, using fallback background");
    setWebBackgroundFailed(true);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <PageTransition>
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
      </PageTransition>
    </ThemeProvider>
  );
}

export default Layout;