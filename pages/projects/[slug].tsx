import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import FadeIn from '../../components/FadeIn'

// Типові дані для проекту
const dummyData = {
  title: 'Example Project',
  description: 'This is a sample project description. Replace with real data.',
  content: '<p>This is some sample content for the project page. You can add HTML here.</p>',
}

type ProjectProps = {
  meta: { title: string; description: string }
  content: string
}

export default function ProjectPage({ meta, content }: ProjectProps) {
  if (!meta) return <Layout><div>Проект не знайдений</div></Layout>
  return (
    <Layout>
      <FadeIn>
        <section className="py-12 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{meta.title}</h1>
          <p className="mb-4">{meta.description}</p>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </section>
      </FadeIn>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Для цього прикладу просто додаємо один статичний шлях
  const paths = [{ params: { slug: 'example-project' } }]
  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  
  // Якщо слуг не співпадає з example-project, то буде повернено notFound
  if (slug !== 'example-project') return { notFound: true }

  // Повертання фіксованих даних
  return {
    props: {
      meta: { title: dummyData.title, description: dummyData.description },
      content: dummyData.content,
    },
  }
}
