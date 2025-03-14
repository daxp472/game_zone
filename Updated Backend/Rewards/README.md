# Rewards API

This is a Node.js-based RESTful API built with Express and MongoDB to manage user login streaks and rewards. It tracks daily logins, streaks, and allows users to claim rewards based on their activity.

## Table of Contents

* [Features](#features)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Environment Variables](#environment-variables)
* [API Endpoints](#api-endpoints)
* [Data Schema](#data-schema)
* [Reward Logic](#reward-logic)
* [Usage Examples](#usage-examples)
* [Contributing](#contributing)
* [License](#license)

## Features

* Tracks daily login streaks for users.
* Awards daily and streak-based rewards (coins, cash, room cards).
* Resets streaks if a day is missed.
* Prevents duplicate reward claims.
* Configurable MongoDB connection and server port via .env.

## Prerequisites

* Node.js (v14 or higher)
* MongoDB (Local or MongoDB Atlas)
* npm (Node Package Manager)

## Installation

### Clone the repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### Install dependencies

```bash
npm install
```

### Set up environment variables

Create a `.env` file in the root directory with the following variables:

```makefile
MONGODB_URI=<your-mongodb-connection-string>
PORT=<desired-port>
```

* `MONGODB_URI`: MongoDB connection string (e.g., `mongodb://127.0.0.1:27017/Rewards` for local or MongoDB Atlas URL)
* `PORT`: Port for the server (default: 5000 if not specified)

### Example .env

MONGODB_URI=mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}
PORT=${process.env.PORT}


### Start the server

```bash
node index.js
```

## API Endpoints

### 1. User Login

* Endpoint: `POST /reward/login`
* Description: Logs a user in, updates their streak, and checks reward eligibility.
* Request Body:

```json
{
  "username": "string"
}
```

* Response:

#### Success (New User)

```json
{
  "message": "Welcome! Daily streak started.",
  "username": "user1",
  "lastLoginDate": "2025-03-14T00:00:00.000Z",
  "isDailyRewardEligible": true,
  "isStreakRewardEligible": false,
  "dailyStreak": 1,
  "totalStreak": 1,
  "rewardsClaimed": [],
  "dailyRewardsClaimed": [],
  "coin": 0,
  "cash": 0,
  "roomCards": 0
}
```

#### Success (Existing User)

```json
{
  "message": "Login successful!",
  "username": "user1",
  "lastLoginDate": "2025-03-14T00:00:00.000Z",
  "isDailyRewardEligible": true,
  "isStreakRewardEligible": false,
  "dailyStreak": 2,
  "totalStreak": 2,
  "rewardsClaimed": [],
  "dailyRewardsClaimed": [],
  "coin": 0,
  "cash": 0,
  "roomCards": 0
}
```

#### Already Logged In Today

```json
{
  "message": "Already logged in today.",
  "username": "user1",
  ...
}
```

### 2. Claim Reward

* Endpoint: `PATCH /reward/claim-reward`
* Description: Allows users to claim daily or streak rewards.
* Request Body:

```json
{
  "username": "string",
  "rewardType": "daily" | "streak"
}
```

* Response:

#### Success (Daily Reward)

```json
{
  "message": "Daily reward claimed!",
  "username": "user1",
  "coin": 30,
  "cash": 0,
  "dailyRewardsClaimed": [1],
  "isDailyRewardEligible": false,
  ...
}
```

#### Success (Streak Reward)

```json
{
  "message": "Streak reward claimed!",
  "username": "user1",
  "roomCards": 1,
  "rewardsClaimed": [10],
  "isStreakRewardEligible": false,
  ...
}
```

#### Error

```json
{
  "message": "Reward already claimed or not eligible."
}
```

### 3. Get User Reward Info

* Endpoint: `GET /reward/user/:username`
* Description: Retrieves reward details for a specific user.
* Parameters: `username` (in URL)
* Response:

#### Success

```json
{
  "username": "user1",
  "lastLoginDate": "2025-03-14T00:00:00.000Z",
  "isDailyRewardEligible": true,
  "isStreakRewardEligible": false,
  "dailyStreak": 2,
  "totalStreak": 2,
  "rewardsClaimed": [],
  "dailyRewardsClaimed": [],
  "coin": 30,
  "cash": 0,
  "roomCards": 0
}
```

#### Error

```json
{
  "message": "User not found."
}
```

## Data Schema

The Rewards collection in MongoDB follows this schema:

* `username`: String (required, unique)
* `lastLoginDate`: Date (default: null)
* `isDailyRewardEligible`: Boolean (default: false)
* `isStreakRewardEligible`: Boolean (default: false)
* `dailyStreak`: Number (default: 0)
* `totalStreak`: Number (default: 0)
* `rewardsClaimed`: Array of Numbers (default: [])
* `dailyRewardsClaimed`: Array of Numbers (default: [])
* `coin`: Number (default: 0)
* `cash`: Number (default: 0)
* `roomCards`: Number (default: 0)

## Reward Logic

### Daily Rewards

* Resets after 7 days.
* Rewards:
	+ Day 1: 30 coins
	+ Day 2: 40 coins
	+ Day 3: 10 cash
	+ Day 4: 50 coins
	+ Day 5: 60 coins
	+ Day 6: 20 cash
	+ Day 7: 30 cash

### Streak Rewards

* Awarded at milestones: 10, 20, 30 days.
* Rewards:
	+ 10 days: 1 room card
	+ 20 days: 2 room cards
	+ 30 days: 5 room cards
* Total streak resets after 30 days.

### Streak Rules

* Daily streak increases if login is consecutive (checked at 5:30 AM UTC).
* If a day is missed, daily streak resets to 1.

## Usage Examples

Using `curl` or Postman:

### Login

```bash
curl -X POST http://localhost:3002/reward/login -H "Content-Type: application/json" -d '{"username": "user1"}'
```

### Claim Daily Reward

```bash
curl -X PATCH http://localhost:3002/reward/claim-reward -H "Content-Type: application/json" -d '{"username": "user1", "rewardType": "daily"}'
```

### Get User Info

```bash
curl http://localhost:3002/reward/user/user1
```

## Contributing

Feel free to submit issues or pull requests. For major changes, please open an issue first to discuss.

## License

This project is licensed under the MIT License.