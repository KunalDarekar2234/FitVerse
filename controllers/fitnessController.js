const FitnessProfile = require("../models/FitnessProfile");

// ======================================
// Create Fitness Profile
// ======================================

const createProfile = async (req, res) => {

    try {

        const existingProfile = await FitnessProfile.findOne({
            user: req.user.id
        });

        if (existingProfile) {
            return res.status(400).json({
                success: false,
                message: "Fitness profile already exists"
            });
        }

        const profile = await FitnessProfile.create({

            user: req.user.id,

            age: req.body.age,
            gender: req.body.gender,
            height: req.body.height,
            weight: req.body.weight,
            targetWeight: req.body.targetWeight,
            fitnessGoal: req.body.fitnessGoal,
            activityLevel: req.body.activityLevel,
            foodPreference: req.body.foodPreference,
            medicalConditions: req.body.medicalConditions

        });

        res.status(201).json({
            success: true,
            message: "Fitness Profile Created Successfully",
            profile
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createProfile
};