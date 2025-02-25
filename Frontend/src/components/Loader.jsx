import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import gsap from 'gsap';

const Loader = () => {
  const [snakePosition, setSnakePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // GSAP animation for the loading text
    gsap.to(".loading-text", {
      duration: 0.8,
      opacity: 0.5,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut"
    });

    // GSAP animation for the gaming controller
    gsap.to(".controller", {
      duration: 1,
      rotate: 10,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut"
    });

    // Mouse move event for snake
    const handleMouseMove = (e) => {
      setSnakePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#13141f] bg-opacity-90 flex items-center justify-center z-50">
      <div className="relative">
        {/* Gaming Controller Icon */}
        <motion.div
          className="controller text-6xl mb-4 text-purple-500"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          🎮
        </motion.div>

        {/* Loading Text */}
        <motion.div
          className="loading-text text-2xl font-bold text-white text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading...
        </motion.div>

        {/* Loading Bar */}
        <motion.div
          className="w-48 h-1 bg-gray-700 rounded-full mt-4 overflow-hidden"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear"
            }}
          />
        </motion.div>

        {/* Puzzle Animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              className="w-12 h-12 bg-purple-500 m-1"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: i * 0.1,
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>

        {/* Cards Animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-16 h-24 bg-blue-500 rounded-lg"
              initial={{ x: 0, y: 0, rotate: 0 }}
              animate={{
                x: [0, 100, -100, 0],
                y: [0, -100, 100, 0],
                rotate: [0, 360]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>

        {/* Snake Animation */}
        <motion.div
          className="absolute w-8 h-8 bg-green-500 rounded-full"
          style={{ top: snakePosition.y, left: snakePosition.x }}
          animate={{ x: snakePosition.x, y: snakePosition.y }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </div>
  );
};

export default Loader;