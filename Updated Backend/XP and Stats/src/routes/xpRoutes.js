const express = require('express');
const { body } = require('express-validator');
const xpController = require('../controllers/xpController');

const router = express.Router();

router.post('/add', [
    body('email').isEmail(),
    body('xpAmount').isInt({ min: 1 })
], xpController.addXP);

router.get('/:email', xpController.getXP);
router.get('/all', xpController.getAllXP);

module.exports = router;