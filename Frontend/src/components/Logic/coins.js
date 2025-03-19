const API_URL = 'https://game-zone-reward.onrender.com/api';

const calculateCoins = (gameId, score) => {
    const coinRules = {
        "2048": {
            100000: 500, 75000: 400, 50000: 300, 25000: 200, 10000: 100,
            5000: 50, 2000: 20, 1000: 10, 500: 7, default: 5
        },
        "flappybird": {
            2000: 500, 1500: 400, 1000: 300, 500: 200, 250: 100,
            100: 30, 50: 15, 20: 5, 10: 3, default: 2
        },
        "xo": {
            500: 2500, 400: 2000, 300: 1500, 200: 1000, 100: 500,
            50: 250, 25: 125, 10: 50, 1: 50, default: 0
        },
    };

    const gameCoins = coinRules[gameId] || { default: 5 };
    for (let threshold in gameCoins) {
        if (score >= parseInt(threshold)) return gameCoins[threshold];
    }
    return gameCoins.default;
};

const addCoinsToAPI = async (gameId, score, email) => {
    const coins = calculateCoins(gameId, score);
    try {
        const response = await fetch(`${API_URL}/coins/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, coinAmount: coins }),
        });
        if (!response.ok) throw new Error('Failed to add Coins');
        const data = await response.json();
        console.log('Coins Added:', data);
        return data;
    } catch (error) {
        console.error('Error adding Coins:', error);
        throw error;
    }
};

const getCoinsFromAPI = async (email) => {
    try {
        const response = await fetch(`${API_URL}/coins/get?email=${email}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error('Failed to get Coins');
        const data = await response.json();
        console.log('Coins Retrieved:', data);
        return data;
    } catch (error) {
        console.error('Error retrieving Coins:', error);
        throw error;
    }
};

const updateCoinsInAPI = async (email, newCoinAmount) => {
    try {
        const response = await fetch(`${API_URL}/coins/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, newCoinAmount }),
        });
        if (!response.ok) throw new Error('Failed to update Coins');
        const data = await response.json();
        console.log('Coins Updated:', data);
        return data;
    } catch (error) {
        console.error('Error updating Coins:', error);
        throw error;
    }
};

export { calculateCoins, addCoinsToAPI, getCoinsFromAPI, updateCoinsInAPI };