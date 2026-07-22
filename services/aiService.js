const {
    calculateBMI,
    getBMICategory,
    calculateBMR
} = require("../utils/fitnessCalculator");

// =======================================
// Analyze Fitness Profile
// =======================================


const analyzeFitness = (profile) => {

    const bmi = calculateBMI(
        profile.height,
        profile.weight
    );


    const bmiCategory = getBMICategory(bmi);


    const bmr = calculateBMR(
        profile.age,
        profile.gender,
        profile.height,
        profile.weight
    );


    return {
        bmi,
        bmiCategory,
        bmr
    };

};


module.exports = {
    analyzeFitness
};