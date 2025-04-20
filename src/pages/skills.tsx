import React from 'react';
import Layout from '../components/Layout';
import SkillList from '../components/SkillList';

const skills = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Express',
  'MongoDB',
  'HTML',
  'CSS',
  'Tailwind CSS',
];

const SkillsPage: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Мои навыки</h1>
      <SkillList skills={skills} />
    </Layout>
  );
};

export default SkillsPage;