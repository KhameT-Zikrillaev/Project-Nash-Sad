'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Korable from '../../public/images/Mishka.png'
import fon from '../../public/images/fonGames.webp'
import yabloko from '../../public/images/yab.png'
import grusha from '../../public/images/grush.png'
import apelsine from '../../public/images/apel.webp'

// u041au043eu0441u0442u0430u043du0442u044b u0434u043bu044f u0442u0438u043fu043eu0432 u0444u0440u0443u043au0442u043eu0432
const FRUIT_TYPES = {
  APPLE: 'apple',
  PEAR: 'pear',
  ORANGE: 'orange'
};

// u0424u0443u043du043au0446u0438u044f u0434u043bu044f u043fu043eu043bu0443u0447u0435u043du0438u044f u0438u0437u043eu0431u0440u0430u0436u0435u043du0438u044f u0444u0440u0443u043au0442u0430 u043fu043e u0442u0438u043fu0443
const getFruitImage = (type) => {
  switch(type) {
    case FRUIT_TYPES.APPLE:
      return yabloko;
    case FRUIT_TYPES.PEAR:
      return grusha;
    case FRUIT_TYPES.ORANGE:
      return apelsine;
    default:
      return yabloko;
  }
};

// u0424u0443u043du043au0446u0438u044f u0434u043bu044f u043fu043eu043bu0443u0447u0435u043du0438u044f u0441u043bu0443u0447u0430u0439u043du043eu0433u043e u0442u0438u043fu0430 u0444u0440u0443u043au0442u0430
const getRandomFruitType = () => {
  const types = Object.values(FRUIT_TYPES);
  return types[Math.floor(Math.random() * types.length)];
};

