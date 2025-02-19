import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { wordList } from './word-list';
import LeaderboardSection from '../../components/Leaderboard';
import { useAuth } from '../../contexts/AuthContext';
import GameNavbar from '../../components/GameNavbar';
import Footer from '../../components/Footer';

// Import all hangman images
import hangman0 from './images/hangman-0.svg';
import hangman1 from './images/hangman-1.svg';
import hangman2 from './images/hangman-2.svg';
import hangman3 from './images/hangman-3.svg';
import hangman4 from './images/hangman-4.svg';
import hangman5 from './images/hangman-5.svg';
import hangman6 from './images/hangman-6.svg';

// Import victory and lost gifs
import victoryGif from './images/victory.gif';
import lostGif from './images/lost.gif';

const GameHangman = () => {
    const [currentWord, setCurrentWord] = useState("");
    const [correctLetters, setCorrectLetters] = useState([]);
    const [usedLetters, setUsedLetters] = useState([]);
    const [wrongGuessCount, setWrongGuessCount] = useState(0);
    const [correctGuessCount, setCorrectGuessCount] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isVictory, setIsVictory] = useState(false);
    const [hint, setHint] = useState("");
    const { user } = useAuth();
    const navigate = useNavigate();
    const maxGuesses = 6;

    // Array of hangman images
    const hangmanImages = [hangman0, hangman1, hangman2, hangman3, hangman4, hangman5, hangman6];

    useEffect(() => {
        getRandomWord();
    }, []);

    // Update score in database
    const updateScoreInDatabase = async (newScore) => {
        if (!user || !user.uid) return;
        
        try {
            const userScoreRef = doc(db, 'scores', user.uid);
            const scoreDoc = await getDoc(userScoreRef);
            
            if (scoreDoc.exists()) {
                // Update existing score
                await updateDoc(userScoreRef, {
                    hangmanScore: increment(newScore),
                    lastUpdated: new Date()
                });
            } else {
                // Create new score document
                await setDoc(userScoreRef, {
                    userId: user.uid,
                    username: user.username,
                    hangmanScore: newScore,
                    lastUpdated: new Date()
                });
            }
            console.log("Score updated successfully!");
        } catch (error) {
            console.error("Error updating score:", error);
        }
    };

    const resetGame = () => {
        setCorrectLetters([]);
        setUsedLetters([]);
        setWrongGuessCount(0);
        setCorrectGuessCount(0);
        setIsGameOver(false);
        setIsVictory(false);
        getRandomWord();
    };

    const getRandomWord = () => {
        const randomItem = wordList[Math.floor(Math.random() * wordList.length)];
        setCurrentWord(randomItem.word);
        setHint(randomItem.hint);
    };

    const gameOver = (isVictory) => {
        setIsGameOver(true);
        setIsVictory(isVictory);
        
        // Update final score in database when game ends
        if (isVictory) {
            updateScoreInDatabase(correctGuessCount);
        }
    };

    const initGame = (clickedLetter) => {
        if (usedLetters.includes(clickedLetter) || isGameOver) return;
        
        // Add to used letters regardless of correct/incorrect
        setUsedLetters(prev => [...prev, clickedLetter]);

        if (currentWord.includes(clickedLetter)) {
            // Update correct letters
            const updatedCorrectLetters = [...correctLetters, clickedLetter];
            setCorrectLetters(updatedCorrectLetters);
            
            // Increment correct guess count
            const newCorrectCount = correctGuessCount + 1;
            setCorrectGuessCount(newCorrectCount);
            
            // Check for victory
            const word = currentWord.split("");
            const isAllLettersGuessed = word.every(letter => updatedCorrectLetters.includes(letter));
            if (isAllLettersGuessed) {
                gameOver(true);
            }
        } else {
            // Update wrong guess count
            const newWrongGuessCount = wrongGuessCount + 1;
            setWrongGuessCount(newWrongGuessCount);
            
            // Check for game over
            if (newWrongGuessCount === maxGuesses) {
                gameOver(false);
            }
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#5E63BA] text-gray-800">
            <GameNavbar />
            
            {/* Game Modal */}
            <div className={`fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-400 ${isGameOver ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                <div className="bg-white rounded-lg p-8 max-w-md w-full text-center shadow-xl">
                    <img 
                        src={isVictory ? victoryGif : lostGif} 
                        alt={isVictory ? "Victory" : "Game Over"} 
                        className="max-w-[130px] mx-auto mb-5"
                    />
                    <h4 className="text-2xl font-bold mb-2">{isVictory ? "Congrats!" : "Game Over!"}</h4>
                    <p className="text-lg font-medium mb-6">
                        {isVictory ? "You found the word: " : "The correct word was: "}
                        <b className="text-[#5E63BA] font-semibold">{currentWord}</b>
                    </p>
                    <button 
                        className="bg-[#5E63BA] hover:bg-[#8286c9] text-white font-semibold py-3 px-6 rounded uppercase transition-colors duration-200"
                        onClick={resetGame}
                    >
                        Play Again
                    </button>
                </div>
            </div>
            
            {/* Top Navigation Bar with Back Button and Score */}
            <div className="container mx-auto px-4 mt-6">
                <div className="w-full flex justify-between items-center mb-5">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                        onClick={() => navigate('/')}
                    >
                        ← Back to Menu
                    </button>
                    <div className="text-white font-bold">
                        <h4 className="text-lg">Correct Guesses: <span className="text-yellow-300">{correctGuessCount}</span></h4>
                    </div>
                </div>
            </div>
            
            <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-6">
                {/* Main Game Container */}
                <div className="bg-white rounded-lg p-8 lg:w-2/3 shadow-lg">
                    <div className="flex flex-col md:flex-row gap-10 justify-between">
                        {/* Hangman Image Section */}
                        <div className="flex flex-col items-center">
                            <div className="hangman-box">
                                <img 
                                    src={hangmanImages[wrongGuessCount]} 
                                    alt="hangman" 
                                    className="max-w-[270px] select-none"
                                    draggable="false"
                                />
                            </div>
                            <h1 className="text-xl font-bold uppercase mt-5">Hangman Game</h1>
                        </div>
                        
                        {/* Game Box Section */}
                        <div className="game-box flex-1">
                            {/* Word Display - Moved Down and Contained */}
                            <div className="flex justify-center mt-4 overflow-hidden">
                                <ul className="flex flex-wrap justify-center gap-2 mb-8 px-2 max-w-full">
                                    {currentWord.split("").map((letter, index) => (
                                        <li 
                                            key={index} 
                                            className={`w-7 text-center text-2xl font-semibold uppercase border-b-[3px] border-black ${
                                                correctLetters.includes(letter) 
                                                    ? "border-transparent mb-9 bg-green-100"
                                                    : "mb-10"
                                            }`}
                                        >
                                            {correctLetters.includes(letter) ? letter : ""}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            {/* Hint Text */}
                            <h4 className="text-center text-lg font-medium mb-4">
                                Hint: <b>{hint}</b>
                            </h4>
                            
                            {/* Guesses Text */}
                            <h4 className="text-center text-lg font-medium mb-4">
                                Incorrect guesses: <b className="text-red-600">{wrongGuessCount} / {maxGuesses}</b>
                            </h4>
                            
                            {/* Keyboard */}
                            <div className="grid grid-cols-9 gap-1 mt-10">
                                {Array.from({ length: 26 }, (_, i) => {
                                    const letter = String.fromCharCode(97 + i);
                                    const isUsed = usedLetters.includes(letter);
                                    const isCorrect = correctLetters.includes(letter);
                                    
                                    return (
                                        <button 
                                            key={i}
                                            onClick={() => initGame(letter)}
                                            disabled={isUsed || isGameOver}
                                            className={`
                                                font-semibold p-2 rounded uppercase transition-colors
                                                ${isUsed 
                                                    ? isCorrect 
                                                        ? "bg-green-600 text-white cursor-not-allowed" 
                                                        : "bg-gray-500 text-white cursor-not-allowed"
                                                    : "bg-[#5E63BA] hover:bg-[#8286c9] text-white"
                                                }
                                            `}
                                        >
                                            {letter}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Sidebar Content */}
                <div className="lg:w-1/3 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">🏆 Leaderboard</h2>
                        <div className="h-64 overflow-y-auto">
                            <LeaderboardSection
                                gameId="hangman"
                                username={user.username}
                                currentScore={{ score: correctGuessCount }}
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