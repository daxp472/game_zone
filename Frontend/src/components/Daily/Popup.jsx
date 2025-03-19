import React, { useEffect, useState } from 'react';
import { FaCoins, FaMoneyBill, FaGift, FaHistory } from 'react-icons/fa';
import { GiSwipeCard } from 'react-icons/gi';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Popup() {
  const [userData, setUserData] = useState(null);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [rewardHistory, setRewardHistory] = useState([]);
  const email = user?.email;

  const dailyRewards = [
    { day: 1, coins: 30, cash: 0, icon: <FaCoins className="text-yellow-400 text-2xl" /> },
    { day: 2, coins: 40, cash: 0, icon: <FaCoins className="text-yellow-400 text-2xl" /> },
    { day: 3, coins: 0, cash: 10, icon: <FaMoneyBill className="text-green-400 text-2xl" /> },
    { day: 4, coins: 50, cash: 0, icon: <FaCoins className="text-yellow-400 text-2xl" /> },
    { day: 5, coins: 60, cash: 0, icon: <FaCoins className="text-yellow-400 text-2xl" /> },
    { day: 6, coins: 0, cash: 20, icon: <FaMoneyBill className="text-green-400 text-2xl" /> },
    { day: 7, coins: 0, cash: 30, icon: <FaMoneyBill className="text-green-400 text-2xl" /> },
  ];

  const maxStreak = 30;

  // Helper function to add to reward history
  const addToHistory = (type, amount, day) => {
    const newEntry = {
      id: Date.now(),
      type,
      amount,
      day,
      timestamp: new Date().toISOString(),
    };
    setRewardHistory(prev => [newEntry, ...prev.slice(0, 9)]);
    // In a real app, you'd save this to a database
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!email) {
        setError("No user email found");
        setLoading(false);
        return;
      }
      
      try {
        const loginResponse = await axios.post('https://game-zone-reward.onrender.com/reward/login', { email });
        console.log('Login Response:', loginResponse.data);
        setUserData(loginResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error.response?.data || error.message);
        
        if (error.response?.status === 500 && error.response?.data?.error?.includes('duplicate key error')) {
          toast.error('Database error. Please contact support.');
        } else {
          toast.error('Initializing user data...');
          setUserData({
            email,
            dailyStreak: 1,
            totalStreak: 1,
            coin: 0,
            cash: 0,
            roomCards: 0,
            isDailyRewardEligible: true,
            isStreakRewardEligible: false,
            dailyRewardsClaimed: [],
            rewardsClaimed: [],
          });
        }
        setLoading(false);
      }
    };
    
    if (email) {
      fetchUserData();
    }
  }, [email]);

  const handleDailyClaim = async (day) => {
    if (!userData || day !== userData.dailyStreak || !userData.isDailyRewardEligible) {
      toast.error('Not eligible for daily reward');
      return;
    }

    try {
      const response = await axios.patch('https://game-zone-reward.onrender.com/reward/claim-reward', {
        email,
        rewardType: 'daily',
      });
      console.log('Claim Response:', response.data);
      setUserData(response.data);
      
      // Add to history
      const reward = dailyRewards.find(r => r.day === day);
      if (reward.coins > 0) {
        addToHistory('coins', reward.coins, day);
      } else if (reward.cash > 0) {
        addToHistory('cash', reward.cash, day);
      }
      
      toast.success(response.data.message);
    } catch (error) {
      console.error('Claim error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to claim daily reward');
    }
  };

  const handleStreakClaim = async () => {
    if (!userData || !userData.isStreakRewardEligible) {
      toast.error('Not eligible for streak reward');
      return;
    }

    try {
      const response = await axios.patch('https://game-zone-reward.onrender.com/reward/claim-reward', {
        email,
        rewardType: 'streak',
      });
      console.log('Claim Response:', response.data);
      setUserData(response.data);
      
      // Add to history
      const streakDay = userData.totalStreak;
      const cardAmount = { 10: 1, 20: 2, 30: 5 }[streakDay];
      addToHistory('roomCards', cardAmount, streakDay);
      
      toast.success(response.data.message);
    } catch (error) {
      console.error('Claim error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to claim streak reward');
    }
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  if (loading) return <div className="flex justify-center items-center h-64"><div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div></div>;
  
  if (error) return <div className="text-red-500 text-center p-4 bg-red-100 rounded-lg">{error}</div>;

  const progressPercentage = (userData?.totalStreak || 0) / maxStreak * 100;

  return (
    <div className="w-full p-6 bg-gray-900/80 backdrop-blur-md rounded-xl shadow-2xl border border-purple-500/30">
      <h2 className="text-4xl mb-8 font-extrabold text-center animate-pulse bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
        Daily Login Rewards
      </h2>
      
      {/* Currency display */}
      <div className="mt-4 mb-8 flex justify-between text-lg font-bold text-white font-mono bg-gray-800/50 backdrop-blur-md p-4 rounded-lg border border-purple-500/30">
        <p className="flex items-center gap-2 animate-[bounce_2s_infinite]">
          Coins: {userData?.coin || 0} <FaCoins className="text-yellow-400 text-2xl" />
        </p>
        <p className="flex items-center gap-2 animate-[bounce_2s_infinite_0.2s]">
          Cash: {userData?.cash || 0} <FaMoneyBill className="text-green-400 text-2xl" />
        </p>
        <p className="flex items-center gap-2 animate-[bounce_2s_infinite_0.4s]">
          Room Cards: {userData?.roomCards || 0} <GiSwipeCard className="text-red-600 text-2xl" />
        </p>
      </div>
      
      {/* Daily Rewards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
        {dailyRewards.map((dayData, index) => {
          const isCurrentDay = userData?.dailyStreak === dayData.day;
          const isClaimed = Array.isArray(userData?.dailyRewardsClaimed) && userData.dailyRewardsClaimed.includes(dayData.day);
          const isDisabled = !isCurrentDay || isClaimed || !userData?.isDailyRewardEligible;

          return (
            <div
              key={index}
              className={`group relative bg-gray-800/50 backdrop-blur-md rounded-lg p-4 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(147,51,234,0.5)] ${isCurrentDay && !isClaimed ? 'border-2 border-purple-500 animate-pulse' : ''}`}
            >
              <p className="text-red-400 font-semibold">Day {dayData.day}</p>
              <p className="text-lg flex items-center justify-center gap-2">
                {dayData.coins > 0 ? dayData.coins : dayData.cash} {dayData.icon}
              </p>
              <button
                className={`mt-2 w-full py-2 rounded-md text-white font-bold transition-all duration-200 ${isDisabled ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 active:scale-95 shadow-lg'}`}
                onClick={() => handleDailyClaim(dayData.day)}
                disabled={isDisabled}
              >
                {isClaimed ? 'Claimed' : 'Claim'}
              </button>
            </div>
          );
        })}
      </div>
      
      {/* Streak Rewards */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          Streak Rewards
        </h2>
        <button 
          onClick={toggleHistory}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-all"
        >
          <FaHistory /> History
        </button>
      </div>
      
      <div className="relative bg-gray-800 rounded-full h-8 mt-12 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-gradient-x"
          style={{ width: `${progressPercentage}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg drop-shadow">
          {userData?.totalStreak || 0}🔥 Streak
        </div>
        {[
          { milestone: 10, reward: '1' },
          { milestone: 20, reward: '2' },
          { milestone: 30, reward: '5' },
        ].map(({ milestone, reward }) => {
          const rewardsClaimed = Array.isArray(userData?.rewardsClaimed) ? userData.rewardsClaimed : [];
          const isEligible = (userData?.totalStreak || 0) === milestone && !rewardsClaimed.includes(milestone) && userData?.isStreakRewardEligible;
          const isClaimed = rewardsClaimed.includes(milestone);

          return (
            <div
              key={milestone}
              className="absolute top-[-70px] transform -translate-x-1/2"
              style={{ left: `calc(${(milestone / maxStreak) * 100}%)` }}
            >
              <div
                className={`flex bg-gray-800/70 backdrop-blur-md text-white py-3 px-4 rounded-lg shadow-lg border border-purple-500/50 items-center gap-2 transition-all duration-300 ${isEligible ? 'animate-bounce hover:scale-110 cursor-pointer' : isClaimed ? 'opacity-50' : ''}`}
                onClick={isEligible ? handleStreakClaim : null}
              >
                {reward} <GiSwipeCard className="text-red-600 text-2xl" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between text-center mt-4 text-white font-semibold text-lg">
        <div>0🔥</div>
        <div>10🔥</div>
        <div>20🔥</div>
        <div>30🔥</div>
      </div>
      
      {/* History panel */}
      {showHistory && (
        <div className="mt-8 bg-gray-800/70 backdrop-blur-md rounded-lg p-4 border border-purple-500/30">
          <h3 className="text-2xl font-bold text-purple-400 mb-4">Reward History</h3>
          {rewardHistory.length > 0 ? (
            <div className="space-y-2">
              {rewardHistory.map(entry => (
                <div key={entry.id} className="flex justify-between items-center bg-gray-700/50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    {entry.type === 'coins' && <FaCoins className="text-yellow-400" />}
                    {entry.type === 'cash' && <FaMoneyBill className="text-green-400" />}
                    {entry.type === 'roomCards' && <GiSwipeCard className="text-red-600" />}
                    <span className="text-white">
                      Received {entry.amount} {entry.type} 
                      {entry.day ? ` (Day ${entry.day})` : ''}
                    </span>
                  </div>
                  <div className="text-gray-400 text-sm">
                    {new Date(entry.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center">No reward history yet</p>
          )}
        </div>
      )}
      
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick draggable />
    </div>
  );
}

export default Popup;