import React, { useState, useEffect } from 'react';
import GameNavbar from '../../components/GameNavbar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import LeaderboardSection from '../../components/Leaderboard';
import { useAuth } from '../../contexts/AuthContext';

const XOGame = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);
    const [score, setScore] = useState({ player: 0 });
    const [highScore, setHighScore] = useState(0);
    const [mode, setMode] = useState('AI'); // 'AI' or 'Multiplayer'
    const [gameOver, setGameOver] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();

    const calculateWinner = (board) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };

    const handleClick = (index) => {
        if (board[index] || winner || gameOver) return;
        const newBoard = board.slice();
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const aiMove = () => {
        const emptyIndices = board.map((cell, index) => (cell === null ? index : null)).filter((val) => val !== null);
        const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        handleClick(randomIndex);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
        setGameOver(false);
    };

    useEffect(() => {
        if (gameOver) return;
    
        const winner = calculateWinner(board);
        if (winner) {
            setWinner(winner);
            setGameOver(true);
    
            if (mode === 'AI') {
                if (winner === 'X') {
                    setScore((prevScore) => {
                        const newPlayerScore = prevScore.player + 1;
                        return { player: newPlayerScore };
                    });
                } else {
                    setHighScore((prevHighScore) => Math.max(prevHighScore, score.player));
                    setScore({ player: 0 });
                }
            }
        } else if (!board.includes(null)) {
            setWinner('Draw');
            setGameOver(true);
        } else if (!isXNext && mode === 'AI') {
            aiMove();
        }
    }, [board, isXNext, mode, gameOver]); 
    

    const handleModeChange = (newMode) => {
        setMode(newMode);
        resetGame();
    };

    return (
        <div className="flex flex-col items-center mt-10 p-0">
            <GameNavbar />
            <div className="flex w-full max-w-6xl">
                {/* Left Section */}
                <div className="w-1/5 flex flex-col items-start p-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded-lg transition-all duration-200 transform hover:scale-105"
                        onClick={() => navigate(-1)}
                    >
                        ← Back to Menu
                    </button>
                </div>

                {/* Main Game Section */}
                <div className="w-2/3 flex flex-col items-center">
                    <h1 className="text-4xl font-bold mb-5 text-white">Tic-Tac-Toe</h1>
                    <div className="flex justify-center mb-4">
                        <button className="bg-blue-500 text-white py-2 px-4 rounded mr-2" onClick={() => handleModeChange('AI')}>Play vs AI</button>
                        <button className="bg-green-500 text-white py-2 px-4 rounded" onClick={() => handleModeChange('Multiplayer')}>Multiplayer</button>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        {board.map((cell, index) => (
                            <div key={index} className={`w-24 h-24 flex items-center justify-center border-2 text-2xl cursor-pointer ${cell === 'X' ? 'text-blue-500' : 'text-red-500'}`} onClick={() => handleClick(index)}>
                                {cell}
                            </div>
                        ))}
                    </div>
                    {winner && (
                        <div className="text-center mb-4">
                            <h2 className="text-2xl font-bold text-white">{winner === 'Draw' ? "It's a Draw!" : `${winner} Wins!`}</h2>
                        </div>
                    )}
                    <div className="flex justify-center mb-4">
                        <button className="bg-yellow-500 text-white py-2 px-4 rounded mr-2" onClick={resetGame}>Reset Game</button>
                    </div>
                </div>

                {/* Leaderboard and Tips Section */}
                <div className="w-1/3 flex flex-col items-start p-4">
                    <div className=" bg-white p-3 rounded-lg shadow">
                        <div className="flex gap-4">
                            <div className="text-lg font-semibold text-blue-600">
                                Score: <span className="text-gray-700">{score.player}</span>
                            </div>
                            <div className="text-lg font-semibold text-green-600">
                                High Score: <span className="text-gray-700">{highScore}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-xl p-6 mt-4">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">🏆 Leaderboard</h2>
                        <div className="h-64 overflow-y-auto">
                            <LeaderboardSection
                                gameId="xo"
                                username={user.username}
                                currentScore={score.player}
                            />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-xl mt-6">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">💡 Pro Tips</h2>
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex items-start">
                                <span className="mr-2">👉</span>
                                Try to control the center for more chances of creating winning combinations.
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">👉</span>
                                Block your opponent's attempts to create a line of three.
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">👉</span>
                                Think a few moves ahead to predict your opponent's strategy.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default XOGame;
