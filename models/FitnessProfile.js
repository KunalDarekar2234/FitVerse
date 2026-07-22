const mongoose = require("mongoose");

const fitnessProfileSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    age: {
        type: Number,
        required: true
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true
    },

    height: {
        type: Number,
        required: true
    },

    weight: {
        type: Number,
        required: true
    },

    targetWeight: {
        type: Number,
        required: true
    },

    fitnessGoal: {
        type: String,
        enum: [
            "Weight Loss",
            "Weight Gain",
            "Muscle Gain",
            "Maintain Fitness"
        ],
        required: true
    },

    activityLevel: {
        type: String,
        enum: [
            "Beginner",
            "Intermediate",
            "Advanced"
        ],
        required: true
    },

    foodPreference: {
        type: String,
        enum: [
            "Veg",
            "Non-Veg",
            "Vegan"
        ],
        required: true
    },

    medicalConditions: {
        type: String,
        default: ""
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("FitnessProfile", fitnessProfileSchema);