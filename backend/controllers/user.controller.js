const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// User Register
const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Something wrong bad request."
            });
        };

        return res.status(201).json({
            success: true,
            message: "User register successful."
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    };
};

// User Login
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json({
                message: "Please enter a valid email."
            });
        };

        const comparePass = await bcrypt.compare(
            password,
            user.password
        );

        if (!comparePass) {
            return res.status(401).json({
                message: "Please enter a valid password."
            });
        };

        const token = await jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        return res.status(200).json({
            success: true,
            message: "User login successful.",
            token
        });

    } catch (error) {
        console.log("Login error", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    };
};

module.exports = {
    userRegister,
    userLogin
};