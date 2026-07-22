const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

const {
    getProfile
} = require("../controllers/userController");

router.get(
    "/profile",
    protect,
    authorize("user"),
    getProfile
);

module.exports = router;