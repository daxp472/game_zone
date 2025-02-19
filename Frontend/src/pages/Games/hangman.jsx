import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { wordList } from './word-list'; // Note the change here
import LeaderboardSection from '../../components/Leaderboard'; // Adjust the path as necessary
import { useAuth } from '../../contexts/AuthContext'; // Adjust according to your AuthContext
import GameNavbar from '../../components/GameNavbar';
import Footer from '../../components/Footer';


const GameHangman = () => {
    const [currentWord, setCurrentWord] = useState("");
    const [correctLetters, setCorrectLetters] = useState([]);
    const [wrongGuessCount, setWrongGuessCount] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isVictory, setIsVictory] = useState(false);
    const { user } = useAuth(); // Adjust according to your AuthContext
    const navigate = useNavigate();
    const maxGuesses = 6;

    useEffect(() => {
        getRandomWord();
    }, []);

    const resetGame = () => {
        setCorrectLetters([]);
        setWrongGuessCount(0);
        setIsGameOver(false);
        setIsVictory(false);
        getRandomWord();
    };

    const getRandomWord = () => {
        const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
        setCurrentWord(word);
        document.querySelector(".hint-text b").innerText = hint;
    };

    const gameOver = (isVictory) => {
        setIsGameOver(true);
        setIsVictory(isVictory);
    };

    const initGame = (clickedLetter) => {
        if (currentWord.includes(clickedLetter)) {
            setCorrectLetters((prevLetters) => {
                const newLetters = [...prevLetters, clickedLetter];
                if (newLetters.length === currentWord.length) {
                    gameOver(true);
                }
                return newLetters;
            });
        } else {
            setWrongGuessCount((prevCount) => {
                const newCount = prevCount + 1;
                if (newCount === maxGuesses) {
                    gameOver(false);
                }
                return newCount;
            });
        }
    };

    return (
        <div className="flex flex-col items-center mt-10 p-0">
            <GameNavbar />
            <div className="w-full flex justify-between items-center mb-5">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                    onClick={() => navigate()}
                >
                    ← Back to Menu
                </button>
                <h1 className="text-4xl font-bold text-white">Hangman Game</h1>
            </div>
            <div className="container mx-auto flex justify-between items-start space-x-10">
                <div className="flex flex-col items-center w-2/3 p-4 bg-white rounded-lg shadow-lg">
                    <div className={`game-modal ${isGameOver ? "show" : ""}`}>
                        <div className="content text-center">
                            <img src={isVictory ? "images/victory.gif" : "images/lost.gif"} alt="gif" className="mx-auto mb-4"/>
                            <h4 className="text-2xl font-bold mb-2">{isVictory ? "Congrats!" : "Game Over!"}</h4>
                            <p className="text-lg">{isVictory ? `You found the word: ${currentWord}` : `The correct word was: ${currentWord}`}</p>
                            <button 
                                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105" 
                                onClick={resetGame}
                            >
                                Play Again
                            </button>
                        </div>
                    </div>
                    <div className="hangman-box mb-6">
                        <img src={`images/hangman-${wrongGuessCount}.svg`} alt="hangman-img" />
                    </div>
                    <ul className="word-display flex space-x-2 mb-6">
                        {currentWord.split("").map((letter, index) => (
                            <li key={index} className={`letter ${correctLetters.includes(letter) ? "guessed" : ""}`}>
                                {correctLetters.includes(letter) ? letter : ""}
                            </li>
                        ))}
                    </ul>
                    <h4 className="hint-text text-lg font-medium">Hint: <b></b></h4>
                    <h4 className="guesses-text text-lg font-medium mt-2">Incorrect guesses: <b>{wrongGuessCount} / {maxGuesses}</b></h4>
                    <div className="keyboard grid grid-cols-9 gap-2 mt-6">
                        {Array.from({ length: 26 }, (_, i) => (
                            <button 
                                key={i} 
                                className="bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg transition-all duration-200"
                                onClick={() => initGame(String.fromCharCode(i + 97))} 
                                disabled={correctLetters.includes(String.fromCharCode(i + 97)) || isGameOver}
                            >
                                {String.fromCharCode(i + 97)}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col w-1/3 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">🏆 Leaderboard</h2>
                        <div className="h-64 overflow-y-auto">
                            <LeaderboardSection
                                gameId="hangman"
                                username={user.username}
                                currentScore={{ score: wrongGuessCount }}
                            />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">💡 Pro Tips</h2>
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex items-start">
                                <span className="mr-2">👉</span>
                                Try to guess vowels first; they are more common in words.
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">👉</span>
                                Pay attention to the hint provided; it can narrow down your options.
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">👉</span>
                                Don't guess the same letter multiple times.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default GameHangman;
