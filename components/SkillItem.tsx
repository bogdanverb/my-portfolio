import React from 'react';
import { motion } from 'framer-motion';

interface SkillItemProps {
  skill: string;
  level?: number;
  className?: string;
}

/**
 * Компонент для отображения отдельного навыка
 */
export default function SkillItem({ skill, level = 100, className = '' }: SkillItemProps) {
  return (
    <motion.div
      className={`flex items-center justify-center text-lg font-medium py-4 px-6 bg-white/90 dark:bg-gray-900/80 rounded-2xl shadow-sm hover:shadow-md transition ${className}`}
      whileHover={{ 
        y: -4,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Название навыка */}
      <span>{skill}</span>
      
      {/* Если нужно показать уровень мастерства */}
      {level < 100 && (
        <div className="ml-2 w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full" 
            style={{ width: `${level}%` }}
          />
        </div>
      )}
    </motion.div>
  );
}
