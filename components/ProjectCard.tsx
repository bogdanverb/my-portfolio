import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  slug: string;
  tags?: string[];
  cover?: string;
  featured?: boolean;
}

export default function ProjectCard({ 
  title, 
  description, 
  slug, 
  tags = [], 
  cover, 
  featured = false 
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="block h-full">
      <motion.div
        className={`
          group relative h-full border rounded-2xl overflow-hidden shadow-md hover:shadow-xl
          bg-white dark:bg-gray-800 transition-all duration-300
          ${featured ? 'md:col-span-2' : ''}
        `}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -5 }}
      >
        {cover && (
          <div className="relative w-full h-52 overflow-hidden">
            <Image 
              src={cover} 
              alt={title} 
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}
        
        <div className="p-5">
          <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-primary transition-colors duration-300">
            {title}
            <motion.span 
              className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, repeatDelay: 1, duration: 1 }}
            >
              →
            </motion.span>
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map(tag => (
                <span 
                  key={tag} 
                  className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <motion.div 
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ rotate: 45 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </motion.div>
      </motion.div>
    </Link>
  );
}
