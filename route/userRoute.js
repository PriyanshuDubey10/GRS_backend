const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const Grievance = require('../controller/grievanceController')

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/logout', userController.logout);

router.get('/grievance', Grievance.Grievance);

module.exports = router;