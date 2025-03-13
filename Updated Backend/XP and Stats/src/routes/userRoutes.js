const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/stats/:email', userController.getAllStats);

module.exports = router;