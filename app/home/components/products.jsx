'use client'

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProductCard from '../../components/ProductCard';
import sokImage from '../../../public/images/sok.png';
import AnimatedWave from '../../components/AnimatedWave.jsx';

const products = [
  {
    id: 1,
    title: 'ЯБЛОЧНЫЙ ВЗРЫВ',
    image: sokImage,
    description: 'Свежесть спелых яблок в каждом глотке',
    color: 'from-green-500 to-green-700'
  },
  {
    id: 2,
    title: 'АПЕЛЬСИНОВЫЙ ЗАРЯД',
    image: sokImage,
    description: 'Энергия солнца и витамина C',
    color: 'from-orange-500 to-orange-700'
  },
  {
    id: 3,
    title: 'ВИШНЁВЫЙ МИКС',
    image: sokImage,
    description: 'Богатый вкус спелой вишни',
    color: 'from-red-500 to-red-700'
  },
  {
    id: 4,
    title: 'МУЛЬТИФРУКТ',
    image: sokImage,
    description: 'Гармония самых сочных фруктов',
    color: 'from-yellow-500 to-yellow-700'
  },
  {
    id: 5,
    title: 'ГРАНАТОВЫЙ ЭЛИКСИР',
    image: sokImage,
    description: 'Мощный антиоксидантный коктейль',
    color: 'from-purple-500 to-purple-700'
  },
  {
    id: 6,
    title: 'ТОМАТНЫЙ КЛАССИК',
    image: sokImage,
    description: 'Натуральный вкус спелых томатов',
    color: 'from-red-700 to-red-900'
  }
]

export default function Products() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true
    });
  }, []);

  return (
    <>
    <AnimatedWave color="#054a14" className='mt-[0px] md:mt-[-50px]'  rotate='rotate-180'/>
    <section className="py-32 relative overflow-hidden" >
      {/* Основной фон - просто чистый зелёный градиент без дополнительных наложений */}
      <div className="absolute bg-[#054a14] inset-0" 
       
      />
      
      {/* Статичные круги для красивого фона */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Большой светлый круг сверху */}
        <div className="absolute rounded-full bg-[#054a14]" 
          style={{
            width: '600px',
            height: '600px',
            top: '-200px',
            right: '-100px',
            filter: 'blur(100px)'
          }}
        />
        
        {/* Большой светлый круг снизу */}
        <div className="absolute rounded-full bg-[#054a14]" 
          style={{
            width: '500px',
            height: '500px',
            bottom: '-150px',
            left: '-100px',
            filter: 'blur(80px)'
          }}
        />
        
        {/* Зелёный акцент в центре */}
        <div className="absolute rounded-full bg-[#054a14]" 
          style={{
            width: '400px',
            height: '400px',
            bottom: '30%',
            right: '25%',
            filter: 'blur(90px)'
          }}
        />
      </div>
      
      {/* Плавные линии */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-green-400/20 to-transparent" 
          style={{
            top: '30%',
            filter: 'blur(2px)'
          }}
        />
        <div className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-green-300/20 to-transparent" 
          style={{
            top: '60%',
            filter: 'blur(2px)'
          }}
        />
      </div>

      {/* Единственный анимированный элемент - медленно пульсирующая область */}
      <motion.div 
        className="absolute rounded-full bg-gradient-to-r from-green-500/10 to-green-300/10 z-0"
        initial={{ opacity: 0.3, scale: 0.9 }}
        animate={{ 
          opacity: [0.3, 0.5, 0.3], 
          scale: [0.9, 1.05, 0.9]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        style={{
          width: '450px',
          height: '450px',
          top: '40%',
          left: '35%',
          filter: 'blur(70px)',
        }}
      />

      {/* Статичные блики */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => {
          const size = 5 + (i % 5) * 3;
          const positions = [
            { top: '15%', left: '25%' },
            { top: '20%', left: '80%' },
            { top: '35%', left: '20%' },
            { top: '40%', left: '70%' },
            { top: '50%', left: '30%' },
            { top: '60%', left: '10%' },
            { top: '70%', left: '50%' },
            { top: '80%', left: '25%' },
            { top: '85%', left: '80%' },
            { top: '25%', left: '50%' },
            { top: '75%', left: '75%' },
            { top: '45%', left: '90%' },
            { top: '10%', left: '40%' },
            { top: '55%', left: '60%' },
            { top: '90%', left: '35%' },
          ];
          return (
            <div 
              key={`blik-${i}`}
              className="absolute rounded-full bg-white/30"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: positions[i].top,
                left: positions[i].left,
                boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
              }}
            />
          )
        })}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-Caveat text-7xl font-black text-center mb-20 text-white uppercase"
        >
          НАШИ <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-500">СОКИ</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index}
            />
          ))}
        </div>
      </div>
      
    </section>

    <AnimatedWave color="#054a14" className="mt-[0px] md:mt-[-50px]" rotate='rotate-0'/>
    </>
  );
}