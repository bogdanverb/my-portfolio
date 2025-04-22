import { motion } from 'framer-motion';

export default function Preloader() {
  return (
    <motion.div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-gray-900"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <motion.div 
          className="text-3xl md:text-4xl font-black tracking-tighter"
          animate={{ scale: [0.9, 1.05, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
        >
          <span className="text-primary">Script</span>
          <span className="text-accent relative">
            XX
            <span className="absolute -top-1 right-0 text-xs text-primary opacity-70">™</span>
          </span>
        </motion.div>
        
        <div className="mt-6 md:mt-8 flex justify-center">
          <div className="w-48 md:w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ 
                width: ["0%", "40%", "60%", "80%", "100%"],
                x: [null, 10, -10, 5, 0]
              }}
              transition={{ 
                duration: 2, 
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>
        </div>
        
        <div className="mt-4 md:mt-6 flex justify-center gap-2">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary"
              initial={{ scale: 0.5, opacity: 0.3 }}
              animate={{ 
                scale: [0.5, 1, 0.5], 
                opacity: [0.3, 1, 0.3],
              }}
              transition={{ 
                duration: 1.5, 
                delay: i * 0.2, 
                repeat: Infinity, 
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        <motion.div 
          className="mt-3 md:mt-4 text-center text-xs md:text-sm text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Загружаем ваш опыт...
        </motion.div>
      </div>
    </motion.div>
  );
}
