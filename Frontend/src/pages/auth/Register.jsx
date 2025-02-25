import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';
import WelcomeAnimation from '../../components/WelcomeAnimation';

function Register() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dob: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { register } = useAuth();
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
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      return;
    }
    
    setError('');
    setIsLoading(true);

    try {
      await register(formData);
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

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-4"
          >
            <motion.div variants={itemVariants}>
              <label className="block text-gray-300 mb-2 text-sm font-medium">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-[#2a2b36] text-white p-3 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                required
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-gray-300 mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-[#2a2b36] text-white p-3 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                required
              />
            </motion.div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="step2"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-4"
          >
            <motion.div variants={itemVariants}>
              <label className="block text-gray-300 mb-2 text-sm font-medium">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="w-full bg-[#2a2b36] text-white p-3 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                required
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-gray-300 mb-2 text-sm font-medium">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-[#2a2b36] text-white p-3 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                required
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-gray-300 mb-2 text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full bg-[#2a2b36] text-white p-3 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                required
              />
            </motion.div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="step3"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-4"
          >
            <motion.div variants={itemVariants}>
              <label className="block text-gray-300 mb-2 text-sm font-medium">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                className="w-full bg-[#2a2b36] text-white p-3 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-gray-300 mb-2 text-sm font-medium">Date of Birth</label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({...formData, dob: e.target.value})}
                className="w-full bg-[#2a2b36] text-white p-3 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                required
              />
            </motion.div>
          </motion.div>
        );
      default:
        return null;
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
            <h2 className="text-4xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-gray-400">Step {currentStep} of 3</p>
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
            {renderStep()}

            <motion.div className="flex justify-between mt-8" variants={itemVariants}>
              {currentStep > 1 && (
                <motion.button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-all duration-200"
                  whileTap={{ scale: 0.95 }}
                >
                  Previous
                </motion.button>
              )}
              <motion.button
                type="submit"
                disabled={isLoading}
                className={`${currentStep === 1 ? 'w-full' : ''} bg-purple-600 text-white px-6 py-3 rounded-lg 
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'} 
                  transition-all duration-200`}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : currentStep === 3 ? (
                  'Create Account'
                ) : (
                  'Next'
                )}
              </motion.button>
            </motion.div>
          </form>

          <motion.div 
            className="text-center mt-6"
            variants={itemVariants}
          >
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-purple-500 hover:text-purple-400 font-medium transition-colors"
              >
                Login
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Register;