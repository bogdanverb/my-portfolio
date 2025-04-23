import Layout from '../components/Layout'
import FadeIn from '../components/FadeIn'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function About() {
  const experiences = [
    { year: "2020 - Present", title: "Frontend Developer", company: "Tech Company" },
    { year: "2018 - 2020", title: "Web Developer", company: "Digital Agency" },
    { year: "2017 - 2018", title: "Junior Developer", company: "Startup" },
  ];
  
  const skills = [
    { name: "React", level: 90 },
    { name: "Next.js", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "Node.js", level: 75 },
    { name: "Tailwind CSS", level: 90 },
  ];

  return (
    <Layout>
      <div className="py-16 max-w-4xl mx-auto px-4">
        <FadeIn>
          <h2 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-lg">
            About Me
          </h2>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FadeIn className="md:col-span-1" delay={0.2} direction="left">
            <motion.div 
              className="card p-6 bg-white/90 dark:bg-gray-900/80 rounded-2xl shadow-lg h-full"
              whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative w-full h-56 mb-6 overflow-hidden rounded-xl">
                <Image 
                  src="/profile.jpg" 
                  alt="Profile"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  priority
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/20 text-primary mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <motion.a 
                    href="mailto:contact@example.com" 
                    className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
                    whileHover={{ x: 2 }}
                  >
                    contact@example.com
                  </motion.a>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/20 text-primary mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-200">Remote, Worldwide</span>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-lg font-bold mb-3 text-secondary dark:text-white">Connect with me:</h3>
                  <div className="flex space-x-3">
                    {[
                      { icon: "github", url: "https://github.com" },
                      { icon: "twitter", url: "https://twitter.com" },
                      { icon: "linkedin", url: "https://linkedin.com" }
                    ].map((social, index) => (
                      <motion.a
                        key={social.icon}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-primary hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors"
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="sr-only">{social.icon}</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          {/* Placeholder for actual social icons */}
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </FadeIn>
          
          <FadeIn className="md:col-span-2" delay={0.4} direction="right">
            <motion.div 
              className="card p-6 bg-white/90 dark:bg-gray-900/80 rounded-2xl shadow-lg"
              whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-secondary dark:text-white">
                I am a <span className="text-primary">frontend/fullstack developer</span>
              </h3>
              
              <p className="mb-6 text-gray-700 dark:text-gray-200">
                With 3+ years of experience building modern web applications using React, Next.js, and Node.js.
                I love clean code, automation, and creating user interfaces with great user experience.
                I'm always open to new projects and interesting challenges.
              </p>
              
              <h4 className="text-xl font-semibold mb-3 text-secondary dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                Experience
              </h4>
              
              <div className="space-y-4 mb-6">
                {experiences.map((exp, index) => (
                  <motion.div 
                    key={index}
                    className="flex"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.2 }}
                  >
                    <div className="w-32 flex-shrink-0 font-medium text-primary dark:text-accent">{exp.year}</div>
                    <div>
                      <h5 className="font-medium text-gray-800 dark:text-white">{exp.title}</h5>
                      <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <h4 className="text-xl font-semibold mb-3 text-secondary dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                Skills
              </h4>
              
              <div className="space-y-3">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="relative">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-primary to-accent"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.1 * index, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <h4 className="text-xl font-semibold mt-6 mb-3 text-secondary dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                Interests
              </h4>
              
              <div className="flex flex-wrap gap-2">
                {['Open Source', 'UI/UX', 'Automation', 'Learning', 'Web Performance', 'Accessibility'].map((interest, index) => (
                  <motion.span
                    key={interest}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-800 dark:text-gray-200"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(99, 102, 241, 0.1)' }}
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </Layout>
  )
}
