import React, { useState, useEffect } from 'react';
import GameNavbar from '../../components/GameNavbar';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';
import { FaCoins, FaMoneyBill, FaRegClock } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';


const CoinStore = () => {
    const [coins, setCoins] = useState(0);
    const [cash, setCash] = useState(0);
    const [countdown, setCountdown] = useState('');



    useEffect(() => {
        const targetDate = new Date('2025-03-15T00:00:00'); // Set your target date and time here

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
                className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            >
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-5xl font-bold">Coin Store</h1>
                    <div className="flex items-center">
                        <div className="mr-4">
                            <div className="flex items-center bg-gray-800 p-2 rounded-full">
                                <FaCoins className="text-yellow-500" />
                                <p className="ml-2">{coins}</p>
                            </div>
                        </div>
                        <div className="mr-4">
                            <div className="flex items-center bg-gray-800 p-2 rounded-full">
                                <FaMoneyBill className="text-green-500" />
                                <p className="ml-2">${cash}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-800 p-6 rounded-md shadow-md mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <IoMdTime className="text-blue-500" />
                        <p className="ml-2">Store Opens in:</p>
                    </div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 p-4 rounded-lg inline-block mb-4 text-white shadow-md">
                        <FaRegClock className="inline-block mr-2" />
                        {countdown}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Example products - you can customize this list */}
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="bg-gray-800 p-6 rounded-md shadow-md hover:scale-105 transition duration-300"
                    >
                        <h2 className="text-2xl font-semibold mb-2">100 Coins</h2>
                        <p className="text-gray-400 mb-4">$0.99</p>
                        <button
                            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition duration-300"
                        >
                            Buy Now
                        </button>
                    </motion.div>
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className="bg-gray-800 p-6 rounded-md shadow-md hover:scale-105 transition duration-300"
                    >
                        <h2 className="text-2xl font-semibold mb-2">500 Coins</h2>
                        <p className="text-gray-400 mb-4">$4.99</p>
                        <button
                            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition duration-300"
                        >
                            Buy Now
                        </button>
                    </motion.div>
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.9 }}
                        className="bg-gray-800 p-6 rounded-md shadow-md hover:scale-105 transition duration-300"
                    >
                        <h2 className="text-2xl font-semibold mb-2">1000 Coins</h2>
                        <p className="text-gray-400 mb-4">$9.99</p>
                        <button
                            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition duration-300"
                        >
                            Buy Now
                        </button>
                    </motion.div>
                    {/* Add more products as needed */}
                </div>
            </motion.div>
            <Footer />
        </div>
    );
};

export default CoinStore;