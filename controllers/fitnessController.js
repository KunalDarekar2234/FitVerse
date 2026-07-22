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


// ======================================
// Get Fitness Profile
// ======================================

const getProfile = async (req, res) => {

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

        return res.status(200).json({
            success: true,
            message: "Fitness Profile Fetched Successfully",
            profile
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ======================================
// Update Fitness Profile
// ======================================

const updateProfile = async (req, res) => {

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

        const updatedProfile = await FitnessProfile.findOneAndUpdate(
            {
                user: req.user.id
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        return res.status(200).json({
            success: true,
            message: "Fitness Profile Updated Successfully",
            profile: updatedProfile
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// ======================================
// Delete Fitness Profile
// ======================================

const deleteProfile = async (req, res) => {

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

        await FitnessProfile.findOneAndDelete({
            user: req.user.id
        });

        return res.status(200).json({
            success: true,
            message: "Fitness Profile Deleted Successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


module.exports = {
    createProfile,
    getProfile,
    updateProfile,
    deleteProfile
};