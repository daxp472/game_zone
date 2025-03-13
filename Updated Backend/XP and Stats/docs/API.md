# API Documentation

## 🔑 Authentication
All endpoints use email as the primary identifier for user data.

## 📊 XP & Levels API

### Add XP
- **POST** `/api/xp/add`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "xpAmount": 100
  }
  ```
- **Response**:
  ```json
  {
    "email": "user@example.com",
    "xp": 1200,
    "level": 5,
    "last_updated": "2025-02-21T10:00:00Z"
  }
  ```

### Get XP
- **GET** `/api/xp/:email`
- **Response**: Same as above

## 🏆 Achievements API

### Add Achievement
- **POST** `/api/achievements/add`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "game": "Chess",
    "position": 1
  }
  ```
- **Response**:
  ```json
  {
    "email": "user@example.com",
    "achievements": [
      {
        "game": "Chess",
        "position": 1,
        "date": "2025-02-21T10:00:00Z"
      }
    ]
  }
  ```

### Get Achievements
- **GET** `/api/achievements/:email`
- **Response**: Same as above

## 🎮 Multiplayer Stats API

### Update Stats
- **POST** `/api/multiplayer/update`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "game": "Battle Royale",
    "won": true
  }
  ```
- **Response**:
  ```json
  {
    "email": "user@example.com",
    "games_played": [
      {
        "game": "Battle Royale",
        "matches": 51,
        "wins": 21,
        "losses": 30
      }
    ],
    "total_matches": 51,
    "win_ratio": 41.17
  }
  ```

### Get Stats
- **GET** `/api/multiplayer/:email`
- **Response**: Same as above

## 👤 Unified User Stats API

### Get All User Stats
- **GET** `/api/user/stats/:email`
- **Response**:
  ```json
  {
    "xp_stats": {
      "email": "user@example.com",
      "xp": 1200,
      "level": 5
    },
    "achievements": {
      "email": "user@example.com",
      "achievements": [...],
      "total_wins": 25,
      "total_losses": 10
    },
    "multiplayer_stats": {
      "email": "user@example.com",
      "games_played": [...],
      "total_matches": 60,
      "win_ratio": 25
    }
  }
  ```