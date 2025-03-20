const express = require('express');
const { body } = require('express-validator');
const multiplayerController = require('../controllers/multiplayerController');

const router = express.Router();

router.post('/update', [
    body('email').isEmail(),
    body('game').notEmpty(),
    body('won').isBoolean()
], multiplayerController.updateStats);

router.get('/:email', multiplayerController.getStats);
router.get('/all', multiplayerController.getAllStats);

module.exports = router;