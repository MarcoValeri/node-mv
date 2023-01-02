const express = require('express');

// Express Router
const router = express.Router();

// Controllers
const homeControllers = require('../controllers/homeController');

router.use('/', homeControllers.home);

module.exports = router;
