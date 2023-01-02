exports.home = (req, res, next) => {
    res.render('home', {
        pageTitle: 'Home'
    })
}
