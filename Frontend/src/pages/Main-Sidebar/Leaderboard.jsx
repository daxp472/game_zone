import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GameNavbar from '../../components/GameNavbar';
import Footer from '../../components/Footer';
import { FaSearch, FaTrophy, FaCrown, FaMedal, FaFilter, FaStar, FaGamepad, FaChartLine, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip'; // For tooltips

const API_URL = 'https://game-zone-xp-and-stats.onrender.com/api';

// Premium Color Palette
const colors = {
    bgGradient: 'from-[#0a0b14] via-[#1c1e2a] to-[#2d3040]',
    primary: '#8b5cf6', // Purple
    primaryHover: '#a78bfa',
    secondary: '#f59e0b', // Amber
    secondaryHover: '#fbbf24',
    gold: '#ffd700',
    silver: '#c0c0c0',
    bronze: '#cd7f32',
    text: '#e5e7eb',
    cardBg: '#1c1e2a',
    border: '#9333ea',
    glow: '#d8b4fe',
};

const Leaderboard = () => {
    const [players, setPlayers] = useState([]);
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [searchEmail, setSearchEmail] = useState('');
    const [filteredPlayer, setFilteredPlayer] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [rankingType, setRankingType] = useState('overall'); // overall, xp, achievements, multiplayer
    const [filterOpen, setFilterOpen] = useState(false);
    const [minLevel, setMinLevel] = useState(1);
    const [minMatches, setMinMatches] = useState(0);
    const playersPerPage = 100;
    const maxPlayers = 1000;
    const navigate = useNavigate();

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    useEffect(() => {
        applyFiltersAndSort();
    }, [players, rankingType, minLevel, minMatches]);

    const fetchLeaderboard = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/user/leaderboard`);
            const sortedPlayers = response.data.map((player, index) => ({
                ...player,
                id: index + 1,
                position: `${index + 1}${getOrdinalSuffix(index + 1)}`,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${player.email}`,
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
        { id: 1, email: 'alex@example.com', username: 'Alex Gaming', level: 50, xp: 15000, achievements: 5, totalWins: 50, totalMatches: 100, winRatio: 50, rankPoints: 5000, position: '1st', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
        { id: 2, email: 'sarah@example.com', username: 'Sarah Pro', level: 45, xp: 14500, achievements: 4, totalWins: 45, totalMatches: 90, winRatio: 50, rankPoints: 4500, position: '2nd', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
        { id: 3, email: 'mike@example.com', username: 'Mike Winner', level: 42, xp: 14000, achievements: 3, totalWins: 40, totalMatches: 80, winRatio: 50, rankPoints: 4000, position: '3rd', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
        { id: 4, email: 'lisa@example.com', username: 'Lisa Game', level: 40, xp: 13500, achievements: 2, totalWins: 35, totalMatches: 70, winRatio: 50, rankPoints: 3500, position: '4th', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa' },
        { id: 5, email: 'john@example.com', username: 'John Player', level: 38, xp: 13000, achievements: 1, totalWins: 30, totalMatches: 60, winRatio: 50, rankPoints: 3000, position: '5th', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
    ];

    const applyFiltersAndSort = () => {
        let sorted = [...players];
        
        // Apply Filters
        sorted = sorted.filter(player => 
            player.level >= minLevel && 
            player.totalMatches >= minMatches
        );

        // Sort based on ranking type
        switch (rankingType) {
            case 'xp':
                sorted.sort((a, b) => b.xp - a.xp);
                break;
            case 'achievements':
                sorted.sort((a, b) => b.achievements - a.achievements);
                break;
            case 'multiplayer':
                sorted.sort((a, b) => b.winRatio - a.winRatio || b.totalWins - a.totalWins);
                break;
            case 'overall':
            default:
                sorted.sort((a, b) => b.rankPoints - a.rankPoints);
                break;
        }

        // Update positions
        sorted = sorted.map((player, index) => ({
            ...player,
            position: `${index + 1}${getOrdinalSuffix(index + 1)}`,
        }));

        setFilteredPlayers(sorted);
    };

    const handleSearch = async () => {
        if (!searchEmail) {
            setFilteredPlayer(null);
            return;
        }
        try {
            const response = await axios.get(`${API_URL}/user/stats/${searchEmail}`);
            const playerData = response.data;
            const rank = filteredPlayers.findIndex(p => p.email === searchEmail) + 1;
            setFilteredPlayer({
                email: playerData.xp_stats.email,
                username: playerData.xp_stats.username || 'Unknown',
                level: playerData.xp_stats.level,
                xp: playerData.xp_stats.xp,
                achievements: playerData.achievements.achievements.length,
                totalWins: playerData.multiplayer_stats.games_played.reduce((sum, g) => sum + g.wins, 0),
                totalMatches: playerData.multiplayer_stats.total_matches,
                winRatio: playerData.multiplayer_stats.win_ratio,
                rankPoints: calculateRankPoints(playerData.xp_stats.xp, playerData.multiplayer_stats.win_ratio, playerData.multiplayer_stats.total_matches),
                position: rank ? `${rank}${getOrdinalSuffix(rank)}` : 'Unranked',
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${searchEmail}`
            });
        } catch (error) {
            console.error('Search failed:', error);
            setFilteredPlayer({ username: 'Not Found', position: 'N/A', level: 0, xp: 0, achievements: 0, totalWins: 0, totalMatches: 0, winRatio: 0, rankPoints: 0 });
        }
    };

    const calculateRankPoints = (xp, winRatio, totalMatches) => {
        return Math.round(xp * 0.5 + winRatio * 10 + totalMatches * 2);
    };

    const paginatedPlayers = filteredPlayers.slice((currentPage - 1) * playersPerPage, currentPage * playersPerPage).filter(p => p.id <= maxPlayers);
    const totalPages = Math.ceil(Math.min(maxPlayers, filteredPlayers.length) / playersPerPage);
    const topThree = filteredPlayers.slice(0, 3);

    if (loading) {
        return (
            <div className={`min-h-screen bg-gradient-to-br ${colors.bgGradient} flex items-center justify-center`}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                    className="text-4xl font-bold text-white flex items-center gap-4"
                >
                    <FaTrophy className="text-yellow-400" /> Loading Leaderboard...
                </motion.div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen bg-gradient-to-br ${colors.bgGradient} flex flex-col text-${colors.text} overflow-hidden`}>
            <GameNavbar />
            <div className="flex-grow container mx-auto px-4 py-12 relative">
                {/* Animated Background Particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-50"
                            initial={{ x: Math.random() * 100 + '%', y: Math.random() * 100 + '%' }}
                            animate={{ y: '-100%', opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: 'linear' }}
                        />
                    ))}
                </div>

                {/* Back Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`mb-8 bg-gradient-to-r from-${colors.primary} to-${colors.primaryHover} text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2`}
                    onClick={() => navigate(-1)}
                >
                    <FaArrowLeft /> Back to Menu
                </motion.button>

                {/* Title */}
                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-6xl md:text-7xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent"
                >
                    Global Leaderboard
                </motion.h1>

                {/* Ranking Type Selector */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="flex justify-center mb-12 gap-4 flex-wrap"
                >
                    {[
                        { type: 'overall', label: 'Overall', icon: FaCrown },
                        { type: 'xp', label: 'XP', icon: FaChartLine },
                        { type: 'achievements', label: 'Achievements', icon: FaStar },
                        { type: 'multiplayer', label: 'Multiplayer', icon: FaGamepad },
                    ].map(({ type, label, icon: Icon }) => (
                        <motion.button
                            key={type}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setRankingType(type)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 ${rankingType === type ? `bg-gradient-to-r from-${colors.primary} to-${colors.primaryHover} text-white` : `bg-${colors.cardBg} text-${colors.text} hover:bg-${colors.primaryHover} hover:text-white`}`}
                        >
                            <Icon /> {label}
                        </motion.button>
                    ))}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilterOpen(!filterOpen)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full bg-${colors.secondary} hover:bg-${colors.secondaryHover} text-white font-semibold shadow-lg transition-all duration-300`}
                    >
                        <FaFilter /> Filters
                    </motion.button>
                </motion.div>

                {/* Filter Panel */}
                {filterOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`mb-12 p-6 bg-${colors.cardBg} rounded-xl shadow-xl border-2 border-${colors.border}`}
                    >
                        <h3 className="text-2xl font-bold mb-4">Filters</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-lg mb-2">Min Level</label>
                                <input
                                    type="number"
                                    value={minLevel}
                                    onChange={(e) => setMinLevel(Math.max(1, e.target.value))}
                                    min="1"
                                    className={`w-full p-3 rounded-lg bg-${colors.cardBg} text-${colors.text} border-2 border-${colors.border} focus:outline-none focus:ring-2 focus:ring-${colors.primary}`}
                                />
                            </div>
                            <div>
                                <label className="block text-lg mb-2">Min Matches Played</label>
                                <input
                                    type="number"
                                    value={minMatches}
                                    onChange={(e) => setMinMatches(Math.max(0, e.target.value))}
                                    min="0"
                                    className={`w-full p-3 rounded-lg bg-${colors.cardBg} text-${colors.text} border-2 border-${colors.border} focus:outline-none focus:ring-2 focus:ring-${colors.primary}`}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mb-12 flex justify-center"
                >
                    <div className="relative w-full max-w-xl">
                        <input
                            type="email"
                            value={searchEmail}
                            onChange={(e) => setSearchEmail(e.target.value)}
                            placeholder="Search by email..."
                            className={`w-full p-4 pl-12 rounded-full bg-${colors.cardBg} text-${colors.text} border-2 border-${colors.border} focus:outline-none focus:ring-4 focus:ring-${colors.glow} transition-all duration-300 shadow-md`}
                        />
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSearch}
                            className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-${colors.primary} to-${colors.primaryHover} text-white font-semibold py-2 px-6 rounded-full transition-all duration-200 shadow-lg`}
                        >
                            Search
                        </motion.button>
                    </div>
                </motion.div>

                {/* Search Result */}
                {filteredPlayer && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`mb-12 bg-${colors.cardBg} p-6 rounded-xl shadow-xl border-2 border-${colors.border}`}
                    >
                        <div className="flex items-center space-x-6">
                            <img src={filteredPlayer.avatar} alt={filteredPlayer.username} className="w-16 h-16 rounded-full border-2 border-purple-500" />
                            <div className="flex-1">
                                <h3 className="text-3xl font-bold text-white">{filteredPlayer.username}</h3>
                                <p className="text-purple-400 text-xl">Rank: {filteredPlayer.position}</p>
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                    <p className="text-gray-300">Level: <span className="font-semibold">{filteredPlayer.level}</span></p>
                                    <p className="text-gray-300">XP: <span className="font-semibold">{filteredPlayer.xp}</span></p>
                                    <p className="text-gray-300">Achievements: <span className="font-semibold">{filteredPlayer.achievements}</span></p>
                                    <p className="text-gray-300">Wins/Matches: <span className="font-semibold">{filteredPlayer.totalWins}/{filteredPlayer.totalMatches} ({filteredPlayer.winRatio}%)</span></p>
                                    <p className="text-yellow-400 font-semibold col-span-2">Rank Points: {filteredPlayer.rankPoints}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Podium */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="flex justify-center items-end mb-16 h-80 md:h-96 relative"
                >
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900 opacity-20 blur-3xl"></div>

                    {/* 2nd Place */}
                    {topThree[1] && (
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="w-1/3 md:w-1/4 text-center z-10"
                            data-tooltip-id="player-2nd"
                            data-tooltip-content={`${topThree[1].username}'s Stats`}
                        >
                            <div className={`bg-gradient-to-t from-${colors.silver} to-[#e0e0e0] h-64 rounded-t-xl flex flex-col items-center justify-end pb-6 shadow-2xl border-t-4 border-${colors.silver}`}>
                                <FaMedal className="text-gray-700 text-3xl mb-2" />
                                <img src={topThree[1].avatar} alt={topThree[1].username} className="w-16 h-16 rounded-full mb-2 border-2 border-gray-500" />
                                <p className="text-xl font-bold text-gray-800">{topThree[1].username}</p>
                                <p className="text-sm text-gray-600">Level {topThree[1].level} | {topThree[1].xp} XP</p>
                                <p className="text-xs text-gray-600">Wins: {topThree[1].totalWins} | RP: {topThree[1].rankPoints}</p>
                            </div>
                            <div className={`bg-${colors.silver} text-gray-800 font-bold py-3`}>2nd</div>
                            <Tooltip id="player-2nd" />
                        </motion.div>
                    )}

                    {/* 1st Place */}
                    {topThree[0] && (
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="w-1/3 md:w-1/4 text-center z-10"
                            data-tooltip-id="player-1st"
                            data-tooltip-content={`${topThree[0].username}'s Stats`}
                        >
                            <div className={`bg-gradient-to-t from-${colors.gold} to-[#fffacd] h-80 rounded-t-xl flex flex-col items-center justify-end pb-6 shadow-2xl border-t-4 border-${colors.gold} relative`}>
                                <FaCrown className="absolute top-4 text-yellow-600 text-4xl animate-pulse" />
                                <img src={topThree[0].avatar} alt={topThree[0].username} className="w-20 h-20 rounded-full mb-2 border-2 border-yellow-500" />
                                <p className="text-2xl font-bold text-gray-800">{topThree[0].username}</p>
                                <p className="text-sm text-gray-600">Level {topThree[0].level} | {topThree[0].xp} XP</p>
                                <p className="text-xs text-gray-600">Wins: {topThree[0].totalWins} | RP: {topThree[0].rankPoints}</p>
                            </div>
                            <div className={`bg-${colors.gold} text-gray-800 font-bold py-3`}>1st</div>
                            <Tooltip id="player-1st" />
                        </motion.div>
                    )}

                    {/* 3rd Place */}
                    {topThree[2] && (
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="w-1/3 md:w-1/4 text-center z-10"
                            data-tooltip-id="player-3rd"
                            data-tooltip-content={`${topThree[2].username}'s Stats`}
                        >
                            <div className={`bg-gradient-to-t from-${colors.bronze} to-[#e4a05e] h-56 rounded-t-xl flex flex-col items-center justify-end pb-6 shadow-2xl border-t-4 border-${colors.bronze}`}>
                                <FaTrophy className="text-orange-700 text-3xl mb-2" />
                                <img src={topThree[2].avatar} alt={topThree[2].username} className="w-16 h-16 rounded-full mb-2 border-2 border-orange-500" />
                                <p className="text-xl font-bold text-gray-800">{topThree[2].username}</p>
                                <p className="text-sm text-gray-600">Level {topThree[2].level} | {topThree[2].xp} XP</p>
                                <p className="text-xs text-gray-600">Wins: {topThree[2].totalWins} | RP: {topThree[2].rankPoints}</p>
                            </div>
                            <div className={`bg-${colors.bronze} text-gray-800 font-bold py-3`}>3rd</div>
                            <Tooltip id="player-3rd" />
                        </motion.div>
                    )}
                </motion.div>

                {/* Players List */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className={`bg-${colors.cardBg} rounded-xl p-8 shadow-2xl border-2 border-${colors.border}`}
                >
                    <div className="grid grid-cols-1 md:grid-cols-8 gap-4 p-4 border-b border-gray-700 text-gray-400 font-medium">
                        <div>Rank</div>
                        <div className="col-span-2">Player</div>
                        <div>Level</div>
                        <div>XP</div>
                        <div>Achievements</div>
                        <div>Wins/Matches</div>
                        <div>Rank Points</div>
                    </div>
                    {paginatedPlayers.map((player) => (
                        <motion.div
                            key={player.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-8 gap-4 p-4 border-b border-gray-700 items-center hover:bg-[#2a2b36] transition-all duration-200"
                            data-tooltip-id={`player-${player.id}`}
                            data-tooltip-content={`${player.username}'s Detailed Stats`}
                        >
                            <div className="text-gray-300">{player.position}</div>
                            <div className="col-span-2 flex items-center space-x-3">
                                <img src={player.avatar} alt={player.username} className="w-12 h-12 rounded-full border-2 border-purple-500" />
                                <span className="text-white font-semibold">{player.username}</span>
                            </div>
                            <div className="text-purple-400">Level {player.level}</div>
                            <div className="text-gray-300">{player.xp}</div>
                            <div className="text-gray-300">{player.achievements}</div>
                            <div className="text-gray-300">{player.totalWins}/{player.totalMatches} ({player.winRatio}%)</div>
                            <div className="text-yellow-400 font-semibold">{player.rankPoints}</div>
                            <Tooltip id={`player-${player.id}`} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="mt-12 flex justify-center gap-6"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`bg-gradient-to-r from-${colors.primary} to-${colors.primaryHover} text-white font-bold py-3 px-8 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
                        >
                            Previous
                        </motion.button>
                        <span className="text-white self-center font-semibold text-lg">Page {currentPage} of {totalPages}</span>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`bg-gradient-to-r from-${colors.primary} to-${colors.primaryHover} text-white font-bold py-3 px-8 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
                        >
                            Next
                        </motion.button>
                    </motion.div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Leaderboard;