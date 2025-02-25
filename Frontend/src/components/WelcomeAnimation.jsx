import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const WelcomeAnimation = ({ onComplete }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
      navigate('/home'); // Navigate to the home page after the animation
    }, 15000); // Duration of the animation

    return () => clearTimeout(timer);
  }, [onComplete, navigate]);

  useEffect(() => {
    // GSAP animations for various gaming elements
    gsap.fromTo(".controller", { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.5 });
    gsap.fromTo(".puzzle", { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, delay: 2 });
    gsap.fromTo(".cards", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 3.5 });
    gsap.fromTo(".snake", { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, delay: 5 });

    // Final animation for "GameZone" text
    gsap.fromTo(".gamezone", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, delay: 7 });
    gsap.fromTo(".stars", { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 8 });

    // Rotate all elements together
    gsap.to(".rotate-elements", { rotation: 360, duration: 5, delay: 9 });

    // Move "GameZone" text to navbar
    gsap.to(".gamezone", { y: -window.innerHeight / 2 + 50, duration: 2, delay: 13 });
  }, []);

  return (
    <div className="fixed inset-0 bg-[#13141f] flex items-center justify-center z-50">
      <div className="relative rotate-elements">
        {/* Gaming Controller Icon */}
        <motion.div
          className="controller text-6xl mb-4 text-purple-500"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          🎮
        </motion.div>

        {/* Puzzle Piece */}
        <motion.div
          className="puzzle text-6xl mb-4 text-blue-500"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          🧩
        </motion.div>

        {/* Cards */}
        <motion.div
          className="cards text-6xl mb-4 text-red-500"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          🃏
        </motion.div>

        {/* Snake */}
        <motion.div
          className="snake text-6xl mb-4 text-green-500"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          🐍
        </motion.div>

        {/* GameZone Text */}
        <motion.div
          className="gamezone text-6xl font-bold text-white text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          GameZone
        </motion.div>

        {/* Falling Stars */}
        <div className="absolute inset-0 flex items-center justify-center stars">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-yellow-500 rounded-full"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 8 + i * 0.1,
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeAnimation;