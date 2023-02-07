const express = require('express');

// Express Router
const router = express.Router();

// Controllers
const robotController = require('../controllers/robotController');

router.use('/sitemap.xml', robotController.sitemap);
router.use('/robots.txt', robotController.robots);

module.exports = router;