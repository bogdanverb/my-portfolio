import { FaReact, FaNodeJs, FaGitAlt } from 'react-icons/fa'
import { SiTypescript, SiTailwindcss, SiGraphql } from 'react-icons/si'

const icons = [
  <FaReact className="text-sky-500" />,
  <SiTypescript className="text-blue-600" />,
  <FaNodeJs className="text-green-600" />,
  <SiTailwindcss className="text-cyan-400" />,
  <FaGitAlt className="text-orange-500" />,
  <SiGraphql className="text-pink-500" />,
]

export default function SkillList({ skills }: { skills: string[] }) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {skills.map((skill, i) => (
        <li key={skill} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-2 shadow-sm">
          {icons[i % icons.length]}
          <span className="font-medium">{skill}</span>
        </li>
      ))}
    </ul>
  )
}