export default function Games2() {
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [lives, setLives] = useState(10);
  const [bombs, setBombs] = useState([]);
  const [rockets, setRockets] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [flashRed, setFlashRed] = useState(false);
  const [shipX, setShipX] = useState(200);
  const [shipLocked, setShipLocked] = useState(false);
  // u0414u043eu0431u0430u0432u043bu044fu0435u043c u0441u043eu0441u0442u043eu043du0438u0435 u0434u043bu044f u0442u0435u043au0443u0449u0435u0433u043e u0444u0440u0443u043au0442u0430, u043au043eu0442u043eu0440u044bu0439 u0434u0435u0440u0436u0438u0442 u043lu044fu0433u0443u0448u043au043au0430
  const [currentFruit, setCurrentFruit] = useState(FRUIT_TYPES.APPLE);
  const gameAreaRef = useRef(null);

  const bombSpeed = 2 + (level - 1) * 1;

  // u0421u043eu0437u0434u0430u043du0438u0435 u0441u043lu0443u0447u0430u0439u043du043eu0433u043e u0444u0440u0443u043au0442u0430
  const createBomb = () => {
    if (gameOver || !gameStarted) return;
    const gameArea = gameAreaRef.current;
    if (!gameArea) return;

    const maxX = gameArea.clientWidth - 60;
    const x = Math.random() * maxX;
    const size = Math.random() * 20 + 20;

    const newBomb = {
      id: Date.now() + Math.random(),
      x,
      y: -60,
      size,
      rotation: 180,
      speed: bombSpeed,
      fruitType: getRandomFruitType(), // u0414u043eu0431u0430u0432u043bu044fu0435u043c u0441u043lu0443u0447u0430u0439u043du044bu0439 u0442u0438u043f u0444u0440u0443u043au0442u0430
    };

    setBombs((prev) => [...prev, newBomb]);
  };

  const handleBombClick = (id) => {
    // u041du0435 u0443u0434u0430u043bu044fu0435u043c u0444u0440u0443u043au0442, u0442u0430u043a u043au0430u043a u0442u0435u043fu0435u0440u044c u043eu043du0438 u0431u0443u0434u0443u0442 u0443u0434u0430u043bu044fu0442u044cu0441u044f u0442u043eu043bu044cu043au043e u043fu0440u0438 u0441u0442u043eu043bu043au043du043eu0432u0435u043du0438u0438 u0441 u043pu043eu0434u0445u043eu0434u044fu0449u0438u043c m044fu0440u0443u043au0442u043eu043c
  };

  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const gameArea = gameAreaRef.current;
    if (!gameArea) return;

    const moveBombs = () => {
      setBombs((prev) =>
        prev
          .map((bomb) => ({
            ...bomb,
            y: bomb.y + bomb.speed,
          }))
          .filter((bomb) => {
            const outOfBounds = bomb.y > gameArea.clientHeight;
            if (outOfBounds) {
              setMissed((prev) => prev + 1);
              setLives((prev) => prev - 1);
              setFlashRed(true);
              setTimeout(() => setFlashRed(false), 200);
            }
            return !outOfBounds;
          })
      );
    };

    const loop = setInterval(moveBombs, 16);
    return () => clearInterval(loop);
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const interval = Math.max(1500, 2500 - level * 100); // u0423u0432u0435u043bu0438u0447u0438u0432u0430u0435u043c u0438u043du0442u0435u0440u0432u0430u043b u043cu0435u0436u0434u0443 u043fu043eu044fu0432u043bu0435u043du0438u0435u043c u0444u0440u0443u043au0442u043eu0432
    const spawner = setInterval(createBomb, interval);
    return () => clearInterval(spawner);
  }, [gameStarted, gameOver, level]);

  useEffect(() => {
    const newLevel = Math.min(1 + Math.floor(score / 30), 5);
    setLevel(newLevel);
  }, [score]);

  useEffect(() => {
    if (lives <= 0) {
      setGameOver(true);
    }
  }, [lives]);

  // u041eu0431u0440u0430u0431u043eu0442u043au0430 u043fu0440u0430u0432u043eu0433u043e u043au043bu0438u043au0430 u043cu044bu0448u0438 u0434u043bu044f u0441u043cu0435u043du044b u0444u0440u0443u043au0442u0430
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault(); // u041fu0440u0435u0434u043eu0442u0432u0440u0430u0449u0430u0435u043c u0441u0442u0430u043du0434u0430u0440u0442u043du043eu0435 u043au043eu043du0442u0435u043au0441u0442u043du043eu0435 u043cu0435u043du044e
      if (gameStarted && !gameOver) {
        // u041cu0435u043du044fu0435u043c u0444u0440u0443u043au0442 u0432 u0446u0438u043au043bu0435: u044fu0431u043bu043eu043au043e -> u0433u0440u0443u0448u0430 -> u0430u043fu0435u043bu044cu0441u0438u043d -> u044fu0431u043bu043eu043au043e
        setCurrentFruit(prev => {
          switch(prev) {
            case FRUIT_TYPES.APPLE:
              return FRUIT_TYPES.PEAR;
            case FRUIT_TYPES.PEAR:
              return FRUIT_TYPES.ORANGE;
            case FRUIT_TYPES.ORANGE:
              return FRUIT_TYPES.APPLE;
            default:
              return FRUIT_TYPES.APPLE;
          }
        });
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    return () => window.removeEventListener('contextmenu', handleContextMenu);
  }, [gameStarted, gameOver]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!shipLocked && gameAreaRef.current) {
        const bounds = gameAreaRef.current.getBoundingClientRect();
        setShipX(e.clientX - bounds.left - 25);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [shipLocked]);

  // u0421u0442u0440u0435u043bu044fu044eu0449u0438u0435 u0444u0440u0443u043au0442u0430u043cu0438
  const shootRocket = () => {
    if (!gameStarted || gameOver) return;
    setRockets((prev) => [
      ...prev,
      { 
        id: Date.now(), 
        x: shipX + 25, 
        y: window.innerHeight - 100,
        fruitType: currentFruit // u0414u043eu0431u0430u0432u043bu044fu0435u043c u0442u0438u043f u0444u0440u0443u043au0442u0430 u043a u0441u043du0430u0440u044fu0434u0443
      },
    ]);
  };

  // u0414u0432u0438u0436u0435u043du0438u0435 u0444u0440u0443u043au0442u043eu0432 u0438 u043fu0440u043eu0432u0435u0440u043au0430 u0441u0442u043eu043bu043au043du043eu0432u0435u043du0438u0439
  useEffect(() => {
    const moveRockets = () => {
      setRockets((prevRockets) =>
        prevRockets
          .map((r) => ({ ...r, y: r.y - 8 }))
          .filter((r) => r.y > 0)
      );

      setBombs((prevBombs) =>
        prevBombs.filter((bomb) => {
          // u041fu0440u043eu0432u0435u0440u044fu0435u043c u0441u0442u043eu043bu043au043du043eu0432u0435u043du0438u0435 u0441 u043lu044bu044fu043c m044fu0440u0443u043au0442u043eu043c
          const hit = rockets.some(
            (r) =>
              r.x > bomb.x &&
              r.x < bomb.x + bomb.size &&
              r.y < bomb.y + bomb.size &&
              r.y > bomb.y &&
              r.fruitType === bomb.fruitType // u0414u043eu0431u0430u0432u043bu044fu0435u043c u043fu0440u043eu0432u0435u0440u043au0443 u043du0430 u0441u043eu0432u043fu0430u0434u0435u043du0438u0435 u0442u0438u043fu043eu0432 u0444u0440u0443u043au0442u043eu0432
          );
          
          if (hit) {
            setScore((prev) => prev + 1);
          }
          return !hit;
        })
      );
    };

    const interval = setInterval(moveRockets, 16);
    return () => clearInterval(interval);
  }, [rockets]);

  const restartGame = () => {
    setScore(0);
    setMissed(0);
    setLives(10);
    setBombs([]);
    setRockets([]);
    setGameOver(false);
    setLevel(1);
    setGameStarted(true);
    setCurrentFruit(FRUIT_TYPES.APPLE); // u0421u0431u0440u0430u0441u044bu0432u0430u0435u043c u0442u0435u043au0443u0449u0438u0439 u0444u0440u0443u043au0442 u043du0430 u044fu0431u043bu043eu043au043e
  };

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="inset-0 bg-black text-white overflow-hidden" style={{
      backgroundImage: `url(${fon.src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      {!gameStarted ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-5xl font-bold mb-8">Космический защитник</h1>
          <button
            onClick={startGame}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-xl"
          >
            Старт
          </button>
        </div>
      ) : (
        <>
          <div className="absolute mt-[80px] top-4 left-4 z-10 flex gap-6 text-xl">
            <div>Очки: <span className="font-bold">{score}</span></div>
            <div>Пропущено: <span className="font-bold">{missed}</span></div>
            <div>Уровень: <span className="font-bold">{level}</span></div>
            <div>Жизни: <span className="font-bold">{lives}</span></div>
          </div>

          <div
            ref={gameAreaRef}
            onClick={shootRocket}
            className={`relative w-full h-screen transition-all duration-200 ${
              flashRed ? 'bg-red-700 bg-opacity-50' : 'bg-transparent'
            } overflow-hidden`}
          >
            {/* u0417u0432u0435u0437u0434u044b */}
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3}px`,
                  height: `${Math.random() * 3}px`,
                  opacity: Math.random(),
                }}
              />
            ))}

            {/* u041fu0430u0434u0430u044eu0449u0438u0435 u0444u0440u0443u043au0442u044b */}
            {bombs.map((bomb) => (
              <motion.div
                key={bomb.id}
                onClick={() => handleBombClick(bomb.id)}
                className="absolute cursor-pointer"
                style={{
                  left: `${bomb.x}px`,
                  top: `${bomb.y}px`,
                  width: `${bomb.size}px`,
                  height: `${bomb.size}px`,
                  backgroundImage: `url(${getFruitImage(bomb.fruitType).src})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  transform: "rotate(0deg)",
                }}
                transition={{ type: 'linear' }}
              />
            ))}

            {/* u0421u0442u0440u0435u043bu044fu044eu0449u0438u0435 u0444u0440u0443u043au0442u044b */}
            {rockets.map((rocket) => (
              <div
                key={rocket.id}
                className="absolute"
                style={{ 
                  left: rocket.x, 
                  top: rocket.y,
                  width: '15px',
                  height: '15px',
                  backgroundImage: `url(${getFruitImage(rocket.fruitType).src})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              />
            ))}

            {/* u041au043eu0440u0430u0431u043bu044c */}
            <div
              className="absolute bottom-6 w-20 h-20"
              style={{ 
                left: shipX,
                backgroundImage: `url(${Korable.src})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                transform: "rotate(180deg)"
              }}
              onMouseEnter={() => setShipLocked(true)}
              onMouseLeave={() => setShipLocked(false)}
            >
              {/* u042fu0431u043bu043eu043au043e u0432 u0440u0442u0443 u043lu044fu0433u0443u0448u043au0438 */}
              <div
                className="absolute"
                style={{
                  width: '15px',
                  height: '15px',
                  top: '12px',
                  left: '10px',
                  backgroundImage: `url(${getFruitImage(currentFruit).src})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  zIndex: 10
                }}
              />
              
              {/* u0424u0440u0443u043au0442 u043du0430u0434 u043lu044fu0433u0443u0448u043au043eu0439 */}
              <div
                className="absolute"
                style={{
                  width: '40px',
                  height: '40px',
                  top: '40px',
                  left: '20px',
                  backgroundImage: `url(${getFruitImage(currentFruit).src})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  transform: "rotate(180deg)",
                  zIndex: 9,
                  filter: 'drop-shadow(0px 0px 5px rgba(255, 255, 255, 0.7))'
                }}
              />
            </div>
      
            {gameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80"
              >
                <h2 className="text-4xl font-bold mb-6">Игра окончена!</h2>
                <p className="text-2xl mb-4">Счёт: {score}</p>
                <p className="text-xl mb-8">Пропущено: {missed} из 10</p>
                <button
                  onClick={restartGame}
                  className="px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700 text-xl"
                >
                  Играть снова
                </button>
              </motion.div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
