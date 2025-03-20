const Achievement = require('../models/achievementModel');
const { validationResult } = require('express-validator');

exports.addAchievement = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, game, position } = req.body;
        
        let userAchievements = await Achievement.findOne({ email });
        
        if (!userAchievements) {
            userAchievements = new Achievement({ email });
        }
        
        userAchievements.achievements.push({
            game,
            position,
            date: Date.now()
        });
        
        await userAchievements.save();
        
        res.json(userAchievements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAchievements = async (req, res) => {
    try {
        const userAchievements = await Achievement.findOne({ email: req.params.email });
        
        if (!userAchievements) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json(userAchievements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllAchievements = async (req, res) => {
    try {
        const allAchievements = await Achievement.find();
        res.json(allAchievements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};