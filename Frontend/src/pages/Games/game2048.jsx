import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import GameNavbar from '../../components/GameNavbar';
import Footer from '../../components/Footer';
import { 
    generateBoard, placeRandom, isGameOver, arraysEqual,
    moveUp, moveDown, moveLeft, moveRight, getCellColor 
} from '../Games/Game-Components/2048';
import { calculateXP, addXPToAPI } from '../../components/Logic/xp';
import { calculateCoins, addCoinsToAPI } from '../../components/Logic/coins';

const Game2048 = () => {
    const [board, setBoard] = useState(generateBoard());
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [moveCount, setMoveCount] = useState(0);
    const [maxTile, setMaxTile] = useState(2);
    const [gameStartTime, setGameStartTime] = useState(Date.now());
    const [gameTime, setGameTime] = useState(0);
    const [mergeHistory, setMergeHistory] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);
    const [gameState, setGameState] = useState({ isOver: false, isWon: false, canContinue: false });
    const [earnedXP, setEarnedXP] = useState(0);
    const [earnedCoins, setEarnedCoins] = useState(0);
    const [achievements, setAchievements] = useState([]);
    const [showGameOver, setShowGameOver] = useState(false);
    const [history, setHistory] = useState([]);

    const navigate = useNavigate();
    const { user } = useAuth();
    const boardRef = useRef(board);
    const scoreRef = useRef(score);
    const maxTileRef = useRef(maxTile);
    const moveCountRef = useRef(moveCount);
    const mergeHistoryRef = useRef(mergeHistory);
    const touchStartX = useRef(null);
    const touchStartY = useRef(null);

    const BASE_URL = "https://gamezone-leaderboard.onrender.com/api/leaderboard";
    const gameId = "2048";

    const gameTips = [
        { icon: '👉', tip: 'Keep your highest tile in a corner' },
        { icon: '👉', tip: 'Plan 2-3 moves ahead' },
        { icon: '👉', tip: 'Combine smaller tiles first' },
        { icon: '👉', tip: 'Avoid splitting large tiles' },
        { icon: '⚡', tip: 'Build a "snake" pattern for easier merging' },
        { icon: '🔢', tip: 'Focus on one direction for best results' }
    ];

    useEffect(() => {
        boardRef.current = board;
        scoreRef.current = score;
        maxTileRef.current = maxTile;
        moveCountRef.current = moveCount;
        mergeHistoryRef.current = mergeHistory;
    }, [board, score, maxTile, moveCount, mergeHistory]);

    useEffect(() => {
        const savedHighScore = localStorage.getItem('2048HighScore');
        if (savedHighScore) setHighScore(parseInt(savedHighScore));
    }, []);

    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('2048HighScore', score.toString());
        }
    }, [score, highScore]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (!gameState.isOver) setGameTime(Math.floor((Date.now() - gameStartTime) / 1000));
        }, 1000);
        return () => clearInterval(timer);
    }, [gameStartTime, gameState.isOver]);

    useEffect(() => {
        fetchLeaderboard();
        const interval = setInterval(fetchLeaderboard, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const preventScroll = (e) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) e.preventDefault();
        };
        window.addEventListener('keydown', preventScroll, { passive: false });
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', preventScroll);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [gameState]);

    const fetchLeaderboard = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/2048`);
            setLeaderboard(response.data.slice(0, 5));
        } catch (error) {
            console.error("Failed to fetch leaderboard:", error);
            setLeaderboard([
                { username: "Player1", score: 24576 },
                { username: "Player2", score: 16384 },
                { username: "Player3", score: 8192 },
                { username: "Player4", score: 4096 },
                { username: "Player5", score: 2048 }
            ]);
        }
    };

    const sendScoreToLeaderboard = async (finalScore) => {
        try {
            const username = user?.username || localStorage.getItem('username') || 'Anonymous';
            await axios.post(`${BASE_URL}/2048`, { username, score: finalScore });
            fetchLeaderboard();
        } catch (error) {
            console.error("Failed to send score:", error);
        }
    };

    const addXP = async (score) => {
        try {
            const email = user?.email || localStorage.getItem('email');
            if (email) await addXPToAPI(gameId, score, email);
        } catch (error) {
            console.error("Failed to add XP:", error);
        }
    };

    const addCoins = async (score) => {
        try {
            const email = user?.email || localStorage.getItem('email');
            if (email) await addCoinsToAPI(gameId, score, email);
        } catch (error) {
            console.error("Failed to add coins:", error);
        }
    };

    const checkAchievements = ({ score, maxTile, moveCount, gameTime }) => {
        const achievements = [];
        if (score >= 10000) achievements.push("Master Scorer");
        if (maxTile >= 2048) achievements.push("2048 Champion");
        if (moveCount < 100 && maxTile >= 1024) achievements.push("Efficient Player");
        if (gameTime < 180 && score >= 5000) achievements.push("Speed Demon");
        return achievements;
    };

    const handleKeyDown = useCallback((event) => {
        if (gameState.isOver || (gameState.isWon && !gameState.canContinue)) return;
        const moves = {
            'ArrowUp': moveUp,
            'ArrowDown': moveDown,
            'ArrowLeft': moveLeft,
            'ArrowRight': moveRight
        };
        if (moves[event.key]) handleMove(moves[event.key]);
    }, [gameState]);

    const handleMove = useCallback((moveFunction) => {
        setHistory(prev => [...prev, { board: JSON.parse(JSON.stringify(boardRef.current)), score: scoreRef.current, maxTile: maxTileRef.current, moveCount: moveCountRef.current, mergeHistory: [...mergeHistoryRef.current] }].slice(-1));

        const result = moveFunction(boardRef.current);
        if (!arraysEqual(result.board, boardRef.current)) {
            placeRandom(result.board);
            setBoard(result.board);
            setMoveCount(prev => prev + 1);
            
            if (result.mergeScore > 0) {
                setMergeHistory(prev => [...prev, result.mergeScore]);
                setScore(prev => prev + result.mergeScore);
            }

            const newMaxTile = Math.max(maxTileRef.current, ...result.board.flat());
            setMaxTile(newMaxTile);

            if (result.board.some(row => row.includes(2048)) && !gameState.isWon) {
                setGameState(prev => ({ ...prev, isWon: true, canContinue: false }));
            }

            if (isGameOver(result.board)) {
                const finalGameTime = Math.floor((Date.now() - gameStartTime) / 1000);
                setGameTime(finalGameTime);
                
                const xp = calculateXP(gameId, scoreRef.current);
                const coins = calculateCoins(gameId, scoreRef.current);
                const newAchievements = checkAchievements({
                    score: scoreRef.current,
                    maxTile: newMaxTile,
                    moveCount: moveCountRef.current + 1,
                    gameTime: finalGameTime
                });

                setEarnedXP(xp);
                setEarnedCoins(coins);
                setAchievements(newAchievements);
                setGameState(prev => ({ ...prev, isOver: true }));
                setShowGameOver(true);

                sendScoreToLeaderboard(scoreRef.current);
                addXP(scoreRef.current);
                addCoins(scoreRef.current);
            }
        }
    }, [gameState, gameStartTime]);

    const handleUndo = () => {
        if (history.length > 0 && !gameState.isOver) {
            const lastState = history[history.length - 1];
            setBoard(lastState.board);
            setScore(lastState.score);
            setMaxTile(lastState.maxTile);
            setMoveCount(lastState.moveCount);
            setMergeHistory(lastState.mergeHistory);
            setHistory(prev => prev.slice(0, -1));
        }
    };

    const handleContinue = () => {
        setGameState(prev => ({ ...prev, canContinue: true, isWon: false }));
    };

    const handleRestart = () => {
        if (gameState.isOver) {
            sendScoreToLeaderboard(score);
            addXP(score);
            addCoins(score);
        }
        
        setBoard(generateBoard());
        setScore(0);
        setMaxTile(2);
        setMoveCount(0);
        setMergeHistory([]);
        setGameStartTime(Date.now());
        setGameTime(0);
        setEarnedXP(0);
        setEarnedCoins(0);
        setAchievements([]);
        setShowGameOver(false);
        setHistory([]);
        setGameState({ isOver: false, isWon: false, canContinue: false });
    };

    const handleTouchStart = (e) => {
        if (gameState.isOver || (gameState.isWon && !gameState.canContinue)) return;
        const touch = e.touches[0];
        touchStartX.current = touch.clientX;
        touchStartY.current = touch.clientY;
    };

    const handleTouchEnd = (e) => {
        if (gameState.isOver || (gameState.isWon && !gameState.canContinue)) return;
        if (!touchStartX.current || !touchStartY.current) return;
        
        const touch = e.changedTouches[0];
        const diffX = touch.clientX - touchStartX.current;
        const diffY = touch.clientY - touchStartY.current;
        
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 50) handleMove(moveRight);
            else if (diffX < -50) handleMove(moveLeft);
        } else {
            if (diffY > 50) handleMove(moveDown);
            else if (diffY < -50) handleMove(moveUp);
        }
        
        touchStartX.current = null;
        touchStartY.current = null;
    };

    const GameOverModal = ({ score, maxTile, gameTime, earnedXP, earnedCoins, achievements, onClose, onRestart }) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full animate-bounce-in">
                <h2 className="text-3xl font-bold text-center mb-4 text-gradient bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Game Over!
                </h2>
                <div className="text-center mb-6">
                    <p className="text-xl font-semibold mb-2">Final Score: {score}</p>
                    <p className="text-lg">Highest Tile: {maxTile}</p>
                    <p className="text-gray-600">Time: {Math.floor(gameTime / 60)}:{(gameTime % 60).toString().padStart(2, '0')}</p>
                </div>
                <div className="flex justify-center gap-6 mb-6">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-500">+{earnedXP}</div>
                        <div className="text-sm text-gray-600">XP Earned</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-500">+{earnedCoins}</div>
                        <div className="text-sm text-gray-600">Coins Earned</div>
                    </div>
                </div>
                {achievements.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-center mb-3 text-green-600">
                            Achievements Unlocked!
                        </h3>
                        <ul className="space-y-2 text-gray-700">
                            {achievements.map((achievement, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <span className="text-yellow-500">⭐</span>
                                    {achievement}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-lg transition-all duration-200"
                    >
                        Close
                    </button>
                    <button
                        onClick={onRestart}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200"
                    >
                        Restart Game
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen">
            <GameNavbar />
            <main className="flex-grow container mx-auto px-4 py-6">
                <div className="flex justify-between items-center mb-6">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                        onClick={() => navigate(-1)}
                    >
                        ← Back to Menu
                    </button>
                    <div className="score-panel bg-white p-3 rounded-lg shadow flex gap-4">
                        <div className="text-lg font-semibold text-blue-600">
                            Score: <span className="text-gray-700">{score}</span>
                        </div>
                        <div className="text-lg font-semibold text-green-600">
                            High Score: <span className="text-gray-700">{highScore}</span>
                        </div>
                        <div className="text-lg font-semibold text-purple-600 hidden md:block">
                            Time: <span className="text-gray-700">{Math.floor(gameTime / 60)}:{(gameTime % 60).toString().padStart(2, '0')}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                        <div 
                            className="bg-white rounded-xl shadow-xl p-6 max-w-md mx-auto"
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        >
                            <h1 className="text-4xl font-bold text-center mb-6 text-gradient bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                2048
                            </h1>
                            <div className="game-board grid grid-cols-4 gap-3 bg-gray-100 p-3 rounded-lg">
                                {board.map((row, rowIndex) =>
                                    row.map((cell, cellIndex) => (
                                        <div
                                            key={`${rowIndex}-${cellIndex}`}
                                            className={`cell h-16 sm:h-20 w-16 sm:w-20 rounded-lg flex items-center justify-center text-xl sm:text-2xl font-bold ${getCellColor(cell)} transition-all duration-150`}
                                        >
                                            {cell > 0 ? cell : ''}
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="mt-6 flex justify-center gap-4">
                                <button 
                                    onClick={handleUndo} 
                                    disabled={history.length === 0 || gameState.isOver}
                                    className={`bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 ${history.length === 0 || gameState.isOver ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    Undo ⏪
                                </button>
                                <div className="md:hidden">
                                    <div className="flex justify-center">
                                        <button onClick={() => handleMove(moveUp)} className="bg-gray-200 hover:bg-gray-300 w-14 h-14 rounded-full flex items-center justify-center text-2xl">↑</button>
                                    </div>
                                    <div className="flex justify-center gap-8 my-2">
                                        <button onClick={() => handleMove(moveLeft)} className="bg-gray-200 hover:bg-gray-300 w-14 h-14 rounded-full flex items-center justify-center text-2xl">←</button>
                                        <button onClick={() => handleMove(moveDown)} className="bg-gray-200 hover:bg-gray-300 w-14 h-14 rounded-full flex items-center justify-center text-2xl">↓</button>
                                        <button onClick={() => handleMove(moveRight)} className="bg-gray-200 hover:bg-gray-300 w-14 h-14 rounded-full flex items-center justify-center text-2xl">→</button>
                                    </div>
                                </div>
                            </div>
                            {gameState.isWon && !gameState.canContinue && (
                                <div className="mt-6 text-center animate-pulse">
                                    <p className="text-xl font-bold text-green-600 mb-4">🎉 You won! Continue playing?</p>
                                    <div className="flex justify-center gap-3">
                                        <button onClick={handleContinue} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105">Continue ➡</button>
                                        <button onClick={handleRestart} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105">Restart 🔄</button>
                                    </div>
                                </div>
                            )}
                            {gameState.isOver && !showGameOver && (
                                <div className="mt-6 text-center">
                                    <p className="text-xl font-bold text-red-600 mb-4">Game Over! 😭</p>
                                    <button onClick={handleRestart} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105">Try Again 🔄</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="md:w-96 space-y-8">
                        <div className="bg-white rounded-xl shadow-xl p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">🏆 Leaderboard</h2>
                            <div className="h-64 overflow-y-auto">
                                {leaderboard.map((entry, index) => (
                                    <div key={index} className="flex justify-between py-2">
                                        <span>{entry.username}</span>
                                        <span>{entry.score}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-xl p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">💡 Pro Tips</h2>
                            <ul className="space-y-3 text-gray-600">
                                {gameTips.map((tip, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="mr-2">{tip.icon}</span>
                                        {tip.tip}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
            {showGameOver && (
                <GameOverModal
                    score={score}
                    maxTile={maxTile}
                    gameTime={gameTime}
                    earnedXP={earnedXP}
                    earnedCoins={earnedCoins}
                    achievements={achievements}
                    onClose={() => setShowGameOver(false)}
                    onRestart={handleRestart}
                />
            )}
            <Footer />
        </div>
    );
};

export default Game2048;