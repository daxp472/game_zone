const XpLevel = require('../models/xpModel');
const { validationResult } = require('express-validator');

exports.addXP = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, xpAmount } = req.body;
        
        let userXP = await XpLevel.findOne({ email });
        
        if (!userXP) {
            userXP = new XpLevel({ email });
        }
        
        userXP.xp += xpAmount;
        userXP.level = userXP.calculateLevel();
        userXP.last_updated = Date.now();
        
        await userXP.save();
        
        res.json(userXP);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getXP = async (req, res) => {
    try {
        const userXP = await XpLevel.findOne({ email: req.params.email });
        
        if (!userXP) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json(userXP);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllXP = async (req, res) => {
    try {
        const allXP = await XpLevel.find();
        res.json(allXP);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};