import React, { useState, useEffect, useCallback, useRef } from 'react';
import GameNavbar from '../../components/GameNavbar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Game2048 = () => {
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const navigate = useNavigate();
    const [board, setBoard] = useState(generateBoard());
    const [gameState, setGameState] = useState({
        isOver: false,
        isWon: false,
        canContinue: false
    });
    const boardRef = useRef(board);

    useEffect(() => {
        boardRef.current = board;
    }, [board]);

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

    const handleMove = useCallback((moveFunction) => {
        const newBoard = moveFunction(boardRef.current);
        if (!arraysEqual(newBoard, boardRef.current)) {
            placeRandom(newBoard);
            setBoard(newBoard);
            const newScore = calculateScore(newBoard);
            setScore(newScore);

            // Check for 2048 tile
            const hasReached2048 = newBoard.some(row => row.includes(2048));
            if (hasReached2048 && !gameState.isWon) {
                setGameState(prev => ({
                    ...prev,
                    isWon: true,
                    canContinue: true
                }));
            }

            // Check game over
            if (isGameOver(newBoard)) {
                setGameState(prev => ({
                    ...prev,
                    isOver: true
                }));
            }
        }
    }, [gameState.isWon]);

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
        setBoard(generateBoard());
        setScore(0);
        setGameState({
            isOver: false,
            isWon: false,
            canContinue: false
        });
    };


    return (
        <div className="h-screen bg-gray-100 flex flex-col">
            <GameNavbar />

            <div className="container mx-auto p-4 flex-1 overflow-y-auto">
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
                            <h1 className="text-4xl font-bold text-center mb-6 text-gradient bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
                                2048
                            </h1>

                            <div className="game-board grid grid-cols-4 gap-3 bg-gray-100 p-3 rounded-lg">
                                {board.map((row, rowIndex) =>
                                    row.map((cell, cellIndex) => (
                                        <div
                                            key={`${rowIndex}-${cellIndex}`}
                                            className={`cell h-20 w-20 rounded-lg flex items-center justify-center text-2xl font-bold
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
                                {/* {leaderboardData.map((entry, index) => (
                      <div key={entry.id} className="flex items-center p-2 hover:bg-gray-50 rounded">
                        <span className="w-8 text-gray-500 font-medium">#{index + 1}</span>
                        <span className="flex-1 font-medium">{entry.username}</span>
                        <span className="text-blue-600 font-bold">{entry.score}</span>
                      </div>
                    ))} */} hello world
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
            </div>

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

function calculateScore(board) {
    return board.flat().reduce((sum, cell) => sum + cell, 0);
}

function moveUp(board) {
    const newBoard = board.map(row => [...row]);
    for (let col = 0; col < 4; col++) {
        let cells = [];
        for (let row = 0; row < 4; row++) {
            if (newBoard[row][col] !== 0) {
                cells.push(newBoard[row][col]);
            }
        }
        cells = mergeCells(cells);

        for (let row = 0; row < 4; row++) {
            newBoard[row][col] = cells[row] || 0;
        }
    }
    return newBoard;
}

function moveDown(board) {
    const newBoard = board.map(row => [...row]);
    for (let col = 0; col < 4; col++) {
        let cells = [];
        for (let row = 3; row >= 0; row--) {
            if (newBoard[row][col] !== 0) {
                cells.push(newBoard[row][col]);
            }
        }
        cells = mergeCells(cells);

        for (let row = 3; row >= 0; row--) {
            newBoard[row][col] = cells[3 - row] || 0;
        }
    }
    return newBoard;
}

function moveLeft(board) {
    const newBoard = board.map(row => [...row]);
    for (let row = 0; row < 4; row++) {
        let cells = [];
        for (let col = 0; col < 4; col++) {
            if (newBoard[row][col] !== 0) {
                cells.push(newBoard[row][col]);
            }
        }
        cells = mergeCells(cells);

        for (let col = 0; col < 4; col++) {
            newBoard[row][col] = cells[col] || 0;
        }
    }
    return newBoard;
}

function moveRight(board) {
    const newBoard = board.map(row => [...row]);
    for (let row = 0; row < 4; row++) {
        let cells = [];
        for (let col = 3; col >= 0; col--) {
            if (newBoard[row][col] !== 0) {
                cells.push(newBoard[row][col]);
            }
        }
        cells = mergeCells(cells);

        for (let col = 3; col >= 0; col--) {
            newBoard[row][col] = cells[3 - col] || 0;
        }
    }
    return newBoard;
}

function mergeCells(cells) {
    cells = cells.filter(cell => cell !== 0);
    for (let i = 0; i < cells.length - 1; i++) {
        if (cells[i] === cells[i + 1]) {
            cells[i] *= 2;
            cells.splice(i + 1, 1);
        }
    }
    while (cells.length < 4) {
        cells.push(0);
    }
    return cells;
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
    return colorMap[cell] || 'bg-white text-black';
}

export default Game2048;