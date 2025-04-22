import React, { useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';

export default function WebBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const nodesRef = useRef<any[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, radius: 200 });

  // Создадим конфигурацию единожды с проверкой для SSR
  const config = useMemo(() => {
    const isBrowser = typeof window !== 'undefined';
    return {
      nodeCount: isBrowser && window.innerWidth < 768 ? 30 : 50,
      connectionDistance: isBrowser && window.innerWidth < 768 ? 150 : 200,
      nodeSize: { min: 2, max: 4 },
      speed: { min: 0.3, max: 0.8 },
      colors: {
        primary: '#6366f1',
        accent: '#FF5733',
        lines: ['rgba(99, 102, 241, 0.15)', 'rgba(255, 87, 51, 0.1)']
      }
    };
  }, []);

  // Инициализация узлов и обработчиков событий
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === 'undefined') return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Пересоздаем узлы при изменении размера
      initNodes();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
      }
    };

    // Создание узлов
    const initNodes = () => {
      nodesRef.current = [];
      const nodeCount = Math.min(config.nodeCount, Math.floor(window.innerWidth / 30));
      
      for (let i = 0; i < nodeCount; i++) {
        const radius = Math.random() * (config.nodeSize.max - config.nodeSize.min) + config.nodeSize.min;
        nodesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius,
          vx: Math.random() * (config.speed.max - config.speed.min) + config.speed.min * (Math.random() > 0.5 ? 1 : -1),
          vy: Math.random() * (config.speed.max - config.speed.min) + config.speed.min * (Math.random() > 0.5 ? 1 : -1),
          color: Math.random() > 0.5 ? config.colors.primary : config.colors.accent,
        });
      }
    };

    // Анимация
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Обновление позиций узлов
      nodesRef.current.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        
        // Отскок от границ
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        
        // Отталкивание от курсора
        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < mouseRef.current.radius && dist > 0) {
          const angle = Math.atan2(dy, dx);
          const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
          
          node.vx -= Math.cos(angle) * force * 0.02;
          node.vy -= Math.sin(angle) * force * 0.02;
        }
        
        // Ограничение скорости
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (speed > config.speed.max) {
          node.vx = (node.vx / speed) * config.speed.max;
          node.vy = (node.vy / speed) * config.speed.max;
        }
        
        // Рисование узла
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      });
      
      // Рисование соединений между узлами
      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const dx = nodesRef.current[i].x - nodesRef.current[j].x;
          const dy = nodesRef.current[i].y - nodesRef.current[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < config.connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(nodesRef.current[i].x, nodesRef.current[i].y);
            ctx.lineTo(nodesRef.current[j].x, nodesRef.current[j].y);
            
            // Выбор стилей линий в зависимости от цветов узлов
            const colorIndex = (nodesRef.current[i].color === config.colors.primary && 
                               nodesRef.current[j].color === config.colors.primary) ? 0 : 1;
            
            ctx.strokeStyle = config.colors.lines[colorIndex];
            ctx.lineWidth = (1 - dist / config.connectionDistance) * 1.5;
            ctx.stroke();
          }
        }
      }
    };

    // Инициализация и запуск
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [config]);

  return (
    <motion.div 
      className="fixed inset-0 -z-10 pointer-events-none" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
        style={{ width: '100%', height: '100%' }}
      />
    </motion.div>
  );
}
