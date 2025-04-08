'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { FaHome, FaBook, FaUsers, FaPhone, FaInfoCircle, FaBars, FaTimes, FaLeaf } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import 'aos/dist/aos.css';

export default function ModernGardenNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  
  // Анимация для плавающих листьев
  const floatingLeaves = Array(8).fill(0).map((_, i) => {
    const size = Math.random() * 20 + 10;
    return {
      id: i,
      size,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
      rotate: Math.random() * 360
    };
  });

  // Закрытие меню при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    
    if (typeof window !== 'undefined') {
      const AOS = require('aos');
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
      });
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Закрытие меню при изменении роута
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "Главная", path: "/", icon: <FaHome className="text-lg" /> },
    { name: "Каталог", path: "/catalog", icon: <FaBook className="text-lg" /> },
    { name: "О нас", path: "/about", icon: <FaUsers className="text-lg" /> },
    { name: "Контакты", path: "/contacts", icon: <FaPhone className="text-lg" /> },
    { name: "Информация", path: "/info", icon: <FaInfoCircle className="text-lg" /> },
  ];

  if (!isMounted) return null;

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: 'spring', 
          stiffness: 70, 
          damping: 20,
          delay: 0.1
        }}
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-lg py-2' : 'bg-white/90 py-4'}`}
        data-aos="fade-down"
      >
        {/* Плавающие листья (только когда не скроллено) */}
        {!scrolled && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {floatingLeaves.map((leaf) => (
              <motion.div
                key={leaf.id}
                initial={{ 
                  y: -50,
                  x: `${leaf.left}%`,
                  opacity: 0,
                  rotate: leaf.rotate
                }}
                animate={{ 
                  y: [0, window.innerHeight],
                  x: [`${leaf.left}%`, `${leaf.left + (Math.random() * 20 - 10)}%`],
                  opacity: [0, 0.6, 0],
                  rotate: leaf.rotate + 360
                }}
                transition={{
                  duration: leaf.duration,
                  delay: leaf.delay,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute text-green-400"
                style={{
                  fontSize: `${leaf.size}px`
                }}
              >
                <FaLeaf />
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Волнистый эффект в нижней части навбара */}
        <div className="absolute bottom-[-12px] left-0 w-full overflow-hidden" style={{ height: '25px', zIndex: 10 }}>
          <svg 
            className="absolute  w-full h-full" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1440 120" 
            preserveAspectRatio="none"
            style={{ transform: 'scale(1.2, 1.5)', transformOrigin: 'bottom' }}
          >
            <path 
              d="M0,96L60,101.3C120,107,240,117,360,117.3C480,117,600,107,720,117.3C840,128,960,160,1080,160C1200,160,1320,128,1380,112L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
              fill="#ffffff"
              fillOpacity="0.8"
            />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 15,
                delay: 0.2
              }}
              className="flex items-center gap-3 cursor-pointer"
              variants={{
                hover: {
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300 }
                },
                tap: {
                  scale: 0.95,
                  transition: { type: "spring", stiffness: 300 }
                }
              }}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div 
                className="bg-gradient-to-br from-green-500 to-green-700 text-white p-2 rounded-lg shadow-lg"
                data-aos="zoom-in"
                data-aos-delay="100"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 5
                }}
              >
                <FaHome className="text-2xl" />
              </motion.div>
              <div>
                <motion.h1 
                  className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800"
                  data-aos="fade-right"
                  data-aos-delay="150"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  Наш Сад
                </motion.h1>
                <motion.p 
                  className="text-xs text-green-600"
                >
                  Экологично и натурально
                </motion.p>
              </div>
            </motion.div>

            <nav className="hidden md:flex items-center gap-1 relative">
              {navItems.map((item, index) => (
                <motion.div 
                  key={item.path}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: index * 0.1 + 0.3,
                    type: 'spring',
                    stiffness: 100,
                    damping: 15
                  }}
                  onHoverStart={() => setHoveredItem(index)}
                  onHoverEnd={() => setHoveredItem(null)}
                  className="relative"
                >
                  <Link 
                    href={item.path} 
                    className={`flex items-center px-4 py-3 font-medium transition-colors relative group ${pathname === item.path ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}
                    data-aos="fade-down"
                    data-aos-delay={100 + (index * 50)}
                  >
                    <motion.span 
                      className="mr-2"
                      animate={{
                        scale: hoveredItem === index ? [1, 1.4, 1] : 1,
                        rotate: hoveredItem === index ? [0, 10, -10, 0] : 0
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      {item.icon}
                    </motion.span>
                    {item.name}
                    <motion.span 
                      className={`absolute bottom-1 left-1/2 h-0.5 bg-green-500`}
                      initial={{ width: pathname === item.path ? '80%' : '0%', x: '-50%' }}
                      animate={{ width: hoveredItem === index || pathname === item.path ? '80%' : '0%', x: '-50%' }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    />
                  </Link>
                  
                  {/* Эффект пульсации при наведении */}
                  {hoveredItem === index && (
                    <motion.div 
                      className="absolute inset-0 rounded-full bg-green-100 pointer-events-none"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.2, opacity: 0.4 }}
                      transition={{ duration: 0.6 }}
                      layoutId="hoverBg"
                    />
                  )}
                </motion.div>
              ))}
              
              {/* Подчеркивание для активного элемента */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-green-500 rounded-full"
                animate={{
                  width: hoveredItem !== null ? '80px' : '0px',
                  x: hoveredItem !== null ? `${hoveredItem * 100 + 50}px` : '0px',
                  opacity: hoveredItem !== null ? 1 : 0
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              />
            </nav>

            <motion.button 
              ref={buttonRef}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 15,
                delay: 0.4
              }}
              className="md:hidden text-2xl z-50 p-2 text-gray-700 focus:outline-none relative"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={isMenuOpen}
              variants={{
                hover: {
                  scale: 1.1,
                  transition: { type: "spring", stiffness: 300 }
                },
                tap: {
                  scale: 0.9,
                  transition: { type: "spring", stiffness: 300 }
                }
              }}
              whileHover="hover"
              whileTap="tap"
            >
              {isMenuOpen ? (
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaTimes />
                </motion.div>
              ) : (
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  <FaBars />
                </motion.div>
              )}
              
              {/* Индикатор меню */}
              {isMenuOpen && (
                <motion.span 
                  className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring' }}
                />
              )}
            </motion.button>
          </div>
        </div>

        {/* Мобильное меню с крутой анимацией */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              key="mobile-menu"
              ref={menuRef}
              initial={{ opacity: 0, y: -50, scaleY: 0.8 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -50, scaleY: 0.8 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 25,
                when: "beforeChildren",
                staggerChildren: 0.1
              }}
              className="md:hidden fixed inset-x-0 top-24 bg-white z-[99] shadow-2xl overflow-y-auto"
              style={{ 
                maxHeight: 'calc(100vh - 96px)',
                borderRadius: '0 0 20px 20px',
                borderTop: '2px solid rgba(72, 187, 120, 0.3)'
              }}
            >
              <div className="container mx-auto px-4 py-4">
                <nav className="flex flex-col gap-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ 
                        delay: index * 0.1 + 0.1,
                        type: 'spring',
                        stiffness: 100,
                        damping: 15
                      }}
                      variants={{
                        hover: {
                          scale: 1.02,
                          transition: { type: "spring", stiffness: 300 }
                        },
                        tap: {
                          scale: 0.98,
                          transition: { type: "spring", stiffness: 300 }
                        }
                      }}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Link
                        href={item.path}
                        className={`py-4 px-6 text-lg font-medium rounded-lg flex items-center transition-all ${pathname === item.path ? 'bg-gradient-to-r from-green-100 to-green-50 text-green-700 border-l-4 border-green-500' : 'text-gray-700 hover:bg-gray-50'}`}
                      >
                        <motion.span 
                          className="mr-3"
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, 0]
                          }}
                          transition={{
                            duration: 0.6,
                            delay: index * 0.1
                          }}
                        >
                          {item.icon}
                        </motion.span>
                        {item.name}
                        <motion.span 
                          className="ml-auto text-green-500"
                          animate={{
                            opacity: [0, 1],
                            x: [-10, 0]
                          }}
                          transition={{
                            delay: index * 0.1 + 0.3
                          }}
                        >
                          →
                        </motion.span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                
                {/* Декоративный элемент в меню */}
                <motion.div 
                  className="mt-6 flex justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: navItems.length * 0.05 + 0.2 }}
                >
                  <motion.div
                    className="h-1 w-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                    animate={{
                      scaleX: [1, 1.5, 1],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <div className={`h-24 transition-all duration-300 ${scrolled ? 'pt-16' : 'pt-20'}`}></div>
    </>
  );
}