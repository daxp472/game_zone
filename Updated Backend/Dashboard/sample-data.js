// Switch to gamezone database
use gamezone;

// Games Collection
db.games.insertMany([
  {
    title: "2048",
    description: "Combine tiles to reach 2048! Test your strategy and math skills in this addictive puzzle game.",
    imageUrl: "https://play-lh.googleusercontent.com/g9oCJgXxoZzB-wUPNhRywzm4Ry6IzgA6Cn6Zv8jdfj5KGgmR6jKebP1QC5KoXVwn",
    gameUrl: "/games/2048",
    gameId: "game2048",
    active: true
  },
  {
    title: "Hangman",
    description: "Classic word guessing game. Guess the word before the hangman is complete!",
    imageUrl: "https://play-lh.googleusercontent.com/T9Xz2Xr8cMQClK9Io5d8bBZ5N2PT2Yv7J9Oy_JHuPh3t3F6S1JCVA_EQD6JMlLg",
    gameUrl: "/games/hangman",
    gameId: "gameHangman",
    active: true
  },
  {
    title: "Tic Tac Toe",
    description: "Classic X's and O's game. Challenge your friends or play against AI!",
    imageUrl: "https://play-lh.googleusercontent.com/zPxLgj5nvl20ahJV7aFC6S5mD8kii5CEEDj25j1P9CYAfXL9sdDuO-8eES0r4DhJHrU",
    gameUrl: "/games/xo",
    gameId: "gameXO",
    active: true
  }
]);

// Get the inserted game IDs
const game2048 = db.games.findOne({ title: "2048" })._id;
const gameHangman = db.games.findOne({ title: "Hangman" })._id;
const gameXO = db.games.findOne({ title: "Tic Tac Toe" })._id;

// Sample Scores Collection (for testing)
db.scores.insertMany([
  {
    username: "player1",
    gameId: game2048,
    score: 2048,
    rank: 1,
    gameType: "2048"
  },
  {
    username: "player2",
    gameId: gameHangman,
    score: 5,
    rank: 1,
    gameType: "hangman"
  },
  {
    username: "player3",
    gameId: gameXO,
    score: 10,
    rank: 1,
    gameType: "xo"
  }
]);