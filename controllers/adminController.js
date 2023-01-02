const bodyParser = require('body-parser');

// Models
const Article = require('../models/Article');

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

    // TODO: save data into db
    const newArticle = new Article(null, newArticleTitle, newArticleDescription, newArticleUrl, newArticleContent, newArticleImage);
    newArticle.save()
        .then(() => {
            res.redirect('/admin/dashboard')
        })
        .catch(err => console.log(err));
}