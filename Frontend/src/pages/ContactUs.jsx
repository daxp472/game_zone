import React, { useState } from 'react';
import { useForm } from '@formspree/react';
import LandingNavbar from '../components/LandingNavbar';
import LandingFooter from '../components/LandingFooter';
import Mega from '../assets/contact-hero.png'

function ContactUs() {
  const [state, handleSubmit] = useForm("xqaebyqk");

  return (
    <div>
      <LandingNavbar />

    <div className="flex flex-col w-full bg-gray-900">
      <div className="flex flex-col mt-0 w-full text-center text-white">
        <div className="flex relative flex-col px-20 w-full min-h-[400px] max-md:px-5">
          <img
            loading="lazy"
            src={Mega}
            alt="Contact hero background"
            className="object-cover absolute inset-0 size-full"
          />
          <div className="flex relative flex-col justify-center items-center px-20 py-36 bg-black bg-opacity-50 max-md:px-5 max-md:py-24">
            <div className="flex flex-col mb-0 max-w-full w-[584px]">
              <h1 className="self-center text-5xl font-bold leading-none max-md:text-4xl">
                Contact Us
              </h1>
              <p className="mt-10 text-xl leading-5">
                Get in touch with our gaming community support team for
                any questions or assistance
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center px-20 py-16 w-full max-md:px-5">
        <div className="flex flex-col px-4 w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-1/3 max-md:w-full">
              <div className="flex flex-col grow px-8 pt-16 pb-8 text-base text-center text-gray-400 bg-gray-800 rounded-xl max-md:px-5">
                <h2 className="px-16 pt-0.5 pb-2.5 text-xl font-bold text-white max-md:px-5">
                  Our Location
                </h2>
                <p className="px-16 py-1.5 mt-2 max-md:px-5">123 Gaming Street</p>
                <p className="px-16 py-1.5 max-md:px-5">New York, NY 10001</p>
              </div>
            </div>

            <div className="flex flex-col w-1/3 max-md:w-full">
              <div className="flex flex-col grow px-8 pt-16 pb-8 text-base text-center text-gray-400 bg-gray-800 rounded-xl max-md:px-5">
                <h2 className="px-16 pt-0.5 pb-3 text-xl font-bold text-white max-md:px-5">
                  Phone Number
                </h2>
                <p className="px-16 py-1.5 mt-2 max-md:px-5">+1 (555) 123-4567</p>
                <p className="px-16 pt-0.5 pb-2.5 max-md:px-5">Mon-Fri 9:00-18:00</p>
              </div>
            </div>

            <div className="flex flex-col w-1/3 max-md:w-full">
              <div className="flex flex-col grow px-8 pt-16 pb-8 text-base text-center text-gray-400 bg-gray-800 rounded-xl max-md:px-5">
                <h2 className="px-16 pt-0.5 pb-2.5 text-xl font-bold text-white max-md:px-5">
                  Email Us
                </h2>
                <p className="px-16 py-1.5 mt-2 max-md:px-5">support@gamezone.com</p>
                <p className="px-16 py-1 max-md:px-5">info@gamezone.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center px-20 py-20 w-full bg-gray-800 max-md:px-5">
        <div className="flex flex-col items-center px-20 max-md:px-5">
          <div className="flex flex-col max-w-full w-[768px]">
            <h2 className="self-center text-3xl font-bold leading-none text-center text-white">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col mt-14 w-full text-base text-gray-400 max-md:mt-10">
              <div className="flex flex-wrap gap-6 max-md:flex-col">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="flex-1 px-4 py-5 bg-gray-900 rounded-lg border border-gray-700"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="flex-1 px-4 py-5 bg-gray-900 rounded-lg border border-gray-700"
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                className="mt-6 px-4 py-5 bg-gray-900 rounded-lg border border-gray-700"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                required
                className="mt-6 px-4 pt-3 pb-28 bg-gray-900 rounded-lg border border-gray-700 resize-none"
              />
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="px-8 py-4 w-44 bg-red-500 rounded-lg text-white hover:bg-red-600 transition-colors"
                >
                  {state.submitting ? "Sending..." : "Send Message"}
                </button>
              </div>
              {state.succeeded && (
                <p className="mt-4 text-center text-green-500">Thanks for your message!</p>
              )}
            </form>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center px-20 py-16 max-md:px-5">
        <div className="flex flex-col px-4">
          <h2 className="self-center text-3xl font-bold leading-none text-center text-white">
            Connect With Us
          </h2>
          <div className="flex justify-center gap-5 mt-11 max-md:mt-10">
            <a href="#" aria-label="Facebook" className="hover:opacity-80 transition-opacity">
              <img
                loading="lazy"
                src="/images/facebook.png"
                alt=""
                className="w-[45px] aspect-[1.25] object-contain"
              />
            </a>
            <a href="#" aria-label="Twitter" className="hover:opacity-80 transition-opacity">
              <img
                loading="lazy"
                src="/images/twitter.png"
                alt=""
                className="w-9 aspect-square object-contain"
              />
            </a>
            <a href="#" aria-label="Instagram" className="hover:opacity-80 transition-opacity">
              <img
                loading="lazy"
                src="/images/instagram.png"
                alt=""
                className="w-[31px] aspect-[0.86] object-contain"
              />
            </a>
            <a href="#" aria-label="Discord" className="hover:opacity-80 transition-opacity">
              <img
                loading="lazy"
                src="/images/discord.png"
                alt=""
                className="w-[41px] aspect-[1.14] object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
    
      <LandingFooter />
    </div>
  );
}

export default ContactUs;
