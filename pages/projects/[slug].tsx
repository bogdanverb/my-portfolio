import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import FadeIn from '../../components/FadeIn'
import { getMarkdownList, getMarkdownBySlug, MarkdownMeta } from '../../src/utils/markdown'

type ProjectProps = {
  meta: MarkdownMeta
  content: string
}

export default function ProjectPage({ meta, content }: ProjectProps) {
  if (!meta) return <Layout><div>Проект не найден</div></Layout>
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
  const projects = getMarkdownList('content/projects')
  return {
    paths: projects.map((p) => ({ params: { slug: p.slug } })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const data = getMarkdownBySlug('content/projects', slug)
  if (!data) return { notFound: true }
  return {
    props: {
      meta: data.meta,
      content: data.content,
    },
  }
}
