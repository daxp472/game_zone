# GameZone Dashboard Backend

A Node.js/Express backend for a gaming platform featuring 2048, Hangman, and Tic Tac Toe games with leaderboard functionality.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env`:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   ```

3. Import sample data:
   ```bash
   mongosh your_mongodb_uri sample-data.js
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## Game Scoring System

### 2048
- Score based on tile values and combinations
- Leaderboard ranks players by highest score achieved

### Hangman
- Score based on number of successful word completions
- Leaderboard ranks players by win count

### Tic Tac Toe (XO)
- Score based on number of wins
- Leaderboard ranks players by win count

## API Endpoints

### Games
- `GET /dashboard/games` - List all games
- `GET /dashboard/game/:id` - Get game details and leaderboard

### Scores
- `PUT /game/:id/score` - Update score during gameplay
- `POST /dashboard/game/:id/score` - Submit final score
- `GET /dashboard/leaderboard/:gameId` - Get game leaderboard

### Users
- `GET /user/:id` - Get user information

## Running in Development
Use `npm run dev` to start the server with nodemon for development.