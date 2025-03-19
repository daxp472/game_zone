const API_URL = 'https://game-zone-xp-and-stats.onrender.com/api';

const calculateXP = (gameId, score) => {
    const xpRules = {
        "2048": {
            100000: 5000, 75000: 4000, 50000: 3000, 25000: 2000, 10000: 1000,
            5000: 500, 2000: 200, 1000: 100, 500: 75, 0: 50
        },
        "flappybird": {
            2000: 5000, 1500: 4000, 1000: 3000, 500: 2000, 250: 1000,
            100: 300, 50: 150, 20: 50, 10: 25, 0: 10
        },
        "xo": {
            500: 25000, 400: 20000, 300: 15000, 200: 10000, 100: 5000,
            50: 2500, 25: 1250, 10: 500, 1: 50, 0: 0
        },
    };

    const gameXP = xpRules[gameId] || { 0: 50 };
    const thresholds = Object.keys(gameXP).map(Number).sort((a, b) => b - a);
    for (let threshold of thresholds) {
        if (score >= threshold) return gameXP[threshold];
    }
    return gameXP[0];
};

const addXPToAPI = async (gameId, score, email) => {
    const xp = calculateXP(gameId, score);
    try {
        const response = await fetch(`${API_URL}/xp/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, xpAmount: xp }),
        });
        if (!response.ok) throw new Error('Failed to add XP');
        return await response.json();
    } catch (error) {
        console.error('Error adding XP:', error);
        throw error;
    }
};

const getXPFromAPI = async (email) => {
    try {
        const response = await fetch(`${API_URL}/xp/${email}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error('Failed to get XP');
        return await response.json();
    } catch (error) {
        console.error('Error retrieving XP:', error);
        throw error;
    }
};

export { calculateXP, addXPToAPI, getXPFromAPI };