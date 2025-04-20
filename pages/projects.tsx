import Layout from '../components/Layout'
import { GetStaticProps } from 'next'
import { getMarkdownList, MarkdownMeta } from '../src/utils/markdown'
import FadeIn from '../components/FadeIn'
import ProjectCard from '../components/ProjectCard'

type ProjectsProps = {
  projects: MarkdownMeta[]
}

export default function Projects({ projects }: ProjectsProps) {
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
                description={proj.description || ''}
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

export const getStaticProps: GetStaticProps = async () => {
  const projects = getMarkdownList('content/projects')
  return { props: { projects } }
}
