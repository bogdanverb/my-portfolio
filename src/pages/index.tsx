import React from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <motion.h1
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Привет, я [Ваше Имя]
        </motion.h1>
        <motion.p
          className="text-lg mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Я программист, специализирующийся на веб-разработке.
        </motion.p>
        <motion.div
          className="flex space-x-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a href="/about" className="btn">
            Узнать больше
          </a>
          <a href="/projects" className="btn">
            Мои проекты
          </a>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Home;