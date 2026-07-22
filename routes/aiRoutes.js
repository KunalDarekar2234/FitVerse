const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

const {
    analyzeProfile
} = require("../controllers/aiController");

router.get(
    "/analyze",
    protect,
    authorize("user"),
    analyzeProfile
);

module.exports = router;