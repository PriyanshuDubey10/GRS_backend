const express = require('express');
const router = express.Router();
const grievanceController = require('../controller/grievanceController')

router.post('/grievance', grievanceController.Grievance);
router.patch('/grievance/:id', grievanceController.updateGrievance);


module.exports = router;