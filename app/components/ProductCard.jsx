'use client'

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const ProductCard = ({ product, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  return (
    <div className="relative" ref={ref}>
      {/* Изображение сока - появляется первым только когда в поле зрения */}
      <motion.div
        className="absolute -right-36 bottom-0 w-92 h-full z-20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ 
          duration: 0.6,
          delay: index * 0.2,
          ease: [0.16, 1, 0.3, 1]
        }}
        whileHover={{
          scale: 1.15,
          rotate: [0, 15, -15, 0],
          transition: { 
            duration: 1,
            ease: "easeInOut"
          }
        }}
      >
        <Image 
          src={product.image} 
          alt={product.title}
          width={320}
          height={320}
          className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          priority
        />
      </motion.div>

      {/* Карточка - появляется после сока только когда в поле зрения */}
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 200 }}
        transition={{ 
          duration: 0.8, 
          delay: index * 0.2 + 0.3,
          ease: [0.16, 1, 0.3, 1]
        }}
        className={`relative h-full bg-gradient-to-br ${product.color} p-8 overflow-visible group`}
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 70%, 85% 100%, 0 100%)',
          borderRadius: '20px 20px 40px 20px'
        }}
      >
        {/* Контент */}
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <motion.h3 
              className="text-3xl font-black text-white uppercase mb-3 leading-tight"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: index * 0.2 + 0.5 }}
              whileHover={{ x: 5 }}
            >
              {product.title}
            </motion.h3>
            <motion.p 
              className="text-white/90 text-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: index * 0.2 + 0.6 }}
              whileHover={{ x: 5 }}
            >
              {product.description}
            </motion.p>
          </div>

          <motion.button
            className="self-start mt-8 px-8 py-3 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-full text-white font-bold text-lg relative overflow-hidden hover:border-white transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: index * 0.2 + 0.7 }}
            whileHover={{
              scale: 1.05,
              backgroundColor: 'rgba(255,255,255,0.2)'
            }}
          >
            <span className="relative z-10">ПОПРОБОВАТЬ</span>
            <motion.span 
              className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100"
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>
        </div>

        {/* Свечение при наведении */}
        <motion.div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 80px 20px rgba(255,255,255,0.2)',
            clipPath: 'polygon(0 0, 100% 0, 100% 70%, 85% 100%, 0 100%)'
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </div>
  );
};

export default ProductCard;