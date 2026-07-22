const FitnessProfile = require("../models/FitnessProfile");
const { analyzeFitness } = require("../services/aiService");

// ======================================
// AI Fitness Analysis
// ======================================

const analyzeProfile = async (req, res) => {

    try {

        const profile = await FitnessProfile.findOne({
            user: req.user.id
        });

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Fitness Profile Not Found"
            });
        }

        const report = analyzeFitness(profile);

        return res.status(200).json({
            success: true,
            message: "AI Analysis Completed",
            report
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    analyzeProfile
};