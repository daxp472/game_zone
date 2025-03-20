require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const connectDB = require('./config/db');

// Import routes
const xpRoutes = require('./routes/xpRoutes');
const achievementRoutes = require('./routes/achievementRoutes');
const multiplayerRoutes = require('./routes/multiplayerRoutes');
const userRoutes = require('./routes/userRoutes');

// Initialize express
const app = express();

// Connect to MongoDB
connectDB();

// CORS configuration
const corsOptions = {
    origin: '*', // In production, replace with specific origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

// Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(compression());
app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Routes
app.use('/api/xp', xpRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/multiplayer', multiplayerRoutes);
app.use('/api/user', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});