'use client'
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { MotionConfig, motion } from 'framer-motion'
import fon from '../../../public/images/fon-1.jpg'
import sok from '../../../public/images/sok.png'

export default function Intro() {
  const juiceRef = useRef(null)
  const titleRef = useRef(null)
  const textRef = useRef(null)
  const buttonRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Анимация фона
    tl.fromTo(bgRef.current, 
      { scale: 1.3, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 1.2,
        ease: 'power2.inOut'
      }
    )

    // Анимация падения сока с более выраженным эффектом
    tl.fromTo(juiceRef.current, 
      { 
        y: -1000, 
        rotation: -25,
        opacity: 0,
        scale: 1.2
      },
      { 
        y: 0, 
        rotation: 0, 
        opacity: 1, 
        scale: 1,
        duration: 1.4,
        ease: 'bounce.out'
      },
      '-=0.3'
    )

    // Брызги с более динамичной анимацией
    tl.fromTo('.juice-splash', 
      { 
        scale: 0, 
        opacity: 0,
        y: 50
      },
      { 
        scale: [0.8, 1.2, 1], 
        opacity: [0.8, 0.4], 
        y: 0,
        duration: 0.6, 
        stagger: 0.05,
        ease: 'back.out(2.5)'
      },
      '-=0.8'
    )

    // Текст появляется сразу после падения сока с крутой анимацией
    tl.fromTo('.title-word', 
      { 
        y: 100, 
        opacity: 0,
        skewY: 15,
        filter: 'blur(5px)'
      },
      { 
        y: 0, 
        opacity: 1, 
        skewY: 0,
        filter: 'blur(0px)',
        duration: 0.8, 
        stagger: 0.15,
        ease: 'back.out(2)'
      },
      '-=0.5'
    )

    // Контент с эффектом "выплывания"
    tl.fromTo('.intro-content', 
      { 
        y: 80, 
        opacity: 0,
        scale: 0.95
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'elastic.out(1, 0.5)'
      },
      '-=0.4'
    )

    // Кнопка с эффектом "пульсации"
    tl.fromTo(buttonRef.current, 
      { 
        y: 30, 
        opacity: 0,
        scale: 0.8
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(2)'
      },
      '-=0.3'
    )
  }, [])

  return (
    <MotionConfig transition={{ type: 'spring', damping: 20, stiffness: 120 }}>
      <section className="relative h-screen mt-[-96px] overflow-hidden bg-black">
        {/* Фон */}
        <div ref={bgRef} className="absolute inset-0 z-0 overflow-hidden opacity-0">
          <Image
            src={fon}
            alt="Фон сока Наш Сад"
            fill
            className="object-cover scale-125"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10"></div>
        </div>

        {/* Брызги - увеличенное количество и разнообразие */}
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            className="juice-splash absolute bg-amber-400/60 rounded-full z-10"
            style={{
              width: `${Math.random() * 60 + 20}px`,
              height: `${Math.random() * 60 + 20}px`,
              left: `${Math.random() * 40 + 20}%`,
              bottom: `${Math.random() * 30 + 5}%`,
              filter: 'blur(5px)',
              opacity: 0
            }}
            whileHover={{
              scale: 1.3,
              opacity: 1,
              transition: { duration: 0.3 }
            }}
          />
        ))}

        {/* Изображение сока */}
        <div 
          ref={juiceRef}
          className="absolute left-0 bottom-0 h-full w-1/2 md:w-2/5 z-10 flex items-end opacity-0
                     max-md:w-full max-md:h-[50%] max-md:bottom-0 max-md:left-0 max-md:z-0"
        >
          <div className="relative w-full h-4/5 max-md:h-full">
            <Image
              src={sok}
              alt="Сок Наш Сад"
              fill
              className="object-contain object-left-bottom max-md:object-center"
              quality={100}
            />
          </div>
        </div>

        {/* Текстовый контент с улучшенными анимациями */}
        <div className="relative z-20 h-full mt-[32px] flex flex-col items-end justify-center px-8 md:px-16 text-right
                        max-md:justify-start max-md:pt-[15%]">
          <h1 className="text-GreatVibes text-6xl md:text-8xl lg:text-9xl font-extrabold mb-6 max-md:mb-4">
            <motion.div 
              className="inline-block overflow-hidden title-word"
              whileHover={{ scale: 1.05 }}
            >
              <span className="block pr-2 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">
                Наш
              </span>
            </motion.div>
            <motion.div 
              className="inline-block overflow-hidden title-word"
              whileHover={{ scale: 1.05 }}
            >
              <span className="block pr-4 pt-2 bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-green-500 to-green-700">
                Сад
              </span>
            </motion.div>
          </h1>

          <motion.div 
            className="intro-content text-xl md:text-3xl text-white max-w-md mb-12  opacity-0 max-md:mb-6"
            whileHover={{ x: -10 }}
          >
            <p className="text-Pacifica leading-relaxed">
              Натуральные соки<br />
              из отборных фруктов<br />
              и ягод вашего сада
            </p>
          </motion.div>

          <motion.button 
            ref={buttonRef}
            className="intro-content relative px-10 py-3 md:px-12 md:py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-full overflow-hidden group hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 opacity-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 inline-flex items-center">
              <span className="mr-2">Попробовать</span>
              <svg
                className="w-5 h-5 animate-bounce-x"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping-slow opacity-0 group-hover:opacity-100" />
          </motion.button>
        </div>

        {/* Дополнительные эффекты с улучшенной анимацией */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-amber-400/20 rounded-full"
              style={{
                width: `${Math.random() * 15 + 5}px`,
                height: `${Math.random() * 40 + 20}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, window.innerHeight * 1.5],
                opacity: [0.8, 0],
                rotate: Math.random() > 0.5 ? [0, 90] : [0, -90],
                x: Math.random() > 0.5 ? [0, 50] : [0, -50]
              }}
              transition={{
                duration: Math.random() * 8 + 5,
                repeat: Infinity,
                delay: Math.random() * 8,
                ease: 'linear'
              }}
            />
          ))}
        </div>
      </section>
    </MotionConfig>
  )
}