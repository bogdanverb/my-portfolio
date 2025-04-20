import Layout from '../components/Layout'
import FadeIn from '../components/FadeIn'

export default function Resume() {
  return (
    <Layout>
      <FadeIn>
        <section className="py-12 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Resume</h2>
          <p className="mb-4">
            Here you can download my resume or check out my work experience, education, and skills.
          </p>
          <a
            href="/resume.pdf"
            className="inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition"
            download
          >
            Download PDF
          </a>
        </section>
      </FadeIn>
    </Layout>
  )
}
