import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import GameNavbar from '../../components/GameNavbar';
import Footer from '../../components/Footer';
import { FaClock, FaRegClock } from 'react-icons/fa';

const GameAngryBird = () => {
    const navigate = useNavigate();
    const { user } = useAuth();  // Fixed the useContext issue
    const username = user ? user.username : 'User';

    const handleBackButton = () => {
        navigate(-1);
    };

    const [countdown, setCountdown] = useState('');

    useEffect(() => {
        const targetDate = new Date('2025-03-05T00:00:00');

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
        <div>
            <GameNavbar />
            <div className="container mx-auto p-4 ">
                <div className="justify-start">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                        onClick={() => navigate(-1)}
                    >
                        ← Back to Menu
                    </button>
                </div>
                <div className="bg-gradient-to-t from-[#6c5ce7] to-[#a29bfe] flex flex-col items-center justify-center m-10 rounded-3xl shadow-2xl shadow-[#6c5ce7] hover:shadow-[#a29bfe] transition-all duration-200 transform hover:scale-105">
                    <h1 className="text-4xl text-[#ffffff] font-bold mt-5 mb-4">Game Coming Soon!</h1>
                    <p className="text-xl text-[#ffffff] m-8 mb-4">
                        Stay connected, {username}! Our game is launching on 5th March.
                        <strong className="text-[#ffd700]"> Please wait, the game is on its way!</strong>
                    </p>
                    <div className="flex items-center justify-center mb-4">
                        <FaRegClock className="text-[#ffffff] text-4xl mr-4" />
                        <h2 className="text-3xl text-[#ffffff] font-semibold">Feature Launches in:</h2>
                        <div className="flex items-center justify-center mb-4"></div>
                    </div>
                    <div className="text-2xl font-bold mb-5 text-[#ffffff] bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] p-4 rounded-lg inline-block mb-4 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                        <FaClock className="inline-block mr-2" />
                        {countdown}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default GameAngryBird;
