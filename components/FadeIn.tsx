import React, { useEffect } from 'react'
import { motion, useAnimation, Variants } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

type FadeInProps = {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  delay?: number;
  distance?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
  staggerChildren?: number;
  staggerDirection?: 1 | -1;
}

const defaultVariants = (
  direction: FadeInProps['direction'] = 'up', 
  distance: number = 50,
  duration: number = 0.5, 
  delay: number = 0
): Variants => {
  const variants: Variants = {
    hidden: { 
      opacity: 0,
      ...(direction === 'up' ? { y: distance } : {}),
      ...(direction === 'down' ? { y: -distance } : {}),
      ...(direction === 'left' ? { x: distance } : {}),
      ...(direction === 'right' ? { x: -distance } : {})
    },
    visible: { 
      opacity: 1,
      y: 0,
      x: 0,
      transition: { 
        duration, 
        delay,
        ease: [0.25, 0.1, 0.25, 1.0] // Плавная анимация кривой
      }
    },
  };
  
  return variants;
}

export default function FadeIn({ 
  children, 
  direction = 'up', 
  duration = 0.5, 
  delay = 0, 
  distance = 30,
  className = "",
  once = true, 
  threshold = 0.1,
}: FadeInProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ 
    triggerOnce: once,
    threshold 
  });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [controls, inView, once]);
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={defaultVariants(direction, distance, duration, delay)}
      className={className}
    >
      {typeof children === 'object' && React.isValidElement(children) ? 
        React.cloneElement(children) :
        <div className="fade-in-content">{children}</div>
      }
    </motion.div>
  );
}

// Экспортируем также компонент для создания stagger-эффектов
export function FadeInStagger({ 
  children, 
  className = "", 
  staggerChildren = 0.1,
  staggerDirection = 1,
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  staggerChildren?: number;
  staggerDirection?: 1 | -1;
  delay?: number;
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        staggerDirection,
        delayChildren: delay
      }
    }
  };
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
