import React, { useState, useEffect, useCallback, useRef } from 'react';
import GameNavbar from '../../components/GameNavbar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LeaderboardSection from '../../components/Leaderboard';
import { useAuth } from '../../contexts/AuthContext';
// import jwt_decode from 'jwt-decode';

const Game2048 = () => {
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [leaderboard, setLeaderboard] = useState([]);
    const navigate = useNavigate();
    const [board, setBoard] = useState(generateBoard());
    const [gameState, setGameState] = useState({
        isOver: false,
        isWon: false,
        canContinue: false
    });
    const boardRef = useRef(board);
    const scoreRef = useRef(score);
    const BASE_URL = "http://localhost:5000";

    useEffect(() => {
        boardRef.current = board;
    }, [board]);

    useEffect(() => {
        scoreRef.current = score;
    }, [score]);

    // Get the high score from localStorage on component mount
    useEffect(() => {
        const savedHighScore = localStorage.getItem('2048HighScore');
        if (savedHighScore) {
            setHighScore(parseInt(savedHighScore));
        }
    }, []);

    // Update high score if current score is higher
    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('2048HighScore', score.toString());
        }
    }, [score, highScore]);

    // Fetch leaderboard data
    useEffect(() => {
        fetchLeaderboard();
        // Set up polling to update leaderboard every 5 seconds
        const interval = setInterval(fetchLeaderboard, 5000);
        return () => clearInterval(interval);
    }, []);

    const fetchLeaderboard = async () => {
        try {
            // Replace with your actual API endpoint
            const response = await axios.get('${BASE_URL}/api/leaderboard/2048');
            setLeaderboard(response.data.slice(0, 5)); // Get top 5 scores
        } catch (error) {
            console.error("Failed to fetch leaderboard:", error);
            // Set dummy data for now
            setLeaderboard([
                { username: "Player1", score: 24576 },
                { username: "Player2", score: 16384 },
                { username: "Player3", score: 8192 },
                { username: "Player4", score: 4096 },
                { username: "Player5", score: 2048 }
            ]);
        }
    };

    // Prevent default scroll behavior
    useEffect(() => {
        const preventScroll = (e) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
            }
        };

        window.addEventListener('keydown', preventScroll, { passive: false });
        return () => {
            window.removeEventListener('keydown', preventScroll);
        };
    }, []);

    const updateScore = (mergeValue) => {
        setScore(prevScore => prevScore + mergeValue);
    };

    const handleMove = useCallback((moveFunction) => {
        const result = moveFunction(boardRef.current);
        if (!arraysEqual(result.board, boardRef.current)) {
            placeRandom(result.board);
            setBoard(result.board);

            // Update score with the sum of all merged tiles
            if (result.mergeScore > 0) {
                setScore(scoreRef.current + result.mergeScore);
            }

            // Check for 2048 tile
            const hasReached2048 = result.board.some(row => row.includes(2048));
            if (hasReached2048 && !gameState.isWon) {
                setGameState(prev => ({
                    ...prev,
                    isWon: true,
                    canContinue: true
                }));
            }

            // Check game over
            if (isGameOver(result.board)) {
                setGameState(prev => ({
                    ...prev,
                    isOver: true
                }));
                // Send score to leaderboard API when game is over
                sendScoreToLeaderboard(scoreRef.current);
            }
        }
    }, [gameState.isWon]);

    const sendScoreToLeaderboard = async (finalScore) => {
        try {
            // Get username from localStorage or prompt user
            const username = localStorage.getItem('username') || 'Anonymous';
            // Replace with your actual API endpoint
            await axios.post('${BASE_URL}/api/leaderboard/2048', {
                username,
                score: finalScore
            });
            // Refresh leaderboard after submitting new score
            fetchLeaderboard();
        } catch (error) {
            console.error("Failed to send score to leaderboard:", error);
        }
    };

    const handleKeyDown = useCallback((event) => {
        if (gameState.isOver || (gameState.isWon && !gameState.canContinue)) return;

        switch (event.key) {
            case 'ArrowUp':
                handleMove(moveUp);
                break;
            case 'ArrowDown':
                handleMove(moveDown);
                break;
            case 'ArrowLeft':
                handleMove(moveLeft);
                break;
            case 'ArrowRight':
                handleMove(moveRight);
                break;
        }
    }, [handleMove, gameState]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    const handleContinue = () => {
        setGameState(prev => ({
            ...prev,
            canContinue: true,
            isWon: false
        }));
    };

    const handleRestart = () => {
        // If game was over, send final score before restarting
        if (gameState.isOver) {
            sendScoreToLeaderboard(score);
        }
        setBoard(generateBoard());
        setScore(0);
        setGameState({
            isOver: false,
            isWon: false,
            canContinue: false
        });
    };
    
    const { user } = useAuth();


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

                    <div className="score-panel bg-white p-3 rounded-lg shadow">
                        <div className="flex gap-4">
                            <div className="text-lg font-semibold text-blue-600">
                                Score: <span className="text-gray-700">{score}</span>
                            </div>
                            <div className="text-lg font-semibold text-green-600">
                                High Score: <span className="text-gray-700">{highScore}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Game Board Section */}
                    <div className="flex-1">
                        <div className="bg-white rounded-xl shadow-xl p-6 max-w-md mx-auto">
                            <h1 className="text-4xl font-bold text-center mb-6 text-gradient bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                2048
                            </h1>

                            <div className="game-board grid grid-cols-4 gap-3 bg-gray-100 p-3 rounded-lg">
                                {board.map((row, rowIndex) =>
                                    row.map((cell, cellIndex) => (
                                        <div
                                            key={`${rowIndex}-${cellIndex}`}
                                            className={`cell h-16 sm:h-20 w-16 sm:w-20 rounded-lg flex items-center justify-center text-xl sm:text-2xl font-bold
                                            ${getCellColor(cell)} transition-all duration-150`}
                                        >
                                            {cell > 0 ? cell : ''}
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Game State Messages */}
                            {gameState.isWon && !gameState.canContinue && (
                                <div className="mt-6 text-center animate-pulse">
                                    <p className="text-xl font-bold text-green-600 mb-4">
                                        🎉 You won! Continue playing?
                                    </p>
                                    <div className="flex justify-center gap-3">
                                        <button onClick={handleContinue} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105">
                                            Continue ➡
                                        </button>
                                        <button onClick={handleRestart} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105">
                                            Restart 🔄
                                        </button>
                                    </div>
                                </div>
                            )}

                            {gameState.isOver && (
                                <div className="mt-6 text-center">
                                    <p className="text-xl font-bold text-red-600 mb-4">
                                        Game Over! 😭
                                    </p>
                                    <button onClick={handleRestart} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105">
                                        Try Again 🔄
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Panel - Leaderboard & Tips */}
                    <div className="md:w-96 space-y-8">
                        <div className="bg-white rounded-xl shadow-xl p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                🏆 Leaderboard
                            </h2>
                            <div className="h-64 overflow-y-auto">
                                {/* {fetchLeaderboard.length > 0 ? (
                                    fetchLeaderboard.map((entry, index) => (
                                        <div key={index} className="flex items-center p-2 hover:bg-gray-50 rounded">
                                            <span className="w-8 text-gray-500 font-medium">#{index + 1}</span>
                                            <span className="flex-1 font-medium">{entry.username}</span>
                                            <span className="text-blue-600 font-bold">{entry.score.toLocaleString()}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-gray-500 italic text-center pt-8">
                                        Loading leaderboard...
                                    </div>
                                )} */}
                                <LeaderboardSection
                                    gameId="2048"             
                                    username={user.username}  
                                    currentScore={score}  
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-xl p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                💡 Pro Tips
                            </h2>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-start">
                                    <span className="mr-2">👉</span>
                                    Keep your highest tile in a corner
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">👉</span>
                                    Plan 2-3 moves ahead
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">👉</span>
                                    Combine smaller tiles first
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">👉</span>
                                    Avoid splitting large tiles
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

// Utility Functions
function generateBoard() {
    const board = Array.from({ length: 4 }, () => Array(4).fill(0));
    placeRandom(board);
    placeRandom(board);
    return board;
}

function placeRandom(board) {
    const emptyCells = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] === 0) {
                emptyCells.push({ row, col });
            }
        }
    }
    if (emptyCells.length > 0) {
        const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
}

function isGameOver(board) {
    // Check if any empty cells exist
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] === 0) return false;
        }
    }

    // Check if any adjacent cells can be merged
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (col < 3 && board[row][col] === board[row][col + 1]) return false;
            if (row < 3 && board[row][col] === board[row + 1][col]) return false;
        }
    }

    return true;
}

