"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaBook, FaUsers, FaPhone, FaInfoCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Sidebar = () => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      mirror: false
    });
  }, []);

  const navItems = [
    { name: 'Главная', path: '/', icon: <FaHome size={24} /> },
    { name: 'Каталог', path: '/catalog', icon: <FaBook size={24} /> },
    { name: 'О нас', path: '/about', icon: <FaUsers size={24} /> },
    { name: 'Контакты', path: '/contacts', icon: <FaPhone size={24} /> },
    { name: 'Информация', path: '/info', icon: <FaInfoCircle size={24} /> },
  ];

  const sidebarVariants = {
    hidden: { x: '100vw', opacity: 0 },
    visible: { 
      x: '-40%', 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 70,
        damping: 20,
        when: 'beforeChildren',
        staggerChildren: 0.1,
        delay: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { x: '100vw', opacity: 0, scale: 0.8 },
    visible: (index) => ({ 
      x: 0, 
      opacity: 1,
      scale: 1,
      transition: { 
        type: 'spring', 
        stiffness: 120, 
        damping: 20,
        delay: 0.3 + (index * 0.1),
        duration: 1
      }
    })
  };

  const activeItemVariants = {
    initial: { width: '4rem', x: 0 },
    active: { 
      width: '6rem', 
      x: '1.0rem',
      transition: { type: 'spring', stiffness: 500, damping: 30 }
    }
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { scale: 1.2, rotate: 5, transition: { type: 'spring', stiffness: 500 } },
    active: { scale: 1.2, rotate: 0, transition: { type: 'spring', stiffness: 500 } }
  };

  const tooltipVariants = {
    hidden: { opacity: 0, x: -10, scale: 0.8 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { type: 'spring', stiffness: 500 }
    }
  };

  if (!isMounted) return null;

  return (
    <div className="fixed left-0 top-0 h-full z-30 flex flex-col justify-center">
      <motion.div 
        className="relative"
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
      >
        <motion.nav className="flex flex-col gap-4">
          {navItems.map((item, index) => {
            const isActive = pathname === item.path;
            return (
              <motion.div 
                key={item.path} 
                className="relative"
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                whileHover="hover"
              >
                <Link href={item.path} className="block">
                  <motion.div 
                    className={`relative flex items-center justify-center rounded-r-xl overflow-hidden ${isActive 
                      ? 'bg-gradient-to-r from-green-600 to-green-500 shadow-[0_5px_15px_rgba(0,128,0,0.4)]' 
                      : 'bg-gradient-to-r from-green-700 to-green-600'}`}
                    variants={activeItemVariants}
                    initial="initial"
                    animate={isActive ? "active" : "initial"}
                    whileHover={!isActive ? { x: '1.5rem', transition: { type: 'spring', stiffness: 500 } } : {}}
                  >
                    <motion.div 
                      className="text-white p-4"
                      variants={iconVariants}
                      animate={isActive ? "active" : "initial"}
                    >
                      {item.icon}
                    </motion.div>
                    
                    {isActive && (
                      <motion.div 
                        className="absolute bottom-0 left-0 w-full h-1 bg-white"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                      />
                    )}
                    
                    {isActive && (
                      <motion.div 
                        className="absolute inset-0 bg-white opacity-0"
                        animate={{ 
                          opacity: [0, 0.1, 0], 
                          transition: { 
                            repeat: Infinity, 
                            duration: 2, 
                            ease: 'easeInOut' 
                          } 
                        }}
                      />
                    )}
                  </motion.div>
                </Link>
                
                <AnimatePresence>
                  {!isActive && hoveredItem === index && (
                    <motion.div 
                      className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1 rounded-md bg-gradient-to-r from-green-600 to-green-500 text-white text-sm whitespace-nowrap shadow-lg z-50"
                      variants={tooltipVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      {item.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.nav>
      </motion.div>
    </div>
  );
};

export default Sidebar;
