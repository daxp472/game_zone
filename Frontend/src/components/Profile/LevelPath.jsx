import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import GameNavbar from '../../components/GameNavbar';
import axios from 'axios';
import { FaCoins, FaMoneyBillWave, FaCreditCard } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// XP Thresholds for Levels (Up to Level 50)
const xpThresholds = [
  0, 100, 400, 1000, 3000, 6000, 10000, 15000, 21000, 28000,
  36000, 45000, 55000, 66000, 78000, 91000, 105000, 120000, 136000, 153000,
  171000, 190000, 210000, 231000, 253000, 276000, 300000, 325000, 351000, 378000,
  406000, 435000, 465000, 496000, 528000, 561000, 595000, 630000, 666000, 703000,
  741000, 780000, 820000, 861000, 903000, 946000, 990000, 1035000, 1081000, 1128000
];

// Level Rewards (Coins, Cash, Room Cards)
const levelRewards = xpThresholds.map((_, index) => {
  const level = index + 1;
  if (level % 5 === 0) return { level, type: 'roomCards', amount: Math.floor(level / 5) };
  if (level % 3 === 0) return { level, type: 'cash', amount: Math.floor(level / 3) * 5 };
  return { level, type: 'coins', amount: level * 10 };
});

const XP_API_URL = 'https://game-zone-xp-and-stats.onrender.com/api';
const REWARD_API_URL = 'https://game-zone-reward.onrender.com/api';

const LevelPath = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [currentXP, setCurrentXP] = useState(0);
    const [currentLevel, setCurrentLevel] = useState(1);
    const [collectedRewards, setCollectedRewards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const email = user?.email || localStorage.getItem('email');
                if (!email) throw new Error('No email found');

                // Fetch XP and Level
                const xpResponse = await axios.get(`${XP_API_URL}/xp/${email}`);
                setCurrentXP(xpResponse.data.xp || 0); // Fixed: xpAmount
                setCurrentLevel(xpResponse.data.level || 1);

                // Fetch Reward Data
                const rewardResponse = await axios.get(`${REWARD_API_URL}/reward/user/${email}`);
                setCollectedRewards(rewardResponse.data.collectedLevelRewards || []);
            } catch (error) {
                console.error('Failed to fetch data:', error);
                toast.error('Failed to load data!');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user]);

    const getLevelProgressPercentage = (xp, level) => {
        const requiredXP = xpThresholds[level - 1];
        return Math.min((xp / requiredXP) * 100, 100);
    };

    const handleCollectReward = async (level) => {
        if (!collectedRewards.includes(level) && level <= currentLevel) {
            try {
                const email = user?.email || localStorage.getItem('email');
                const reward = levelRewards[level - 1];
                const response = await axios.patch(`${REWARD_API_URL}/reward/collect-level-reward`, {
                    email,
                    level,
                    rewardType: reward.type,
                    amount: reward.amount,
                });
                setCollectedRewards([...collectedRewards, level]);
                toast.success(`Collected ${reward.amount} ${reward.type} for Level ${level}!`);
            } catch (error) {
                console.error('Failed to collect reward:', error.response?.data || error.message);
                toast.error('Error collecting reward!');
            }
        }
    };

    const levelData = xpThresholds.map((xp, index) => ({
        level: index + 1,
        xp,
    }));

    const renderRewardIcon = (type) => {
        switch (type) {
            case 'coins': return <FaCoins className="text-yellow-400" />;
            case 'cash': return <FaMoneyBillWave className="text-green-400" />;
            case 'roomCards': return <FaCreditCard className="text-blue-400" />;
            default: return null;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white text-2xl animate-pulse">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
            <GameNavbar />
            <div className="container mx-auto px-4 py-8">
                <button
                    className="mb-6 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                    onClick={() => navigate(-1)}
                >
                    ← Back to Menu
                </button>
                <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent animate-fade-in">
                    Your Level Odyssey
                </h1>
                <div className="bg-gray-800 rounded-2xl p-8 mb-10 shadow-xl border border-purple-600 animate-slide-up">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <h2 className="text-4xl font-bold text-yellow-400 drop-shadow-md">Level {currentLevel}</h2>
                            <p className="text-2xl text-gray-200 mt-2">Total XP: {currentXP}</p>
                        </div>
                        <div className="w-full md:w-2/3">
                            <div className="bg-gray-700 h-6 rounded-full overflow-hidden shadow-inner">
                                <div
                                    className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 h-full transition-all duration-700 ease-out"
                                    style={{ width: `${getLevelProgressPercentage(currentXP, currentLevel)}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-300 mt-2 text-right">
                                {currentXP}/{xpThresholds[currentLevel - 1]} XP
                            </p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {levelData.map((levelData, index) => (
                        <div
                            key={index}
                            className={`p-5 rounded-xl shadow-lg transform transition-all duration-300 ${
                                levelData.level <= currentLevel
                                    ? 'bg-gradient-to-br from-green-600 to-teal-600'
                                    : levelData.level === currentLevel + 1
                                    ? 'bg-gradient-to-br from-blue-600 to-indigo-600 animate-pulse'
                                    : 'bg-gray-800 opacity-80'
                            } hover:scale-105 hover:shadow-2xl`}
                        >
                            <h3 className="text-2xl font-semibold text-white drop-shadow-sm">Level {levelData.level}</h3>
                            <p className="text-gray-200">XP: {levelData.xp}</p>
                            <div className="mt-3 h-3 bg-gray-600 rounded-full overflow-hidden">
                                <div
                                    className="bg-yellow-400 h-full rounded-full transition-all duration-500"
                                    style={{ width: `${getLevelProgressPercentage(currentXP, levelData.level)}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-300 mt-1">
                                {Math.min(currentXP, levelData.xp)}/{levelData.xp}
                            </p>
                            <div className="mt-3 flex items-center gap-2">
                                <span>{renderRewardIcon(levelRewards[index].type)}</span>
                                <p className="text-sm text-gray-100">
                                    {levelRewards[index].amount} {levelRewards[index].type}
                                </p>
                            </div>
                            <button
                                className={`mt-2 w-full py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                                    levelData.level <= currentLevel && !collectedRewards.includes(levelData.level)
                                        ? 'bg-orange-500 hover:bg-orange-600 text-white'
                                        : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                                }`}
                                onClick={() => handleCollectReward(levelData.level)}
                                disabled={levelData.level > currentLevel || collectedRewards.includes(levelData.level)}
                            >
                                {collectedRewards.includes(levelData.level) ? 'Collected' : 'Collect'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover />
        </div>
    );
};

export default LevelPath;