import Layout from '../components/Layout';
import FadeIn from '../../components/FadeIn';

export default function About() {
  return (
    <Layout>
      <FadeIn>
        <section className="py-12 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Обо мне</h2>
          <p className="mb-4">
            Я — фронтенд/фулстек разработчик с опытом создания современных web‑приложений на React, Next.js, Node.js. 
            Люблю чистый код, автоматизацию и UI с отличным UX. Открыт к новым проектам и интересным задачам.
          </p>
          <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
            <li>Опыт работы: 3+ года</li>
            <li>Технологии: React, Next.js, TypeScript, Node.js, Tailwind CSS</li>
            <li>Интересы: Open Source, UI/UX, автоматизация, обучение</li>
          </ul>
        </section>
      </FadeIn>
    </Layout>
  )
}