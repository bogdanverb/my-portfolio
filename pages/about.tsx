import Layout from '../components/Layout'
import FadeIn from '../components/FadeIn'

export default function About() {
  return (
    <Layout>
      <FadeIn>
        <section className="py-16 max-w-2xl mx-auto">
          <div className="card p-8 bg-white/90 dark:bg-gray-900/80 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-lg">
              About
            </h2>
            <p className="mb-6 text-lg text-gray-700 dark:text-gray-200 text-center">
              I am a <span className="font-bold text-primary">frontend/fullstack developer</span> with experience in building modern web applications using React, Next.js, and Node.js.<br />
              I love clean code, automation, and UI with great UX.<br />
              Open to new projects and interesting challenges.
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li><span className="font-semibold text-accent">Experience:</span> 3+ years</li>
              <li><span className="font-semibold text-accent">Technologies:</span> React, Next.js, TypeScript, Node.js, Tailwind CSS</li>
              <li><span className="font-semibold text-accent">Interests:</span> Open Source, UI/UX, automation, learning</li>
            </ul>
          </div>
        </section>
      </FadeIn>
    </Layout>
  )
}
