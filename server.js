
// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const authRoutes = require("./routes/authRoutes");

// const connectDB = require("./config/db");

// // Load environment variables
// dotenv.config();

// // Connect Database
// const startServer = async ()=>{

//     await connectDB();

//     app.listen(PORT, () => {
//         console.log(`✅ Server running on http://localhost:${PORT}`);
//     });
// }
// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);

// // Test Route
// app.get("/", (req, res) => {
//     res.json({
//         success: true,
//         message: "🚀 Welcome to FitVerse API"
//     });
// });

// // Health Check
// app.get("/api/health", (req, res) => {
//     res.json({
//         success: true,
//         status: "Server Running",
//         database: "Connected"
//     });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`✅ Server running on http://localhost:${PORT}`);
// });




const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

// Load Environment Variables
dotenv.config();

const app = express();

// =======================
// Middlewares
// =======================
app.use(cors());
app.use(express.json());

// =======================
// Routes
// =======================
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "🚀 Welcome to FitVerse API"
    });
});

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running successfully"
    });
});

const protect = require("./middlewares/authMiddleware");

app.get("/api/profile", protect, (req, res) => {
    res.json({
        success: true,
        message: "Profile fetched successfully",
        user: req.user
    });
});


app.use("/api/auth", authRoutes);

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