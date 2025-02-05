const express = require('express');
const router = express.Router();
const scoreController = require('../controllers/scoreController');

router.put('/:id/score', scoreController.updateGameScore);
router.post('/dashboard/game/:id/score', scoreController.submitFinalScore);
router.get('/dashboard/leaderboard/:gameId', scoreController.getLeaderboard);

module.exports = router;