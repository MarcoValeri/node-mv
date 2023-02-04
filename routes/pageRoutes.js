const express = require('express');

// Express Router
const router = express.Router();

// Controllers
const pageController = require('../controllers/pageController');

router.use('/chi-sono', pageController.chiSono);

module.exports = router;