import Layout from '../components/Layout';
import FadeIn, { FadeInStagger } from '../../components/FadeIn';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

// Интерактивная карточка - переиспользуемый компонент
const InteractiveCard = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <motion.div 
    className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all ${className}`}
    whileHover={{ y: -5, scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    initial={{ boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.1)" }}
    animate={{ boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.1)" }}
    exit={{ boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.1)" }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);

// Отдельный компонент для скилла с прогресс-баром
const SkillItem = ({ skill, level }: { skill: string, level: number }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center mb-1">
      <span className="font-medium text-gray-800 dark:text-gray-200">{skill}</span>
      <span className="text-sm text-gray-600 dark:text-gray-400">{level}%</span>
    </div>
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
      <motion.div 
        className="bg-gradient-to-r from-primary to-accent h-2.5 rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      />
    </div>
  </div>
);

export default function About() {
  const skills = [
    { name: "React", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Next.js", level: 80 },
    { name: "Node.js", level: 75 },
    { name: "Tailwind CSS", level: 95 }
  ];

  const experiences = [
    { 
      year: "2022-сейчас",
      position: "Senior Frontend Developer",
      company: "Tech Company Inc.",
      description: "Разработка высоконагруженных SPA приложений на React/Next.js."
    },
    { 
      year: "2020-2022",
      position: "Frontend Developer",
      company: "Digital Agency",
      description: "Создание современных веб-интерфейсов с использованием React и TypeScript."
    },
    { 
      year: "2019-2020",
      position: "Junior Web Developer",
      company: "Startup Studio",
      description: "Разработка и поддержка веб-приложений на JavaScript/React."
    },
  ];

  return (
    <Layout>
      <div className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
            Обо мне
          </h1>
        </FadeIn>
        
        {/* Верхняя секция с изображением и текстом */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <FadeIn direction="right" className="col-span-1 flex flex-col items-center">
            <div className="relative w-48 h-48 md:w-64 md:h-64 overflow-hidden rounded-full mb-6 border-4 border-primary">
              <Image 
                src="/path/to/your/image.jpg" 
                alt="Профиль" 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 192px, 256px"
                priority
              />
            </div>
            
            <div className="flex justify-center gap-4 mt-4">
              {/* Social Icons with microinteractions */}
              {['github', 'twitter', 'linkedin'].map(social => (
                <motion.a 
                  key={social}
                  href={`https://${social}.com/yourusername`}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </motion.a>
              ))}
            </div>
          </FadeIn>
          
          <FadeIn direction="up" delay={0.2} className="col-span-2">
            <InteractiveCard>
              <h2 className="text-2xl font-bold mb-4 text-primary dark:text-primary">Фронтенд/фулстек разработчик</h2>
              <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
                Я — фронтенд/фулстек разработчик с опытом создания современных web‑приложений на React, Next.js, Node.js. 
                Люблю чистый код, автоматизацию и UI с отличным UX. Открыт к новым проектам и интересным задачам.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Личная информация:</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center">
                      <span className="font-medium mr-2">Email:</span>
                      <a href="mailto:your@email.com" className="text-primary hover:underline">your@email.com</a>
                    </li>
                    <li className="flex items-center">
                      <span className="font-medium mr-2">Локация:</span>
                      <span>Ваш город, Страна</span>
                    </li>
                    <li className="flex items-center">
                      <span className="font-medium mr-2">Языки:</span>
                      <span>Украинский, Русский, Английский</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Основная информация:</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center">
                      <span className="font-medium mr-2">Опыт работы:</span>
                      <span>3+ года</span>
                    </li>
                    <li className="flex items-center">
                      <span className="font-medium mr-2">Образование:</span>
                      <span>CS Degree, Университет</span>
                    </li>
                    <li className="flex items-center">
                      <span className="font-medium mr-2">Интересы:</span>
                      <span>Open Source, UI/UX, ML</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8">
                <motion.a 
                  href="/contact"
                  className="inline-block px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg text-center transition-all duration-200 shadow-md hover:shadow-lg"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Связаться со мной
                </motion.a>
              </div>
            </InteractiveCard>
          </FadeIn>
        </div>
        
        {/* Секция навыков */}
        <FadeIn delay={0.3} className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Мои навыки</h2>
          <InteractiveCard>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-primary mb-4">Технические навыки</h3>
                <FadeInStagger staggerChildren={0.1}>
                  {skills.map((skill) => (
                    <FadeIn key={skill.name} direction="left" className="mb-4">
                      <SkillItem skill={skill.name} level={skill.level} />
                    </FadeIn>
                  ))}
                </FadeInStagger>
              </div>
              
              <div>
                <h3 className="font-semibold text-primary mb-4">Личные качества</h3>
                <ul className="space-y-3">
                  {["Коммуникабельность", "Решение проблем", "Командная работа", "Адаптивность", "Креативность"].map((quality, idx) => (
                    <FadeIn key={quality} direction="right" delay={0.1 * idx}>
                      <motion.li 
                        className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                        whileHover={{ x: 5 }}
                      >
                        <svg className="w-5 h-5 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{quality}</span>
                      </motion.li>
                    </FadeIn>
                  ))}
                </ul>
              </div>
            </div>
          </InteractiveCard>
        </FadeIn>
        
        {/* Секция опыта работы */}
        <FadeIn delay={0.4} className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Опыт работы</h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <FadeIn key={index} direction="up" delay={0.1 * index}>
                <InteractiveCard className="border-l-4 border-primary pl-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.position}</h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {exp.year}
                    </span>
                  </div>
                  <p className="text-primary font-medium mb-2">{exp.company}</p>
                  <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
                </InteractiveCard>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </div>
    </Layout>
  );
}