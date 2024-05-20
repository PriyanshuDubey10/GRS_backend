const jwt = require('jsonwebtoken');
const User = require('../model/user');

// Function to generate token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = new User({ name, email, password });
        await user.save();
        
        // Generate token
        const token = generateToken(user._id);
        
        // Set token in cookies
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // maxAge set to 1 hour (in milliseconds)
        
        res.status(201).json({ message: "User registered successfully", token, user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

      

        // Generate token
        const token = generateToken(user._id);
        
        // Set token in cookies
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // maxAge set to 1 hour (in milliseconds)
        
        res.status(200).json({ message: "Login successful", token ,user});
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
    
};
exports.logout = (req, res) => {
    try {
      res.cookie('token', '', { httpOnly: true, maxAge: 0 });
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).json({ error: 'Failed to logout' });
    }
  };