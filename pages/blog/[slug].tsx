import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import { getMarkdownList, getMarkdownBySlug, MarkdownMeta } from '../../src/utils/markdown'

type BlogPostProps = {
  meta: MarkdownMeta
  content: string
}

export default function BlogPostPage({ meta, content }: BlogPostProps) {
  if (!meta) return <Layout><div>Пост не найден</div></Layout>
  return (
    <Layout>
      <section className="py-12 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{meta.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </section>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getMarkdownList('content/blog')
  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const data = getMarkdownBySlug('content/blog', slug)
  if (!data) return { notFound: true }
  return {
    props: {
      meta: data.meta,
      content: data.content,
    },
  }
}
