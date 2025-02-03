import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-[#1a1b26] py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-2">GameZone</h3>
            <p className="text-gray-400 text-sm mb-4">The ultimate destination for online gaming entertainment.</p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com/gamezone" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a 
                href="https://twitter.com/gamezone" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a 
                href="https://instagram.com/gamezone" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-pink-500 transition-colors"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a 
                href="https://discord.gg/gamezone" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-indigo-500 transition-colors"
              >
                <i className="fab fa-discord text-xl"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/games" className="text-gray-400 hover:text-white">Games</Link></li>
              <li><Link to="/categories" className="text-gray-400 hover:text-white">Categories</Link></li>
              <li><Link to="/tournaments" className="text-gray-400 hover:text-white">Tournaments</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-400 hover:text-white">Help Center</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">Download App</h3>
            <div className="space-y-2">
              <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white">
                <i className="fab fa-apple text-xl"></i>
                <span>App Store</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white">
                <i className="fab fa-google-play text-xl"></i>
                <span>Google Play</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2025 GameZone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;