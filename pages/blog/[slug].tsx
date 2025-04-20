import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../components/Layout'

type BlogPostProps = {
  slug: string
}

export default function BlogPost({ slug }: BlogPostProps) {
  return (
    <Layout>
      <section className="py-12 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Пост: {slug}</h1>
        <p className="text-gray-700">
          Це заглушка сторінки поста <strong>{slug}</strong>. Замість цього контенту
          можна підвантажити Markdown або щось інше пізніше.
        </p>
      </section>
    </Layout>
  )
}

// Просто підставляємо якісь фейкові пости, щоб працювало
export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = ['react-certificate', 'typescript-certificate']
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      slug: params?.slug || '',
    },
  }
}
