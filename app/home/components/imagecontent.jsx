'use client'

import React from 'react';
import Image from 'next/image';
import photo from '../../../public/images/imgcontentphoto.jpg';
import { motion } from 'framer-motion';

export default function ImageContent() {
  const cards = [
    { 
      id: 1, 
      image: photo,
      title: "СОЧНЫЕ ТОМАТЫ",
      description: "Богаты ликопином - мощным антиоксидантом",
      position: "left-4 bottom-4",
      color: "bg-red-600/90",
      rotate: "-2deg",
      shape: "rounded-tr-[100px] rounded-bl-[100px]"
    },
    { 
      id: 2, 
      image: photo,
      title: "АРОМАТНАЯ ЗЕЛЕНЬ",
      description: "Содержит эфирные масла и фитонциды",
      position: "right-4 bottom-4 text-right",
      color: "bg-green-600/90",
      rotate: "1deg",
      shape: "rounded-tl-[100px] rounded-br-[100px]"
    },
    { 
      id: 3, 
      image: photo,
      title: "ХРУСТЯЩИЕ ОГУРЦЫ",
      description: "Естественное увлажнение организма",
      position: "left-4 top-4",
      color: "bg-emerald-600/90",
      rotate: "-1.5deg",
      shape: "rounded-br-[100px] rounded-tl-[40px]"
    },
    { 
      id: 4, 
      image: photo,
      title: "СЛАДКИЙ ПЕРЕЦ",
      description: "Рекордсмен по витамину С",
      position: "right-4 top-4 text-right",
      color: "bg-yellow-600/90",
      rotate: "2deg",
      shape: "rounded-bl-[100px] rounded-tr-[40px]"
    },
    { 
      id: 5, 
      image: photo,
      title: "ПРЯНАЯ РУКОЛА",
      description: "Источник кальция и витамина K",
      position: "left-4 bottom-4",
      color: "bg-lime-600/90",
      rotate: "-1deg",
      shape: "rounded-t-[60px] rounded-b-[20px]"
    },
    { 
      id: 6, 
      image: photo,
      title: "НАШ ФИРМЕННЫЙ СБОР",
      description: "Уникальный микс самых полезных культур",
      position: "left-1/2 -translate-x-1/2 bottom-8 text-center",
      color: "bg-teal-600/90",
      rotate: "0deg",
      shape: "rounded-[80px]"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const cardItem = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring",
        damping: 15,
        stiffness: 120,
        duration: 0.5 
      } 
    }
  };

  const hoverEffect = {
    y: -10,
    rotate: 0,
    scale: 1.05,
    transition: { 
      type: "spring",
      stiffness: 350,
      damping: 10
    }
  };

  const tapEffect = {
    scale: 0.98,
    rotate: 0
  };

  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const contentHover = {
    scale: 1.05,
    x: -2,
    transition: { duration: 0.2 }
  };

  // Новая анимация для текстового блока
  const textBlockAnimation = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.5
      }
    },
    hover: {
      scale: 1.03,
      rotate: -1,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  // Анимация градиентного фона
  const gradientAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.8,
      transition: { duration: 0.8 }
    },
    hover: {
      opacity: 0.5,
      backgroundPosition: ["0% 0%", "100% 100%"],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <>
    <div className='container mx-auto px-4 py-12'>
      
      {/* Мобильная версия */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="md:hidden space-y-8 py-6"
      >
        {cards.map((card) => (
          <motion.div 
            key={card.id}
            variants={cardItem}
            whileHover={hoverEffect}
            whileTap={tapEffect}
            initial={{ rotate: card.rotate }}
            className={`relative overflow-hidden aspect-square shadow-2xl border-2 border-white/20 ${card.shape}`}
            style={{ 
              boxShadow: '0 20px 40px -15px rgba(0,0,0,0.4)',
              transformStyle: 'preserve-3d'
            }}
          >
            <motion.div 
              animate={floatingAnimation}
              className="absolute inset-0"
            >
              <Image 
                src={card.image} 
                alt={card.title} 
                fill 
                className="object-cover"
                priority
              />
            </motion.div>
            
            <motion.div
              variants={textBlockAnimation}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className={`absolute ${card.position} ${card.color} text-white p-5 max-w-[90%] backdrop-blur-lg border-2 border-white/20 shadow-2xl shadow-black/30 ${card.shape}`}
              style={{
                background: `linear-gradient(135deg, ${card.color.replace('/90', '')} 0%, ${card.color.replace('/90', '/70')} 100%)`
              }}
            >
              <motion.h3 
                className="text-xl font-bold tracking-tight mb-1"
                whileHover={contentHover}
                style={{ textShadow: '0 2px 3px rgba(0,0,0,0.3)' }}
              >{card.title}</motion.h3>
              <motion.p 
                className="text-sm font-semibold"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
              >{card.description}</motion.p>
            </motion.div>
            
            <motion.div 
              variants={gradientAnimation}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 100%)',
                backgroundSize: '200% 200%'
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Десктопная версия */}
      <div className="hidden md:block">
        <motion.h2 
          className=" text-Pacifica text-5xl font-bold text-center text-green-800 mb-16 py-8 font-serif tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}
        >
         Natural Refreshing 100% FreshFruit JuiceWithout Preservatives
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-16 gap-6 max-h-[800px]"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Верхний ряд */}
          <motion.div 
            variants={cardItem}
            whileHover={hoverEffect}
            whileTap={tapEffect}
            initial={{ rotate: cards[0].rotate }}
            className="col-span-6 relative overflow-hidden h-80 shadow-2xl border-2 border-white/20"
            style={{ 
              boxShadow: '0 25px 50px -15px rgba(0,0,0,0.5)',
              transformStyle: 'preserve-3d',
              borderRadius: '40px 100px 40px 40px'
            }}
          >
            <motion.div 
              animate={floatingAnimation}
              className="absolute inset-0"
            >
              <Image src={cards[0].image} alt={cards[0].title} fill className="object-cover scale-[1.15]"/>
            </motion.div>
            
            <motion.div
              variants={textBlockAnimation}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className={`absolute left-6 bottom-6 ${cards[0].color} text-white p-6 max-w-[80%] backdrop-blur-lg border-2 border-white/20 shadow-2xl shadow-black/30`}
              style={{
                borderRadius: '20px 60px 20px 20px',
                background: `linear-gradient(135deg, ${cards[0].color.replace('/90', '')} 0%, ${cards[0].color.replace('/90', '/70')} 100%)`
              }}
            >
              <motion.h3 
                className="text-2xl font-bold tracking-tight mb-2"
                whileHover={contentHover}
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
              >{cards[0].title}</motion.h3>
              <motion.p 
                className="text-lg font-semibold leading-tight"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
              >{cards[0].description}</motion.p>
            </motion.div>
            
            <motion.div 
              variants={gradientAnimation}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="absolute inset-0"
              style={{
                borderRadius: '100px 40px 40px 40px',
                backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 100%)',
                backgroundSize: '200% 200%',
                backgroundRepeat: 'no-repeat', // желательно указать, чтобы избежать неожиданных повторов
                backgroundPosition: 'center'   // или нужную тебе позицию
              }}
            />
          </motion.div>
          
          <motion.div 
            variants={cardItem}
            whileHover={hoverEffect}
            whileTap={tapEffect}
            initial={{ rotate: cards[1].rotate }}
            className="col-span-6 relative overflow-hidden h-80 shadow-2xl border-2 border-white/20"
            style={{ 
              boxShadow: '0 25px 50px -15px rgba(0,0,0,0.5)',
              transformStyle: 'preserve-3d',
              borderRadius: '100px 40px 40px 40px'
            }}
          >
            <motion.div 
              animate={floatingAnimation}
              className="absolute inset-0"
            >
              <Image src={cards[1].image} alt={cards[1].title} fill className="object-cover scale-[1.15]"/>
            </motion.div>
            
            <motion.div
              variants={textBlockAnimation}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className={`absolute right-6 bottom-6 ${cards[1].color} text-white p-6 max-w-[80%] backdrop-blur-lg border-2 border-white/20 shadow-2xl shadow-black/30 text-right`}
              style={{
                borderRadius: '60px 20px 20px 20px',
                background: `linear-gradient(135deg, ${cards[1].color.replace('/90', '')} 0%, ${cards[1].color.replace('/90', '/70')} 100%)`
              }}
            >
              <motion.h3 
                className="text-2xl font-bold tracking-tight mb-2"
                whileHover={contentHover}
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
              >{cards[1].title}</motion.h3>
              <motion.p 
                className="text-lg font-semibold leading-tight"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
              >{cards[1].description}</motion.p>
            </motion.div>
            
            <motion.div 
              variants={gradientAnimation}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="absolute inset-0"
              style={{
                borderRadius: '100px 40px 40px 40px',
                backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 100%)',
                backgroundSize: '200% 200%',
                backgroundRepeat: 'no-repeat', // желательно указать, чтобы избежать неожиданных повторов
                backgroundPosition: 'center'   // или нужную тебе позицию
              }}
              
            />
          </motion.div>
          
          {/* Правая карточка (высокая) */}
          <motion.div 
            variants={cardItem}
            whileHover={{ 
              y: -15,
              scale: 1.05,
              transition: { type: "spring", stiffness: 300 }
            }}
            whileTap={tapEffect}
            className="col-span-4 row-span-2 relative overflow-hidden shadow-2xl border-2 border-white/20"
            style={{ 
              boxShadow: '0 30px 60px -20px rgba(0,0,0,0.6)',
              transformStyle: 'preserve-3d',
              borderRadius: '80px'
            }}
          >
            <motion.div 
              animate={floatingAnimation}
              transition={{ duration: 5 }}
              className="absolute inset-0"
            >
              <Image src={cards[5].image} alt={cards[5].title} fill className="object-cover scale-105"/>
            </motion.div>
            
            <motion.div
              variants={textBlockAnimation}
              initial="hidden"
              animate="visible"
              whileHover={{
                scale: 1.05,
                rotate: 0,
                boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.7)"
              }}
              className={`absolute left-1/2 -translate-x-1/2 bottom-10 ${cards[5].color} text-white p-7 w-[90%] text-center backdrop-blur-lg border-2 border-white/20 shadow-2xl shadow-black/40`}
              style={{
                borderRadius: '40px',
                background: `linear-gradient(135deg, ${cards[5].color.replace('/90', '')} 0%, ${cards[5].color.replace('/90', '/70')} 100%)`
              }}
            >
              <motion.h3 
                className="text-3xl font-bold mb-3 tracking-tight"
                whileHover={contentHover}
                style={{ textShadow: '0 3px 6px rgba(0,0,0,0.4)' }}
              >{cards[5].title}</motion.h3>
              <motion.p 
                className="text-xl font-semibold leading-tight"
                style={{ textShadow: '0 2px 3px rgba(0,0,0,0.3)' }}
              >{cards[5].description}</motion.p>
            </motion.div>
            
            <motion.div 
              variants={gradientAnimation}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="absolute inset-0"
              style={{
                borderRadius: '60px 20px 60px 20px',
                backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 100%)',
                backgroundSize: '200% 200%',
                backgroundRepeat: 'no-repeat', // желательно указать, чтобы избежать неожиданных повторов
                backgroundPosition: 'center'   // или нужную тебе позицию
              }}
            />
          </motion.div>
          
          {/* Нижний ряд */}
          <motion.div 
            variants={cardItem}
            whileHover={hoverEffect}
            whileTap={tapEffect}
            initial={{ rotate: cards[2].rotate }}
            className="col-span-4 relative overflow-hidden h-60 shadow-2xl border-2 border-white/20"
            style={{ 
              boxShadow: '0 15px 35px -10px rgba(0,0,0,0.4)',
              transformStyle: 'preserve-3d',
              borderRadius: '40px 40px 100px 40px'
            }}
          >
            <motion.div 
              animate={floatingAnimation}
              className="absolute inset-0"
            >
              <Image src={cards[2].image} alt={cards[2].title} fill className="object-cover scale-[1.5]"/>
            </motion.div>
            
            <motion.div
              variants={textBlockAnimation}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className={`absolute left-4 top-4 ${cards[2].color} text-white p-5 max-w-[85%] backdrop-blur-lg border-2 border-white/20 shadow-xl shadow-black/30`}
              style={{
                borderRadius: '20px 20px 60px 20px',
                background: `linear-gradient(135deg, ${cards[2].color.replace('/90', '')} 0%, ${cards[2].color.replace('/90', '/70')} 100%)`
              }}
            >
              <motion.h3 
                className="text-xl font-bold tracking-tight mb-1"
                whileHover={contentHover}
                style={{ textShadow: '0 2px 3px rgba(0,0,0,0.3)' }}
              >{cards[2].title}</motion.h3>
              <motion.p 
                className="text-base font-semibold"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
              >{cards[2].description}</motion.p>
            </motion.div>
            
            <motion.div 
              variants={gradientAnimation}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="absolute inset-0"
              style={{
                borderRadius: '60px 20px 60px 20px',
                backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 100%)',
                backgroundSize: '200% 200%',
                backgroundRepeat: 'no-repeat', // желательно указать, чтобы избежать неожиданных повторов
                backgroundPosition: 'center'   // или нужную тебе позицию
              }}
            />
          </motion.div>
          
          <motion.div 
            variants={cardItem}
            whileHover={hoverEffect}
            whileTap={tapEffect}
            initial={{ rotate: cards[3].rotate }}
            className="col-span-4 relative overflow-hidden h-60 shadow-2xl border-2 border-white/20"
            style={{ 
              boxShadow: '0 15px 35px -10px rgba(0,0,0,0.4)',
              transformStyle: 'preserve-3d',
              borderRadius: '40px 40px 40px 100px'
            }}
          >
            <motion.div 
              animate={floatingAnimation}
              className="absolute inset-0"
            >
              <Image src={cards[3].image} alt={cards[3].title} fill className="object-cover scale-[1.5]"/>
            </motion.div>
            
            <motion.div
              variants={textBlockAnimation}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className={`absolute right-4 top-4 ${cards[3].color} text-white p-5 max-w-[85%] backdrop-blur-lg border-2 border-white/20 shadow-xl shadow-black/30 text-right`}
              style={{
                borderRadius: '20px 20px 20px 60px',
                background: `linear-gradient(135deg, ${cards[3].color.replace('/90', '')} 0%, ${cards[3].color.replace('/90', '/70')} 100%)`
              }}
            >
              <motion.h3 
                className="text-xl font-bold tracking-tight mb-1"
                whileHover={contentHover}
                style={{ textShadow: '0 2px 3px rgba(0,0,0,0.3)' }}
              >{cards[3].title}</motion.h3>
              <motion.p 
                className="text-base font-semibold"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
              >{cards[3].description}</motion.p>
            </motion.div>
            
            <motion.div 
              variants={gradientAnimation}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="absolute inset-0"
              style={{
                borderRadius: '60px 20px 60px 20px',
                backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 100%)',
                backgroundSize: '200% 200%',
                backgroundRepeat: 'no-repeat', // желательно указать, чтобы избежать неожиданных повторов
                backgroundPosition: 'center'   // или нужную тебе позицию
              }}
            />
          </motion.div>
          
          <motion.div 
            variants={cardItem}
            whileHover={hoverEffect}
            whileTap={tapEffect}
            initial={{ rotate: cards[4].rotate }}
            className="col-span-4 relative overflow-hidden h-60 shadow-2xl border-2 border-white/20"
            style={{ 
              boxShadow: '0 15px 35px -10px rgba(0,0,0,0.4)',
              transformStyle: 'preserve-3d',
              borderRadius: '60px 20px 60px 20px'
            }}
          >
            <motion.div 
              animate={floatingAnimation}
              className="absolute inset-0"
            >
              <Image src={cards[4].image} alt={cards[4].title} fill className="object-cover"/>
            </motion.div>
            
            <motion.div
              variants={textBlockAnimation}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className={`absolute left-4 bottom-4 ${cards[4].color} text-white p-5 max-w-[85%] backdrop-blur-lg border-2 border-white/20 shadow-xl shadow-black/30`}
              style={{
                borderRadius: '30px 10px 30px 10px',
                background: `linear-gradient(135deg, ${cards[4].color.replace('/90', '')} 0%, ${cards[4].color.replace('/90', '/70')} 100%)`
              }}
            >
              <motion.h3 
                className="text-xl font-bold tracking-tight mb-1"
                whileHover={contentHover}
                style={{ textShadow: '0 2px 3px rgba(0,0,0,0.3)' }}
              >{cards[4].title}</motion.h3>
              <motion.p 
                className="text-base font-semibold"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
              >{cards[4].description}</motion.p>
            </motion.div>
            
            <motion.div 
              variants={gradientAnimation}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="absolute inset-0"
              style={{
                borderRadius: '60px 20px 60px 20px',
                backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 100%)',
                backgroundSize: '200% 200%',
                backgroundRepeat: 'no-repeat', // желательно указать, чтобы избежать неожиданных повторов
                backgroundPosition: 'center'   // или нужную тебе позицию
              }}
            />
          </motion.div>
        </motion.div>
      </div>
 
    </div>
    </>
  );
}