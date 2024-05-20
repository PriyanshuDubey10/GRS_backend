const express = require('express');
const router = express.Router();
const enquiryController = require('../controller/enquiryController');

router.get('/grievance/all', enquiryController.getAllEnquiries);
router.get('/grievance/:id', enquiryController.getGrievanceById);
router.get('/grievance/user/:userId', enquiryController.getGrievancesByUserId);
router.get('/grievances/:department',enquiryController.getGrievanceByDepartment);

module.exports = router;

