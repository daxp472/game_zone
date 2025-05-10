import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaDiscord, FaAppStore, FaGooglePlay, FaEnvelope } from 'react-icons/fa';
import { toast } from 'react-toastify';

function Footer() {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    toast.success('Subscribed to newsletter!', { position: 'top-right', autoClose: 3000, theme: 'dark' });
    e.target.reset();
  };

  const linkVariants = {
    hover: { scale: 1.05, y: -2, transition: { duration: 0.2 } },
  };

  const iconVariants = {
    hover: { scale: 1.2, rotate: 5, transition: { duration: 0.2 } },
  };

  return (
    <footer className="bg-[#1a1b26]/95 py-12 mt-auto font-orbitron relative border-t border-purple-500/30">
      <div className="container mx-auto px-4">
        {/* Floating Particles */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          {/* GameZone Info */}
          <motion.div className="space-y-4">
            <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              GameZone
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              The ultimate destination for online gaming. Join millions of players in epic battles and thrilling adventures.
            </p>
            <div className="flex space-x-4">
              {[
                { href: 'https://facebook.com/gamezone', icon: FaFacebook, color: 'hover:text-blue-500' },
                { href: 'https://twitter.com/gamezone', icon: FaTwitter, color: 'hover:text-blue-400' },
                { href: 'https://instagram.com/gamezone', icon: FaInstagram, color: 'hover:text-pink-500' },
                { href: 'https://discord.gg/gamezone', icon: FaDiscord, color: 'hover:text-indigo-500' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${social.color} transition-colors`}
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <social.icon className="text-2xl" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { to: '/home', label: 'Home' },
                { to: '/categories', label: 'Games' },
                { to: '/tournaments', label: 'Tournaments' },
                { to: '/leaderboard', label: 'Leaderboard' },
              ].map((link, i) => (
                <motion.li key={i} variants={linkVariants} whileHover="hover">
                  <Link to={link.to} className="text-gray-400 hover:text-purple-400 transition-colors">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div>
            <h3 className="text-lg font-bold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              {[
                { to: '/support', label: 'Help Center' },
                { to: '/contact', label: 'Contact Us' },
                { to: '/terms-of-service', label: 'Terms of Service' },
                { to: '/privacy-policy', label: 'Privacy Policy' },
              ].map((link, i) => (
                <motion.li key={i} variants={linkVariants} whileHover="hover">
                  <Link to={link.to} className="text-gray-400 hover:text-purple-400 transition-colors">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter & App Download */}
          <motion.div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">Stay Connected</h3>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-[#2a2b36]/80 text-gray-300 px-4 py-2 rounded-lg w-full border border-gray-700/50 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                required
              />
              <motion.button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEnvelope />
              </motion.button>
            </form>
            <div className="space-y-2">
              {[
                { href: '#', icon: FaAppStore, label: 'App Store' },
                { href: '#', icon: FaGooglePlay, label: 'Google Play' },
              ].map((app, i) => (
                <motion.a
                  key={i}
                  href={app.href}
                  className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors"
                  variants={linkVariants}
                  whileHover="hover"
                >
                  <app.icon className="text-xl" />
                  <span>{app.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-gray-800 mt-8 pt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gray-400 text-sm">© 2025 GameZone. All rights reserved.</p>
        </motion.div>
      </div>

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
    </footer>
  );
}

export default Footer;