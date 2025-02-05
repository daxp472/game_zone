const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.get('/games', gameController.getGames);
router.get('/game/:id', gameController.getGameDetails);

module.exports = router;