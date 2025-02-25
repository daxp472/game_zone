import { motion } from 'framer-motion';
import { useEffect } from 'react';
import gsap from 'gsap';

const Loader = () => {
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

        {/* Loading Particles */}
        <div className="absolute inset-0 -z-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-500 rounded-full"
              initial={{
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
                opacity: 0
              }}
              animate={{
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loader;