'use client';
import { motion } from 'framer-motion';
import { FaLeaf } from 'react-icons/fa';
import { useEffect, useState, useRef } from 'react';

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const textRef = useRef(null);
  
  useEffect(() => {
    // Загрузка шрифта заранее
    const font = new FontFace('GreatVibes', "url('/fonts/GreatVibes-Regular.ttf')");
    
    font.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
      // Применяем шрифт к элементу после загрузки
      if (textRef.current) {
        textRef.current.style.fontFamily = "'GreatVibes', cursive";
      }
    }).catch(err => {
      console.error('Failed to load font:', err);
    });
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20); // Обновляем каждые 20мс для плавного прогресса

    return () => clearInterval(interval);
  }, []);

  // Позиции для вращающихся листьев
  const leafPositions = [
    { top: '20%', left: '50%', size: '1.2rem', delay: 0 },
    { top: '30%', left: '20%', size: '1rem', delay: 0.2 },
    { top: '70%', left: '80%', size: '1.5rem', delay: 0.4 },
    { top: '80%', left: '30%', size: '1.3rem', delay: 0.6 },
    { top: '40%', left: '75%', size: '1.1rem', delay: 0.8 },
    { top: '60%', left: '15%', size: '1.4rem', delay: 1.0 },
  ];

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Основной текст */}
        <motion.h1
          ref={textRef}
          style={{ 
            fontSize: "clamp(3rem, 5vw, 5rem)",
            color: "#15803d",
            position: "relative",
            zIndex: 10
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Наш Сад
          <motion.span
            className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.h1>

        {/* Анимированные листья */}
        {leafPositions.map((leaf, index) => (
          <motion.div
            key={index}
            className="absolute text-green-500"
            style={{
              top: leaf.top,
              left: leaf.left,
              fontSize: leaf.size,
            }}
            initial={{ opacity: 0, rotate: 0 }}
            animate={{
              opacity: [0, 1, 0.8, 1],
              rotate: 360,
            }}
            transition={{
              delay: leaf.delay,
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <FaLeaf />
          </motion.div>
        ))}

        {/* Дополнительная анимация пульсации */}
        <motion.div
          className="absolute inset-0 bg-green-50 rounded-full opacity-0"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      </div>

      {/* Цифровой счетчик прогресса */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-2xl font-medium text-green-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {progress}%
      </motion.div>
    </div>
  );
}