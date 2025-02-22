import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import GameNavbar from '../../components/GameNavbar';
import Footer from '../../components/Footer';
import Leaderboard from '../../components/Leaderboard';
import ProTips from './Game-Components/ProTips';
import Popup from './Game-Components/Popup';
import { useAuth } from '../../contexts/AuthContext';

dayjs.extend(duration);

const FlappyBird = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const eventTime = dayjs('2025-02-25T09:00:00');
    const [countDown, setCountDown] = useState(dayjs.duration(eventTime.diff(dayjs())));
    const [showPopup, setShowPopup] = useState(true);

    useEffect(() => {
        const updateTimer = () => {
            const remaining = dayjs.duration(eventTime.diff(dayjs()));
            if (remaining.asMilliseconds() <= 0) {
                setCountDown(dayjs.duration(0));
                setShowPopup(false);
            } else {
                setCountDown(remaining);
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 to-purple-700 text-white">
            <GameNavbar />
            <div className="flex flex-col items-center justify-center flex-grow p-6 text-center">
                <div className="flex w-full justify-between items-center">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                        onClick={() => navigate(-1)}
                    >
                        ← Back to Menu
                    </button>
                    <div className="text-lg font-semibold bg-black/50 px-4 py-2 rounded-lg">
                        {countDown.days()}d {countDown.hours()}h {countDown.minutes()}m {countDown.seconds()}s
                    </div>
                </div>
                <h1 className="text-4xl font-bold mt-6">Welcome to Flappy Bird Game</h1>
                {user && <p className="text-gray-200 mt-2">Logged in as: <span className="font-semibold">{user.name}</span></p>}

                <div className="flex flex-col md:flex-row justify-between w-full mt-6">
                    <div className="bg-black/30 p-4 rounded-lg flex-1 mr-3">
                        <h2 className="text-xl font-semibold">Launch Date</h2>
                        <p className="text-lg">25th February 2025, 9:00 AM</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-xl p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                🏆 Leaderboard
                            </h2>
                            <div className="h-20 overflow-y-auto">
                                <Leaderboard
                                    gameId="Flappy-Bird"             
                                    username={user.username}  
                                    // currentScore={score}  
                                />
                            </div>
                        </div>
                </div>

                <div className="mr-5 pr-10">
                    <ProTips className="mt-6" />
                </div>


                {showPopup && countDown.asMilliseconds() > 0 && (
                    <Popup onClose={() => setShowPopup(false)}>
                        <h2 className="text-xl font-bold">Game is Coming Soon!</h2>
                        <p className="text-gray-200 mt-2">
                            Countdown: <span className="font-semibold">
                                {countDown.days()}d {countDown.hours()}h {countDown.minutes()}m {countDown.seconds()}s
                            </span>
                        </p>
                    </Popup>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default FlappyBird;
