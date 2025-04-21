import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

type Point = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
};

const WebBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Устанавливаем размер canvas равным окну браузера
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Вызываем сразу и добавляем слушатель для изменения размера окна
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Количество точек зависит от размера экрана
    const pointDensity = window.innerWidth > 768 ? 25 : 15; // Меньше точек на мобильных
    const numPoints = Math.floor((canvas.width * canvas.height) / (1000 * 1000 / pointDensity));
    
    // Создаем точки
    const points: Point[] = [];
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: [],
      });
    }
    
    // Создаем связи между точками
    const maxConnectionDistance = Math.min(canvas.width, canvas.height) / 4;
    
    const connectPoints = () => {
      // Сбрасываем соединения
      points.forEach(point => {
        point.connections = [];
      });
      
      // Ищем новые соединения
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxConnectionDistance) {
            points[i].connections.push(j);
            points[j].connections.push(i);
          }
        }
      }
    };
    
    connectPoints();
    
    // Устанавливаем интервал для периодического пересчета соединений
    const connectionTimer = setInterval(connectPoints, 2000);
    
    // Функция анимации
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Увеличиваем контрастность и насыщенность цветов
      const lineColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.09)';
      const pointColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)';
      
      // Рисуем соединения с большей шириной
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.8; // Увеличиваем толщину линий для лучшей видимости
      
      points.forEach((point, i) => {
        point.connections.forEach(j => {
          if (i < j) { // Рисуем каждую линию только один раз
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        });
      });
      
      // Рисуем и обновляем точки
      ctx.fillStyle = pointColor;
      
      points.forEach(point => {
        // Обновляем позицию
        point.x += point.vx;
        point.y += point.vy;
        
        // Отражение от краев
        if (point.x <= 0 || point.x >= canvas.width) {
          point.vx = -point.vx;
          point.x = Math.max(0, Math.min(canvas.width, point.x));
        }
        if (point.y <= 0 || point.y >= canvas.height) {
          point.vy = -point.vy;
          point.y = Math.max(0, Math.min(canvas.height, point.y));
        }
        
        // Рисуем точку большего размера
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2); // Увеличили размер с 1.5 до 2
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    // Очистка при размонтировании
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      clearInterval(connectionTimer);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{ opacity: 0.85 }} // Увеличили непрозрачность для лучшей контрастности
    />
  );
};

export default WebBackground;
