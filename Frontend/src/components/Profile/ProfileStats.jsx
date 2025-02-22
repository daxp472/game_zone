import React from 'react';
import { FaTrophy, FaChartLine, FaCoins } from 'react-icons/fa';

const ProfileStats = ({ stats }) => {
    return (
        <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold">Total Matches</h3>
                    <p className="text-2xl">{stats.totalMatches}</p>
                </div>
                <FaTrophy className="text-yellow-500 text-3xl" />
            </div>
            <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold">Win Rate</h3>
                    <p className="text-2xl">{stats.winRate}%</p>
                </div>
                <FaChartLine className="text-green-500 text-3xl" />
            </div>
            <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold">Total Points</h3>
                    <p className="text-2xl">{stats.totalPoints}</p>
                </div>
                <FaCoins className="text-yellow-500 text-3xl" />
            </div>
        </div>
    );
};

export default ProfileStats;
