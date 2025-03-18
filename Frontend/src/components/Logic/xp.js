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
      if (score >= threshold) return gameXP[threshold];
    }
    return gameXP.default;
  };
  
  // Game over pe XP calculate aur API mein add
  const addXPToAPI = async (gameId, score, email) => {
    const xp = calculateXP(gameId, score);
    try {
      const response = await fetch('/api/xp/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, xpAmount: xp }),
      });
      const data = await response.json();
      console.log('XP Added:', data);
      return data;
    } catch (error) {
      console.error('Error adding XP:', error);
      throw error;
    }
  };
  
  export { calculateXP, addXPToAPI };