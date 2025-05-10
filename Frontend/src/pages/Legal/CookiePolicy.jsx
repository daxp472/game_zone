import React from 'react';
import LandingNavbar from '../components/LandingNavbar';
import LandingFooter from '../components/LandingFooter';

function CookiePolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-[#0f0c29] to-[#302b63]">
      <LandingNavbar />
      <main className="flex-grow">
        <section className="relative px-6 py-24 md:px-20 md:py-32 text-center">
          <div className="relative container mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-fade-in">
              Cookie Policy
            </h1>
            <p className="mt-6 text-xl text-gray-200 max-w-3xl mx-auto animate-fade-in delay-100">
              We use cookies to enhance your experience on GameZone. Learn more about how we use them.
            </p>
          </div>
        </section>

        <section className="px-6 py-20 md:px-20 bg-gradient-to-b from-[#0f0c29] to-gray-900">
          <div className="container mx-auto max-w-4xl text-gray-200">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in">1. What Are Cookies?</h2>
              <p className="leading-relaxed">
                Cookies are small text files stored on your device to remember your preferences and improve site functionality.
              </p>
            </div>
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in">2. Types of Cookies We Use</h2>
              <p className="leading-relaxed">
                We use essential cookies for site functionality, analytics cookies to track usage, and marketing cookies to personalize ads.
              </p>
            </div>
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in">3. Managing Cookies</h2>
              <p className="leading-relaxed">
                You can disable cookies in your browser settings, but this may affect your experience on GameZone.
              </p>
            </div>
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in">4. Third-Party Cookies</h2>
              <p className="leading-relaxed">
                We may use third-party services (e.g., Google Analytics) that set cookies to analyze site performance.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in">5. Updates to This Policy</h2>
              <p className="leading-relaxed">
                We may update our cookie policy. Check this page for changes. Last updated: May 10, 2025.
              </p>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
      `}</style>
    </div>
  );
}

export default CookiePolicy;