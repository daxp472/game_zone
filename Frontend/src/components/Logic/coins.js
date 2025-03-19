import axios from 'axios';

const API_URL = 'https://game-zone-reward.onrender.com/api';

const calculateCoins = (gameId, score) => {
    const coinRules = {
        "2048": {
            100000: 500, 75000: 400, 50000: 300, 25000: 200, 10000: 100,
            5000: 50, 2000: 20, 1000: 10, 500: 7, 0: 5
        },
        "flappybird": {
            2000: 500, 1500: 400, 1000: 300, 500: 200, 250: 100,
            100: 30, 50: 15, 20: 5, 10: 3, 0: 2
        },
        "xo": {
            500: 2500, 400: 2000, 300: 1500, 200: 1000, 100: 500,
            50: 250, 25: 125, 10: 50, 1: 5, 0: 0
        },
    };

    const gameCoins = coinRules[gameId] || { 0: 5 };
    const thresholds = Object.keys(gameCoins).map(Number).sort((a, b) => b - a);
    for (let threshold of thresholds) {
        if (score >= threshold) return gameCoins[threshold];
    }
    return gameCoins[0];
};

const addCoinsToAPI = async (gameId, score, email) => {
    const coins = calculateCoins(gameId, score);
    try {
        const response = await axios.patch(`${API_URL}/reward/add-coins`, { email, coins });
        return response.data;
    } catch (error) {
        console.error('Error adding Coins:', error.response?.data || error.message);
        throw error;
    }
};

export { calculateCoins, addCoinsToAPI };