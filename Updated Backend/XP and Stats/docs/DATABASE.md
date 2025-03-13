# Database Schema Documentation

## 📊 Collections Overview

All collections use email as the primary identifier for user data management.

### XP Levels Collection
```javascript
{
  email: String,          // Primary identifier
  xp: Number,            // Total experience points
  level: Number,         // Current level
  last_updated: Date     // Last update timestamp
}
```

#### Level Thresholds
- Level 2: 100 XP
- Level 3: 400 XP
- Level 4: 1000 XP
- Level 5: 3000 XP
(continues up to Level 50)

### Achievements Collection
```javascript
{
  email: String,          // Primary identifier
  achievements: [{
    game: String,        // Game name
    position: Number,    // Ranking position
    date: Date          // Achievement date
  }],
  total_wins: Number,    // Total wins across all games
  total_losses: Number   // Total losses across all games
}
```

### Multiplayer Stats Collection
```javascript
{
  email: String,          // Primary identifier
  games_played: [{
    game: String,        // Game name
    matches: Number,     // Total matches played
    wins: Number,        // Total wins
    losses: Number      // Total losses
  }],
  total_matches: Number, // Total matches across all games
  win_ratio: Number     // Overall win percentage
}
```

## 🔗 Relationships

All collections are linked through the user's email address, enabling:
- Cross-collection queries
- Unified stat retrieval
- Consistent user identification

## 📈 Indexes

- Email index on all collections for fast lookups
- Compound indexes on achievements for game-specific queries
- Date indexes for temporal queries

## 🔒 Data Validation

- Email format validation
- Required field checks
- Numeric constraints on stats
- Date format validation