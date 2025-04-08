'use client'

import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { FaLeaf, FaSeedling, FaTree, FaAppleAlt, FaCarrot } from 'react-icons/fa'
import { GiOrangeSlice, GiStrawberry } from 'react-icons/gi'
import { motion, AnimatePresence } from 'framer-motion'
import abstrakbottom from '../../../public/images/comment-abstrack-bottom.png'
import Image from 'next/image'
import { Autoplay } from 'swiper/modules'

const commentsData = [
  {
    name: 'ОЛЬГА',
    role: 'САДОВОД',
    text: 'НАШ САД - ЭТО НЕ ПРОСТО УЧАСТОК, ЭТО МЕСТО СИЛЫ И ВДОХНОВЕНИЯ. КАЖДЫЙ ДЕНЬ ПРИНОСИТ ЧТО-ТО НОВОЕ И ПРЕКРАСНОЕ.',
    rating: 5,
    color: 'green', // зеленый
    icon: FaTree,
  },
  {
    name: 'ИВАН',
    role: 'АГРОНОМ',
    text: 'СОК - ЭТО КОНЦЕНТРАТ ЗДОРОВЬЯ. МЫ ВЫРАЩИВАЕМ ФРУКТЫ И ОВОЩИ С ЛЮБОВЬЮ И ЗАБОТОЙ О КАЖДОМ РАСТЕНИИ.',
    rating: 4,
    color: 'orange', // оранжевый
    icon: GiOrangeSlice,
  },
  {
    name: 'ЕЛЕНА',
    role: 'ДИЗАЙНЕР',
    text: 'САД - ЭТО ЖИВАЯ КАРТИНА, КОТОРУЮ МЫ СОЗДАЕМ ВМЕСТЕ С ПРИРОДОЙ. КАЖДЫЙ ЭЛЕМЕНТ ИМЕЕТ ЗНАЧЕНИЕ.',
    rating: 3,
    color: 'red', // красный
    icon: GiStrawberry,
  },
  {
    name: 'АЛЕКСЕЙ',
    role: 'ЛАНДШАФТНЫЙ АРХИТЕКТОР',
    text: 'СОЗДАНИЕ САДА - ЭТО ИСКУССТВО БАЛАНСА МЕЖДУ ПРИРОДНОЙ КРАСОТОЙ И ФУНКЦИОНАЛЬНОСТЬЮ. КАЖДЫЙ ПРОЕКТ УНИКАЛЕН И НЕПОВТОРИМ.',
    rating: 5,
    color: 'yellow', // желтый
    icon: FaAppleAlt,
  },
  {
    name: 'МАРИЯ',
    role: 'ФЛОРИСТ',
    text: 'ЦВЕТЫ И РАСТЕНИЯ - ЭТО ЯЗЫК, НА КОТОРОМ ГОВОРИТ ПРИРОДА. МЫ ПОМОГАЕМ УСЛЫШАТЬ ЭТОТ ПРЕКРАСНЫЙ ГОЛОС В КАЖДОМ САДУ.',
    rating: 4,
    color: 'purple', // фиолетовый
    icon: FaCarrot,
  },
]

const colorMap = {
  green: {
    primary: 'green-600',
    secondary: 'green-800',
    light: 'green-100',
    border: 'green-500',
    hoverColor: '#059669',
    ratingBg: 'bg-green-600',
    ratingLight: 'bg-green-200',
    ratingHover: '#059669',
    ratingLightHover: '#A7F3D0'
  },
  orange: {
    primary: 'orange-500',
    secondary: 'orange-700',
    light: 'orange-100',
    border: 'orange-500',
    hoverColor: '#f97316',
    ratingBg: 'bg-orange-500',
    ratingLight: 'bg-orange-200',
    ratingHover: '#f97316',
    ratingLightHover: '#fed7aa'
  },
  red: {
    primary: 'red-500',
    secondary: 'red-700',
    light: 'red-100',
    border: 'red-500',
    hoverColor: '#ef4444',
    ratingBg: 'bg-red-500',
    ratingLight: 'bg-red-200',
    ratingHover: '#ef4444',
    ratingLightHover: '#fecaca'
  },
  yellow: {
    primary: 'yellow-500',
    secondary: 'yellow-700',
    light: 'yellow-100',
    border: 'yellow-500',
    hoverColor: '#eab308',
    ratingBg: 'bg-yellow-500',
    ratingLight: 'bg-yellow-200',
    ratingHover: '#eab308',
    ratingLightHover: '#fef08a'
  },
  purple: {
    primary: 'purple-500',
    secondary: 'purple-700',
    light: 'purple-100',
    border: 'purple-500',
    hoverColor: '#a855f7',
    ratingBg: 'bg-purple-500',
    ratingLight: 'bg-purple-200',
    ratingHover: '#a855f7',
    ratingLightHover: '#e9d5ff'
  }
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 100,
    rotateX: -45,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 15,
      duration: 0.7
    }
  },
  hover: {
    y: -15,
    scale: 1.03,
    rotateZ: [0, -1, 1, 0],
    boxShadow: "0 25px 50px -12px rgba(0, 100, 0, 0.4)",
    transition: {
      y: { duration: 0.3 },
      scale: { duration: 0.2 },
      rotateZ: { duration: 1.5, repeat: Infinity }
    }
  }
}

