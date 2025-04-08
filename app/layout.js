"use client"; // Не забудьте добавить эту директиву, так как используете useState и useEffect

import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/sidebar';
import './globals.css'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import AOSInitializer from './components/AOSInitializer';
import Loading from './components/Loading/loading';

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="ru">
      <body className="w-full min-h-screen flex flex-col">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <AOSInitializer />
            <Header />
            <Sidebar />
            <main className="w-full mx-auto"> {/* Уменьшили отступ слева, т.к. сайдбар теперь частично скрыт */}
              {children}
            </main>
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}