function arraysEqual(a, b) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (a[i][j] !== b[i][j]) return false;
        }
    }
    return true;
}

function moveUp(board) {
    const newBoard = board.map(row => [...row]);
    let mergeScore = 0;

    for (let col = 0; col < 4; col++) {
        let cells = [];
        for (let row = 0; row < 4; row++) {
            if (newBoard[row][col] !== 0) {
                cells.push(newBoard[row][col]);
            }
        }

        const result = mergeCells(cells);
        cells = result.cells;
        mergeScore += result.score;

        for (let row = 0; row < 4; row++) {
            newBoard[row][col] = cells[row] || 0;
        }
    }

    return { board: newBoard, mergeScore };
}

function moveDown(board) {
    const newBoard = board.map(row => [...row]);
    let mergeScore = 0;

    for (let col = 0; col < 4; col++) {
        let cells = [];
        for (let row = 3; row >= 0; row--) {
            if (newBoard[row][col] !== 0) {
                cells.push(newBoard[row][col]);
            }
        }

        const result = mergeCells(cells);
        cells = result.cells;
        mergeScore += result.score;

        for (let row = 3; row >= 0; row--) {
            newBoard[row][col] = cells[3 - row] || 0;
        }
    }

    return { board: newBoard, mergeScore };
}

function moveLeft(board) {
    const newBoard = board.map(row => [...row]);
    let mergeScore = 0;

    for (let row = 0; row < 4; row++) {
        let cells = [];
        for (let col = 0; col < 4; col++) {
            if (newBoard[row][col] !== 0) {
                cells.push(newBoard[row][col]);
            }
        }

        const result = mergeCells(cells);
        cells = result.cells;
        mergeScore += result.score;

        for (let col = 0; col < 4; col++) {
            newBoard[row][col] = cells[col] || 0;
        }
    }

    return { board: newBoard, mergeScore };
}

