import React from 'react';
import { useForm } from '@formspree/react';
import { FaFacebook, FaTwitter, FaInstagram, FaDiscord } from 'react-icons/fa';
import LandingNavbar from '../components/LandingNavbar';
import LandingFooter from '../components/LandingFooter';
import Mega from '../assets/contact-hero.png';

function ContactUs() {
  const [state, handleSubmit] = useForm("xqaebyqk");

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <LandingNavbar />
      <main className="flex-grow">
        <section className="relative px-20 py-32 text-center max-md:px-5">
          <img
            src={Mega}
            alt="Contact hero background"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="relative container mx-auto">
            <h1 className="text-5xl font-extrabold text-white animate-fade-in">Contact Us</h1>
            <p className="mt-6 text-xl text-gray-200 max-w-2xl animate-fade-in delay-100">
              Get in touch with our gaming community support team for any questions or assistance.
            </p>
            <div className="flex gap-4 mt-8 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:scale-105 transition-transform duration-300" onClick={() => window.location.href = '/login'}>
                Join Now
              </button>
              <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full hover:scale-105 transition-transform duration-300" onClick={() => window.location.href = '/download'}>
                Download Mobile App
              </button>
            </div>
          </div>
        </section>

        <section className="px-20 py-24 max-md:px-5">
          <div className="container mx-auto grid grid-cols-3 gap-8 max-md:grid-cols-1">
            <div className="p-8 bg-gray-800 rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg">
              <h3 className="text-xl font-bold text-white">Our Location</h3>
              <p className="mt-4 text-gray-200">123 Gaming Street<br />New York, NY 10001</p>
            </div>
            <div className="p-8 bg-gray-800 rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg">
              <h3 className="text-xl font-bold text-white">Phone Number</h3>
              <p className="mt-4 text-gray-200">+1 (555) 123-4567<br />Mon-Fri 9:00-18:00</p>
            </div>
            <div className="p-8 bg-gray-800 rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg">
              <h3 className="text-xl font-bold text-white">Email Us</h3>
              <p className="mt-4 text-gray-200">gamezonehq123@gmail.com<br />info@gamezone.com</p>
            </div>
          </div>
        </section>

        <section className="px-20 py-24 bg-gradient-to-b from-gray-900 to-[#1a1b26] max-md:px-5">
          <div className="container mx-auto">
            <h2 className="text-4xl font-extrabold text-white text-center">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="mt-12 max-w-2xl mx-auto">
              <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="px-4 py-4 bg-gray-800 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none text-gray-200"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="px-4 py-4 bg-gray-800 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none text-gray-200"
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                className="mt-6 w-full px-4 py-4 bg-gray-800 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none text-gray-200"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                required
                className="mt-6 w-full px-4 py-4 bg-gray-800 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none text-gray-200 h-40"
              />
              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:scale-105 transition-transform duration-300"
                >
                  {state.submitting ? "Sending..." : "Send Message"}
                </button>
              </div>
              {state.succeeded && (
                <p className="mt-4 text-center text-green-500">Thanks for your message!</p>
              )}
            </form>
          </div>
        </section>

        <section className="px-20 py-24 text-center max-md:px-5">
          <h2 className="text-4xl font-extrabold text-white">Connect With Us</h2>
          <div className="flex justify-center gap-8 mt-12">
            <a href="#" aria-label="Facebook" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
              <FaFacebook size={40} />
            </a>
            <a href="#" aria-label="Twitter" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
              <FaTwitter size={40} />
            </a>
            <a href="#" aria-label="Instagram" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
              <FaInstagram size={40} />
            </a>
            <a href="#" aria-label="Discord" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
              <FaDiscord size={40} />
            </a>
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
          animation: fade-in 0.5s ease-out;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
      `}</style>
    </div>
  );
}

export default ContactUs;