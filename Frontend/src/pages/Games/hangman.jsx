import React, { useState, useEffect } from 'react';
import GameNavbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GameHangman = () => {
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [leaderboard, setLeaderboard] = useState([]);
    const history = useHistory();

    useEffect(() => {
        // Fetch high score and leaderboard from the backend
        axios.get('/api/highscore').then(response => {
            setHighScore(response.data.highScore);
        });

        axios.get('/api/leaderboard').then(response => {
            setLeaderboard(response.data.leaderboard);
        });
    }, []);

    const updateScore = (newScore) => {
        setScore(newScore);
        axios.post('/api/score', { score: newScore });

        if (newScore > highScore) {
            setHighScore(newScore);
        }
    };

    const handleBackClick = () => {
        history.goBack();
    };

    return (
        <>
        <div className="h-screen bg-gray-100">
            <GameNavbar />
            <div className="container mx-auto p-4 pt-6">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleBackClick}>Back</button>
                <div className="flex justify-center mt-4">
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <h1 className="text-3xl font-bold mb-4">2048 Game</h1>
                        <div className="flex justify-between mb-4">
                            <div className="text-lg">Score: {score}</div>
                            <div className="text-lg">High Score: {highScore}</div>
                        </div>
                    </div>
                </div>
                <div className="game-board">
                    {/* Include your 2048 game component here */}
                </div>
                <div className="leaderboard mt-4">
                    <h2 className="text-2xl font-bold mb-2">Leaderboard</h2>
                    <ul>
                        {leaderboard.map((entry, index) => (
                            <li key={index} className="py-2">{entry.name}: {entry.score}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
        </>
    );
};

export default GameHangman;