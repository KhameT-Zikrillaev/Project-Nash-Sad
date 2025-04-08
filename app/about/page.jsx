'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import fon from '../../public/images/fon-bg.png'
import product from '../../public/images/product.png'
import rightabstrack1 from '../../public/images/right-abstrack-1.png'
import rightabstrack2 from '../../public/images/right-abstrack-2.png'
import leftabstrack1 from '../../public/images/left-abstrack-1.png'
import radiusrgb from '../../public/images/radius-rgb-fon.png'

export default function About() {
  // Массив продуктов
  const products = [
    {
      id: 1,
      title: "Яблочный",
      image: product,
      leftAbstrak: leftabstrack1,
      rightAbstrak1: rightabstrack1,
      rightAbstrak2: rightabstrack2
    },
    {
      id: 2,
      title: "Апельсиновый",
      image: product,
      leftAbstrak: leftabstrack1,
      rightAbstrak1: rightabstrack1,
      rightAbstrak2: rightabstrack2
    },
    {
      id: 3,
      title: "Вишневый сок",
      image: product,
      leftAbstrak: leftabstrack1,
      rightAbstrak1: rightabstrack1,
      rightAbstrak2: rightabstrack2
    },
    {
      id: 4,
      title: "Мультифрукт",
      image: product,
      leftAbstrak: leftabstrack1,
      rightAbstrak1: rightabstrack1,
      rightAbstrak2: rightabstrack2
    },
    {
      id: 5,
      title: "Гранатовый",
      image: product,
      leftAbstrak: leftabstrack1,
      rightAbstrak1: rightabstrack1,
      rightAbstrak2: rightabstrack2
    },
    {
      id: 6,
      title: "Томатный",
      image: product,
      leftAbstrak: leftabstrack1,
      rightAbstrak1: rightabstrack1,
      rightAbstrak2: rightabstrack2
    }
  ]

  const [currentProduct, setCurrentProduct] = useState(0)
  // Добавляем ключ анимации, который будет меняться при выборе новой карты
  const [animationKey, setAnimationKey] = useState(0)

  // Функция для обработки клика по карточке
  const handleCardClick = (index) => {
    if (currentProduct !== index) {
      // Меняем ключ анимации для всех анимаций, чтобы они сбросились и проиграли заново
      setAnimationKey(prev => prev + 1)
      // Устанавливаем новый индекс выбранной карточки
      setCurrentProduct(index);
    }
  }

  return (
    <div className="w-full min-h-screen bg-green-500 mt-[-20px]   border-2 border-black flex flex-col md:flex-row relative overflow-hidden">
      {/* Многоцветный фон с эффектом "выпрыгивания" */}
      <Image
        src={fon}
        alt="Фон сока Наш Сад"
        fill
        className="object-cover   z-0 scale-125"
        priority
        quality={100}
      />
      <div className='absolute inset-0 w-full h-full' style={{ zIndex: 0 }}>

        <div className='grid grid-rows-12 h-full'>
          {[...Array(12)].map((_, index) => (
            <motion.div 
              key={`column-${index}-${animationKey}`}
              className='h-full bg-black/30'
              initial={{ 
                scaleY: 0,
                opacity: 0
              }}
              animate={{ 
                scaleY: 1,
                opacity:1
              }}
              transition={{ 
                duration: 0.7,
                delay: 0.06 * index,
                ease: [0.22, 1, 0.36, 1] // Более динамичная кривая
              }}
             
            />
          ))}
        </div>
      </div>

      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Левая контент~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <div className="left-content w-full md:w-1/2 flex flex-col justify-center px-6 py-10 md:px-10 relative z-10 overflow-hidden">
  {/* Анимированный фон с градиентными волнами */}
  <motion.div 
    className="absolute -z-10 top-0 left-0 w-full h-full"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <div className="absolute inset-0 opacity-70"></div>
    <motion.div 
      className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-green-200 blur-3xl opacity-40"
      animate={{
        scale: [1, 1.2, 1],
        x: [-20, 20, -20],
        y: [0, 30, 0]
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.div 
      className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-40"
      animate={{
        scale: [1, 1.3, 1],
        x: [0, -40, 0],
        y: [0, 40, 0]
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  </motion.div>

  {/* Заголовок с эффектом "выскакивания" */}
  <motion.h1 
    initial={{ opacity: 0, y: -40, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ 
      duration: 0.6,
      ease: [0.175, 0.885, 0.32, 1.275] 
    }}
    className="text-4xl ml-12 md:text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-100 relative"
  >
    <motion.span
      className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{ delay: 0.4, duration: 0.8 }}
    />
    Натуральные соки
  </motion.h1>
  
  {/* Текст с эффектом появления */}
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.6 }}
    className="text-lg ml-6 md:text-xl mb-8 text-white leading-relaxed"
  >
    Изготовлены из <span className="font-semibold text-amber-300">отборных фруктов</span> и ягод, выращенных в экологически чистых регионах.
  </motion.p>

  {/* Карточки с продуктами - УЛУЧШЕННАЯ ВЕРСИЯ */}
  <div className="flex flex-wrap justify-center gap-4 mb-10 mt-6">
    {products.map((product, index) => (
      <motion.div
        key={`${product.id}-${animationKey}`}
        initial={{ opacity: 0, y: 20, scale: 0.9 }} 
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          delay: 0.1 + index * 0.03, 
          duration: 0.25, 
          type: "spring",
          stiffness: 170, 
          damping: 15 
        }}
        onClick={() => handleCardClick(index)}
        className="relative cursor-pointer w-[90px] h-[130px] sm:w-[100px] sm:h-[140px] group perspective-1000"
      >
        {/* 3D Фигурный фон с эффектом наклона */}
        <motion.div 
          key={`bg-${product.id}-${animationKey}`}
          className="absolute bottom-0 left-0 w-full h-[70%] rounded-xl shadow-md"
          style={{
            background: index % 3 === 0 
              ? 'linear-gradient(145deg, #4ade80 0%, #16a34a 100%)' 
              : index % 3 === 1 
                ? 'linear-gradient(145deg, #fb923c 0%, #ea580c 100%)' 
                : 'linear-gradient(145deg, #a855f7 0%, #7e22ce 100%)',
            transformStyle: 'preserve-3d',
            clipPath: 'polygon(0% 15%, 15% 0%, 85% 0%, 100% 15%, 100% 100%, 0% 100%)'
          }}
          whileHover={{
            y: currentProduct === index ? -8 : -3,
            rotateX: currentProduct === index ? 5 : 0,
            rotateY: currentProduct === index ? 0 : 0,
            boxShadow: currentProduct === index ? '0 15px 30px -8px rgba(0, 0, 0, 0.2)' : '0 5px 15px -5px rgba(0, 0, 0, 0.1)',
            transition: { duration: 0.2 }
          }}
          animate={currentProduct === index ? {
            y: [0, -5, 0],
            rotateY: [0, 3, -3, 0],
            boxShadow: ['0 5px 15px rgba(0,0,0,0.1)', '0 12px 25px rgba(0,0,0,0.15)'],
          } : {}}
          transition={currentProduct === index ? {
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut"
          } : {}}
        >
          {/* Декоративные блики */}
          <div className="absolute inset-0 overflow-hidden rounded-xl">
            <motion.div 
              className="absolute top-1/3 left-1/3 w-6 h-6 rounded-full opacity-20"
              style={{ 
                background: 'white',
                filter: 'blur(3px)'
              }}
              animate={currentProduct === index ? {
                x: [0, 10, 0],
                y: [0, 8, 0],
                scale: [1, 1.3, 1]
              } : {}}
              transition={currentProduct === index ? {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              } : {}}
            />
          </div>
        </motion.div>
        
        {/* Изображение с эффектом "выпрыгивания" */}
        <motion.div 
          key={`img-${product.id}-${animationKey}`}
          className="absolute -right-2 bottom-[25%] w-[110%] h-[110%] z-10 origin-bottom"
          whileHover={{ 
            scale: currentProduct === index ? 1.12 : 1.05,
            rotate: currentProduct === index ? 5 : 0,
            y: currentProduct === index ? -10 : -3,
            transition: { duration: 0.2 }
          }}
          animate={currentProduct === index ? {
            rotate: [0, 3, -3, 0],
            y: [0, -5, 0],
          } : {}}
          transition={currentProduct === index ? {
            repeat: Infinity,
            duration: 2.5,
            ease: "easeInOut"
          } : {}}
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain drop-shadow-lg transition-all"
            style={{ 
              filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.15))',
              transform: 'translateZ(15px)'
            }}
          />
        </motion.div>
        
        {/* Эффект сияния при выборе */}
        {currentProduct === index && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              boxShadow: index % 3 === 0 
                ? '0 0 20px 5px rgba(74, 222, 128, 0.3)' 
                : index % 3 === 1 
                  ? '0 0 20px 5px rgba(251, 146, 60, 0.3)' 
                  : '0 0 20px 5px rgba(168, 85, 247, 0.3)'
            }}
          />
        )}
        
        {/* Название продукта с эффектом подчеркивания */}
        <motion.div 
          className="absolute -bottom-5 left-0 right-0 text-center"
          initial={{ opacity: 0, y: 5 }}
          animate={{ 
            opacity: 1, 
            y: 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative inline-block">
            <span className={`text-xs font-medium ${currentProduct === index ? 'text-' + (index % 3 === 0 ? 'white' : index % 3 === 1 ? 'amber-200' : 'purple-200') + ' font-semibold' : 'text-white'} transition-all`}>
              {product.title}
            </span>
            {currentProduct === index && (
              <motion.div 
                className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                style={{
                  background: index % 3 === 0 
                    ? '#ffffff' 
                    : index % 3 === 1 
                      ? '#fef08a' 
                      : '#e9d5ff'
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
        </motion.div>
        
        {/* Индикатор выбранной карты - улучшенный */}
        {currentProduct === index && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -top-2 -right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md z-20"
          >
            <motion.div 
              className="w-3 h-3 rounded-full"
              style={{
                background: index % 3 === 0 
                  ? '#16a34a' 
                  : index % 3 === 1 
                    ? '#ea580c' 
                    : '#7e22ce'
              }}
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        )}
      </motion.div>
    ))}
  </div>
        </div>


      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Правая контент АНИМАЦИЯ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <div className="right-content w-full md:w-1/2 flex items-center justify-center min-h-[500px] relative">
        <div className="relative w-[300px] h-[400px] sm:w-[350px] sm:h-[450px] md:w-[400px] md:h-[500px] lg:w-[450px] lg:h-[550px]">
          {/* Основной продукт */}
          <AnimatePresence mode="wait">
            <motion.div
              key={products[currentProduct].id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 z-10"
            >
              <Image
                src={products[currentProduct].image}
                alt={products[currentProduct].title}
                fill
                style={{ objectFit: 'contain' }}
                className="drop-shadow-lg"
              />
            </motion.div>
          </AnimatePresence>

          {/* круглая обстракция */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute inset-0 z-5"
          >
            <Image
              src={radiusrgb}
              alt="Radius RGB Fon"
              fill
              style={{ objectFit: 'contain' }}
              className="opacity-60"
            />
          </motion.div>

          {/* Правая абстракция 1 */}
          <motion.div
            key={`right1-${currentProduct}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="absolute right-[30px] md:right-[40px] top-[30%] z-4"
          >
            <Image
              src={products[currentProduct].rightAbstrak1}
              alt="Right Abstrack"
              width={80}
              height={80}
              className="sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] lg:w-[140px] lg:h-[140px]"
            />
          </motion.div>
          
          {/* Правая абстракция 2 */}
          <motion.div
            key={`right2-${currentProduct}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="absolute right-[30px] sm:right-[50px] md:right-[40px] top-[20%] z-3"
          >
            <Image
              src={products[currentProduct].rightAbstrak2}
              alt="Right Abstrack"
              width={60}
              height={60}
              className="sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px]"
            />
          </motion.div>
          
          {/* Левая абстракция */}
          <motion.div
            key={`left-${currentProduct}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4, ease: 'easeOut' }}
            className="absolute left-[30px] md:left-[40px] bottom-[5%] z-3"
          >
            <Image
              src={products[currentProduct].leftAbstrak}
              alt="Left Abstrack"
              width={70}
              height={70}
              className="sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px] lg:w-[130px] lg:h-[130px]"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}