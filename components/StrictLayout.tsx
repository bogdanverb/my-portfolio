import Head from 'next/head';
import React from 'react';

interface StrictLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}

/**
 * StrictLayout - более строгий вариант лейаута, который не содержит дублирующихся элементов
 * в отличие от основного Layout. Используйте этот компонент для страниц, если столкнулись с
 * проблемой дублирования навигации или футера.
 */
export default function StrictLayout({
  children,
  title = 'My Portfolio',
  description = 'Frontend Developer Portfolio',
  keywords = 'frontend, developer, react, nextjs'
}: StrictLayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
      </Head>
      
      {children}
    </>
  );
}
