import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

type ProjectCardProps = {
  title: string
  description: string
  slug: string
  cover?: string
}

export default function ProjectCard({ title, description, slug, cover }: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`}>
      <motion.div
        className="group border rounded-2xl p-4 bg-white dark:bg-gray-900 shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        {cover && (
          <div className="mb-3 rounded-xl w-full h-48 relative overflow-hidden">
            <Image src={cover} alt={title} fill className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-300" />
          </div>
        )}
        <h3 className="text-xl font-bold mb-1 text-secondary dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
        <span className="absolute right-4 bottom-4 text-primary group-hover:translate-x-1 transition-transform text-lg">→</span>
      </motion.div>
    </Link>
  )
}
