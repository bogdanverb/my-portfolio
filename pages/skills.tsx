import Layout from '../components/Layout'
import FadeIn from '../components/FadeIn'
import SkillList from '../components/SkillList'

const skills = [
  'JavaScript / TypeScript',
  'React / Next.js',
  'Node.js / Express',
  'HTML5 / CSS3 / Tailwind CSS',
  'Git / GitHub / CI/CD',
  'REST API / GraphQL',
  'Markdown / Netlify CMS',
  'Framer Motion / Animation',
]

export default function Skills() {
  return (
    <Layout>
      <FadeIn>
        <section className="py-16 max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-lg">
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
    </Layout>
  )
}
