const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json("All fields are required...");
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json("Email must be a valid email...");
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json("Password must be a strong password...");
        }

        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json("User with the given email already exists...");
        }

        user = new userModel({ name, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '2h',
        });
        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    } catch (error) {
        res.status(500).json("Internal Server Error");
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log('Email:', email);
    console.log('Password:', password);

    try {
        let user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json('Invalid email or password...');
        }
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            console.log('Invalid password');
            return res.status(400).json('Invalid email or password...');
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '2h',
        });

        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token
        });
    } catch (error) {
        res.status(500).json("Internal Server Error");
    }
}

const findUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json('Invalid ID format...');
    }

    try {
        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json("No user found...");
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json("Internal Server Error");
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();

        if (!users) {
            return res.status(404).json("No user found...");
        }

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json("Internal Server Error");
    }
}



module.exports = {
    registerUser,
    loginUser,
    findUser,
    getUsers
}
