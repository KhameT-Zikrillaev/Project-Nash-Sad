'use client';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaHome, FaBook, FaUsers, FaPhone, FaInfoCircle, FaBars, FaTimes } from 'react-icons/fa';

export default function TransparentNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "Главная", path: "/", icon: <FaHome /> },
    { name: "Каталог", path: "/catalog", icon: <FaBook /> },
    { name: "О нас", path: "/about", icon: <FaUsers /> },
    { name: "Контакты", path: "/contacts", icon: <FaPhone /> },
    { name: "Информация", path: "/info", icon: <FaInfoCircle /> },
  ];

  if (!isMounted) return null;

  return (
    <>
      <header 
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-2 backdrop-blur-sm bg-white/30' : 'py-4'}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Лого с градиентным фоном */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-gradient-to-br from-green-500 to-green-700 text-white p-2 rounded-lg shadow-lg group-hover:shadow-md transition-shadow">
                <FaHome className="text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white drop-shadow-md">Наш Сад</h1>
                <p className="text-xs text-green-100">Экологично и натурально</p>
              </div>
            </Link>

            {/* Навигация для десктопа */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  href={item.path} 
                  className={`
                    px-4 py-2 font-medium rounded-full transition-all
                    ${pathname === item.path 
                      ? 'bg-white/90 text-green-700 shadow-sm' 
                      : 'text-white hover:bg-white/20'}
                    flex items-center gap-2
                  `}
                >
                  <span className="text-sm">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Кнопка меню для мобильных */}
            <button 
              ref={buttonRef}
              className={`
                md:hidden text-xl z-50 p-3 rounded-full
                ${isMenuOpen 
                  ? 'bg-white/90 text-green-700' 
                  : 'bg-white/20 text-white backdrop-blur-sm'}
                transition-all
              `}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        {isMenuOpen && (
          <div 
            ref={menuRef}
            className="md:hidden fixed inset-x-0 top-20 bg-white/95 backdrop-blur-lg z-[49] shadow-xl"
            style={{ 
              maxHeight: 'calc(100vh - 80px)',
              borderRadius: '0 0 20px 20px',
              borderTop: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            <div className="container mx-auto px-4 py-3">
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`
                      py-3 px-5 text-lg font-medium rounded-lg 
                      flex items-center gap-3 transition-colors
                      ${pathname === item.path 
                        ? 'bg-green-100/80 text-green-700' 
                        : 'text-gray-700 hover:bg-gray-100/50'}
                    `}
                  >
                    <span className="text-green-600">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
}