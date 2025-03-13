# Gaming Platform Backend Documentation

A robust Node.js and MongoDB backend for managing user gaming statistics, achievements, and experience points.

## 🎮 Core Features

- XP & Level System
- Achievements & Rankings
- Multiplayer Statistics
- Unified User Stats API

## 📚 Detailed Documentation

- [API Documentation](./docs/API.md) - Detailed API endpoints and usage
- [Database Schema](./docs/DATABASE.md) - MongoDB collections and relationships
- [System Architecture](./docs/ARCHITECTURE.md) - Backend architecture and components

## 🚀 Quick Start

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env`:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

## 🔑 Key Concepts

- **User Identification**: All user data is managed through email addresses as the primary identifier
- **Automatic Level Progression**: XP-based level calculation
- **Real-time Stats**: Instant updates for multiplayer games and achievements

## 📦 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Express Validator
- CORS
- Helmet
- Compression

## 🔐 Security Features

- Input validation
- CORS protection
- Helmet security headers
- Error handling middleware