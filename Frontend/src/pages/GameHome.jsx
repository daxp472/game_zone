import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import GameNavbar from '../components/GameNavbar';
import Footer from '../components/Footer';
import { motion, useAnimation, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';

gsap.registerPlugin(ScrollTrigger);

function FloatingCube() {
  const mesh = useRef();
  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="purple" />
    </mesh>
  );
}

function Home() {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const heroRef = useRef(null);
  const isInView = useInView(heroRef);
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://dashboard-oeum.onrender.com/dashboard/games');
        const gamesWithIds = response.data.map((game, index) => ({
          ...game,
          id: game.id || `game-${index}`
        }));
        setGames(gamesWithIds);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  useEffect(() => {
    // GSAP Animations
    gsap.from('.game-card', {
      scrollTrigger: {
        trigger: '.game-grid',
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'play none none reverse'
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2
    });
  }, []);

  const categories = [
    { id: 'racing', name: 'Racing', icon: '🏎️' },
    { id: 'action', name: 'Action', icon: '🎮' },
    { id: 'puzzle', name: 'Puzzle', icon: '🧩' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    { id: 'strategy', name: 'Strategy', icon: '♟️' },
    { id: 'adventure', name: 'Adventure', icon: '🗺️' },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#13141f] flex flex-col">
      <GameNavbar />
      <div className="flex-grow">

        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <Canvas className="absolute inset-0">
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Stars />
            <OrbitControls enableZoom={false} />
            <FloatingCube />
          </Canvas>
  
          <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
            >
              Welcome to GameZone
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 mb-8"
            >
              Discover a world of endless gaming possibilities
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center space-x-4"
            >
              <Link
                to="/categories"
                className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transform hover:scale-105 transition-all duration-300"
              >
                Explore Games
              </Link>
              <Link
                to="/tournaments"
                className="bg-transparent border-2 border-purple-500 text-purple-500 px-8 py-3 rounded-lg hover:bg-purple-500 hover:text-white transform hover:scale-105 transition-all duration-300"
              >
                Join Tournament
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Featured Games Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-4 py-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                variants={cardVariants}
                className="game-card bg-[#1a1b26] rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20"
                whileHover={{
                  y: -10,
                  transition: { duration: 0.2 }
                }}
              >
                <img
                  src={game.imageUrl || 'https://via.placeholder.com/400x200'}
                  alt={game.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
                  <p className="text-gray-400 mb-4">{game.description || 'An exciting game awaits!'}</p>
                  <Link
                    to={`/game/${game.id}`}
                    className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Play Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Categories Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="py-16 bg-[#1a1b26]"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Game Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="group relative bg-[#2a2b36] p-6 rounded-lg flex flex-col items-center hover:bg-purple-600 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">{category.icon}</span>
                  <h3 className="text-white font-medium text-center">{category.name}</h3>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300" />
                </Link>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Call to Action Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-20 bg-gradient-to-r from-purple-600 to-pink-600"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Gaming?</h2>
            <p className="text-xl text-white/80 mb-8">Join millions of players worldwide and experience the best online games</p>
            <Link
              to="/categories"
              className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
            >
              Start Playing Now
            </Link>
          </div>
        </motion.section>
      </div>
      <Footer />
    </div>
  );
}

export default Home;