import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import GameNavbar from '../../components/GameNavbar';
import { getXPFromAPI } from '../Logic/xp';

// XP Thresholds for Levels (Up to Level 50)
const xpThresholds = [
  0, 100, 400, 1000, 3000, 6000, 10000, 15000, 21000, 28000,
  36000, 45000, 55000, 66000, 78000, 91000, 105000, 120000, 136000, 153000,
  171000, 190000, 210000, 231000, 253000, 276000, 300000, 325000, 351000, 378000,
  406000, 435000, 465000, 496000, 528000, 561000, 595000, 630000, 666000, 703000,
  741000, 780000, 820000, 861000, 903000, 946000, 990000, 1035000, 1081000, 1128000
];

const LevelPath = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [currentXP, setCurrentXP] = useState(0);
    const [currentLevel, setCurrentLevel] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchXPAndLevel = async () => {
            try {
                const email = user?.email || localStorage.getItem('email');
                if (email) {
                    const xpData = await getXPFromAPI(email);
                    setCurrentXP(xpData.xpAmount || 0);
                    setCurrentLevel(xpData.level || 1);
                }
            } catch (error) {
                console.error('Failed to fetch XP and Level:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchXPAndLevel();
    }, [user]);

    const getProgressPercentage = (xp, level) => {
        const currentThreshold = xpThresholds[level - 1];
        const nextThreshold = xpThresholds[level] || currentThreshold;
        const xpNeeded = nextThreshold - currentThreshold;
        const xpEarned = xp - currentThreshold;
        return Math.min((xpEarned / xpNeeded) * 100, 100);
    };

    const levelData = xpThresholds.map((xp, index) => ({
        level: index + 1,
        xp,
    }));

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white text-2xl animate-pulse">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
            <GameNavbar />
            <div className="container mx-auto px-4 py-8">
                <button
                    className="mb-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                    onClick={() => navigate(-1)}
                >
                    ← Back to Menu
                </button>
                <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-purple-500 to-orange-500 bg-clip-text text-transparent animate-fade-in">
                    Your Level Journey
                </h1>
                <div className="bg-gray-800 rounded-xl p-6 mb-8 shadow-lg border border-purple-500 animate-slide-up">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl font-bold text-yellow-400">Level {currentLevel}</h2>
                            <p className="text-gray-300 mt-2">XP: {currentXP}</p>
                        </div>
                        <div className="w-full md:w-2/3 mt-4 md:mt-0">
                            <div className="bg-gray-700 h-4 rounded-full overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-green-400 to-blue-500 h-full transition-all duration-500"
                                    style={{ width: `${getProgressPercentage(currentXP, currentLevel)}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-400 mt-1 text-right">
                                {currentXP}/{xpThresholds[currentLevel] || 'Max'}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {levelData.map((levelData, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-lg shadow-md transform transition-all duration-300 ${
                                levelData.level <= currentLevel
                                    ? 'bg-green-600'
                                    : levelData.level === currentLevel + 1
                                    ? 'bg-blue-600 animate-pulse'
                                    : 'bg-gray-700 opacity-75'
                            } hover:scale-105`}
                        >
                            <h3 className="text-xl font-semibold">Level {levelData.level}</h3>
                            <p className="text-gray-200">XP Required: {levelData.xp}</p>
                            <div className="mt-2 h-2 bg-gray-500 rounded-full">
                                <div
                                    className="bg-yellow-400 h-full rounded-full"
                                    style={{
                                        width:
                                            levelData.level <= currentLevel
                                                ? '100%'
                                                : levelData.level === currentLevel + 1
                                                ? `${getProgressPercentage(currentXP, currentLevel)}%`
                                                : '0%',
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LevelPath;