import Head from 'next/head';
import { useRouter } from 'next/router';

// Используем временный конфиг, пока не будет доступен импорт из content
const siteConfig = {
  title: 'Bohdan Verbovyi - Web Developer',
  description: 'Portfolio of Bohdan Verbovyi, Frontend / Fullstack Developer'
};

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  date?: string;
}

/**
 * Компонент для управления SEO метаданными страницы
 */
export default function SEOHead({
  title,
  description,
  image = '/images/og-image.jpg',
  type = 'website',
  date,
}: SEOHeadProps) {
  const router = useRouter();
  
  // Формируем полный заголовок и описание
  const pageTitle = title ? `${title} | ${siteConfig.title}` : siteConfig.title;
  const pageDescription = description || siteConfig.description;
  
  // Полные URL для Open Graph
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com';
  const canonicalUrl = `${siteUrl}${router.asPath}`;
  const ogImage = image.startsWith('http') ? image : `${siteUrl}${image}`;
  
  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      
      {/* Канонический URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Если это статья, добавляем дату публикации */}
      {date && type === 'article' && (
        <>
          <meta property="article:published_time" content={date} />
          <meta property="og:article:published_time" content={date} />
        </>
      )}
      
      {/* Роботы */}
      <meta name="robots" content="index, follow" />
    </Head>
  );
}
