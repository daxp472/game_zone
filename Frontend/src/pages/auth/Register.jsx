import { useState, useEffect, useRef, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { useAuth } from '../../contexts/AuthContext';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';
import { FaUser, FaEnvelope, FaLock, FaTransgender, FaCalendar, FaGoogle, FaDiscord, FaSpinner } from 'react-icons/fa';
import WelcomeAnimation from '../../components/WelcomeAnimation';
import { toast } from 'react-toastify';

const Register = memo(() => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dob: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { register } = useAuth();
  const navigate = useNavigate();
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Vanta NET Background
    vantaEffect.current = NET({
      el: vantaRef.current,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 0.8,
      color: 0x9333ea,
      backgroundColor: 0x0a0b13,
      points: 12.0,
      maxDistance: 20.0,
      spacing: 15.0,
    });

    // GSAP Button Animation
    const button = buttonRef.current;
    gsap.fromTo(
      button,
      { scale: 1 },
      {
        scale: 1.05,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'power1.inOut',
      }
    );

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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      gsap.to('.error-message', {
        x: -10,
        duration: 0.1,
        repeat: 3,
        yoyo: true,
      });
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await register(formData);
      toast.success('Account created successfully! Welcome to GameZone!', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'dark',
      });
      navigate('/home');
    } catch (err) {
      setError(err.message);
      gsap.to('.error-message', {
        x: -10,
        duration: 0.1,
        repeat: 3,
        yoyo: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    toast.info(`Social login with ${provider} coming soon!`, {
      position: 'top-right',
      autoClose: 3000,
      theme: 'dark',
    });
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        when: 'beforeChildren',
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 20,
      },
    },
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const errorVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 200 },
    },
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div key="step1" variants={slideVariants} initial="enter" animate="center" exit="exit" className="space-y-6">
            <motion.div variants={itemVariants}>
              <label className="block text-gray-200 mb-2 text-sm font-medium">Full Name</label>
              <div className="relative">
                <FaUser className="absolute top-1/2 left-4 transform -translate-y-1/2 text-purple-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#2a2b36]/80 text-white p-4 pl-12 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300 border border-gray-700/50"
                  required
                  placeholder="Enter full name"
                />
                <motion.div
                  className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ width: 0 }}
                  whileFocus={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-gray-200 mb-2 text-sm font-medium">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute top-1/2 left-4 transform -translate-y-1/2 text-purple-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#2a2b36]/80 text-white p-4 pl-12 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300 border border-gray-700/50"
                  required
                  placeholder="Enter email"
                />
                <motion.div
                  className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ width: 0 }}
                  whileFocus={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div key="step2" variants={slideVariants} initial="enter" animate="center" exit="exit" className="space-y-6">
            <motion.div variants={itemVariants}>
              <label className="block text-gray-200 mb-2 text-sm font-medium">Username</label>
              <div className="relative">
                <FaUser className="absolute top-1/2 left-4 transform -translate-y-1/2 text-purple-400" />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full bg-[#2a2b36]/80 text-white p-4 pl-12 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300 border border-gray-700/50"
                  required
                  placeholder="Choose a username"
                />
                <motion.div
                  className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ width: 0 }}
                  whileFocus={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-gray-200 mb-2 text-sm font-medium">Password</label>
              <div className="relative">
                <FaLock className="absolute top-1/2 left-4 transform -translate-y-1/2 text-purple-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-[#2a2b36]/80 text-white p-4 pl-12 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300 border border-gray-700/50"
                  required
                  placeholder="Create a password"
                />
                <motion.div
                  className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ width: 0 }}
                  whileFocus={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-gray-200 mb-2 text-sm font-medium">Confirm Password</label>
              <div className="relative">
                <FaLock className="absolute top-1/2 left-4 transform -translate-y-1/2 text-purple-400" />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full bg-[#2a2b36]/80 text-white p-4 pl-12 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300 border border-gray-700/50"
                  required
                  placeholder="Confirm your password"
                />
                <motion.div
                  className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ width: 0 }}
                  whileFocus={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div key="step3" variants={slideVariants} initial="enter" animate="center" exit="exit" className="space-y-6">
            <motion.div variants={itemVariants}>
              <label className="block text-gray-200 mb-2 text-sm font-medium">Gender</label>
              <div className="relative">
                <FaTransgender className="absolute top-1/2 left-4 transform -translate-y-1/2 text-purple-400" />
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full bg-[#2a2b36]/80 text-white p-4 pl-12 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300 border border-gray-700/50"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <motion.div
                  className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ width: 0 }}
                  whileFocus={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-gray-200 mb-2 text-sm font-medium">Date of Birth</label>
              <div className="relative">
                <FaCalendar className="absolute top-1/2 left-4 transform -translate-y-1/2 text-purple-400" />
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full bg-[#2a2b36]/80 text-white p-4 pl-12 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300 border border-gray-700/50"
                  required
                />
                <motion.div
                  className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ width: 0 }}
                  whileFocus={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-orbitron" ref={vantaRef}>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0b13]/90 via-[#13141f]/80 to-[#1a1b26]/90 z-0"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* GameZone Logo */}
        <motion.div
          className="mb-12 text-center"
          variants={itemVariants}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            GameZone
          </h1>
          <p className="text-gray-300 text-lg mt-2">Join the Ultimate Gaming Revolution</p>
        </motion.div>

        {/* Register Form */}
        <motion.div
          className="bg-[#1a1b26]/90 p-10 rounded-2xl shadow-2xl w-full max-w-lg backdrop-blur-xl border border-purple-500/30"
          variants={itemVariants}
        >
          <motion.div className="text-center mb-10" variants={itemVariants}>
            <h2 className="text-4xl font-bold text-white mb-3">Create Your Gamer Profile</h2>
            <p className="text-gray-400 text-sm">Step {currentStep} of 3</p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div className="mb-8" variants={itemVariants}>
            <div className="flex justify-between mb-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-1/3 h-2 rounded-full ${
                    step <= currentStep ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-400 text-sm text-center">
              {currentStep === 1 ? 'Basic Info' : currentStep === 2 ? 'Account Setup' : 'Personal Details'}
            </p>
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                className="bg-red-600/90 text-white p-4 rounded-lg mb-8 error-message"
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <FaSpinner className="inline mr-2 animate-spin" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {renderStep()}

            <motion.div className="flex justify-between mt-10" variants={itemVariants}>
              {currentStep > 1 && (
                <motion.button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="bg-gray-700/80 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Previous
                </motion.button>
              )}
              <motion.button
                type="submit"
                disabled={isLoading}
                ref={buttonRef}
                className={`${
                  currentStep === 1 ? 'w-full' : ''
                } bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-4 rounded-lg
                  ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-[0_0_20px_rgba(139,92,246,0.7)]'
                  }
                  transition-all duration-300 transform hover:scale-[1.03]`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <FaSpinner className="animate-spin mr-2" />
                    Creating Account...
                  </div>
                ) : currentStep === 3 ? (
                  'Join GameZone'
                ) : (
                  'Next'
                )}
              </motion.button>
            </motion.div>
          </form>

          {/* Social Login */}
          <motion.div className="mt-8" variants={itemVariants}>
            <p className="text-center text-gray-400 mb-4">Or sign up with</p>
            <div className="flex justify-center gap-4">
              <motion.button
                className="flex items-center px-6 py-3 bg-gray-700/80 text-white rounded-lg hover:bg-gray-600 transition-all duration-300"
                onClick={() => handleSocialLogin('Google')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGoogle className="mr-2" />
                Google
              </motion.button>
              <motion.button
                className="flex items-center px-6 py-3 bg-gray-700/80 text-white rounded-lg hover:bg-gray-600 transition-all duration-300"
                onClick={() => handleSocialLogin('Discord')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDiscord className="mr-2" />
                Discord
              </motion.button>
            </div>
          </motion.div>

          {/* Links */}
          <motion.div className="text-center mt-8" variants={itemVariants}>
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                Login
              </Link>
            </p>
          </motion.div>

          {/* Footer Links */}
          <motion.div className="mt-6 pt-6 border-t border-gray-700/50" variants={itemVariants}>
            <p className="text-center text-gray-400 text-sm">
              By signing up, you agree to our{' '}
              <Link to="/terms-of-service" className="text-purple-400 hover:text-purple-300">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy-policy" className="text-purple-400 hover:text-purple-300">
                Privacy Policy
              </Link>
            </p>
          </motion.div>
        </motion.div>

        {/* Security Note */}
        <motion.div className="mt-8 text-center text-gray-400 text-sm" variants={itemVariants}>
          <p>🔒 Your data is protected with industry-standard encryption.</p>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');

        .font-orbitron {
          font-family: 'Orbitron', sans-serif;
        }

        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
});

export default Register;