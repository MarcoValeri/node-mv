// Models
const Article = require('../models/Article');

exports.sitemap = (req, res, next) => {

    Article.fetchAll()
        .then(([rows, fields]) => {
            res.setHeader('content-type', 'text/xml');
            res.render('./robot/sitemap', {
                allArticles: rows
            })
        })
        .catch(err => console.log(err));
}