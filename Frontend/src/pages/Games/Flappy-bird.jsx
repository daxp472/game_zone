import React, { useState, useEffect, useRef } from 'react';
import GameNavbar from '../../components/GameNavbar';
import GameFooter from '../../components/Footer';
import LeaderboardSection from '../../components/Leaderboard';
import { useAuth } from '../../contexts/AuthContext';

// Components
const Navbar = () => (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="text-xl font-bold">Flappy Bird</div>
        <div className="flex gap-4">
            <button className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600">Leaderboard</button>
            <button className="px-3 py-1 bg-green-500 rounded hover:bg-green-600">Settings</button>
        </div>
    </nav>
);

const Footer = () => (
    <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© 2025 Flappy Bird Clone | Created with React</p>
    </footer>
);

const Bird = ({ position, gameOver, flapping }) => (
    <div
        className={`absolute left-1/4 w-12 h-12 transition-transform ${gameOver ? 'rotate-180' : flapping ? 'rotate-12' : 'rotate-0'
            }`}
        style={{ top: position }}
    >
        <div className="relative w-full h-full">
            {/* Bird body */}
            <div className="absolute inset-0 bg-yellow-400 rounded-full"></div>

            {/* Bird eye */}
            <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full">
                <div className="absolute top-1 right-1 w-1 h-1 bg-black rounded-full"></div>
            </div>

            {/* Bird beak */}
            <div className="absolute top-5 right-0 w-4 h-2 bg-orange-500"></div>

            {/* Bird wing */}
            <div className={`absolute bottom-2 left-0 w-6 h-3 bg-yellow-600 rounded-full transform origin-right ${flapping ? 'rotate-12' : '-rotate-12'} transition-transform`}></div>
        </div>
    </div>
);

const Obstacle = ({ height, left, gap, gameHeight, width }) => (
    <>
        {/* Top pipe */}
        <div
            className="absolute bg-green-600 border-r-4 border-l-4 border-t-4 border-green-800"
            style={{ height, width, left }}
        >
            <div className="absolute bottom-0 w-full h-4 bg-green-800"></div>
        </div>

        {/* Bottom pipe */}
        <div
            className="absolute bg-green-600 border-r-4 border-l-4 border-b-4 border-green-800"
            style={{
                height: gameHeight ? gameHeight - height - gap : 0,
                width,
                top: height + gap,
                left,
            }}
        >
            <div className="absolute top-0 w-full h-4 bg-green-800"></div>
        </div>
    </>
);

