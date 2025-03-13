import React, { useEffect, useState } from 'react';
import { FaCoins, FaMoneyBill } from 'react-icons/fa';
import { GiSwipeCard } from 'react-icons/gi';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

function Popup() {
  const [userData, setUserData] = useState(null);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const username = user.username;

  const dailyRewards = [
    { day: 1, coins: 30, cash: 0, icon: <FaCoins className="text-yellow-500 text-2xl" /> },
    { day: 2, coins: 40, cash: 0, icon: <FaCoins className="text-yellow-500 text-2xl" /> },
    { day: 3, coins: 0, cash: 10, icon: <FaMoneyBill className="text-green-500 text-2xl" /> },
    { day: 4, coins: 50, cash: 0, icon: <FaCoins className="text-yellow-500 text-2xl" /> },
    { day: 5, coins: 60, cash: 0, icon: <FaCoins className="text-yellow-500 text-2xl" /> },
    { day: 6, coins: 0, cash: 20, icon: <FaMoneyBill className="text-green-500 text-2xl" /> },
    { day: 7, coins: 0, cash: 30, icon: <FaMoneyBill className="text-green-500 text-2xl" /> },
  ];

  const maxStreak = 30;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await axios.post('http://localhost:5000/reward/login', { username });
        const response = await axios.get(`http://localhost:5000/reward/user/${username}`);
        setUserData(response.data);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };
    fetchUserData();
  }, [username]);

  const handleDailyClaim = async (day) => {
    if (!userData || day !== userData.dailyStreak || !userData.isDailyRewardEligible) return;

    try {
      const response = await axios.patch('http://localhost:5000/reward/claim-reward', {
        username,
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
      const response = await axios.patch('http://localhost:5000/reward/claim-reward', {
        username,
        rewardType: 'streak',
      });
      setUserData(response.data);
      alert(response.data.message);
    } catch (error) {
      console.error('Error claiming streak reward:', error);
      alert('Failed to claim streak reward.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!userData) return <div>No user data available.</div>;

  const progressPercentage = (userData.totalStreak / maxStreak) * 100;

  return (
    <div className="w-full p-10 px-16 bg-[#13141f] rounded-lg shadow-lg text-white text-[1rem]">
      <h2 className="text-4xl mb-8 font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
        Daily Login Rewards
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 mb-6">
        {dailyRewards.map((dayData, index) => {
          const isCurrentDay = userData.dailyStreak === dayData.day;
          const isClaimed = Array.isArray(userData.dailyRewardsClaimed) && userData.dailyRewardsClaimed.includes(dayData.day);
          const isDisabled = !isCurrentDay || isClaimed || !userData.isDailyRewardEligible;

          return (
            <div key={index} className="bg-white text-black rounded-lg p-3 text-center w-full font-bold">
              <p className="text-red-500">Day {dayData.day}</p>
              <p className="text-lg flex items-center justify-center">
                {dayData.coins > 0 ? dayData.coins : dayData.cash} {dayData.icon}
              </p>
              <button
                className={`px-3 py-1 rounded-md mt-2 w-full ${isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-500 hover:bg-[#7e22ce]'
                  } text-white`}
                onClick={() => handleDailyClaim(dayData.day)}
                disabled={isDisabled}
              >
                {isClaimed ? 'Claimed' : 'Claim'}
              </button>
            </div>
          );
        })}
      </div>

      <h2 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
        Streak Rewards
      </h2>

      <div className="relative bg-gray-700 rounded-md h-6 mt-20 font-bold">
        <div
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-full"
          style={{ width: `${progressPercentage}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-white">
          {userData.totalStreak}🔥 Streak
        </div>

        {[
          { milestone: 10, reward: '1' },
          { milestone: 20, reward: '2' },
          { milestone: 30, reward: '5' },
        ].map(({ milestone, reward }) => {
          const rewardsClaimed = Array.isArray(userData.rewardsClaimed) ? userData.rewardsClaimed : [];
          const isEligible =
            userData.totalStreak === milestone &&
            !rewardsClaimed.includes(milestone) &&
            userData.isStreakRewardEligible;
          const isClaimed = rewardsClaimed.includes(milestone);

          return (
            <div
              key={milestone}
              className="absolute top-[-60px] transform -translate-x-1/2"
              style={{ left: `calc(${(milestone / maxStreak) * 100}%)` }}
            >
              <div
                className={`flex bg-white text-black py-4 rounded-md shadow-md w-20 justify-center items-center text-center text-lg ${isEligible ? 'animate-shake cursor-pointer' : isClaimed ? 'opacity-50' : ''
                  }`}
                onClick={isEligible ? handleStreakClaim : null}
              >
                {reward} <GiSwipeCard className="text-red-900 text-2xl" />
              </div>
              <div className={`absolute w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white top-full left-1/2 transform -translate-x-1/2 ${ isClaimed ? 'opacity-50' : ''
                }`}></div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between text-center mt-3 text-white font-bold text-lg">
        <div>0🔥</div>
        <div>10🔥</div>
        <div>20🔥</div>
        <div>30🔥</div>
      </div>

      <div className="mt-4 text-center flex text-lg justify-between font-bold font-mono">
        <p className='flex gap-2' >Coins: {userData.coin || 0} <FaCoins className="text-yellow-500 text-2xl" /></p>
        <p className='flex gap-2' >Cash: {userData.cash || 0} <FaMoneyBill className="text-green-500 text-2xl" /></p>
        <p className='flex gap-2' >Room Cards: {userData.roomCards || 0} <GiSwipeCard className="text-red-900 text-2xl" /></p>
      </div>
    </div>
  );
}

export default Popup;