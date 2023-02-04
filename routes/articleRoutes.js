const express = require('express');

// Express Router
const router = express.Router();

// Controllers
const articleControllers = require('../controllers/articleController');

router.use('/articoli/:url', articleControllers.getArticle);
router.use('/articoli', articleControllers.getAllArticles);

module.exports = router;
