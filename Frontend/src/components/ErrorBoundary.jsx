import { Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationTriangle, FaHome, FaSyncAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('Error caught by boundary:', error, errorInfo);
    // Optional: Log error to a service (e.g., Sentry)
    // logErrorToService(error, errorInfo);
  }

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const { error, errorInfo } = this.state;

      // Functional component for navigation (since class components can't use hooks directly)
      const ErrorContent = () => {
        const navigate = useNavigate();

        const handleBackToMenu = () => {
          navigate('/');
        };

        // Animation Variants
        const containerVariants = {
          hidden: { opacity: 0, scale: 0.8 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.5,
              when: 'beforeChildren',
              staggerChildren: 0.1,
            },
          },
        };

        const itemVariants = {
          hidden: { y: 20, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: {
              type: 'spring',
              stiffness: 120,
            },
          },
        };

        return (
          <motion.div
            className="min-h-screen bg-gradient-to-br from-[#0a0b13] via-[#13141f] to-[#1a1b26] flex items-center justify-center px-4 font-orbitron"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Floating Particles */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              {[...Array(15)].map((_, i) => (
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
              className="relative bg-[#1a1b26]/90 p-10 rounded-2xl shadow-2xl max-w-lg w-full backdrop-blur-xl border border-purple-500/30"
              variants={itemVariants}
            >
              {/* Error Icon */}
              <motion.div className="flex justify-center mb-6" variants={itemVariants}>
                <FaExclamationTriangle className="text-5xl text-red-500 animate-pulse" />
              </motion.div>

              {/* Error Title */}
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-white text-center mb-4"
                variants={itemVariants}
              >
                Oops! Something Crashed
              </motion.h2>

              {/* Error Message */}
              <motion.p
                className="text-gray-300 text-center mb-6"
                variants={itemVariants}
              >
                We hit a glitch in the GameZone universe. Our team’s on it, but you can try these options to get back in the game!
              </motion.p>

              {/* Error Details */}
              <motion.div
                className="bg-gray-800/50 p-4 rounded-lg mb-8 border border-gray-700/50"
                variants={itemVariants}
              >
                <h3 className="text-lg font-semibold text-white mb-2">Error Details</h3>
                <p className="text-gray-400 text-sm">
                  <strong>Name:</strong> {error?.name || 'Unknown Error'}
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  <strong>Message:</strong> {error?.message || 'Something went wrong'}
                </p>
                {errorInfo && (
                  <p className="text-gray-400 text-sm mt-1 truncate">
                    <strong>Component:</strong> {errorInfo.componentStack?.split('\n')[1]?.trim() || 'N/A'}
                  </p>
                )}
              </motion.div>

              {/* Buttons */}
              <motion.div
                className="flex flex-col md:flex-row justify-center gap-4"
                variants={itemVariants}
              >
                <motion.button
                  onClick={handleBackToMenu}
                  className="flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.7)] transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaHome className="mr-2" />
                  Back to Menu
                </motion.button>
                <motion.button
                  onClick={this.handleRefresh}
                  className="flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-lg hover:shadow-[0_0_20px_rgba(34,197,94,0.7)] transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaSyncAlt className="mr-2" />
                  Refresh Page
                </motion.button>
              </motion.div>

              {/* Support Link */}
              <motion.p
                className="text-center text-gray-400 text-sm mt-8"
                variants={itemVariants}
              >
                Still facing issues?{' '}
                <a
                  href="/support"
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Contact Support
                </a>
              </motion.p>
            </motion.div>
          </motion.div>
        );
      };

      return <ErrorContent />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

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