const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require("./db/conn");
const userRoutes = require('./route/userRoute');
const grievanceRoutes = require('./route/grievanceRoute');
const enquiryRoutes = require('./route/enquiryRoutes');
const adminRoutes = require('./route/adminRoutes');

require("dotenv").config();
const app = express();
const port = process.env.PORT || 8000;

connectDB();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
  origin: 'https://grs-frontend-nu.vercel.app/',
  credentials: true 
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/users', grievanceRoutes);
app.use('/api/users', enquiryRoutes);
app.use('/api/Admins', adminRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.post('/api/users/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
