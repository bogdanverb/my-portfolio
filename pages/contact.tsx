import Layout from '../components/Layout'
import FadeIn from '../components/FadeIn'
import ContactForm from '../components/ContactForm'
import { Github, Linkedin, Mail, Instagram } from '../components/ModernIcons'

function ModernSocialIcons() {
  return (
    <div className="flex gap-4 justify-center mt-6">
      <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer" className="group bg-white/80 dark:bg-gray-900/80 rounded-full p-3 shadow-lg hover:scale-110 transition-all duration-200 border border-gray-200 dark:border-gray-800 hover:border-primary" aria-label="GitHub">
        <Github className="w-6 h-6 text-gray-700 dark:text-gray-200 group-hover:text-primary transition" />
      </a>
      <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer" className="group bg-white/80 dark:bg-gray-900/80 rounded-full p-3 shadow-lg hover:scale-110 transition-all duration-200 border border-gray-200 dark:border-gray-800 hover:border-primary" aria-label="LinkedIn">
        <Linkedin className="w-6 h-6 text-gray-700 dark:text-gray-200 group-hover:text-primary transition" />
      </a>
      <a href="mailto:your@email.com" className="group bg-white/80 dark:bg-gray-900/80 rounded-full p-3 shadow-lg hover:scale-110 transition-all duration-200 border border-gray-200 dark:border-gray-800 hover:border-primary" aria-label="Email">
        <Mail className="w-6 h-6 text-gray-700 dark:text-gray-200 group-hover:text-primary transition" />
      </a>
      <a href="https://instagram.com/your-instagram" target="_blank" rel="noopener noreferrer" className="group bg-white/80 dark:bg-gray-900/80 rounded-full p-3 shadow-lg hover:scale-110 transition-all duration-200 border border-gray-200 dark:border-gray-800 hover:border-primary" aria-label="Instagram">
        <Instagram className="w-6 h-6 text-gray-700 dark:text-gray-200 group-hover:text-primary transition" />
      </a>
    </div>
  )
}

export default function Contact() {
  return (
    <Layout>
      <FadeIn>
        <section className="py-12 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Contact</h2>
          <ContactForm />
          <ModernSocialIcons />
        </section>
      </FadeIn>
    </Layout>
  )
}
