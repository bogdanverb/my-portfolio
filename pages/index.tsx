// Импортируем только необходимые компоненты для начальной работы
import Layout from '../components/Layout'
import FadeIn from '../components/FadeIn'
// import SEOHead from '../components/SEOHead'  // Закомментируем пока не создадим файл
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import ProjectCard from '../components/ProjectCard'
import Link from 'next/link'
import Image from 'next/image'
import SocialIcons from '../components/SocialIcons'
// import SkillItem from '../components/SkillItem'  // Закомментируем пока не создадим файл
// import { projectsData, skillsData, postsData } from '../data/content' // Закомментируем до создания файла

// Временные данные вместо файла content.ts
const projectsData = [
  {
    title: 'Portfolio Website',
    description: 'Modern portfolio site built with Next.js, Tailwind, Framer Motion.',
    slug: 'portfolio',
    cover: '/images/projects/project-1.jpg',
    featured: true
  },
  {
    title: 'Blog Platform',
    description: 'Markdown blog with SSG and i18n support.',
    slug: 'blog-platform',
    cover: '/images/projects/project-2.jpg',
    featured: true
  },
];

const skillsData = {
  technical: [
    'JavaScript / TypeScript',
    'React / Next.js',
    'Node.js / Express',
    'HTML5 / CSS3 / Tailwind CSS',
    'Git / GitHub / CI/CD',
    'REST API / GraphQL',
    'Markdown',
    'Framer Motion / Animation',
  ]
};

const postsData = [
  {
    title: 'React Certificate',
    description: 'Certified knowledge of React and modern frontend.',
    slug: 'react-cert',
    featured: true
  },
  {
    title: 'TypeScript for Professionals',
    description: 'Deep understanding of typing and best practices.',
    slug: 'ts-pro',
    featured: true
  },
];

export default function Home() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll({ container: ref })
  const y = useTransform(scrollY, [0, 300], [0, 60])

  // Используем только featured проекты на главной странице
  const featuredProjects = projectsData.filter(project => project.featured).slice(0, 2);
  const featuredPosts = postsData.filter(post => post.featured).slice(0, 2);

  return (
    <Layout>
      {/* Убираем SEOHead пока не создадим */}
      {/* <SEOHead 
        title="Главная"
        description="Портфолио frontend-разработчика с опытом в React, Next.js и современных веб-технологиях" 
      /> */}
      
      {/* Профиль с анимацией */}
      <motion.section
        className="relative flex flex-col items-center justify-center text-center py-20 md:py-28"
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Аватар с обводкой */}
        <motion.div
          className="mb-6 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="rounded-full ring-8 ring-primary bg-white dark:bg-gray-900 p-2 shadow-2xl inline-block relative overflow-hidden">
            <div className="-m-[2px]">
              <Image
                src="/avatar.jpg"
                alt="Bohdan Verbovyi"
                width={200}
                height={200}
                className="rounded-full object-cover aspect-square"
                priority
              />
            </div>
          </div>
        </motion.div>
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold mb-2 z-10"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Bohdan Verbovyi
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-4 max-w-xl z-10"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Frontend / Fullstack Developer. I create modern, fast and beautiful web applications.<br />
          Open to new projects and collaboration.
        </motion.p>
        <motion.div
          className="flex justify-center gap-4 mb-6 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <SocialIcons />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="z-10"
        >
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-full shadow-lg hover:bg-accent hover:text-white transition-all duration-300 text-lg"
          >
            Get in touch
          </Link>
        </motion.div>
      </motion.section>

      <div ref={ref}>
        {/* Hero section */}
        <motion.section
          className="relative py-32 md:py-44 text-center bg-gradient-to-br from-primary via-accent to-secondary text-white overflow-hidden"
          style={{ y }}
        >
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary opacity-30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent opacity-20 rounded-full blur-2xl pointer-events-none" />
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg">
            Welcome!
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            I build modern and beautiful web applications.
          </p>
          <a
            href="#projects"
            className="inline-block px-8 py-4 bg-white/90 text-primary font-semibold rounded-full shadow-lg hover:bg-accent hover:text-white transition-all duration-300 text-lg"
          >
            View Projects
          </a>
        </motion.section>

        {/* Projects */}
        <FadeIn>
          <section className="py-20 max-w-5xl mx-auto px-4" id="projects">
            <h2 className="text-3xl font-extrabold mb-10 text-center bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-lg">
              Projects
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {featuredProjects.map((proj) => (
                <ProjectCard
                  key={proj.slug}
                  title={proj.title}
                  description={proj.description}
                  slug={proj.slug}
                  cover={proj.cover}
                />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/projects" className="text-primary hover:underline font-semibold">
                See all projects →
              </Link>
            </div>
          </section>
        </FadeIn>

        {/* Skills */}
        <FadeIn>
          <section className="py-20 max-w-2xl mx-auto px-4" id="skills">
            <h2 className="text-3xl font-extrabold mb-10 text-center bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-lg">
              Skills
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {skillsData.technical.map((skill) => (
                // Временный вариант вместо компонента SkillItem
                <motion.div
                  key={skill}
                  className="flex items-center justify-center text-lg font-medium py-4 px-6 bg-white/90 dark:bg-gray-900/80 rounded-2xl shadow-sm hover:shadow-md transition"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>{skill}</span>
                </motion.div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Blog/Certificates */}
        <FadeIn>
          <section className="py-20 max-w-2xl mx-auto px-4" id="blog">
            <h2 className="text-3xl font-extrabold mb-10 text-center bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-lg">
              Blog & Certificates
            </h2>
            <ul className="space-y-4">
              {featuredPosts.map((post) => (
                <li key={post.slug} className="card border rounded-xl p-4 hover:shadow-xl transition bg-white dark:bg-gray-900">
                  <Link href={`/blog/${post.slug}`}>
                    <span className="text-lg font-semibold">{post.title}</span>
                    <div className="text-gray-600 dark:text-gray-400">{post.description}</div>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10 text-center">
              <Link href="/blog" className="text-primary hover:underline font-semibold">
                Read blog →
              </Link>
            </div>
          </section>
        </FadeIn>

        {/* Contact */}
        <FadeIn>
          <section className="py-20 max-w-2xl mx-auto px-4" id="contact">
            <h2 className="text-3xl font-extrabold mb-10 text-center bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-lg">
              Contact
            </h2>
            <p className="mb-6 text-center text-lg">Open to new projects and collaboration.</p>
            <div className="flex justify-center">
              <SocialIcons />
            </div>
            <div className="mt-10 text-center">
              <Link href="/contact" className="text-primary hover:underline font-semibold">
                Get in touch →
              </Link>
            </div>
          </section>
        </FadeIn>
      </div>
    </Layout>
  );
}
