'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import fruitimages from '../../../public/images/sok.png';

const nutritionData = [
  { id: 1, name: 'Calories', value: 20, color: '#4CAF50', description: 'Low calorie content for weight management' },
  { id: 2, name: 'Alcohol', value: 0, color: '#2196F3', description: '100% alcohol-free for all ages' },
  { id: 3, name: 'Vitamins', value: 99, color: '#FF9800', description: 'Rich in essential vitamins and minerals' },
];

export default function FruitsOne() {
  const [selectedNutrient, setSelectedNutrient] = useState(nutritionData[2]);
  const controls = useAnimation();

  const handleNutrientHover = (nutrient) => {
    setSelectedNutrient(nutrient);
    controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 0.5 }
    });
  };

  return (
    <div className="flex flex-col lg:flex-row pb-[50px] md:pb-[150px] items-center justify-between max-w-[1200px] mx-auto py-10 px-4 sm:px-5 font-sans relative">
      {/* Левый контент с улучшениями */}
      <div className="w-full lg:w-[60%] relative z-10 order-2 lg:order-1 mt-10 lg:mt-0">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl text-gray-800 mb-5 font-bold leading-tight"
        >
          Juice Café With <span className="text-[#ff6b6b]">Smoothies</span><br />
          And <span className="text-[#ff9800]">Fresh Fruits</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-base sm:text-lg leading-relaxed text-gray-600 mb-6 sm:mb-8 max-w-full sm:max-w-[550px]"
        >
          Arcu cursus vitae congue mauris rhoncus oenean vel elit scelerisque. Mellis aliquam ut partitier leo a diam sollicitudin tempor. Congue eu consequat de felis donec. Ante in nibh mauris cursus.
        </motion.p>

        {/* Интерактивные показатели питательности */}
        <div className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8">
          {nutritionData.map((nutrient) => (
            <motion.div
              key={nutrient.id}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => handleNutrientHover(nutrient)}
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full cursor-pointer transition-all ${selectedNutrient.id === nutrient.id ? 'shadow-lg' : ''}`}
              style={{
                backgroundColor: selectedNutrient.id === nutrient.id ? `${nutrient.color}20` : '#f5f5f5',
                border: `2px solid ${selectedNutrient.id === nutrient.id ? nutrient.color : '#e0e0e0'}`
              }}
            >
              <h3 className="text-sm sm:text-lg font-medium" style={{ color: nutrient.color }}>
                {nutrient.name} <span className="font-bold">{nutrient.value}%</span>
              </h3>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '120px' }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-1 mb-5 bg-gradient-to-r from-[#ff6b6b] to-[#ff9800] rounded-full"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedNutrient.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mb-6 sm:mb-8 p-3 sm:p-4 rounded-lg bg-white shadow-sm max-w-full sm:max-w-[550px]"
          >
            <p className="text-sm sm:text-base text-gray-700">{selectedNutrient.description}</p>
          </motion.div>
        </AnimatePresence>

        <motion.button
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 0 20px rgba(255, 107, 107, 0.6)",
            backgroundColor: '#e55a5a'
          }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 sm:px-8 sm:py-3 bg-[#ff6b6b] text-white border-none rounded-full text-sm sm:text-base cursor-pointer shadow-lg shadow-[rgba(255,107,107,0.4)] w-full sm:w-auto text-center"
        >
          Know More
        </motion.button>
      </div>

      {/* Правый контент - адаптированная оригинальная анимация сока */}
      <div className="w-full lg:w-[35%] flex justify-center items-center relative order-1 lg:order-2">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ 
            repeat: Infinity,
            repeatType: "reverse",
            duration: 2
          }}
          className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] relative lg:absolute lg:-top-20 lg:right-5 rounded-full overflow-hidden shadow-xl mx-auto"
        >
          <Image
            src={fruitimages}
            alt="Juice"
            layout="fill"
            objectFit="cover"
            className="hover:scale-105 transition-transform duration-500"
          />

          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 rounded-full border-[4px] sm:border-[6px] border-transparent"
            style={{
              borderImage: "linear-gradient(45deg, #ff6b6b, #ff0000, #ff6b6b) 1",
              boxShadow: "0 0 15px rgba(255, 0, 0, 0.5)",
            }}
          />

          <motion.div
            initial={{ scale: 0.8, opacity: 0.7 }}
            animate={{ scale: 1.1, opacity: 0 }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: "loop"
            }}
            className="absolute inset-0 rounded-full border-2 border-[#ff6b6b]"
          />
        </motion.div>
      </div>
    </div>
  );
}