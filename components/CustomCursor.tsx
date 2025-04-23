import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(true);
  
  useEffect(() => {
    // Задержка для инициализации курсора, чтобы избежать ошибок при гидратации
    const timeout = setTimeout(() => {
      setHidden(false);
    }, 500);
    
    // Функции обработки событий мыши
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    
    const handleLinkHoverStart = () => setLinkHovered(true);
    const handleLinkHoverEnd = () => setLinkHovered(false);
    
    // Добавляем обработчики событий
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Добавляем обработчики для интерактивных элементов
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleLinkHoverStart);
      el.addEventListener('mouseleave', handleLinkHoverEnd);
    });
    
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleLinkHoverStart);
        el.removeEventListener('mouseleave', handleLinkHoverEnd);
      });
    };
  }, []);
  
  // Скрываем на мобильных устройствах
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;
  if (hidden) return null;
  
  return (
    <>
      {/* Внешний круг курсора */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
          opacity: 0.8
        }}
        transition={{
          type: "spring",
          mass: 0.2,
          stiffness: 300,
          damping: 20
        }}
      >
        <div className={`
          w-8 h-8 rounded-full border-2 border-white
          ${clicked ? 'bg-white bg-opacity-20' : 'bg-transparent'}
        `} />
      </motion.div>
      
      {/* Внутренняя точка курсора */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 bg-white rounded-full w-2 h-2"
        animate={{
          x: position.x - 1,
          y: position.y - 1
        }}
        transition={{
          type: "spring",
          mass: 0.1,
          stiffness: 500,
          damping: 20,
          restDelta: 0.001
        }}
      />
    </>
  );
}
