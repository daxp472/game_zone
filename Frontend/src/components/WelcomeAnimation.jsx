import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const WelcomeAnimation = ({ onComplete }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
      navigate('/home'); // Navigate to the home page after the animation
    }, 3000); // Duration of the animation

    return () => clearTimeout(timer);
  }, [onComplete, navigate]);

  return (
    <div className="fixed inset-0 bg-[#13141f] flex items-center justify-center z-50">
      <motion.div
        className="text-6xl text-white"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      >
        Welcome to GameZone!
      </motion.div>
    </div>
  );
};

export default WelcomeAnimation;