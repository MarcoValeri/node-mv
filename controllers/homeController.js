exports.home = (req, res, next) => {

    res.render('home', {
        pageTitle: 'Home',
        pageUrl: req.url
    })
}
