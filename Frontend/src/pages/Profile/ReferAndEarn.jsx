import React, { useState, useEffect } from 'react';
import GameNavbar from '../../components/GameNavbar';
import ProfileSidebar from '../../components/Profile/Profile-Sidebar';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import Footer from '../../components/Footer';
import { FaGift, FaRegClock } from 'react-icons/fa';

const ReferAndEarn = () => {
    const [countdown, setCountdown] = useState('');

    useEffect(() => {
        const targetDate = new Date('2025-04-01T00:00:00'); // Set your target date and time here

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
        <div className="min-h-screen bg-gray-900 text-white">
            <GameNavbar />
            <ProfileHeader />
            <div className="flex ml-5 mt-5">
                <div>
                    <ProfileSidebar />
                </div>
                <main className="flex-grow p-6 ml-10">
                    <h1 className="text-3xl font-bold mb-6">Refer & Earn</h1>
                    <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-6 rounded-lg text-center shadow-lg">
                        <FaGift className="text-5xl text-yellow-400 mb-4 mx-auto" />
                        <h2 className="text-2xl font-bold mb-2">Feature Coming Soon!</h2>
                        <p className="mb-4">We're excited to announce that our Refer & Earn feature will be available soon. We appreciate your support and patience during this time.</p>
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 p-4 rounded-lg inline-block mb-4 text-white shadow-md">
                            <FaRegClock className="inline-block mr-2" />
                            {countdown}
                        </div>
                        <p>Stay tuned and continue supporting us. We will make sure to reward those who stand by us during this period.</p>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default ReferAndEarn;
