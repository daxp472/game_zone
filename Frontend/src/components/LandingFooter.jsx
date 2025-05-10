import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaFacebook, FaTwitter, FaInstagram, FaDiscord } from 'react-icons/fa';

function Footer() {
  const quickLinks = [
    { text: 'Games', link: '#' },
    { text: 'Tournaments', link: '#' },
    { text: 'Leaderboard', link: '#' },
    { text: 'Support', link: '#' },
  ];

  const legalLinks = [
    { text: 'Privacy Policy', link: '/privacy-policy' },
    { text: 'Terms of Service', link: '/terms-of-service' },
    { text: 'Cookie Policy', link: '/cookie-policy' },
  ];

  const renderBrandSection = () => (
    <div className="flex flex-col w-3/12 max-md:w-full">
      <div className="flex flex-col mx-auto w-full max-md:mt-8">
        <div className="flex gap-2 items-center animate-fade-in">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/a1a2b128ed76445fbc89bb2309e3a04b/b6ce2fdc8e0ef108546f3b335cd298fe123abb1b22087719afcb21a13b0b0071?apiKey=a1a2b128ed76445fbc89bb2309e3a04b&"
            alt="GameZone Logo"
            className="w-10 h-10 object-contain"
          />
          <div className="text-3xl font-extrabold text-white">GameZone</div>
        </div>
        <div className="mt-4 text-base text-gray-200">Your ultimate gaming destination</div>
        <div className="flex gap-6 mt-6">
          <a href="#" aria-label="Facebook" className="text-purple-400 hover:text-purple-300 hover:scale-110 transition-all duration-300">
            <FaFacebook size={32} />
          </a>
          <a href="#" aria-label="Twitter" className="text-purple-400 hover:text-purple-300 hover:scale-110 transition-all duration-300">
            <FaTwitter size={32} />
          </a>
          <a href="#" aria-label="Instagram" className="text-purple-400 hover:text-purple-300 hover:scale-110 transition-all duration-300">
            <FaInstagram size={32} />
          </a>
          <a href="#" aria-label="Discord" className="text-purple-400 hover:text-purple-300 hover:scale-110 transition-all duration-300">
            <FaDiscord size={32} />
          </a>
        </div>
      </div>
    </div>
  );

  const renderFooterColumn = ({ title, links }) => (
    <div className="flex flex-col w-2/12 max-md:w-full">
      <div className="flex flex-col text-base text-gray-200 max-md:mt-8">
        <div className="font-bold text-white text-lg animate-fade-in">{title}</div>
        <div className="flex flex-col mt-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.link}
              className="py-2 hover:text-purple-400 hover:translate-x-2 transition-all duration-300"
            >
              {link.text}
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNewsletterSection = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (email) {
        toast.success('Email subscribed successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark',
        });
        console.log('Newsletter subscription for:', email);
        setEmail('');
      }
    };

    return (
      <div className="flex flex-col w-3/12 max-md:w-full">
        <div className="flex flex-col text-base text-gray-200 max-md:mt-8">
          <div className="font-bold text-white text-lg animate-fade-in">Newsletter</div>
          <div className="mt-4">Stay updated with our latest news and updates</div>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none text-gray-200 placeholder-gray-400"
                placeholder="Enter your email"
                required
              />
              <button
                type="submit"
                className="px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:scale-105 hover:shadow-[0_0_10px_rgba(139,92,246,0.7)] transition-all duration-300"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-[#1a1b26] px-6 py-16 md:px-20">
      <div className="container mx-auto flex flex-wrap gap-8 justify-between max-md:flex-col">
        {renderBrandSection()}
        {renderFooterColumn({ title: 'Quick Links', links: quickLinks })}
        {renderFooterColumn({ title: 'Legal', links: legalLinks })}
        {renderNewsletterSection()}
      </div>
      <div className="mt-12 flex justify-center">
        <a
          href="/download"
          className="flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:scale-110 hover:shadow-[0_0_20px_rgba(139,92,246,0.7)] transition-all duration-300 font-medium"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download Mobile App
        </a>
      </div>
      <div className="mt-8 text-center text-gray-200">
        © {new Date().getFullYear()} GameZone. All rights reserved.
      </div>
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </footer>
  );
}

export default Footer;