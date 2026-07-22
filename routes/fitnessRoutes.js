const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

const {
    createProfile
} = require("../controllers/fitnessController");

router.post(
    "/profile",
    protect,
    authorize("user"),
    createProfile
);

module.exports = router;