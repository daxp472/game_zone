import React, { useState, useEffect } from 'react';
import GameNavbar from '../../components/GameNavbar';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';
import { FaClock, FaRegClock } from 'react-icons/fa';

const Friends = () => {
    const [countdown, setCountdown] = useState('');

    useEffect(() => {
        const targetDate = new Date('2025-03-10T00:00:00'); 

        const updateCountdown = () => {
            const now = new Date();
            const timeLeft = targetDate - now;

            if (timeLeft <= 0) {
                setCountdown('Available now!');
                clearInterval(timer);
            } else {
                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
                const seconds = Math.floor((timeLeft / 1000) % 60);

                setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            }
        };

        const timer = setInterval(updateCountdown, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="overflow-hidden">
            <GameNavbar />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            >
                <div className="text-center m-5 ml-10 mb-8">
                    <h1 className="text-6xl font-bold mb-4">Friends System - Coming Soon!</h1>
                    <p className="text-lg">Upcoming on: <strong>10 March 2025</strong></p>
                    <p className="text-lg">Almost work is done, now testing phase, and some final implementation is ongoing. Please stay connected with us!</p>
                    <p className="text-lg">Get ready to experience the ultimate friends system, where you can connect with your friends, share your thoughts, and make new memories.</p>
                </div>
                <div className="bg-gray-800 p-8 rounded-md shadow-md text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <FaRegClock className="text-white text-4xl mr-4" />
                        <h2 className="text-3xl font-semibold">Feature Launches in:</h2>
                    </div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 p-4 rounded-lg inline-block mb-4 text-white shadow-md">
                        <FaRegClock className="inline-block mr-2" />
                        {countdown}
                    </div>
                    <div className="text-lg font-bold bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-lg inline-block mb-4 text-white shadow-md">
                        <FaRegClock className="inline-block mr-2" />
                        Stay tuned for more updates!
                    </div>
                </div>
                <div className="bg-gray-800 p-8 rounded-md shadow-md text-center mb-8">
                    <h2 className="text-3xl font-semibold mb-4">What to Expect</h2>
                    <ul className="list-disc text-lg">
                        <li>Connect with your friends and family</li>
                        <li>Share your thoughts and feelings</li>
                        <li>Make new memories and experiences</li>
                        <li>Get notified about upcoming events and activities</li>
                    </ul>
                </div>
            </motion.div>
            <Footer />
        </div>
    );
};

export default Friends;