const leafAnim = {
  float: {
    y: [0, -15, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

const bottomImageAnim = {
  hidden: {
    opacity: 0,
    y: 100
  },
  visible: {
    opacity: 0,
    y: 100,
    transition: {
      duration: 0.1
    }
  },
  hover: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
}

export default function Comments() {
  const [hoveredIndex, setHoveredIndex] = useState(1);
  
  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100 py-12 px-4 overflow-hidden relative">
      {/* Уберем декоративные элементы фона */}
      
      <div className="container mx-auto">
        <motion.h2 
          className="text-4xl text-Pacifica font-bold text-green-800 text-center mb-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Отзывы о наш сад
        </motion.h2>
        
        <Swiper
          spaceBetween={40}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Autoplay]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          initialSlide={0}
        >
          {commentsData.map((item, idx) => (
            <SwiperSlide key={idx}>
              <motion.div
                className={`relative bg-white p-8 h-full rounded-lg border-l-4 border-${colorMap[item.color].border} shadow-lg overflow-hidden`}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, margin: "-50px" }}
                variants={cardVariants}
                onHoverStart={() => setHoveredIndex(idx)}
                onHoverEnd={() => idx === 1 ? setHoveredIndex(1) : setHoveredIndex(null)}
              >
                {/* Уберем плавающие листья */}
                
                {/* Уберем иконку в зависимости от роли */}
                
                <motion.p 
                  className="text-gray-700 mb-10 text-lg font-medium leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {item.text}
                </motion.p>

                <div className="flex items-center gap-6 mt-auto relative z-10">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className={`w-16 h-16 bg-${colorMap[item.color].light} rounded-full flex items-center justify-center text-xl font-bold text-${colorMap[item.color].secondary} border-2 border-${colorMap[item.color].primary}`}>
                      {item.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    {hoveredIndex === idx && (
                      <motion.div 
                        className={`absolute -bottom-1 -right-1 w-5 h-5 ${colorMap[item.color].ratingBg} rounded-full`}
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                  </motion.div>
                  <div>
                    <motion.div 
                      className={`font-bold text-${colorMap[item.color].secondary} text-xl`}
                      whileHover={{ x: 5, color: colorMap[item.color].hoverColor }}
                    >
                      {item.name}
                    </motion.div>
                    <motion.div 
                      className={`text-sm text-${colorMap[item.color].primary} relative z-20`}
                      whileHover={{
                        x: 5,
                        transition: { duration: 0.3 }
                      }}
                      initial={{ backgroundColor: 'transparent', padding: 0, borderRadius: 0 }}
                      whileInView={{ backgroundColor: 'transparent', padding: 0, borderRadius: 0 }}
                      animate={hoveredIndex === idx ? {
                        backgroundColor: 'rgba(255, 255, 255, 0.85)',
                        color: '#000000',
                        backdropFilter: 'blur(2px)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                        border: `1px solid rgba(255, 255, 255, 0.6)`,
                        transition: { duration: 0.5 }
                      } : {
                        backgroundColor: 'transparent',
                        padding: 0,
                        borderRadius: 0,
                        boxShadow: 'none',
                        border: 'none',
                        transition: { duration: 0.3 }
                      }}
                    >
                      {item.role}
                    </motion.div>
                  </div>
                </div>

                {/* Анимированный индикатор рейтинга */}
                <motion.div 
                  className="mt-8 flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className={`mr-2 text-${colorMap[item.color].secondary} font-medium`}>ОЦЕНКА:</span>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-5 h-5 mx-1 rounded-full flex items-center justify-center ${i < item.rating ? colorMap[item.color].ratingBg : colorMap[item.color].ratingLight}`}
                      whileHover={{ 
                        scale: 1.5, 
                        backgroundColor: i < item.rating ? colorMap[item.color].ratingHover : colorMap[item.color].ratingLightHover 
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {hoveredIndex === idx && i < item.rating && (
                        <motion.div 
                          className="w-2 h-2 bg-white rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1 * i }}
                        />
                      )}
                    </motion.div>
                  ))}
                </motion.div>

                {/* Абстрактное изображение внизу */}
                <motion.div
                  className="absolute bottom-0 left-0 w-full"
                  style={{ pointerEvents: 'none', zIndex: -1, overflow: 'visible' }}
                  initial={{ opacity: 0, y: 150 }}
                  animate={hoveredIndex === idx ? 
                    { opacity: 1, y: 0 } : 
                    { opacity: 0, y: 150 }
                  }
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '150px' }}>
                    <Image 
                      src={abstrakbottom} 
                      alt="abstract decoration"
                      width={1000}
                      height={300}
                      style={{ 
                        width: '100%',
                        height: 'auto',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                    
                        filter: item.color !== 'orange' ? 
                          `hue-rotate(${
                            item.color === 'green' ? '0deg' : 
                            item.color === 'red' ? '-40deg' : 
                            item.color === 'yellow' ? '30deg' : 
                            '260deg'
                          })` : 'none' 
                      }}
                      quality={100}
                      priority
                    />
                  </div>
                </motion.div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}