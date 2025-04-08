'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import product from '../../../public/images/product.png';
import rightabstrack1 from '../../../public/images/right-abstrack-1.png';
import rightabstrack2 from '../../../public/images/right-abstrack-2.png';
import leftabstrack1 from '../../../public/images/left-abstrack-1.png';
import radiusrgb from '../../../public/images/radius-rgb-fon.png'

const test = () => {
  const [currentJuice, setCurrentJuice] = useState(1);
  const [animationKey, setAnimationKey] = useState(0);
  const [hoveredJuice, setHoveredJuice] = useState(null);

  const juices = [
    { 
      id: 1, 
      name: 'Апельсиновый', 
      color: 'bg-orange-500', 
      hoverColor: 'bg-orange-600',
      images: {
        product: product,
        abstrakRight1: rightabstrack1,
        abstrakRight2: rightabstrack2,
        abstrakLeft1: leftabstrack1,
      }
    },
    { 
      id: 2, 
      name: 'Яблочный', 
      color: 'bg-green-500', 
      hoverColor: 'bg-green-600',
      images: {
        product: product,
        abstrakRight1: rightabstrack1,
        abstrakRight2: rightabstrack2,
        abstrakLeft1: leftabstrack1,
      }
    },
    { 
      id: 3, 
      name: 'Виноградный', 
      color: 'bg-purple-500', 
      hoverColor: 'bg-purple-600',
      images: {
        product: product,
        abstrakRight1: rightabstrack1,
        abstrakRight2: rightabstrack2,
        abstrakLeft1: leftabstrack1,
      }
    },
    { 
      id: 4, 
      name: 'Мультифрукт', 
      color: 'bg-red-500', 
      hoverColor: 'bg-red-600',
      images: {
        product: product,
        abstrakRight1: rightabstrack1,
        abstrakRight2: rightabstrack2,
        abstrakLeft1: leftabstrack1,
      }
    },
    { 
      id: 5, 
      name: 'Томатный', 
      color: 'bg-rose-500', 
      hoverColor: 'bg-rose-600',
      images: {
        product: product,
        abstrakRight1: rightabstrack1,
        abstrakRight2: rightabstrack2,
        abstrakLeft1: leftabstrack1,
      }
    },
    { 
      id: 6, 
      name: 'Гранатовый', 
      color: 'bg-pink-700', 
      hoverColor: 'bg-pink-800',
      images: {
        product: product,
        abstrakRight1: rightabstrack1,
        abstrakRight2: rightabstrack2,
        abstrakLeft1: leftabstrack1,
      }
    },
  ];
  
  const currentJuiceData = juices.find(j => j.id === currentJuice);

  const handleJuiceChange = (juiceId) => {
    setCurrentJuice(juiceId);
    setAnimationKey(prevKey => prevKey + 1);
  };

  // Анимационные варианты
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 10 } }
  };

  return (
    <div className="flex flex-col bg-gradient-to-r from-green-600 via-green-700 to-green-800 md:flex-row p-4 md:p-8 items-center justify-center w-full h-full min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 relative overflow-hidden">
      {/* Анимированный фон */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-orange-300/20 blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-purple-300/20 blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 2
          }}
        />
      </motion.div>

      {/* Левая часть с кнопками */}
      <div className="left-content w-full md:w-1/2 flex flex-col items-center justify-center space-y-8 p-4 md:p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="text-center mb-8"
        >
          <motion.h2 
            className="text-4xl text-Caveat md:text-5xl font-bold text-white mb-4 drop-shadow-lg"
            style={{
              textShadow: '0 2px 10px rgba(0,0,0,0.2), 0 4px 20px rgba(0,0,0,0.1)'
            }}
          >
            Выберите ваш любимый сок
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-BadScript text-lg text-white/90"
          >
            Натуральные соки с насыщенным вкусом
          </motion.p>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-md"
        >
          {juices.map((juice) => (
            <motion.div
              key={juice.id}
              variants={item}
              className="relative perspective-1000"
            >
              <motion.button
                onClick={() => handleJuiceChange(juice.id)}
                className="w-full relative group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Основная кнопка */}
                <div 
                  className={`w-full h-full absolute inset-0 rounded-lg ${juice.color} transform transition-all duration-300 z-10`}
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)',
                    filter: currentJuice === juice.id ? 'brightness(1.1)' : 'brightness(0.9)',
                  }}
                >
                  {/* Внутренний градиент */}
                  <div 
                    className="absolute inset-0 rounded-lg opacity-70"
                    style={{
                      background: `linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 100%)`,
                      clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)',
                    }}
                  ></div>
                  
                  {/* Блик */}
                  <motion.div 
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-60"
                    style={{
                      background: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.4) 55%, transparent 100%)',
                      clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)',
                    }}
                    animate={currentJuice === juice.id ? {
                      left: ['-100%', '200%'],
                      transition: { repeat: Infinity, duration: 1.5, repeatDelay: 5 }
                    } : {}}
                  ></motion.div>
                </div>
                
                {/* Тень */}
                <div 
                  className="absolute inset-0 rounded-lg bg-black/20 -z-10 blur-md"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)',
                    transform: 'translateY(4px)',
                  }}
                ></div>
                
                {/* Подложка */}
                <div 
                  className="absolute inset-0 bg-black/10 rounded-lg -z-20 transform"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)',
                    transform: 'translateY(8px) translateX(4px)',
                  }}
                ></div>
                
                {/* Содержимое кнопки */}
                <div className="relative z-20 p-5 flex items-center">
                  {/* Иконка */}
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 
                      ${currentJuice === juice.id ? 'bg-white/20' : 'bg-white/10'} 
                      group-hover:bg-white/30 transition-all duration-300`}
                  >
                    <span className="text-2xl">
                      {juice.id === 1 && '🍊'}
                      {juice.id === 2 && '🍏'}
                      {juice.id === 3 && '🍇'}
                      {juice.id === 4 && '🍓'}
                      {juice.id === 5 && '🍅'}
                      {juice.id === 6 && '🍎'}
                    </span>
                  </div>
                  
                  {/* Текст */}
                  <div className="flex-1">
                    <span className="font-bold text-white text-lg block">
                      {juice.name}
                    </span>
                    <span className="text-white/70 text-xs">
                      натуральный
                    </span>
                  </div>
                  
                  {/* Индикатор выбора */}
                  {currentJuice === juice.id && (
                    <motion.div 
                      className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center"
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    >
                      <motion.div className="w-3 h-3 rounded-full bg-white" />
                    </motion.div>
                  )}
                </div>
              </motion.button>
              
              {/* Декоративный элемент */}
              {currentJuice === juice.id && (
                <motion.div 
                  className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-2 h-20"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{
                    background: `linear-gradient(to bottom, transparent, ${juice.color.replace('bg-', 'var(--')})}, transparent)`,
                    borderRadius: '2px',
                  }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center bg-white/20 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-white/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-white font-medium">100% натуральные ингредиенты</span>
          </div>
        </motion.div>
      </div>

      {/* Правая часть с изображением */}
      <div className="right-content relative w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
     
      <div className="cardanimation">
      <motion.div
          key={animationKey}
          className="relative w-72 h-72 md:w-88 md:h-88 lg:w-[420px] lg:h-[420px]"
        >
          {/* Основной продукт */}
          <motion.div
            initial={{ opacity: 0, scale: 0.3, rotate: -15, y: 40 }}
            animate={{ opacity: 1, scale: 1.05, rotate: 2, y: -10 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 18,
              duration: 0.4,
            }}
            className="z-10 absolute w-full h-full"
          >
            <motion.div
              animate={{ scale: 1, rotate: 0, y: 0 }}
              transition={{
                delay: 0.3,
                type: 'spring',
                stiffness: 200,
                damping: 12,
              }}
              className="w-full h-full"
            >
              <Image
                src={currentJuiceData.images.product}
                alt={`Сок ${currentJuiceData.name}`}
                layout="fill"
                objectFit="contain"
                className="drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
          
          {/* круглая обстракция */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1}}
            transition={{
              delay: 0.5,
              type: 'spring',
              stiffness: 300,
              damping: 25,
              duration: 0.6,
            }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={radiusrgb}
              alt="Radius RGB Fon"
              className="absolute inset-0 w-full h-full"
            />
          </motion.div>

          {/* Правая абстракция 1 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.2 }}
          >
            <Image
              src={currentJuiceData.images.abstrakRight1}
              alt="Right Abstrack"
              className="drop-shadow-2xl w-[30%] md:w-[40%] right-6 md:right-0 absolute z-0"
            />
          </motion.div>
          
          {/* Правая абстракция 2 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <Image
              src={currentJuiceData.images.abstrakRight2}
              alt="Right Abstrack"
              className="drop-shadow-2xl w-[25%] md:w-[35%] top-10 md:top-20 right-8 md:right-5 absolute z-0"
            />
          </motion.div>
          
          {/* Левая абстракция */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4, ease: 'easeOut' }}
            className="drop-shadow-2xl left-10 md:left-10 bottom-0 w-[20%] md:w-[25%] absolute z-0"
          >
            <Image
              src={currentJuiceData.images.abstrakLeft1}
              alt="Left Abstrack"
              className="w-full h-auto"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 25,
              delay: 1.3,
              duration: 0.6,
            }}
            className="absolute -bottom-6 md:-bottom-10 left-0 right-0 text-center"
          >
            <span className="text-xl md:text-2xl font-bold text-gray-800">
              {currentJuiceData.name} сок
            </span>
          </motion.div>
        </motion.div>
      </div>
       
      </div>
    </div>
  );
};

export default test;