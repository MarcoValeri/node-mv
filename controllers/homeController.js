exports.home = (req, res, next) => {

    res.render('./pages/home', {
        pageTitle: 'Home',
        pageUrl: req.url
    })
}
