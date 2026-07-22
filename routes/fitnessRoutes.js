const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

const {
    createProfile,
    getProfile,
    updateProfile,
    deleteProfile
} = require("../controllers/fitnessController");

router.post(
    "/profile",
    protect,
    authorize("user"),
    createProfile
);

router.get(
    "/profile",
    protect,
    authorize("user"),
    getProfile
);

router.put(
    "/profile",
    protect,
    authorize("user"),
    updateProfile
);

router.delete(
    "/profile",
    protect,
    authorize("user"),
    deleteProfile
);

module.exports = router;