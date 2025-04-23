import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { 
      opacity: 0,
      // Делаем выход быстрее входа для более плавного перехода
      transition: { duration: 0.15 } 
    }
  };
  
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        type: "tween", 
        ease: "easeInOut",
        duration: 0.3
      }}
    >
      {children}
    </motion.div>
  );
}
