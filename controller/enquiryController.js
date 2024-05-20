const Grievance = require('../model/Grievance');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.getAllEnquiries = async (req, res) => {
    try {
        const Grievances = await Grievance.find();
        res.status(200).json(Grievances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getGrievanceById = async (req, res) => {
    try {
        const { id } = req.params;
        const grievance = await Grievance.findById(id);
        if (!grievance) {
            return res.status(404).json({ message: 'Grievance not found' });
        }
        res.status(200).json(grievance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getGrievancesByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const grievances = await Grievance.find({ userId });
        if (!grievances) {
            return res.status(404).json({ error: 'No grievances found for this user' });
        }
        res.status(200).json(grievances);
    } catch (err) {
        console.error('Error fetching grievances by user ID:', err);
        res.status(500).json({ error: 'Server error' });
    }
};



exports.getGrievanceByDepartment =  async (req, res) => {
    const { department } = req.params;
    try {
      const grievances = await Grievance.find({ department });
      res.status(200).json(grievances);
    } catch (err) {
      console.error('Error fetching grievances by department:', err);
      res.status(500).json({ error: 'Server error' });
    }
  };