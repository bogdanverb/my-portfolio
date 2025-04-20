import React from 'react';

interface SkillListProps {
  skills: string[];
}

const SkillList: React.FC<SkillListProps> = ({ skills }) => {
  return (
    <div className="skill-list">
      <h2 className="text-2xl font-bold mb-4">Мои навыки</h2>
      <ul className="list-disc list-inside">
        {skills.map((skill, index) => (
          <li key={index} className="text-lg">
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillList;