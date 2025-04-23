// Единое место для хранения структурированных данных сайта
export const siteConfig = {
  title: 'Bohdan Verbovyi - Web Developer',
  description: 'Portfolio of Bohdan Verbovyi, Frontend / Fullstack Developer specializing in modern JavaScript frameworks',
  author: 'Bohdan Verbovyi',
  navigation: [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ]
}

export const projectsData = [
  {
    title: 'Portfolio Website',
    description: 'Modern portfolio site built with Next.js, Tailwind, Framer Motion.',
    slug: 'portfolio',
    cover: '/images/projects/project-1.jpg',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    featured: true,
    githubUrl: 'https://github.com/bogdanverb/portfolio',
    liveUrl: 'https://www.yoursite.com'
  },
  {
    title: 'Blog Platform',
    description: 'Markdown blog with SSG and i18n support.',
    slug: 'blog-platform',
    cover: '/images/projects/project-2.jpg',
    tech: ['Next.js', 'Markdown', 'i18n', 'CSS Modules'],
    featured: true,
    githubUrl: 'https://github.com/bogdanverb/blog-platform',
    liveUrl: 'https://blog.yoursite.com'
  },
  // Больше проектов...
];

export const skillsData = {
  technical: [
    'JavaScript / TypeScript',
    'React / Next.js',
    'Node.js / Express',
    'HTML5 / CSS3 / Tailwind CSS',
    'Git / GitHub / CI/CD',
    'REST API / GraphQL',
    'Markdown',
    'Framer Motion / Animation',
  ],
  soft: [
    'Problem Solving',
    'Team Collaboration',
    'Project Management',
    'Communication',
    'Time Management'
  ]
};

export const postsData = [
  {
    title: 'React Certificate',
    description: 'Certified knowledge of React and modern frontend.',
    slug: 'react-cert',
    publishedDate: '2023-10-15',
    image: '/images/blog/react-cert.jpg',
    tags: ['React', 'Certification', 'Frontend'],
    featured: true
  },
  {
    title: 'TypeScript for Professionals',
    description: 'Deep understanding of typing and best practices.',
    slug: 'ts-pro',
    publishedDate: '2023-09-22',
    image: '/images/blog/typescript.jpg',
    tags: ['TypeScript', 'Development', 'Best Practices'],
    featured: true
  },
  // Больше постов...
];

export const socialLinks = {
  github: 'https://github.com/bogdanverb',
  linkedin: 'https://www.linkedin.com/in/scriptxx/',
  email: 'bogdan.verb1@gmail.com',
  instagram: 'https://www.instagram.com/bogdan_verboviy/',
};

export const contactInfo = {
  email: 'bogdan.verb1@gmail.com',
  location: 'Киев, Украина',
  availability: 'Открыт для фриланс-проектов и полной занятости'
};
