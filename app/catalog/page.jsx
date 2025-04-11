'use client'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Navigation, Mousewheel } from 'swiper/modules'
import Image from 'next/image'

// Импорт изображений
import SokImage from '../../public/images/sok.png'
import grusha from '../../public/images/001NSDГруша1000.png'
import malina from '../../public/images/002NSDМалина1000.png'
import Multi from '../../public/images/003NSDМульти1000.png'
import KlubnikaBanan from '../../public/images/006NSDКлубникабанан1000red.png'
import Ayva from '../../public/images/007NSDАйва1000.png'

const juices = [
  {
    id: 1,
    image: SokImage,
    name: 'Груша',
    cover: grusha,
    bgfon: '#fcaf17'
  },
  {
    id: 2,
    image: SokImage,
    name: 'Малина',
    cover: malina,
    bgfon: '#ef4c7f'
  },
  {
    id: 3,
    image: SokImage,
    name: 'Мульти',
    cover: Multi,
    bgfon: '#f5821f'
  },
  {
    id: 4,
    image: SokImage,
    name: 'Клубника-банан',
    cover: KlubnikaBanan,
    bgfon: '#ef4023'
  },
  {
    id: 5,
    image: SokImage,
    name: 'Айва',
    cover: Ayva,
    bgfon: '#fec46f'
  }
]

export default function VerticalJuiceSwiper() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeBgColor, setActiveBgColor] = useState(juices[0].bgfon)
  const [activeCover, setActiveCover] = useState(juices[0].cover)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768)
    }

    handleResize() // установить начальное значение
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSlideChange = (swiper) => {
    const newIndex = swiper.realIndex
    setActiveIndex(newIndex)
    setActiveBgColor(juices[newIndex].bgfon)
    setActiveCover(juices[newIndex].cover)
  }

  return (
    <div className="content py-12 flex flex-col md:flex-row" style={{ backgroundColor: activeBgColor }}>
      {/* Левая часть */}
      <div className="left-content w-full md:w-[30%] px-6 md:px-12 order-1 md:order-none">
        <div className="vertical-swiper-container h-[300px] md:h-auto">
          <Swiper
            direction={isDesktop ? 'vertical' : 'horizontal'}
            slidesPerView={isDesktop ? 3 : 2}
            spaceBetween={isDesktop ? 20 : -50}
            centeredSlides={true}
            mousewheel={isDesktop}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            modules={[Navigation, Mousewheel]}
            className="vertical-swiper h-full"
            onSlideChange={handleSlideChange}
          >
            {juices.map((juice) => (
              <SwiperSlide key={juice.id}>
                <div className={`slide-content ${activeIndex === juice.id - 1 ? 'active' : ''}`}>
                  <Image 
                    src={juice.image} 
                    alt={juice.name} 
                    width={250}
                    height={350}
                    className="juice-image w-[150px] md:w-auto max-h-[200px] md:max-h-none object-contain"
                  />
                  <h3 className="text-sm md:text-base">{juice.name}</h3>
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </Swiper>
        </div>
      </div>

      {/* Правая часть */}
      <div className="right-content flex justify-center items-center  w-[100%] md:w-[70%]">
        <div className="hidden w-full">
          {juices.map((juice) => (
            <Image key={juice.id}  src={juice.cover} alt="preload" priority />
          ))}
        </div>
        <div className="transition-opacity duration-500 ease-in-out">
          <Image 
            className="w-full md:ml-auto  md:w-[80%] md:h-full object-contain md:object-cover" 
            src={activeCover} 
            alt="Sok" 
            priority 
          />
        </div>
      </div>
    </div>
  )
}
