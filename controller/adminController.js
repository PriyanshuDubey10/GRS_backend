const jwt = require('jsonwebtoken');
const Admin = require('../model/admin');

// Function to generate token
const generateToken = (adminId) => {
    return jwt.sign({ adminId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.adminr = async (req, res) => {
    const { name, department, email, password } = req.body;

    try {
        const admin = new Admin({ name, department, email, password });
        await admin.save();
        
        // Generate token
        const token = generateToken(admin._id);
        
        // Set token in cookies
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // maxAge set to 1 hour (in milliseconds)
        
        res.status(201).json({ message: "admin registered successfully", token, admin });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.adminl = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            throw new Error('admin not found');
        }


        const token = generateToken(admin._id);
        
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
        
        res.status(200).json({ message: "Login successful", token ,admin});
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