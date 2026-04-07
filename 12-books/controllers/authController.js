const UserModel = require('../models/userModel')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

require('dotenv').config()

const register = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // 🔑 token yarat
        const verificationToken = crypto.randomBytes(32).toString('hex');

        const newUser = new UserModel({
            username,
            password: hashedPassword,
            email,
            verificationToken
        });

        await newUser.save();

        // 🔗 link
        const link = `http://localhost:8080/api/auth/verify/${verificationToken}`;

        // ✉️ email göndər
        await sendEmail(
            email,
            "Email Verification",
            `<h2>Emailini təsdiqlə</h2>
             <a href="${link}">Təsdiqlə</a>`
        );

        res.status(201).json({
            message: 'User registered. Emailə bax və təsdiqlə!'
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email: email })
        if (!user) return res.status(400).json({
            message: 'Invalid email! or password!'
        })
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({
                message: 'invalid email or password!'
            })
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email,
            role: user.role,

        }, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.status(200).json({
            message: 'User logged in successfully',
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: token
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }


}
const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        const user = await UserModel.findOne({ verificationToken: token });

        if (!user) {
            return res.status(400).json({
                message: "Invalid token"
            });
        }

        user.isVerified = true;
        user.verificationToken = null;

        await user.save();

        res.send("Email successfully verified ✅");

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    register,
    login,
    verifyEmail
}