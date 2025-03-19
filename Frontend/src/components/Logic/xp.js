const API_URL = 'https://game-zone-xp-and-stats.onrender.com/api'; // Fixed double slash

const calculateXP = (gameId, score) => {
    const xpRules = {
        "2048": {
            100000: 5000, 75000: 4000, 50000: 3000, 25000: 2000, 10000: 1000,
            5000: 500, 2000: 200, 1000: 100, 500: 75, default: 50
        },
        "flappybird": {
            2000: 5000, 1500: 4000, 1000: 3000, 500: 2000, 250: 1000,
            100: 300, 50: 150, 20: 50, 10: 25, default: 10
        },
        "xo": {
            500: 25000, 400: 20000, 300: 15000, 200: 10000, 100: 5000,
            50: 2500, 25: 1250, 10: 500, 1: 50, default: 0
        },
    };

    const gameXP = xpRules[gameId] || { default: 50 };
    for (let threshold in gameXP) {
        if (score >= parseInt(threshold)) return gameXP[threshold];
    }
    return gameXP.default;
};

const addXPToAPI = async (gameId, score, email) => {
    const xp = calculateXP(gameId, score);
    try {
        const response = await fetch(`${API_URL}/xp/add`, { // Fixed endpoint
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, xpAmount: xp }),
        });
        if (!response.ok) throw new Error('Failed to add XP');
        const data = await response.json();
        console.log('XP Added:', data);
        return data;
    } catch (error) {
        console.error('Error adding XP:', error);
        throw error;
    }
};

const getXPFromAPI = async (email) => {
    try {
        const response = await fetch(`${API_URL}/xp/${email}`, { // Fixed endpoint
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error('Failed to get XP');
        const data = await response.json();
        console.log('XP Retrieved:', data);
        return data;
    } catch (error) {
        console.error('Error retrieving XP:', error);
        throw error;
    }
};

export { calculateXP, addXPToAPI, getXPFromAPI };