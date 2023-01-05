const bodyParser = require('body-parser');

// Models
const Article = require('../models/Article');
const Image = require('../models/Image');

exports.adminDashboard = (req, res, next) => {
    res.render('./admin/dashboard', {
        pageTitle: 'Admin Dashboard'
    })
}

exports.adminArticles = (req, res, next) => {
    Article.fetchAll()
        .then(([rows, fields]) => {
            res.render('./admin/articles', {
                pageTitle: 'Admin Articles',
                allArticles: rows
            })
        })
        .catch(err => console.log(err));
}

exports.adminNewArticle = (req, res, next) => {

    res.render('./admin/add-new-article', {
        pageTitle: 'Admin Add New Article'
    })
}

exports.adminAddNewArticle = (req, res, next) => {
    // Get data by the form
    const newArticleTitle = req.body.title;
    const newArticleDescription = req.body.description;
    const newArticleUrl = req.body.url;
    const newArticleContent = req.body.content;
    const newArticleImage = req.body.imageUrl;

    // Save data into db
    const newArticle = new Article(null, newArticleTitle, newArticleDescription, newArticleUrl, newArticleContent, newArticleImage);
    newArticle.save()
        .then(() => {
            res.redirect('/admin/dashboard');
        })
        .catch(err => console.log(err));
}

exports.adminShowEditArticle = (req, res, next) => {
    // Save url into a variable
    const url = req.params.url;

    Article.findByUrl(url)
        .then(([rows, fields]) => {
            let flag = false;
            for (let index = 0; index < rows.length; index++) {
                if (rows[index].url === url) {
                    flag = true;
                    res.render('./admin/edit-article', {
                        pageTitle: `Admin Edit Article: ${url}`,
                        articleId: rows[index].id,
                        articleTitle: rows[index].title,
                        articleDescription: rows[index].description,
                        articleUrl: url,
                        articleContent: rows[index].content,
                        articleImgeUrl: rows[index].imageUrl
                    })
                }
            }

            if (!flag) {
                /**
                 * TODO: Redirect to error 404 template once it will be ready
                 */
                res.redirect('/');
            }
        })
        .catch(err => console.log(err));
}

exports.adminEditArticle = (req, res, next) => {
    // Get data by the form
    const newArticleId = req.body.id;
    const newArticleTitle = req.body.title;
    const newArticleDescription = req.body.description;
    const newArticleUrl = req.body.url;
    const newArticleContent = req.body.content;
    const newArticleImage = req.body.imageUrl;

    // Save data into db
    const editArticle = new Article(newArticleId, newArticleTitle, newArticleDescription, newArticleUrl, newArticleContent, newArticleImage);
    editArticle.edit()
        .then(() => {
            res.redirect('/admin/articles')
        })
        .catch(err => console.log(err));
}

exports.adminShowDeleteArticle = (req, res, next) => {
    // Save url into a variable
    const url = req.params.url;

    Article.findByUrl(url)
        .then(([rows, fields]) => {
            let flag = false;
            for (let index = 0; index < rows.length; index++) {
                if (rows[index].url === url) {
                    flag = true;
                    res.render('./admin/delete-article', {
                        pageTitle: `Admin Delete Article: ${url}`,
                        articleId: rows[index].id,
                        articleTitle: rows[index].title,
                        articleDescription: rows[index].description,
                        articleUrl: url,
                        articleContent: rows[index].content,
                        articleImgeUrl: rows[index].imageUrl
                    })
                }
            }

            if (!flag) {
                /**
                 * TODO: Redirect to error 404 template once it will be ready
                 */
                res.redirect('/');
            }
        })
        .catch(err => console.log(err));
}

exports.adminDeleteArticle = (req, res, next) => {
    // Get data by the form
    const deleteArticleId = req.body.id;
    const deleteArticleTitle = req.body.title;
    const deleteArticleDescription = req.body.description;
    const deleteArticleUrl = req.body.url;
    const deleteArticleContent = req.body.content;
    const deleteArticleImage = req.body.imageUrl;

    // Delete data from db
    const deleteArticle = new Article(deleteArticleId, deleteArticleTitle, deleteArticleDescription, deleteArticleUrl, deleteArticleContent, deleteArticleImage);
    deleteArticle.delete()
        .then(() => {
            res.redirect('/admin/articles')
        })
        .catch(err => console.log(err));
}

exports.adminImages = (req, res, next) => {
    res.render('./admin/images', {
        pageTitle: 'Admin Images'
    })
}

exports.adminAddNewImage = (req, res, next) => {

    res.render('./admin/add-new-image', {
        pageTitle: 'Admin Add New Image'
    })
}

exports.adminUploadNewImage = (req, res, next) => {

    const imageTitle = req.body.title;
    const imageCaption = req.body.caption;
    const imageDescription = req.body.description;


    /**
     * Save a new image.
     *
     * ID and URL are set to NULL because
     * they are added into the Model
     */
    const newImage = new Image(null, imageTitle, imageCaption, imageDescription, null, req.files);
    newImage.upload();
    newImage.save()
        .then(() => {
            res.redirect('/admin/images');
        })
        .catch(err => console.log(err));

    res.redirect('/admin/images');
}
