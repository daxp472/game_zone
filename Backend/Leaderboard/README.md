# Leaderboard API Documentation

A robust, scalable API for managing game leaderboards with MongoDB.

## Features

- Dynamic game leaderboards
- Real-time score updates
- Pagination support
- Rate limiting
- Admin controls
- Input validation
- Error handling
- Unique user scores per game
- Automatic cleanup of old scores
- Tie-breaking by timestamp

## API Endpoints

### Submit Score
```http
POST /api/leaderboard/:gameId
```

Submit or update a score for a game. Only keeps the highest score per user.

**Request Body:**
```json
{
  "username": "player1",
  "score": 1000
}
```

**Response:**
```json
{
  "message": "Score submitted successfully"
}
```

### Get Leaderboard
```http
GET /api/leaderboard/:gameId?page=1&limit=10
```

Get the leaderboard for a specific game with pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 10, max: 100)

**Response:**
```json
{
  "scores": [
    {
      "username": "player1",
      "score": 1000,
      "timestamp": "2024-03-10T12:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "pages": 1,
    "hasMore": false
  }
}
```

### Reset Leaderboard (Admin Only)
```http
DELETE /api/leaderboard/:gameId
```

Reset the leaderboard for a specific game.

**Headers:**
```
admin-token: your-secure-admin-token
```

**Response:**
```json
{
  "message": "Leaderboard reset successfully"
}
```

## Features & Implementation Details

### Score Management
- Only one score per user per game
- Automatically updates if new score is submitted
- Keeps timestamp for tie-breaking
- Maintains only top 1000 scores per game

### Rate Limiting
- 100 score submissions per IP per 15 minutes
- GET requests not rate-limited for real-time updates

### Data Validation
- Username: 1-50 characters
- Score: Positive integers only
- GameID: 1-100 characters
- Page/Limit: Validated and bounded

### Error Handling
- Invalid inputs
- Duplicate usernames
- Database errors
- Rate limit exceeded
- Unauthorized admin actions

### Performance Optimizations
- Compound indexes for efficient queries
- Pagination for large datasets
- Automatic cleanup of low scores
- Efficient upsert operations

## Environment Variables

Create a `.env` file with:
```ini
MONGODB_URI=your_mongodb_connection_string
PORT=5000
ADMIN_TOKEN=your-secure-admin-token
```

## Database Schema

```javascript
{
  gameId: String,    // Game identifier
  username: String,  // Player name (1-50 chars)
  score: Number,     // Positive integer
  timestamp: Date    // Auto-generated
}
```

### Indexes
- `{ gameId: 1, score: -1, timestamp: -1 }` for efficient sorting
- `{ gameId: 1, username: 1 }` unique compound index

## Real-time Updates Example

```javascript
const fetchLeaderboard = async (gameId) => {
  try {
    const response = await fetch(`/api/leaderboard/${gameId}`);
    const data = await response.json();
    return data.scores;
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }
};

// Poll every 5 seconds
setInterval(() => fetchLeaderboard('game123'), 5000);
```