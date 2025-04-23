import React from 'react';
import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}

/**
 * Основной Layout для страниц проекта
 * ВНИМАНИЕ: Не включает Footer, так как он уже добавлен в _app.tsx
 */
export default function Layout({ 
  children, 
  title = 'My Portfolio', 
  description = 'Frontend Developer Portfolio',
  keywords = 'frontend, developer, react, nextjs' 
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
      
      {/* Footer НЕ добавляем здесь, так как он уже есть в _app.tsx */}
    </>
  );
}