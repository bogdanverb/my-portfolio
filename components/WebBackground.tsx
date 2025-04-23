import { useRef, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function WebBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<any[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const canvasSize = useRef({ width: 0, height: 0 });
  const rafRef = useRef<number>(0);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        // Устанавливаем размер canvas равным размеру окна с учетом pixel ratio
        const dpr = window.devicePixelRatio || 1;
        canvasSize.current.width = window.innerWidth;
        canvasSize.current.height = window.innerHeight;
        canvas.width = canvasSize.current.width * dpr;
        canvas.height = canvasSize.current.height * dpr;
        canvas.style.width = `${canvasSize.current.width}px`;
        canvas.style.height = `${canvasSize.current.height}px`;
        
        // Инициализируем узлы только при изменении размера
        initNodes();
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Запускаем анимацию
    initNodes();
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);
  
  const initNodes = () => {
    const { width, height } = canvasSize.current;
    const nodeCount = Math.floor((width * height) / 15000); // Адаптивное количество узлов
    
    nodesRef.current = [];
    
    // Создаем узлы
    for (let i = 0; i < nodeCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.5 + 0.2;
      
      nodesRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 2 + 2,
        baseRadius: Math.random() * 2 + 2,
        pulseFactor: Math.random() * 0.5 + 0.5,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
        color: getNodeColor(),
      });
    }
  };
  
  const getNodeColor = () => {
    const isDark = mounted && theme === 'dark';
    
    if (isDark) {
      // Темные цвета для темной темы
      const colors = [
        'rgba(129, 140, 248, 0.6)', // primary indigo
        'rgba(79, 70, 229, 0.6)',   // darker indigo
        'rgba(99, 102, 241, 0.6)',  // mid indigo
        'rgba(167, 139, 250, 0.6)',  // purplish
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    } else {
      // Светлые цвета для светлой темы
      const colors = [
        'rgba(99, 102, 241, 0.3)',  // primary indigo
        'rgba(79, 70, 229, 0.3)',   // darker indigo
        'rgba(129, 140, 248, 0.3)', // light indigo
        'rgba(147, 51, 234, 0.3)',  // purple
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }
  };
  
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const { width, height } = canvasSize.current;
    const dpr = window.devicePixelRatio || 1;
    
    // Очищаем канвас
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Масштабируем для поддержки Retina дисплеев
    ctx.scale(dpr, dpr);
    
    // Отрисовываем линии и узлы
    const nodes = nodesRef.current;
    const mouseRange = 150; // Радиус действия мыши
    
    // Отрисовка линий между узлами
    ctx.globalCompositeOperation = 'lighter';
    
    for (let i = 0; i < nodes.length; i++) {
      const nodeA = nodes[i];
      
      // Пульсация размера узла
      const now = performance.now() / 1000;
      nodeA.radius = nodeA.baseRadius * (1 + 0.2 * Math.sin(now * nodeA.pulseSpeed + nodeA.pulseOffset));
      
      // Обновляем позицию
      nodeA.x += nodeA.vx;
      nodeA.y += nodeA.vy;
      
      // Отражение от границ экрана
      if (nodeA.x < 0 || nodeA.x > width) nodeA.vx *= -1;
      if (nodeA.y < 0 || nodeA.y > height) nodeA.vy *= -1;
      
      // Отрисовка линий до других узлов
      for (let j = i + 1; j < nodes.length; j++) {
        const nodeB = nodes[j];
        const dx = nodeB.x - nodeA.x;
        const dy = nodeB.y - nodeA.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          // Рисуем линию с прозрачностью зависящей от расстояния
          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          
          // Градиентная линия между двумя узлами
          const gradient = ctx.createLinearGradient(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
          gradient.addColorStop(0, nodeA.color);
          gradient.addColorStop(1, nodeB.color);
          
          ctx.strokeStyle = gradient;
          ctx.globalAlpha = 1 - (distance / 150);
          ctx.lineWidth = 1 * (1 - (distance / 150));
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
      
      // Взаимодействие с курсором
      const dx = mouseRef.current.x - nodeA.x;
      const dy = mouseRef.current.y - nodeA.y;
      const mouseDistance = Math.sqrt(dx * dx + dy * dy);
      
      if (mouseDistance < mouseRange) {
        // Отталкивание от курсора
        const force = (mouseRange - mouseDistance) / mouseRange;
        const angle = Math.atan2(dy, dx);
        
        nodeA.vx -= Math.cos(angle) * force * 0.2;
        nodeA.vy -= Math.sin(angle) * force * 0.2;
        
        // Ограничение скорости
        const speed = Math.sqrt(nodeA.vx * nodeA.vx + nodeA.vy * nodeA.vy);
        if (speed > 3) {
          nodeA.vx = (nodeA.vx / speed) * 3;
          nodeA.vy = (nodeA.vy / speed) * 3;
        }
      }
      
      // Отрисовка узла
      ctx.beginPath();
      ctx.arc(nodeA.x, nodeA.y, nodeA.radius, 0, Math.PI * 2);
      ctx.fillStyle = nodeA.color;
      ctx.fill();
    }
    
    // Сбрасываем масштаб
    ctx.scale(1/dpr, 1/dpr);
    
    // Продолжаем анимацию
    rafRef.current = requestAnimationFrame(animate);
  };
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ opacity: 0.8 }}
    />
  );
}
