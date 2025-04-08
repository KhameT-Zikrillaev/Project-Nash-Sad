'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import leftAbstrack from '../../../public/images/left-abstrack.png';
import Image from 'next/image';
import apelsin from '../../../public/images/апелсин.png';
import apple from '../../../public/images/яблока.png';
import berry from '../../../public/images/вишня.png';
import sok from '../../../public/images/sok.png';
import olmabargi from '../../../public/images/olma-bargi.png';
import apelsinbargi from '../../../public/images/apelsin-bargi.png';
import vishnyabargi from '../../../public/images/vishnya-bargi.png';
import apelsinbg from '../../../public/images/apelsin-bg.webp';
import olmabg from '../../../public/images/olma-bg.png';
import vishnyabg from '../../../public/images/vishnya-bg.png';

export default function ProductShowcase() {
  const [activeBg, setActiveBg] = useState(olmabg);
  const [nextBg, setNextBg] = useState(null);
  const [activeFilter, setActiveFilter] = useState('apple');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showFruit, setShowFruit] = useState(false);
  const [showVitamins, setShowVitamins] = useState(false);
  const [currentRightImage, setCurrentRightImage] = useState(olmabargi);
  const [nextRightImage, setNextRightImage] = useState(null);
  const [sokAnimation, setSokAnimation] = useState('enter');
  const swiperRef = useRef(null);
  
  const slides = [
    { 
      id: 1, 
      bg: olmabg,
      slideBg: 'from-green-100 to-green-200',
      filter: 'apple',
      imageColor: 'brightness(0) saturate(100%) invert(63%) sepia(98%) saturate(365%) hue-rotate(56deg) brightness(91%) contrast(91%)',
      glowColor: '0 0 20px rgba(0, 255, 128, 0.8)',
      icon: apple,
      rightImage: olmabargi,
      iconColor: 'text-green-500',
      productImage: sok,
      vitamins: [
        { name: 'Витамин C', benefit: 'Иммунитет', color: 'text-purple-800', position: 'top' },
        { name: 'Витамин B', benefit: 'Энергия', color: 'text-blue-600', position: 'bottom' },
        { name: 'Витамин A', benefit: 'Зрение', color: 'text-orange-500', position: 'left' },
        { name: 'Витамин E', benefit: 'Антиоксидант', color: 'text-green-600', position: 'right' },
      ],
      minerals: [
        { name: 'Калий', color: 'text-pink-500', position: 'top-left' },
        { name: 'Магний', color: 'text-yellow-600', position: 'top-right' },
        { name: 'Кальций', color: 'text-blue-400', position: 'bottom-left' },
        { name: 'Железо', color: 'text-red-500', position: 'bottom-right' },
      ]
    },
    { 
      id: 2, 
      bg: apelsinbg,
      slideBg: 'from-orange-100 to-orange-200',
      filter: 'apelsin',
      imageColor: 'brightness(0) saturate(100%) invert(59%) sepia(93%) saturate(748%) hue-rotate(331deg) brightness(89%) contrast(91%)',
      glowColor: '0 0 20px rgba(255, 223, 0, 0.8)',
      icon: apelsin,
      rightImage: apelsinbargi,
      iconColor: 'text-orange-500',
      productImage: sok,
      vitamins: [
        { name: 'Витамин C', benefit: 'Иммунитет', color: 'text-purple-800', position: 'top' },
        { name: 'Фолаты', benefit: 'Обновление', color: 'text-green-600', position: 'bottom' },
        { name: 'Витамин A', benefit: 'Зрение', color: 'text-orange-500', position: 'left' },
        { name: 'Тиамин', benefit: 'Метаболизм', color: 'text-yellow-600', position: 'right' },
      ],
      minerals: [
        { name: 'Калий', color: 'text-pink-500', position: 'top-left' },
        { name: 'Кальций', color: 'text-blue-400', position: 'top-right' },
        { name: 'Магний', color: 'text-yellow-600', position: 'bottom-left' },
        { name: 'Фосфор', color: 'text-purple-500', position: 'bottom-right' },
      ]
    },
    { 
      id: 3, 
      bg: vishnyabg,
      slideBg: 'from-red-100 to-red-200',
      filter: 'berry',
      imageColor: 'brightness(0) saturate(100%) invert(16%) sepia(99%) saturate(4615%) hue-rotate(353deg) brightness(93%) contrast(119%)',
      glowColor: '0 0 20px rgba(255, 0, 128, 0.8)',
      icon: berry,
      rightImage: vishnyabargi,
      iconColor: 'text-red-500',
      productImage: sok,
      vitamins: [
        { name: 'Витамин C', benefit: 'Иммунитет', color: 'text-purple-800', position: 'top' },
        { name: 'Витамин K', benefit: 'Кровь', color: 'text-green-700', position: 'bottom' },
        { name: 'Витамин E', benefit: 'Антиоксидант', color: 'text-yellow-600', position: 'left' },
        { name: 'Витамин B6', benefit: 'Нервы', color: 'text-blue-600', position: 'right' },
      ],
      minerals: [
        { name: 'Железо', color: 'text-red-500', position: 'top-left' },
        { name: 'Марганец', color: 'text-purple-600', position: 'top-right' },
        { name: 'Калий', color: 'text-pink-500', position: 'bottom-left' },
        { name: 'Медь', color: 'text-orange-600', position: 'bottom-right' },
      ]
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFruit(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [activeFilter]);

  useEffect(() => {
    if (showFruit) {
      const timer = setTimeout(() => {
        setShowVitamins(true);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [showFruit]);

  const handleSlideChange = (swiper) => {
    setIsAnimating(true);
    setShowFruit(false);
    setShowVitamins(false);
    
    setSokAnimation('exit');
    
    const currentSlide = slides[swiper.realIndex];
    setNextRightImage(currentSlide.rightImage);
    setNextBg(currentSlide.bg);
    
    setTimeout(() => {
      setCurrentRightImage(currentSlide.rightImage);
      setActiveBg(currentSlide.bg);
      setActiveFilter(currentSlide.filter);
      setIsAnimating(false);
      setSokAnimation('enter');
      setNextBg(null);
    }, 500);
  };

  const getPositionClasses = (position) => {
    switch(position) {
      case 'top': return '-top-8 md:-top-16 left-1/2 transform -translate-x-1/2';
      case 'bottom': return '-bottom-8 md:-bottom-16 left-1/2 transform -translate-x-1/2';
      case 'left': return 'left-0 top-1/2 transform -translate-y-1/2 -translate-x-16 md:-translate-x-32';
      case 'right': return 'right-0 top-1/2 transform -translate-y-1/2 translate-x-16 md:translate-x-32';
      case 'top-left': return 'left-8 md:left-16 top-8 md:top-16 transform -translate-x-12 md:-translate-x-24 -translate-y-12 md:-translate-y-24';
      case 'top-right': return 'right-8 md:right-16 top-8 md:top-16 transform translate-x-12 md:translate-x-24 -translate-y-12 md:-translate-y-24';
      case 'bottom-left': return 'left-8 md:left-16 bottom-8 md:bottom-16 transform -translate-x-12 md:-translate-x-24 translate-y-12 md:translate-y-24';
      case 'bottom-right': return 'right-8 md:right-16 bottom-8 md:bottom-16 transform translate-x-12 md:translate-x-24 translate-y-12 md:translate-y-24';
      default: return '';
    }
  };

  const getLineClasses = (position) => {
    switch(position) {
      case 'top': return 'w-12 md:w-24 h-px bg-white mr-2';
      case 'bottom': return 'w-12 md:w-24 h-px bg-white ml-2';
      case 'left': return 'w-px h-12 md:h-24 bg-white mb-2';
      case 'right': return 'w-px h-12 md:h-24 bg-white mb-2';
      case 'top-left': return 'w-8 md:w-16 h-px bg-white ml-2';
      case 'top-right': return 'w-8 md:w-16 h-px bg-white mr-2';
      case 'bottom-left': return 'w-8 md:w-16 h-px bg-white ml-2';
      case 'bottom-right': return 'w-8 md:w-16 h-px bg-white mr-2';
      default: return '';
    }
  };

  const getFlexDirection = (position) => {
    if (position === 'bottom') return 'flex-row-reverse';
    if (position === 'left') return 'flex-col items-end';
    if (position === 'right') return 'flex-col items-start';
    if (position === 'top-left') return 'flex-row-reverse';
    if (position === 'bottom-left') return 'flex-row-reverse';
    return 'flex-row';
  };

  return (
    <div className="py-4 md:py-8 bg-black/40 rounded-lg relative shadow-lg w-full mx-auto overflow-hidden">
      {/* Два фоновых изображения для плавного перехода */}
      <div className="absolute inset-0 z-0">
        {/* Текущий фон */}
        <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${nextBg ? 'opacity-80' : 'opacity-80'}`}>
          <Image
            src={activeBg}
            alt="Background"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        
        {/* Следующий фон (для перехода) */}
        {nextBg && (
          <div className="absolute inset-0 transition-opacity duration-500 ease-in-out opacity-0 animate-fadeIn">
            <Image
              src={nextBg}
              alt="Next Background"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row w-full justify-between mx-auto gap-1 relative z-10">
        {/* Левая часть - фрукты с абстрактным фоном */}
        <div className="w-full md:w-[70%] rounded-lg relative order-2 md:order-1 min-h-[300px] md:min-h-[500px]">
          {/* Абстрактный фон */}
          <div className="absolute opacity-80 w-full top-0 left-0 h-full -z-10 overflow-hidden">
            <div className={`relative w-full h-full`}>
              <div 
                className={`absolute inset-0 transition-all duration-500 ease-in-out`}
                style={{
                  clipPath: isAnimating ? 'polygon(0 0, 1% 0, 1% 100%, 0 100%)' : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                  width: '100%'
                }}
              >
                <Image 
                  src={leftAbstrack} 
                  alt="Abstract left line"
                  layout="fill"
                  style={{
                    filter: `${slides.find(slide => slide.filter === activeFilter)?.imageColor} drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))`,
                    transition: 'filter 500ms ease-in-out'
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Центральная часть с изображением фрукта */}
          <div className="absolute bottom-8 md:bottom-16 inset-0 flex items-center justify-center z-10">
            <div className="relative transition-all duration-700 ease-out">
              {/* Изображение фрукта */}
              <div className={`
                relative w-40 h-40 md:w-80 md:h-80 transition-all duration-700 ease-out
                ${showFruit ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
              `}>
                <Image
                  src={slides.find(slide => slide.filter === activeFilter)?.icon}
                  alt="Фрукт"
                  layout="fill"
                  objectFit="contain"
                  className="hover:scale-110 transition-transform duration-300 z-20"
                />
              </div>
              
              {/* Витамины */}
              {slides.find(slide => slide.filter === activeFilter)?.vitamins.map((vitamin, index) => (
                <div 
                  key={`vitamin-${index}`}
                  className={`absolute ${getPositionClasses(vitamin.position)} transition-all duration-500 ease-out`}
                  style={{
                    transitionDelay: showVitamins ? `${index * 100 + 300}ms` : '0ms',
                    opacity: showVitamins ? 1 : 0,
                    transform: showVitamins ? 'translate(0, 0)' : 
                      vitamin.position === 'top' ? 'translate(-50%, -30px)' :
                      vitamin.position === 'bottom' ? 'translate(-50%, 30px)' :
                      vitamin.position === 'left' ? 'translate(-60px, -50%)' :
                      'translate(60px, -50%)'
                  }}
                >
                  <div className={`relative flex ${getFlexDirection(vitamin.position)} items-center`}>
                    <div className={getLineClasses(vitamin.position)} />
                    <div className="bg-white rounded-full px-3 py-1 md:px-6 md:py-3 shadow-lg min-w-max text-sm md:text-lg">
                      <span className={`font-bold ${vitamin.color}`}>{vitamin.name}</span>
                      <span className="block text-xs md:text-sm text-gray-600">{vitamin.benefit}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Минералы */}
              {slides.find(slide => slide.filter === activeFilter)?.minerals.map((mineral, index) => (
                <div 
                  key={`mineral-${index}`}
                  className={`absolute ${getPositionClasses(mineral.position)} transition-all duration-500 ease-out`}
                  style={{
                    transitionDelay: showVitamins ? `${index * 100 + 700}ms` : '0ms',
                    opacity: showVitamins ? 1 : 0,
                    transform: showVitamins ? 'translate(0, 0)' : 
                      mineral.position.includes('left') ? 'translate(-30px, 0)' : 'translate(30px, 0)'
                  }}
                >
                  <div className={`relative flex ${getFlexDirection(mineral.position)} items-center`}>
                    <div className={getLineClasses(mineral.position)} />
                    <div className="bg-white rounded-full px-2 py-1 md:px-4 md:py-2 shadow-lg text-sm md:text-lg min-w-max">
                      <span className={`font-bold ${mineral.color}`}>{mineral.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Правая часть - слайдер с соками */}
        <div className="w-full md:w-1/2 flex items-center relative order-1 md:order-2 h-[200px] md:h-auto">
          <Swiper
            spaceBetween={2000}
            slidesPerView={1}
            loop={true}
            loopAdditionalSlides={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              reverseDirection: false,
            }}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            className="w-full h-full"
            onSlideChange={handleSlideChange}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className={`flex items-center justify-center h-full rounded-xl relative overflow-hidden`}>
                  {/* Ветка дерева */}
                  <div className={`
                    absolute right-0 top-0 w-[90%] h-[60%] transition-all duration-500 ease-in-out z-0 transform
                    ${isAnimating ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}
                  `}>
                    <Image
                      src={currentRightImage}
                      alt="Ветка дерева"
                      layout="fill"
                      objectFit="contain"
                      objectPosition="right center"
                      style={{
                        filter: 'brightness(0.9) contrast(1.1)'
                      }}
                    />
                  </div>
                  
                  {/* Изображение сока */}
                  <div className={`
                    relative w-full h-full z-10 transition-all duration-500 ease-out
                    ${sokAnimation === 'exit' ? 'opacity-0' : sokAnimation === 'enter' ? 'animate-[dropIn_0.2s_ease-out]' : ''}
                  `}>
                    <Image
                      src={slide.productImage}
                      alt="Сок"
                      layout="fill"
                      objectFit="contain"
                      className="p-6 md:p-12"
                      style={{
                        filter: `drop-shadow(${slide.glowColor})`
                      }}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Добавляем CSS анимации */}
      <style jsx global>{`
        @keyframes dropIn {
          from {
            transform: translateY(-150px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}