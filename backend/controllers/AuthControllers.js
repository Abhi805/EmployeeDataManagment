const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            name,
            email,
            password: hashPassword,
            role
        });
        await newUser.save();
        res.status(201).json({
            message: 'User Register Successfully',
            success: true,
            user: newUser
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Signup Failed',
            success: false,
            error: error.message
        });
    }
};

const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'User not Found',
                success: false
            });
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credential'
            });
        }

        const token = jwt.sign({ id: user._id, role: user.role },
            process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login Successfully',
            success: true,
            token
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Login failed',
            success: false,
            error: error.message
        });
    }
};

module.exports = {registerUser,loginUser};