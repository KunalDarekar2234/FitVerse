// ===============================
// BMI Calculator
// ===============================

const calculateBMI = (height, weight) => {

    const heightInMeter = height / 100;

    const bmi = weight / (heightInMeter * heightInMeter);

    return Number(bmi.toFixed(2));

};

// ===============================
// BMI Category
// ===============================

const getBMICategory = (bmi) => {

    if (bmi < 18.5) {
        return "Underweight";
    }

    if (bmi < 25) {
        return "Normal";
    }

    if (bmi < 30) {
        return "Overweight";
    }

    return "Obese";
};

// ===============================
// BMR Calculator
// ===============================

const calculateBMR = (age, gender, height, weight) => {

    let bmr;

    if (gender.toLowerCase() === "male") {

        bmr =
            (10 * weight) +
            (6.25 * height) -
            (5 * age) +
            5;

    } else {

        bmr =
            (10 * weight) +
            (6.25 * height) -
            (5 * age) -
            161;

    }

    return Math.round(bmr);

};

// ===============================
// TDEE Calculator
// ===============================

const calculateTDEE = (bmr, activityLevel) => {

    const activityFactors = {

        sedentary: 1.2,

        light: 1.375,

        moderate: 1.55,

        intermediate: 1.55,

        advanced: 1.725,

        "very active": 1.9

    };


    const factor = activityFactors[
        activityLevel.toLowerCase()
    ] || 1.2;


    return Math.round(bmr * factor);

};

module.exports = {
    calculateBMI,
    getBMICategory,
    calculateBMR,
    calculateTDEE
};