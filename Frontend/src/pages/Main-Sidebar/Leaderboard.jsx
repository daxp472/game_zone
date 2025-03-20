import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GameNavbar from '../../components/GameNavbar';
import Footer from '../../components/Footer';
import { FaSearch, FaTrophy } from 'react-icons/fa';

const XP_API_URL = 'https://game-zone-xp-and-stats.onrender.com/api';

const Leaderboard = () => {
    const [players, setPlayers] = useState([]);
    const [searchEmail, setSearchEmail] = useState('');
    const [filteredPlayer, setFilteredPlayer] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const playersPerPage = 100;
    const maxPlayers = 1000;
    const navigate = useNavigate();

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${XP_API_URL}/xp/all`);
            const sortedPlayers = response.data
                .sort((a, b) => b.xp - a.xp)
                .map((player, index) => ({
                    id: index + 1,
                    email: player.email,
                    username: player.username || `Player${index + 1}`,
                    level: player.level || 1,
                    score: player.xp || 0,
                    position: `${index + 1}${getOrdinalSuffix(index + 1)}`,
                    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${player.email}`
                }));
            setPlayers(sortedPlayers);
        } catch (error) {
            console.error('Failed to fetch leaderboard:', error);
            setPlayers(generateFallbackData());
        } finally {
            setLoading(false);
        }
    };

    const getOrdinalSuffix = (n) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return s[(v - 20) % 10] || s[v] || s[0];
    };

    const generateFallbackData = () => [
        { id: 1, username: 'Alex Gaming', level: 50, position: '1st', score: 15000, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
        { id: 2, username: 'Sarah Pro', level: 45, position: '2nd', score: 14500, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
        { id: 3, username: 'Mike Winner', level: 42, position: '3rd', score: 14000, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
        { id: 4, username: 'Lisa Game', level: 40, position: '4th', score: 13500, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa' },
        { id: 5, username: 'John Player', level: 38, position: '5th', score: 13000, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
    ];

    const handleSearch = async () => {
        if (!searchEmail) {
            setFilteredPlayer(null);
            return;
        }
        try {
            const response = await axios.get(`${XP_API_URL}/xp/${searchEmail}`);
            const playerData = response.data;
            const rank = players.findIndex(p => p.email === searchEmail) + 1;
            setFilteredPlayer({
                ...playerData,
                username: playerData.username || 'Unknown',
                position: rank ? `${rank}${getOrdinalSuffix(rank)}` : 'Unranked',
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${searchEmail}`
            });
        } catch (error) {
            console.error('Search failed:', error);
            setFilteredPlayer({ username: 'Not Found', position: 'N/A', level: 0, score: 0 });
        }
    };

    const paginatedPlayers = players.slice((currentPage - 1) * playersPerPage, currentPage * playersPerPage).filter(p => p.id > 3 && p.id <= maxPlayers);
    const totalPages = Math.ceil(Math.min(maxPlayers, players.length) / playersPerPage);

    const topThree = players.slice(0, 3);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#13141f] flex items-center justify-center">
                <div className="text-white text-2xl animate-pulse">Loading Leaderboard...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#13141f] via-[#1a1b26] to-[#2a2b36] flex flex-col text-white">
            <GameNavbar />
            <div className="flex-grow container mx-auto px-4 py-8">
                <button
                    className="mb-6 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                    onClick={() => navigate(-1)}
                >
                    ← Back to Menu
                </button>
                <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent animate-fade-in">
                    Global Leaderboard
                </h1>

                {/* Search Bar */}
                <div className="mb-12 flex justify-center">
                    <div className="relative w-full max-w-md">
                        <input
                            type="email"
                            value={searchEmail}
                            onChange={(e) => setSearchEmail(e.target.value)}
                            placeholder="Search by email..."
                            className="w-full p-3 pl-10 rounded-full bg-[#2a2b36] text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <button
                            onClick={handleSearch}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-1 px-4 rounded-full transition-all duration-200"
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* Search Result */}
                {filteredPlayer && (
                    <div className="mb-12 bg-[#1a1b26] p-6 rounded-xl shadow-lg border border-purple-600 animate-slide-up">
                        <div className="flex items-center space-x-4">
                            <img src={filteredPlayer.avatar} alt={filteredPlayer.username} className="w-12 h-12 rounded-full" />
                            <div>
                                <h3 className="text-xl font-bold text-white">{filteredPlayer.username}</h3>
                                <p className="text-purple-400">Rank: {filteredPlayer.position}</p>
                                <p className="text-gray-300">Level: {filteredPlayer.level} | XP: {filteredPlayer.score}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Podium for Top 3 */}
                <div className="flex justify-center items-end mb-16 h-64 md:h-80">
                    {/* 2nd Place */}
                    {topThree[1] && (
                        <div className="w-1/3 text-center transform transition-all duration-300 hover:scale-105">
                            <div className="bg-gradient-to-t from-[#c0c0c0] to-[#d3d3d3] h-48 rounded-t-lg flex flex-col items-center justify-end pb-4">
                                <img src={topThree[1].avatar} alt={topThree[1].username} className="w-16 h-16 rounded-full mb-2" />
                                <p className="text-lg font-bold text-gray-800">{topThree[1].username}</p>
                                <p className="text-sm text-gray-600">Level {topThree[1].level} | {topThree[1].score} XP</p>
                            </div>
                            <div className="bg-[#c0c0c0] text-gray-800 font-bold py-2">2nd</div>
                        </div>
                    )}
                    {/* 1st Place */}
                    {topThree[0] && (
                        <div className="w-1/3 text-center transform transition-all duration-300 hover:scale-105">
                            <div className="bg-gradient-to-t from-[#ffd700] to-[#ffec8b] h-64 rounded-t-lg flex flex-col items-center justify-end pb-4 relative">
                                <FaTrophy className="absolute top-2 text-yellow-600 text-3xl animate-bounce" />
                                <img src={topThree[0].avatar} alt={topThree[0].username} className="w-20 h-20 rounded-full mb-2" />
                                <p className="text-xl font-bold text-gray-800">{topThree[0].username}</p>
                                <p className="text-sm text-gray-600">Level {topThree[0].level} | {topThree[0].score} XP</p>
                            </div>
                            <div className="bg-[#ffd700] text-gray-800 font-bold py-2">1st</div>
                        </div>
                    )}
                    {/* 3rd Place */}
                    {topThree[2] && (
                        <div className="w-1/3 text-center transform transition-all duration-300 hover:scale-105">
                            <div className="bg-gradient-to-t from-[#cd7f32] to-[#e4a05e] h-40 rounded-t-lg flex flex-col items-center justify-end pb-4">
                                <img src={topThree[2].avatar} alt={topThree[2].username} className="w-16 h-16 rounded-full mb-2" />
                                <p className="text-lg font-bold text-gray-800">{topThree[2].username}</p>
                                <p className="text-sm text-gray-600">Level {topThree[2].level} | {topThree[2].score} XP</p>
                            </div>
                            <div className="bg-[#cd7f32] text-gray-800 font-bold py-2">3rd</div>
                        </div>
                    )}
                </div>

                {/* Rest of the Players */}
                <div className="bg-[#1a1b26] rounded-xl p-6 shadow-lg border border-purple-600">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border-b border-gray-700 text-gray-400 font-medium">
                        <div>Rank</div>
                        <div className="col-span-2">Player</div>
                        <div>Level</div>
                        <div>XP</div>
                    </div>
                    {paginatedPlayers.map((player) => (
                        <div key={player.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border-b border-gray-700 items-center hover:bg-[#2a2b36] transition-all duration-200">
                            <div className="text-gray-300">{player.position}</div>
                            <div className="col-span-2 flex items-center space-x-3">
                                <img src={player.avatar} alt={player.username} className="w-10 h-10 rounded-full" />
                                <span className="text-white">{player.username}</span>
                            </div>
                            <div className="text-purple-500">Level {player.level}</div>
                            <div className="text-gray-300">{player.score}</div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-8 flex justify-center gap-4">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <span className="text-white self-center">Page {currentPage} of {totalPages}</span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Leaderboard;