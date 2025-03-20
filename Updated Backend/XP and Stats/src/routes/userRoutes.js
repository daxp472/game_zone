const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/stats/:email', userController.getAllStats);
router.get('/leaderboard', userController.getGlobalLeaderboard);

module.exports = router;