const FlappyBird = () => {
    const [birdPosition, setBirdPosition] = useState(250);
    const [gameStart, setGameStart] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [obstacles, setObstacles] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [flapping, setFlapping] = useState(false);
    const [showTips, setShowTips] = useState(false);
    const [gameSpeed, setGameSpeed] = useState(5);
    const [difficultyLevel, setDifficultyLevel] = useState('Medium');

    const gameContainerRef = useRef(null);
    const birdRef = useRef(null);
    const gameLoopRef = useRef(null);
    const obstacleGeneratorRef = useRef(null);

    const gravity = 3;
    const jumpStrength = 50;
    const obstacleWidth = 60;
    const obstacleGap = 180;

    // Initialize the game
    useEffect(() => {
        // Load high score from localStorage
        const savedHighScore = localStorage.getItem('flappyBirdHighScore');
        if (savedHighScore) {
            setHighScore(parseInt(savedHighScore));
        }

        // Add keyboard event listener
        const handleKeyDown = (e) => {
            if (e.code === 'Space') {
                handleJump();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Generate initial obstacle when game starts
    useEffect(() => {
        if (gameStart && obstacles.length === 0) {
            // Create the first obstacle
            const containerHeight = gameContainerRef.current?.clientHeight || 600;
            const initialHeight = Math.random() * (containerHeight - obstacleGap - 100) + 50;
            setObstacles([
                {
                    height: initialHeight,
                    left: gameContainerRef.current?.clientWidth || 500,
                    passed: false,
                }
            ]);
        }
    }, [gameStart, obstacles.length]);

    // Main game loop
    useEffect(() => {
        // Clear any existing intervals when component unmounts or game state changes
        if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        if (obstacleGeneratorRef.current) clearInterval(obstacleGeneratorRef.current);

        if (gameStart && !gameOver) {
            let frameCount = 0;

            // Game physics and collision detection loop
            gameLoopRef.current = setInterval(() => {
                // Apply gravity to bird
                setBirdPosition((pos) => {
                    const containerHeight = gameContainerRef.current?.clientHeight || 600;
                    const newPos = Math.min(pos + gravity, containerHeight - 50);

                    // Check for floor collision
                    if (newPos >= containerHeight - 50) {
                        setGameOver(true);
                        setGameStart(false);
                        return newPos;
                    }

                    return newPos;
                });

                // Move obstacles and check collisions
                setObstacles((currentObstacles) => {
                    // If there are no obstacles, don't do anything
                    if (currentObstacles.length === 0) return currentObstacles;

                    return currentObstacles.map((obstacle) => {
                        // Move the obstacle left
                        const newLeft = obstacle.left - gameSpeed;

                        // Check if obstacle is passing the bird position (for scoring)
                        if (obstacle.left > 100 && newLeft <= 100 && !obstacle.passed) {
                            setScore((prevScore) => {
                                const newScore = prevScore + 1;
                                if (newScore > highScore) {
                                    setHighScore(newScore);
                                    localStorage.setItem('flappyBirdHighScore', newScore.toString());
                                }

                                // Increase game speed based on score
                                if (newScore % 5 === 0 && gameSpeed < 10) {
                                    setGameSpeed((prevSpeed) => Math.min(prevSpeed + 0.5, 10));
                                }

                                return newScore;
                            });
                            return { ...obstacle, left: newLeft, passed: true };
                        }

                        // If obstacle is offscreen, remove it
                        if (newLeft < -obstacleWidth) {
                            return null;
                        }

                        // Just move the obstacle
                        return { ...obstacle, left: newLeft };
                    }).filter(Boolean); // Remove null obstacles
                });

                // Collision detection
                const birdElement = birdRef.current;
                const containerElement = gameContainerRef.current;

                if (birdElement && containerElement) {
                    const birdRect = birdElement.getBoundingClientRect();
                    const containerRect = containerElement.getBoundingClientRect();

                    // Check for collisions with obstacles
                    obstacles.forEach((obstacle) => {
                        // Only check obstacles that are near the bird
                        if (obstacle.left > 50 && obstacle.left < 150) {
                            const topPipeBottom = obstacle.height;
                            const bottomPipeTop = obstacle.height + obstacleGap;

                            // Bird's position relative to game container
                            const birdTop = birdPosition;
                            const birdBottom = birdPosition + 50;

                            // Check collision with top pipe
                            if (birdTop < topPipeBottom) {
                                setGameOver(true);
                                setGameStart(false);
                            }

                            // Check collision with bottom pipe
                            if (birdBottom > bottomPipeTop) {
                                setGameOver(true);
                                setGameStart(false);
                            }
                        }
                    });
                }

                // Wing flapping animation
                frameCount++;
                if (frameCount % 10 === 0) {
                    setFlapping((prev) => !prev);
                }
            }, 30);

            // Obstacle generator loop
            obstacleGeneratorRef.current = setInterval(() => {
                const containerElement = gameContainerRef.current;
                if (containerElement) {
                    // Only generate a new obstacle if the last one has moved some distance
                    setObstacles((currentObstacles) => {
                        const lastObstacle = currentObstacles[currentObstacles.length - 1];

                        // Check if we need to add a new obstacle
                        if (!lastObstacle || lastObstacle.left < containerElement.clientWidth - 250) {
                            const height = Math.random() * (containerElement.clientHeight - obstacleGap - 100) + 50;
                            return [
                                ...currentObstacles,
                                {
                                    height,
                                    left: containerElement.clientWidth,
                                    passed: false,
                                }
                            ];
                        }

                        return currentObstacles;
                    });
                }
            }, 2000); // Generate obstacles every 2 seconds
        }

        // Cleanup function
        return () => {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
            if (obstacleGeneratorRef.current) clearInterval(obstacleGeneratorRef.current);
        };
    }, [gameStart, gameOver, gameSpeed]);

    const handleJump = () => {
        if (gameOver) {
            resetGame();
            return;
        }

        if (!gameStart) {
            setGameStart(true);
        }

        if (birdPosition > 0) {
            setBirdPosition((pos) => Math.max(pos - jumpStrength, 0));
        }
    };

    const resetGame = () => {
        setBirdPosition(250);
        setObstacles([]);
        setScore(0);
        setGameOver(false);
        setGameStart(false); // Reset to start screen
        setGameSpeed(5);
    };

    const toggleTips = () => {
        setShowTips(!showTips);
    };

    const changeDifficulty = (level) => {
        switch (level) {
            case 'Easy':
                setGameSpeed(3);
                break;
            case 'Medium':
                setGameSpeed(5);
                break;
            case 'Hard':
                setGameSpeed(8);
                break;
            default:
                setGameSpeed(5);
        }
        setDifficultyLevel(level);
    };





    const { user } = useAuth();

    return (
        <div className="flex flex-col h-screen">
            <GameNavbar />
            <Navbar />

            <div className="flex-grow flex">
                <div className="w-3/4 h-full relative">
                    {/* Game container */}
                    <div
                        ref={gameContainerRef}
                        onClick={handleJump}
                        className="w-full h-full relative bg-gradient-to-b from-blue-300 to-blue-500 overflow-hidden cursor-pointer"
                    >
                        {/* Clouds */}
                        <div className="absolute top-10 left-20 w-20 h-10 bg-white rounded-full"></div>
                        <div className="absolute top-40 left-80 w-24 h-12 bg-white rounded-full"></div>
                        <div className="absolute top-20 right-40 w-16 h-8 bg-white rounded-full"></div>

                        {/* Bird */}
                        <div ref={birdRef}>
                            <Bird position={birdPosition} gameOver={gameOver} flapping={flapping} />
                        </div>

                        {/* Obstacles */}
                        {obstacles.map((obstacle, index) => (
                            <Obstacle
                                key={index}
                                height={obstacle.height}
                                left={obstacle.left}
                                gap={obstacleGap}
                                gameHeight={gameContainerRef.current?.clientHeight}
                                width={obstacleWidth}
                            />
                        ))}

                        {/* Ground */}
                        <div className="absolute bottom-0 w-full h-16 bg-gradient-to-b from-green-600 to-green-800"></div>

                        {/* Score display */}
                        <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
                            Score: {score}
                        </div>

                        {/* High score display */}
                        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
                            High Score: {highScore}
                        </div>

                        {/* Game over overlay */}
                        {gameOver && (
                            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center flex-col">
                                <div className="text-white text-5xl font-bold mb-6">Game Over!</div>
                                <div className="text-white text-3xl mb-8">Score: {score}</div>
                                <button
                                    onClick={resetGame}
                                    className="px-6 py-3 bg-yellow-500 text-black text-xl font-bold rounded-full hover:bg-yellow-400 transition-colors"
                                >
                                    Play Again
                                </button>
                            </div>
                        )}

                        {/* Start screen */}
                        {!gameStart && !gameOver && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center flex-col">
                                <div className="text-white text-5xl font-bold mb-6">Flappy Bird</div>
                                <div className="text-white text-xl mb-8">Click or press Space to start</div>
                                <button
                                    onClick={() => setGameStart(true)}
                                    className="px-6 py-3 bg-yellow-500 text-black text-xl font-bold rounded-full hover:bg-yellow-400 transition-colors"
                                >
                                    Start Game
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Side panel */}
                <div className="w-1/4 p-4 bg-gray-100 flex flex-col">
                    <h2 className="text-2xl font-bold mb-4">Game Stats</h2>

                    <div className="bg-white p-4 rounded-lg shadow mb-4">
                        <div className="mb-2"><span className="font-bold">Current Score:</span> {score}</div>
                        <div className="mb-2"><span className="font-bold">High Score:</span> {highScore}</div>
                        <div className="mb-2"><span className="font-bold">Difficulty:</span> {difficultyLevel}</div>
                    </div>

                    <h3 className="text-xl font-bold mb-2">Controls</h3>
                    <div className="bg-white p-4 rounded-lg shadow mb-4">
                        <ul className="list-disc pl-4">
                            <li className="mb-1">Click or tap to jump</li>
                            <li className="mb-1">Press Space to jump</li>
                        </ul>
                    </div>

                    <h3 className="text-xl font-bold mb-2">Difficulty</h3>
                    <div className="bg-white p-4 rounded-lg shadow mb-4 flex gap-2">
                        <button
                            onClick={() => changeDifficulty('Easy')}
                            className={`px-3 py-1 rounded ${difficultyLevel === 'Easy' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                        >
                            Easy
                        </button>
                        <button
                            onClick={() => changeDifficulty('Medium')}
                            className={`px-3 py-1 rounded ${difficultyLevel === 'Medium' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
                        >
                            Medium
                        </button>
                        <button
                            onClick={() => changeDifficulty('Hard')}
                            className={`px-3 py-1 rounded ${difficultyLevel === 'Hard' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
                        >
                            Hard
                        </button>
                    </div>

                    <button
                        onClick={toggleTips}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-4"
                    >
                        {showTips ? 'Hide Tips' : 'Show Tips'}
                    </button>

                    {showTips && (
                        <div className="bg-white p-4 rounded-lg shadow mb-4 flex-grow overflow-y-auto">
                            <h3 className="text-lg font-bold mb-2">Tips & Tricks</h3>
                            <ul className="list-disc pl-4">
                                <li className="mb-2">Tap lightly to maintain a steady height</li>
                                <li className="mb-2">Try to anticipate obstacles early</li>
                                <li className="mb-2">Keep a rhythm with your jumps</li>
                                <li className="mb-2">Don't panic when passing through tight gaps</li>
                                <li className="mb-2">The game speeds up as your score increases</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>


            <div className="flex m-10 space-x-10">
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        Pro Tips
                    </h2>
                    <div className="bg-white rounded-xl shadow-xl p-6 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
                        <h3 className="text-lg font-bold mb-2 text-blue-700">Getting Started</h3>
                        <ul className="list-disc pl-4 text-gray-700">
                            <li className="mb-2">Click or tap to jump and navigate the bird through the obstacles.</li>
                            <li className="mb-2">Press Space to jump and control the bird's movement.</li>
                            <li className="mb-2">The game starts with a gentle pace, but as you progress, the speed increases, and the obstacles become more challenging.</li>
                        </ul>

                        <h3 className="text-lg font-bold mb-2 text-blue-700">Scoring and Progression</h3>
                        <ul className="list-disc pl-4 text-gray-700">
                            <li className="mb-2">Each time you pass through an obstacle, you earn a point.</li>
                            <li className="mb-2">Your score is displayed at the top-left corner of the game screen.</li>
                            <li className="mb-2">As you accumulate points, your high score is updated and displayed at the top-right corner of the game screen.</li>
                        </ul>

                        <h3 className="text-lg font-bold mb-2 text-blue-700">Tips and Tricks</h3>
                        <ul className="list-disc pl-4 text-gray-700">
                            <li className="mb-2">Tap lightly to maintain a steady height and avoid crashing into obstacles.</li>
                            <li className="mb-2">Try to anticipate obstacles early and plan your jumps accordingly.</li>
                            <li className="mb-2">Keep a rhythm with your jumps to maintain a consistent pace and avoid mistakes.</li>
                            <li className="mb-2">Don't panic when passing through tight gaps – stay focused and time your jumps carefully.</li>
                        </ul>

                        <h3 className="text-lg font-bold mb-2 text-blue-700">Difficulty Levels</h3>
                        <ul className="list-disc pl-4 text-gray-700">
                            <li className="mb-2">Easy: A gentle pace with plenty of time to react to obstacles.</li>
                            <li className="mb-2">Medium: A moderate pace with a balance between challenge and forgiveness.</li>
                            <li className="mb-2">Hard: A fast-paced and challenging mode for experienced players.</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-xl p-6 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        🏆 Leaderboard
                    </h2>

                    <LeaderboardSection
                        gameId="Flappy-bird"
                        username={user.username}
                        currentScore={score}
                    />
                </div>
            </div>


            <Footer />
            <GameFooter />
        </div >
    );
};

export default FlappyBird;