# GamesAndLeaderboard API

A Node.js/Express backend combining game listings and leaderboard functionality for a gaming platform featuring titles like 2048, Hangman, Tic Tac Toe, Flappy Bird, and Angry Birds.

## Table of Contents

* [Setup](#setup)
* [Features](#features)
* [API Endpoints](#api-endpoints)
* [Running in Development](#running-in-development)
* [Notes](#notes)

## Setup

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

Create a `.env` file in the root directory with:

```text
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/test
PORT=5000
ADMIN_TOKEN=your-secret-token
```

### Import Sample Data (Optional)

Use MongoDB shell to import game data:

```bash
mongosh your_mongodb_uri
```

Then paste the following in the shell (example from earlier):

```javascript
db.games.insertMany([
  {"gameId": "game2048", "title": "2048", "description": "Combine tiles to reach 2048!", "imageUrl": "https://res.cloudinary.com/dk16ymotz/image/upload/v1738820619/Site%20Images/io9r8l880wywavy4ynjg.webp", "gameUrl": "/games/2048", "active": true},
  {"gameId": "gameHangman", "title": "Hangman", "description": "Guess the word before the hangman is complete!", "imageUrl": "https://res.cloudinary.com/dk16ymotz/image/upload/v1739730302/Site%20Images/rgcnnruwnmmbaojasntf.jpg", "gameUrl": "/games/hangman", "active": true},
  // Add other games here...
]);
```

Leaderboard data can be populated via API calls.

### Start the Server

```bash
npm run dev
```

Uses nodemon for auto-restart during development.

## Features

### Games

* Fetch a list of active games with details like title, description, and URLs.
* Limited to 6 games per request for simplicity.

### Leaderboard

* Submit and retrieve scores for each game.
* Supports pagination and rate limiting for score submissions.
* Admin-only reset option for leaderboards.

## API Endpoints

### Games

#### GET /games

* Description: Fetch a list of active games.
* Response:

```json
[
  {
    "title": "2048",
    "description": "Combine tiles to reach 2048!",
    "imageUrl": "https://example.com/2048.jpg",
    "gameUrl": "/games/2048",
    "gameId": "game2048"
  },
  ...
]
```

* Status: 200 OK or 404 if no games found.

### Leaderboard

#### POST /api/leaderboard/:gameId

* Description: Submit a score for a game (rate-limited to 100 requests per 15 minutes per IP).
* Body:

```json
{
  "username": "player1",
  "score": 150
}
```

* Response:

```json
{ "message": "Score submitted successfully" }
```

* Status: 201 Created or 400 for validation errors.

#### GET /api/leaderboard/:gameId

* Description: Fetch leaderboard for a specific game.
* Query Params:
	+ page (optional, default: 1)
	+ limit (optional, default: 10, max: 100)
* Response:

```json
{
  "scores": [
    { "username": "player1", "score": 150, "timestamp": "2025-03-13T10:00:00Z" },
    ...
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "pages": 5,
    "hasMore": true
  }
}
```

* Status: 200 OK or 400 for invalid gameId.

#### DELETE /api/leaderboard/:gameId

* Description: Reset leaderboard for a game (admin only).
* Headers:
	+ admin-token: your-secret-token
* Response:

```json
{ "message": "Leaderboard reset successfully" }
```

* Status: 200 OK or 401 Unauthorized.

## Running in Development

Use the following command to start the server with live reloading:

```bash
npm run dev
```

## Notes

* Ensure MongoDB is running and accessible via the provided MONGODB_URI.
* Sample game data should be inserted before testing the /games endpoint.
* Leaderboard scores are capped at 1000 per gameId, with older scores cleaned up automatically.