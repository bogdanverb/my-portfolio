import Layout from '../components/Layout'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { getMarkdownList, MarkdownMeta } from '../src/utils/markdown'
import FadeIn from '../components/FadeIn'

type BlogProps = {
  posts: MarkdownMeta[]
}

export default function Blog({ posts }: BlogProps) {
  return (
    <Layout>
      <FadeIn>
        <section className="py-12 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Блог / Сертификаты</h2>
          <div className="grid gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block p-4 border rounded hover:shadow transition"
              >
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="text-gray-600">{post.date}</p>
              </Link>
            ))}
          </div>
        </section>
      </FadeIn>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getMarkdownList('content/blog')
  return { props: { posts } }
}
