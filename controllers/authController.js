// const User = require("../models/User");
// const bcrypt = require("bcrypt");

// const registerUser = async (req, res) => {
//     try {

//         // Step 1: Get data from request body
//         const { fullName, email, password } = req.body;

//         // Step 2: Validate input
//         if (!fullName || !email || !password) {
//             return res.status(400).json({
//                 success: false,
//                 message: "All fields are required."
//             });
//         }

//         // Step 3: Check if email already exists
//         const existingUser = await User.findOne({ email });

//         if (existingUser) {
//             return res.status(409).json({
//                 success: false,
//                 message: "Email already registered."
//             });
//         }

//         // Step 4: Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Step 5: Create new user
//         const user = await User.create({
//             fullName,
//             email,
//             password: hashedPassword
//         });

//         // Step 6: Send success response
//         return res.status(201).json({
//             success: true,
//             message: "User registered successfully.",
//             user
//         });

//     } catch (error) {

//         console.error(error);

//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error"
//         });

//     }
// };

// module.exports = {
//     registerUser
// };


const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// =====================
// Register User
// =====================
const registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// =====================
// Login User
// =====================
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            data: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    registerUser,
    loginUser
};