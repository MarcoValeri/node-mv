const express = require('express');

// Express Router
const router = express.Router();

// Controllers
const pageController = require('../controllers/pageController');

router.use('/chi-sono', pageController.chiSono);

router.post('/contatti', pageController.sendMessage);
router.use('/contatti', pageController.contact);
router.use('/contatti-conferma', pageController.contactConfirm);

router.post('/newsletter', pageController.newsletterAddUser);
router.use('/newsletter', pageController.newsletter);
router.use('/newsletter-confirm', pageController.newsletterConfirm);

module.exports = router;