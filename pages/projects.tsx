import Layout from '../components/Layout'
import FadeIn from '../components/FadeIn'
import ProjectCard from '../components/ProjectCard'

type Project = {
  slug: string
  title: string
  description: string
  cover?: string
}

const projects: Project[] = [
  {
    slug: 'react-certificate',
    title: 'React Certificate',
    description: 'Проєкт про React-сертифікат, зроблений під час навчання.',
    cover: '/images/react-cert.png',
  },
  {
    slug: 'typescript-certificate',
    title: 'TypeScript Certificate',
    description: 'Проєкт з TypeScript, як результат глибшого вивчення мови.',
    cover: '/images/ts-cert.png',
  },
]

export default function Projects() {
  return (
    <Layout>
      <FadeIn>
        <section className="py-16 max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-lg">
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
        </section>
      </FadeIn>
    </Layout>
  )
}
