// Models
const Article = require('../models/Article');

// Functions
const func = require('../util/functions');

exports.getArticle = (req, res, next) => {
    // Save url into a variable
    const url = req.params.url;

    Article.findByUrl(url)
        .then(([rows, fields]) => {
            let flag = false;
            for (let index = 0; index < rows.length; index++) {
                if (rows[index].url === url) {
                    flag = true;
                    res.render('./articles/article', {
                        pageTitle: url,
                        pageUrl: '/articoli',
                        articleTitle: rows[index].title,
                        articleDescription: rows[index].description,
                        articleContent: rows[index].content,
                        articleImgeUrl: rows[index].imageUrl,
                        articlePublished: func.contentDate(rows[index].published),
                        articleUpdated: func.contentDate(rows[index].updated),
                        articleGenderOption: true,
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

exports.getAllArticles = (req, res, next) => {
    Article.fetchAll()
        .then(([rows, fields]) => {
            res.render('./articles/articles', {
                pageTitle: 'Articoli',
                pageUrl: req.originalUrl,
                allArticles: rows
            })
        })
        .catch(err => console.log(err));
}