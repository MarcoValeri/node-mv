const fileUpload = require('express-fileupload');
const express = require('express');

// Express Router
const router = express.Router();

// Controllers
const adminController = require('../controllers/adminController');

router.use('/admin/dashboard', adminController.adminDashboard);

router.use('/admin/articles', adminController.adminArticles);
router.post('/admin/add-new-article', adminController.adminAddNewArticle);
router.use('/admin/add-new-article', adminController.adminNewArticle);

router.post('/admin/edit-article/:url', adminController.adminEditArticle);
router.use('/admin/edit-article/:url', adminController.adminShowEditArticle);

router.post('/admin/delete-article/:url', adminController.adminDeleteArticle);
router.use('/admin/delete-article/:url', adminController.adminShowDeleteArticle);

router.use(fileUpload());
router.use('/admin/images', adminController.adminImages);
router.post('/admin/upload-new-image', adminController.adminUploadNewImage);
router.use('/admin/add-new-image', adminController.adminAddNewImage);

router.post('/admin/edit-image/:url', adminController.adminEditImage);
router.use('/admin/edit-image/:url', adminController.adminShowEditImage);

router.post('/admin/delete-image/:url', adminController.adminDeleteImage);
router.use('/admin/delete-image/:url', adminController.adminShowDeleteImage);

module.exports = router;
