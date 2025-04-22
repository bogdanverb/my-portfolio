import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
    const [theme, setTheme] = useState('light');
    const [mounted, setMounted] = useState(false);

    // Анимируемый переход между темами
    const transition = {
        type: "spring",
        stiffness: 200,
        damping: 10
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        // Добавим класс для темной темы для совместимости с Tailwind
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    useEffect(() => {
        const currentTheme = localStorage.getItem('theme') || 
                             (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        setTheme(currentTheme);
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        // Установка класса для Tailwind
        if (currentTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem('theme', theme);
        }
    }, [theme, mounted]);

    if (!mounted) return <div className="w-10 h-10" />; // Заполнитель для предотвращения сдвигов

    return (
        <motion.button
            onClick={toggleTheme}
            className={`w-12 h-6 md:w-14 md:h-7 rounded-full p-1 relative focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary focus:ring-opacity-50 transition-colors ${
                theme === 'dark' ? 'bg-primary/20' : 'bg-gray-200'
            }`}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
        >
            <motion.div 
                className={`w-4 h-4 md:w-5 md:h-5 rounded-full absolute transition-colors ${
                    theme === 'dark' ? 'bg-primary' : 'bg-white shadow-md'
                }`}
                layout
                transition={transition}
                animate={{ 
                    x: theme === 'dark' ? 24 : 0,
                }}
            />
            
            {/* Солнце */}
            <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 md:h-5 md:w-5 absolute left-1 text-yellow-500"
                viewBox="0 0 20 20"
                fill="currentColor"
                initial={false}
                animate={{ 
                    opacity: theme === 'light' ? 1 : 0,
                    scale: theme === 'light' ? 1 : 0.5
                }}
                transition={{ duration: 0.2 }}
            >
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </motion.svg>
            
            {/* Луна */}
            <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 md:h-5 md:w-5 absolute right-1 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
                initial={false}
                animate={{ 
                    opacity: theme === 'dark' ? 1 : 0,
                    scale: theme === 'dark' ? 1 : 0.5
                }}
                transition={{ duration: 0.2 }}
            >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </motion.svg>
        </motion.button>
    );
};

export default ThemeToggle;