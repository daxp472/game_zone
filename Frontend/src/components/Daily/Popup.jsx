import React, { useEffect, useState } from 'react';
import { FaCoins, FaMoneyBill } from 'react-icons/fa';
import { GiSwipeCard } from 'react-icons/gi';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

function Popup() {
  const [userData, setUserData] = useState(null);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const email = user.email; // username → email

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await axios.post('https://game-zone-reward.onrender.com/reward/login', { email }); // username → email
        const response = await axios.get(`https://game-zone-reward.onrender.com/reward/user/${email}`); // username → email
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };
    fetchUserData();
  }, [email]);

  const handleDailyClaim = async (day) => {
    if (!userData || day !== userData.dailyStreak || !userData.isDailyRewardEligible) return;

    try {
      const response = await axios.patch('https://game-zone-reward.onrender.com/reward/claim-reward', {
        email, // username → email
        rewardType: 'daily',
      });
      setUserData(response.data);
      alert(response.data.message);
    } catch (error) {
      console.error('Error claiming daily reward:', error);
      alert('Failed to claim daily reward.');
    }
  };

  const handleStreakClaim = async () => {
    if (!userData || !userData.isStreakRewardEligible) return;

    try {
      const response = await axios.patch('https://game-zone-reward.onrender.com/reward/claim-reward', {
        email, // username → email
        rewardType: 'streak',
      });
      setUserData(response.data);
      alert(response.data.message);
    } catch (error) {
      console.error('Error claiming streak reward:', error);
      alert('Failed to claim streak reward.');
    }
  };

  if (loading) return <div className="text-white text-center text-2xl">Loading...</div>;
  if (!userData) return <div className="text-white text-center text-2xl">No user data available.</div>;

  const progressPercentage = (userData.totalStreak / maxStreak) * 100;

  return (
    <div className="w-full p-6 bg-gray-900/80 backdrop-blur-md rounded-xl shadow-2xl border border-purple-500/30">
      {/* Heading */}
      <h2 className="text-4xl mb-8 font-extrabold text-center animate-pulse bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
        Daily Login Rewards
      </h2>

      {/* Daily Rewards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
        {dailyRewards.map((dayData, index) => {
          const isCurrentDay = userData.dailyStreak === dayData.day;
          const isClaimed = Array.isArray(userData.dailyRewardsClaimed) && userData.dailyRewardsClaimed.includes(dayData.day);
          const isDisabled = !isCurrentDay || isClaimed || !userData.isDailyRewardEligible;

          return (
            <div
              key={index}
              className={`group relative bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(147,51,234,0.5)] ${isCurrentDay && !isClaimed ? 'border-2 border-purple-500 animate-pulse' : ''}`}
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

      {/* Streak Rewards Heading */}
      <h2 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
        Streak Rewards
      </h2>

      {/* Streak Progress Bar */}
      <div className="relative bg-gray-800 rounded-full h-8 mt-12 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-gradient-x"
          style={{ width: `${progressPercentage}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg drop-shadow">
          {userData.totalStreak}🔥 Streak
        </div>

        {[
          { milestone: 10, reward: '1' },
          { milestone: 20, reward: '2' },
          { milestone: 30, reward: '5' },
        ].map(({ milestone, reward }) => {
          const rewardsClaimed = Array.isArray(userData.rewardsClaimed) ? userData.rewardsClaimed : [];
          const isEligible = userData.totalStreak === milestone && !rewardsClaimed.includes(milestone) && userData.isStreakRewardEligible;
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

      {/* Streak Milestones */}
      <div className="flex justify-between text-center mt-4 text-white font-semibold text-lg">
        <div>0🔥</div>
        <div>10🔥</div>
        <div>20🔥</div>
        <div>30🔥</div>
      </div>

      {/* Stats Section */}
      <div className="mt-8 flex justify-between text-lg font-bold text-white font-mono bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-purple-500/30">
        <p className="flex items-center gap-2 animate-[bounce_2s_infinite]">
          Coins: {userData.coin || 0} <FaCoins className="text-yellow-400 text-2xl" />
        </p>
        <p className="flex items-center gap-2 animate-[bounce_2s_infinite_0.2s]">
          Cash: {userData.cash || 0} <FaMoneyBill className="text-green-400 text-2xl" />
        </p>
        <p className="flex items-center gap-2 animate-[bounce_2s_infinite_0.4s]">
          Room Cards: {userData.roomCards || 0} <GiSwipeCard className="text-red-600 text-2xl" />
        </p>
      </div>
    </div>
  );
}

export default Popup;