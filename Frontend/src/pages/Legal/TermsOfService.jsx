import React from 'react';
import LandingNavbar from '../../components/LandingNavbar';
import LandingFooter from '../../components/LandingFooter';

function TermsOfService() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-[#0f0c29] to-[#302b63]">
      <LandingNavbar />
      <main className="flex-grow">
        <section className="relative px-6 py-24 md:px-20 md:py-32 text-center">
          <div className="relative container mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-fade-in">
              Terms of Service
            </h1>
            <p className="mt-6 text-xl text-gray-200 max-w-3xl mx-auto animate-fade-in delay-100">
              Welcome to GameZone! These terms govern your use of our platform and services.
            </p>
          </div>
        </section>

        <section className="px-6 py-20 md:px-20 bg-gradient-to-b from-[#0f0c29] to-gray-900">
          <div className="container mx-auto max-w-4xl text-gray-200">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By using GameZone, you agree to these Terms of Service. If you do not agree, please do not use our platform.
              </p>
            </div>
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in">2. Account Responsibilities</h2>
              <p className="leading-relaxed">
                You are responsible for maintaining the confidentiality of your account and password. Notify us immediately of any unauthorized use at support@gamezone.com.
              </p>
            </div>
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in">3. User Conduct</h2>
              <p className="leading-relaxed">
                Do not engage in cheating, harassment, or any illegal activities on GameZone. We reserve the right to suspend or terminate accounts for violations.
              </p>
            </div>
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in">4. Intellectual Property</h2>
              <p className="leading-relaxed">
                All content on GameZone, including logos and game assets, is owned by GameZone or its licensors. Do not reproduce or distribute without permission.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in">5. Termination</h2>
              <p className="leading-relaxed">
                We may terminate your access to GameZone for violations of these terms. Contact us at support@gamezone.com for appeals. Last updated: May 10, 2025.
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

export default TermsOfService;