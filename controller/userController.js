const asyncHandler = require("express-async-handler");
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// REGISTER USER
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, fullName } = req.body;
    if (!username || !email || !password || !fullName) {
        res.status(400);
        throw new Error("Please provide all fields");
    }
    const existingUser = await User.findOne({ email: email })
    if (existingUser) {
        res.status(400);
        throw new Error("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        fullName
    })

    console.log(`User Created ${user}`)
    if (user) {
        res.status(201).json({
            _id: user.id,
            email: user.email
        })
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
})



// LOGIN USER
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please provide all fields");
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {

        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "50m" })
        res.status(200).json({
            accessToken
        })
    } else {
        res.status(401)
        throw new Error("Invalid email or password");
    }
})


// LOGOUT USER
const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie('token', { httpOnly: true });
    res.status(200).json({ success: true, message: "Logged out successfully" });
})


module.exports = { registerUser, loginUser, logoutUser };