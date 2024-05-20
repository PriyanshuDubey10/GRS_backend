const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

router.post('/adminr', adminController.adminr);

router.post('/adminl', adminController.adminl);

router.get('/logout', adminController.logout);

module.exports = router;