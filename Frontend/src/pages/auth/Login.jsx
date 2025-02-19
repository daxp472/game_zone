import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    if (!vantaEffect.current) {
      vantaEffect.current = NET({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x9333ea,
        backgroundColor: 0x13141f,
        points: 10.00,
        maxDistance: 25.00,
        spacing: 17.00
      });
    }
    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(formData);
      navigate('/home');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#13141f] relative overflow-hidden" ref={vantaRef}>
      <div className="absolute inset-0 z-0"></div>
      
      <motion.div 
        className="relative z-10 min-h-screen flex items-center justify-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="bg-[#1a1b26] p-8 rounded-lg shadow-xl w-full max-w-md backdrop-blur-lg bg-opacity-90"
          variants={itemVariants}
        >
          <motion.div 
            className="text-center mb-8"
            variants={itemVariants}
          >
            <h2 className="text-4xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Enter your credentials to continue</p>
          </motion.div>

          {error && (
            <motion.div 
              className="bg-red-500 bg-opacity-90 text-white p-4 rounded-lg mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants}>
              <label className="block text-gray-300 mb-2 text-sm font-medium">Email or Username</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-[#2a2b36] text-white p-3 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none transition-all duration-200"
                  required
                />
                <motion.div 
                  className="absolute left-0 bottom-0 h-0.5 bg-purple-600"
                  initial={{ width: 0 }}
                  whileFocus={{ width: "100%" }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-gray-300 mb-2 text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-[#2a2b36] text-white p-3 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none transition-all duration-200"
                  required
                />
                <motion.div 
                  className="absolute left-0 bottom-0 h-0.5 bg-purple-600"
                  initial={{ width: 0 }}
                  whileFocus={{ width: "100%" }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </motion.div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-purple-600 text-white py-3 rounded-lg font-medium
                ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'} 
                transition-all duration-200 transform hover:scale-[1.02]`}
              variants={itemVariants}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Logging in...
                </div>
              ) : (
                'Login'
              )}
            </motion.button>

            <motion.div 
              className="text-center mt-6"
              variants={itemVariants}
            >
              <p className="text-gray-400">
                New to GameZone?{' '}
                <Link 
                  to="/register" 
                  className="text-purple-500 hover:text-purple-400 font-medium transition-colors"
                >
                  Create Account
                </Link>
              </p>
            </motion.div>
          </form>

          <motion.div 
            className="mt-8 pt-6 border-t border-gray-700"
            variants={itemVariants}
          >
            <p className="text-center text-gray-400 text-sm">
              By logging in, you agree to our{' '}
              <a href="#" className="text-purple-500 hover:text-purple-400">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-purple-500 hover:text-purple-400">Privacy Policy</a>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Login;