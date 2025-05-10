import React from 'react';
import LandingNavbar from '../../components/LandingNavbar';
import LandingFooter from '../../components/LandingFooter';

function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-[#0f0c29] to-[#302b63]">
      <LandingNavbar />
      <main className="flex-grow">
        <section className="relative px-6 py-24 md:px-20 md:py-32 text-center">
          <div className="relative container mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-fade-in">
              Privacy Policy
            </h1>
            <p className="mt-6 text-xl text-gray-200 max-w-3xl mx-auto animate-fade-in delay-100">
              At GameZone, we value your privacy. Learn how we collect, use, and protect your personal information.
            </p>
          </div>
        </section>

        <section className="px-6 py-20 md:px-20 bg-gradient-to-b from-[#0f0c29] to-gray-900">
          <div className="container mx-auto max-w-4xl text-gray-200">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in">1. Information We Collect</h2>
              <p className="leading-relaxed">
                We collect information you provide directly, such as your name, email, and gaming preferences, when you register or participate in tournaments. We also collect usage data, like IP addresses and device information, to enhance your experience.
              </p>
            </div>
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in">2. How We Use Your Information</h2>
              <p className="leading-relaxed">
                Your data helps us personalize your gaming experience, manage tournaments, and send you updates about GameZone. We may use aggregated data for analytics to improve our platform.
              </p>
            </div>
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in">3. Data Protection</h2>
              <p className="leading-relaxed">
                We use industry-standard encryption and security measures to protect your data. However, no system is 100% secure, and we encourage you to use strong passwords.
              </p>
            </div>
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in">4. Your Rights</h2>
              <p className="leading-relaxed">
                You can access, update, or delete your personal information via your account settings. Contact us at support@gamezone.com for assistance or to opt out of communications.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in">5. Updates to This Policy</h2>
              <p className="leading-relaxed">
                We may update this policy periodically. Check this page for the latest version. Last updated: May 10, 2025.
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

export default PrivacyPolicy;