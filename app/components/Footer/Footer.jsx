// app/components/AnimatedFooter.jsx
'use client';

import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { FaLeaf, FaTree, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function AnimatedFooter() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [hoveredItem, setHoveredItem] = useState(null);

  const socialLinks = [
    { icon: <FaInstagram size={24} />, name: 'Instagram', color: 'bg-pink-600' },
    { icon: <FaWhatsapp size={24} />, name: 'WhatsApp', color: 'bg-green-500' },
  ];

  const contacts = [
    { icon: <FaMapMarkerAlt />, text: 'г. Москва, ул. Садовая, 42' },
    { icon: <FaPhone />, text: '+7 (495) 123-45-67' },
  ];

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  const leafVariants = {
    float: {
      y: [0, -15, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <motion.footer 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="bg-gradient-to-t from-green-900 to-green-700 text-white pt-12 pb-6 relative overflow-hidden"
    >
      {/* Плавающие листья */}
      <motion.div 
        className="absolute top-10 left-1/4 text-green-300 opacity-40"
        variants={leafVariants}
        animate="float"
      >
        <FaLeaf size={32} />
      </motion.div>
      <motion.div 
        className="absolute top-20 right-1/3 text-green-200 opacity-60"
        variants={leafVariants}
        animate="float"
        style={{ rotate: 45 }}
      >
        <FaLeaf size={24} />
      </motion.div>
      <motion.div 
        className="absolute bottom-20 left-1/3 text-green-100 opacity-80"
        variants={leafVariants}
        animate="float"
        style={{ rotate: -30 }}
      >
        <FaTree size={28} />
      </motion.div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Лого и описание */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center md:items-start"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center mb-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-4xl text-white mr-2"
              >
                <FaLeaf />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-300 to-yellow-200 bg-clip-text text-transparent">
                Наш Сад
              </span>
            </motion.div>
            <motion.p 
              whileHover={{ x: 5 }}
              className="text-green-100 text-center md:text-left"
            >
              Природная гармония в каждом саженце. Создаем прекрасное вместе с 2010 года.
            </motion.p>
          </motion.div>

          {/* Контакты */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center"
          >
            <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              Контакты
            </h3>
            <ul className="space-y-2 text-green-100">
              {contacts.map((contact, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center"
                >
                  <span className="mr-2">{contact.icon}</span>
                  {contact.text}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Соцсети */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center md:items-end"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Мы в соцсетях</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className={`${social.color} text-white p-3 rounded-full relative overflow-hidden`}
                  whileHover={{ y: -5 }}
                  onHoverStart={() => setHoveredItem(index)}
                  onHoverEnd={() => setHoveredItem(null)}
                >
                  {social.icon}
                  <AnimatePresence>
                    {hoveredItem === index && (
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-0 left-0 right-0 text-xs bg-black/50 py-1"
                      >
                        {social.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Копирайт */}
        <motion.div 
          variants={itemVariants}
          className="border-t border-green-600 pt-6 text-center"
        >
          <motion.p 
            whileHover={{ scale: 1.05 }}
            className="text-green-200"
          >
            © {new Date().getFullYear()} Наш Сад. Все права защищены.
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
}