function moveRight(board) {
    const newBoard = board.map(row => [...row]);
    let mergeScore = 0;

    for (let row = 0; row < 4; row++) {
        let cells = [];
        for (let col = 3; col >= 0; col--) {
            if (newBoard[row][col] !== 0) {
                cells.push(newBoard[row][col]);
            }
        }

        const result = mergeCells(cells);
        cells = result.cells;
        mergeScore += result.score;

        for (let col = 3; col >= 0; col--) {
            newBoard[row][col] = cells[3 - col] || 0;
        }
    }

    return { board: newBoard, mergeScore };
}

function mergeCells(cells) {
    cells = cells.filter(cell => cell !== 0);
    let score = 0;

    for (let i = 0; i < cells.length - 1; i++) {
        if (cells[i] === cells[i + 1]) {
            cells[i] *= 2;
            score += cells[i]; // Add the merged value to the score
            cells.splice(i + 1, 1);
        }
    }

    while (cells.length < 4) {
        cells.push(0);
    }

    return { cells, score };
}

function getCellColor(cell) {
    const colorMap = {
        2: 'bg-red-100 text-black',
        4: 'bg-red-200 text-black',
        8: 'bg-red-300 text-white',
        16: 'bg-red-400 text-white',
        32: 'bg-red-500 text-white',
        64: 'bg-red-600 text-white',
        128: 'bg-blue-500 text-white',
        256: 'bg-blue-600 text-white',
        512: 'bg-blue-700 text-white',
        1024: 'bg-green-500 text-white',
        2048: 'bg-green-600 text-white',
        4096: 'bg-green-700 text-white',
        8192: 'bg-green-800 text-white',
        16384: 'bg-green-900 text-white'
    };
    return colorMap[cell] || 'bg-gray-200 text-gray-400';
}

export default Game2048;