import React, { useEffect, useRef, useState } from 'react';
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
  const [isSupported, setIsSupported] = useState(true);
  
  useEffect(() => {
    // Проверяем поддержку canvas и performance
    if (typeof window !== 'undefined') {
      try {
        const canvas = document.createElement('canvas');
        const isCanvasSupported = !!canvas.getContext('2d');
        
        if (!isCanvasSupported) {
          console.log('Canvas is not supported in this browser');
          setIsSupported(false);
          return;
        }
      } catch (error) {
        console.error('Error checking canvas support:', error);
        setIsSupported(false);
        return;
      }
    }
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsSupported(false);
      return;
    }
    
    // Оптимизация: ограничиваем FPS для экономии ресурсов
    let lastFrameTime = 0;
    const targetFPS = 30; // Снижаем FPS для более стабильной работы
    const frameInterval = 1000 / targetFPS;
    
    // Устанавливаем размер canvas равным окну браузера
    const setCanvasSize = () => {
      try {
        // Используем devicePixelRatio для ретина-дисплеев, но ограничиваем его
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        
        // Устанавливаем CSS размеры
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        
        // Масштабируем контекст
        ctx.scale(dpr, dpr);
      } catch (error) {
        console.error('Error setting canvas size:', error);
        setIsSupported(false);
      }
    };
    
    // Вызываем сразу и добавляем слушатель с дебаунсингом для изменения размера окна
    setCanvasSize();
    
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setCanvasSize();
        connectPoints(); // Пересчитываем связи при изменении размера
      }, 200);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Адаптивные настройки в зависимости от устройства
    const isMobile = window.innerWidth < 768;
    const isLowPower = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Количество точек зависит от размера экрана и производительности устройства
    const pointDensity = isLowPower ? 
      (isMobile ? 10 : 15) : 
      (isMobile ? 15 : 25);
      
    // Расчет оптимального количества точек с учетом площади экрана
    const screenArea = (window.innerWidth * window.innerHeight) / 1000;
    const numPoints = Math.min(
      Math.floor(screenArea * (pointDensity / 100)),
      isLowPower ? 50 : 100 // Максимальное количество точек
    );
    
    // Создаем точки с оптимизированными параметрами
    const points: Point[] = [];
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * (isLowPower ? 0.2 : 0.5), // Медленнее для мобильных
        vy: (Math.random() - 0.5) * (isLowPower ? 0.2 : 0.5),
        connections: [],
      });
    }
    
    // Создаем связи между точками с оптимизацией
    const maxConnectionDistance = Math.min(window.innerWidth, window.innerHeight) / (isMobile ? 5 : 4);
    
    const connectPoints = () => {
      try {
        // Сбрасываем соединения
        points.forEach(point => {
          point.connections = [];
        });
        
        // Оптимизация: проверяем расстояние только для ближайших точек
        // Используем сетку для ускорения поиска соседей
        for (let i = 0; i < points.length; i++) {
          // Ограничиваем количество соединений для каждой точки
          const maxConnections = isLowPower ? 3 : 5;
          
          if (points[i].connections.length >= maxConnections) continue;
          
          for (let j = i + 1; j < points.length; j++) {
            if (points[j].connections.length >= maxConnections) continue;
            
            const dx = points[i].x - points[j].x;
            const dy = points[i].y - points[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < maxConnectionDistance) {
              points[i].connections.push(j);
              points[j].connections.push(i);
            }
          }
        }
      } catch (error) {
        console.error('Error connecting points:', error);
      }
    };
    
    connectPoints();
    
    // Оптимизация: уменьшаем частоту пересчета соединений
    const connectionTimer = setInterval(connectPoints, isLowPower ? 3000 : 2000);
    
    // Функция анимации с оптимизацией FPS
    const animate = (currentTime: number) => {
      // Ограничение FPS
      if (currentTime - lastFrameTime < frameInterval) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      
      lastFrameTime = currentTime;
      
      try {
        ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), 
                           canvas.height / (window.devicePixelRatio || 1));
        
        // Определяем цвет в зависимости от темы
        const lineColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.09)';
        const pointColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)';
        
        // Рисуем соединения
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = isLowPower ? 0.5 : 0.8;
        
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
          
          // Отражение от краев с небольшим случайным фактором для более естественного движения
          if (point.x <= 0 || point.x >= window.innerWidth) {
            point.vx = -point.vx * (0.9 + Math.random() * 0.2);
            point.x = Math.max(0, Math.min(window.innerWidth, point.x));
          }
          if (point.y <= 0 || point.y >= window.innerHeight) {
            point.vy = -point.vy * (0.9 + Math.random() * 0.2);
            point.y = Math.max(0, Math.min(window.innerHeight, point.y));
          }
          
          // Рисуем точку с учетом мобильности
          ctx.beginPath();
          ctx.arc(point.x, point.y, isLowPower ? 1.5 : 2, 0, Math.PI * 2);
          ctx.fill();
        });
      } catch (error) {
        console.error('Error in animation loop:', error);
        cancelAnimationFrame(animationId);
        setIsSupported(false);
        return;
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    let animationId = requestAnimationFrame(animate);
    
    // Очистка при размонтировании
    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(connectionTimer);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);
  
  // Не рендерим canvas, если он не поддерживается
  if (!isSupported) return null;
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{ 
        opacity: 0.85,
        willChange: 'transform', // Оптимизация для GPU
      }}
      aria-hidden="true"
    />
  );
};

// Экспортируем с мемоизацией для предотвращения ненужных перерисовок
export default React.memo(WebBackground);
