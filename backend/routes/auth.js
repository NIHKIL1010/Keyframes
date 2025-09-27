const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExist = await User.findOne({ email });
        if(userExist) return res.status(400).json({ message: 'User already exists' });
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered' });
    } catch(err) { res.status(500).json(err); }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({ message: 'User not found' });
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user });
    } catch(err) { res.status(500).json(err); }
});

module.exports = router;
