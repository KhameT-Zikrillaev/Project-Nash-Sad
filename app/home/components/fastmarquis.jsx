'use client';

import React from 'react';
import Marquee from 'react-fast-marquee';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import juiceGlass from '../../../public/images/sok.png';

export default function NutritionMarquee() {
  const items = [
    "NUTRITION",
    "NATURAL FLAVOR",
    "FRESH FRUITS",
    "THIRST SATISFIER",
    "RICH IN NUTRITION"
  ];

  return (
    <div className="relative w-full bg-amber-50 py-2 overflow-hidden">
      {/* Бегущая строка с улучшенными эффектами */}
      <Marquee 
        speed={50} 
        gradient={false}
        pauseOnHover
        className="py-8"
      >
        {items.map((item, index) => (
          <motion.div 
            key={index}
            className="flex items-center mx-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: index * 0.1 }
            }}
            whileHover={{
              scale: 1.1,
              transition: { 
                duration: 0.4,
                type: "spring",
                stiffness: 300,
                damping: 10
              }
            }}
          >
            {/* Анимированный стакан сока */}
            <motion.div 
              className="relative w-36 h-20 mx-6"
              animate={{
                y: [0, -15, 0, -10, 0],
                rotate: [0, 5, -5, 3, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.75, 1]
              }}
              whileHover={{
                rotate: [0, 15, -15, 0],
                transition: { duration: 0.8 }
              }}
            >
              <Image
                src={juiceGlass}
                alt="Стакан сока"
                fill
                className="object-contain drop-shadow-lg"
              />
            </motion.div>

            {/* Текст с эффектом волны */}
            <motion.span 
              className="text-4xl font-extrabold text-amber-900 tracking-wider"
              animate={{
                scale: [1, 1.05, 1],
                textShadow: [
                  "0 0 0px rgba(0,0,0,0)",
                  "0 0 10px rgba(180, 83, 9, 0.5)",
                  "0 0 0px rgba(0,0,0,0)"
                ]
              }}
              transition={{
                duration: 3 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {item}
            </motion.span>

            {/* Разделитель с анимацией пульсации */}
            <motion.div 
              className="w-3 h-3 bg-amber-600 rounded-full mx-8"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        ))}
      </Marquee>

      {/* Улучшенные элементы фона */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => {
          const size = Math.random() * 30 + 20;
          const delay = Math.random() * 5;
          const duration = 15 + Math.random() * 10;
          const fruit = ['🍊', '🍏', '🍇', '🍓', '🍍', '🍋', '🍉', '🍎', '🍑', '🥭'][i % 10];
          
          return (
            <motion.div
              key={i}
              className="absolute text-3xl"
              initial={{
                opacity: 0,
                scale: 0.5
              }}
              animate={{
                y: [0, -100, 100, 0],
                x: [0, 50, -50, 0],
                opacity: [0, 0.8, 0],
                rotate: [0, 180, 360],
                scale: [0.5, 1.2, 0.5]
              }}
              transition={{
                delay,
                duration,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${size}px`,
              }}
            >
              {fruit}
            </motion.div>
          );
        })}
        
        {/* Эффект пузырьков */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full bg-amber-200/30"
            initial={{
              opacity: 0,
              y: 0,
              x: 0
            }}
            animate={{
              y: [-100, -300],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0.5, 0],
              scale: [0.5, 1.5]
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              bottom: 0,
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
}