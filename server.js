

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middlewares/authMiddleware");
const authorize = require("./middlewares/roleMiddleware");

const userRoutes = require("./routes/userRoutes");
const fitnessRoutes = require("./routes/fitnessRoutes");
const aiRoutes = require("./routes/aiRoutes");

// Load Environment Variables
dotenv.config();

const app = express();

// =======================
// Middlewares
// =======================
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/fitness", fitnessRoutes);
app.use("/api/ai", aiRoutes);


// =======================
// Routes
// =======================
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "🚀 Welcome to FitVerse API"
    });
});


// ================================
// Gym Owner Route
// ================================
app.get(
    "/api/gym",
    protect,
    authorize("gymOwner"),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: "Welcome Gym Owner"
        });
    }
);

// ================================
// Store Owner Route
// ================================
app.get(
    "/api/store",
    protect,
    authorize("storeOwner"),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: "Welcome Store Owner"
        });
    }
);

// ================================
// Delivery Partner Route
// ================================
app.get(
    "/api/delivery",
    protect,
    authorize("deliveryPartner"),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: "Welcome Delivery Partner"
        });
    }
);

// ================================
// Admin Route
// ================================
app.get(
    "/api/admin",
    protect,
    authorize("admin"),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: "Welcome Admin"
        });
    }
);


app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running successfully"
    });
});

app.get("/api/profile", protect, (req, res) => {
    res.json({
        success: true,
        message: "Profile fetched successfully",
        user: req.user
    });
});




// =======================
// Start Server
// =======================
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("❌ Failed to start server");
        console.error(error.message);
        process.exit(1);
    }
};

startServer();