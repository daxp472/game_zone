const express = require('express');
const { body } = require('express-validator');
const achievementController = require('../controllers/achievementController');

const router = express.Router();

router.post('/add', [
    body('email').isEmail(),
    body('game').notEmpty(),
    body('position').isInt({ min: 1 })
], achievementController.addAchievement);

router.get('/:email', achievementController.getAchievements);
router.get('/all', achievementController.getAllAchievements);

module.exports = router;