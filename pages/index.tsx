import Layout from '../components/Layout'
import FadeIn from '../components/FadeIn'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import ProjectCard from '../components/ProjectCard'
import Link from 'next/link'
import Image from 'next/image'
import { Github, Linkedin, Mail, Instagram } from '../components/ModernIcons'

const projects = [
  {
    title: 'Portfolio Website',
    description: 'Modern portfolio site built with Next.js, Tailwind, Framer Motion.',
    slug: 'portfolio',
    cover: '/images/projects/project-1.jpg',
  },
  {
    title: 'Blog Platform',
    description: 'Markdown blog with SSG and i18n support.',
    slug: 'blog-platform',
    cover: '/images/projects/project-2.jpg',
  },
]

const skills = [
  'JavaScript / TypeScript',
  'React / Next.js',
  'Node.js / Express',
  'HTML5 / CSS3 / Tailwind CSS',
  'Git / GitHub / CI/CD',
  'REST API / GraphQL',
  'Markdown',
  'Framer Motion / Animation',
]

const posts = [
  {
    title: 'React Certificate',
    description: 'Certified knowledge of React and modern frontend.',
    slug: 'react-cert',
  },
  {
    title: 'TypeScript for Professionals',
    description: 'Deep understanding of typing and best practices.',
    slug: 'ts-pro',
  },
]

function ModernSocialIcons() {
  return (
    <div className="flex gap-4">
      <a
        href="https://github.com/your-github"
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-white/80 dark:bg-gray-900/80 rounded-full p-3 shadow-lg hover:scale-110 transition-all duration-200 border border-gray-200 dark:border-gray-800 hover:border-primary"
        aria-label="GitHub"
      >
        <Github className="w-6 h-6 text-gray-700 dark:text-gray-200 group-hover:text-primary transition" />
      </a>
      <a
        href="https://linkedin.com/in/your-linkedin"
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-white/80 dark:bg-gray-900/80 rounded-full p-3 shadow-lg hover:scale-110 transition-all duration-200 border border-gray-200 dark:border-gray-800 hover:border-primary"
        aria-label="LinkedIn"
      >
        <Linkedin className="w-6 h-6 text-gray-700 dark:text-gray-200 group-hover:text-primary transition" />
      </a>
      <a
        href="mailto:your@email.com"
        className="group bg-white/80 dark:bg-gray-900/80 rounded-full p-3 shadow-lg hover:scale-110 transition-all duration-200 border border-gray-200 dark:border-gray-800 hover:border-primary"
        aria-label="Email"
      >
        <Mail className="w-6 h-6 text-gray-700 dark:text-gray-200 group-hover:text-primary transition" />
      </a>
      <a
        href="https://instagram.com/your-instagram"
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-white/80 dark:bg-gray-900/80 rounded-full p-3 shadow-lg hover:scale-110 transition-all duration-200 border border-gray-200 dark:border-gray-800 hover:border-primary"
        aria-label="Instagram"
      >
        <Instagram className="w-6 h-6 text-gray-700 dark:text-gray-200 group-hover:text-primary transition" />
      </a>
    </div>
  )
}

export default function Home() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll({ container: ref })
  const y = useTransform(scrollY, [0, 300], [0, 60])

  return (
    <Layout>
      {/* Профиль с анимацией, декорациями и современной обводкой */}
      <motion.section
        className="relative flex flex-col items-center justify-center text-center py-20 md:py-28"
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Аватар с толстой обводкой и crop */}
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
          <ModernSocialIcons />
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
          {/* Decorative circles */}
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
          <section className="py-20 max-w-5xl mx-auto" id="projects">
            <h2 className="text-3xl font-extrabold mb-10 text-center bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-lg">
              Projects
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {projects.map((proj) => (
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
          <section className="py-20 max-w-2xl mx-auto" id="skills">
            <h2 className="text-3xl font-extrabold mb-10 text-center bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-lg">
              Skills
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="card flex items-center justify-center text-lg font-semibold py-4 px-6 bg-white/90 dark:bg-gray-900/80 rounded-2xl shadow-md hover:shadow-xl transition"
                >
                  {skill}
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Blog/Certificates */}
        <FadeIn>
          <section className="py-20 max-w-2xl mx-auto" id="blog">
            <h2 className="text-3xl font-extrabold mb-10 text-center bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-lg">
              Blog & Certificates
            </h2>
            <ul className="space-y-4">
              {posts.map((post) => (
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
          <section className="py-20 max-w-2xl mx-auto" id="contact">
            <h2 className="text-3xl font-extrabold mb-10 text-center bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-lg">
              Contact
            </h2>
            <p className="mb-6 text-center text-lg">Open to new projects and collaboration.</p>
            <div className="flex justify-center">
              <ModernSocialIcons />
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
  )
}
