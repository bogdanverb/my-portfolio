import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // После монтирования компонента в DOM мы можем безопасно показывать переключатель
  // (избегаем гидратации на стороне сервера)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <motion.button
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="w-11 h-6 bg-gray-300 dark:bg-gray-700 rounded-full p-1 flex justify-start dark:justify-end items-center relative focus:outline-none"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        className="w-4 h-4 rounded-full z-10 relative"
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {isDark ? (
          // Moon icon
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 text-yellow-300" 
            viewBox="0 0 20 20" 
            fill="currentColor"
            initial={{ rotate: -45 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </motion.svg>
        ) : (
          // Sun icon
          <motion.svg
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 text-yellow-500" 
            viewBox="0 0 20 20" 
            fill="currentColor"
            initial={{ scale: 0.6, rotate: 45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </motion.svg>
        )}
      </motion.div>
      
      {/* Background animation */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <motion.div
          className={`absolute inset-0 ${
            isDark 
            ? 'bg-gradient-to-r from-gray-800 to-gray-900'
            : 'bg-gradient-to-r from-blue-400 to-purple-500'
          }`}
          animate={{ 
            opacity: isDark ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Stars in dark mode */}
        {isDark && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2, 
                  delay: i * 0.3,
                  repeatType: "reverse" 
                }}
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${10 + Math.random() * 80}%`,
                }}
              />
            ))}
          </motion.div>
        )}
        
        {/* Sun rays in light mode */}
        {!isDark && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-full h-0.5 bg-yellow-300 opacity-75"
                style={{ 
                  transformOrigin: "0% 50%",
                  rotate: 60 * i
                }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ 
                  repeat: Infinity,
                  duration: 3,
                  delay: i * 0.5,
                  repeatType: "reverse" 
                }}
              />
            ))}
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}
