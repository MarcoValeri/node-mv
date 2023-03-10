const fileUpload = require('express-fileupload');
const express = require('express');

// Express Router
const router = express.Router();

// Controllers
const adminController = require('../controllers/adminController');

router.use('/admin/dashboard', adminController.adminDashboard);

router.post('/admin/login', adminController.adminLoginAuthentication);
router.use('/admin/login', adminController.adminLogin);

router.post('/admin/add-new-article', adminController.adminAddNewArticle);
router.use('/admin/add-new-article', adminController.adminNewArticle);
router.use('/admin/articles', adminController.adminArticles);

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

router.use('/admin/users', adminController.adminUsers);
router.post('/admin/add-new-user', adminController.adminAddNewUser);
router.use('/admin/add-new-user', adminController.adminNewUser);

router.post('/admin/edit-user/:id', adminController.adminEditUser);
router.use('/admin/edit-user/:id', adminController.adminShowEditUser);

router.post('/admin/delete-user/:id', adminController.adminDeleteUser);
router.use('/admin/delete-user/:id', adminController.adminShowDeleteUser);

router.post('/admin/add-new-newsletter-list', adminController.adminAddNewUserNesletterList);
router.use('/admin/newsletter-list', adminController.adminNewsletterList);
router.use('/admin/add-new-newsletter-list', adminController.adminNewUserNewsletterList);

router.post('/admin/edit-newsletter-user/:id', adminController.adminEditNewsletterUser);
router.use('/admin/edit-newsletter-user/:id', adminController.adminShowEditNewsletterUser);

router.post('/admin/delete-newsletter-user/:id', adminController.adminDeleteNewsletterUser);
router.use('/admin/delete-newsletter-user/:id', adminController.adminShowDeleteNewsletterUser);

module.exports = router;
