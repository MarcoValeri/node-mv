// Models
const Article = require('../models/Article');

exports.home = (req, res, next) => {
    Article.fetchAll()
        .then(([rows, fields]) => {
            res.render('./pages/home', {
                pageTitle: 'Home',
                pageUrl: req.url,
                allArticles: rows,
                showAdminNav: req.session.adminUser
            })
        })
        .catch(err => console.log(err));
}
