exports.chiSono = (req, res, next) => {
    res.render('./pages/chi-sono', {
        pageTitle: 'Chi Sono',
        pageUrl: req.originalUrl
    })
}

exports.contact = (req, res, next) => {
    res.render('./pages/contact', {
        pageTitle: 'Contatti',
        pageUrl: req.originalUrl
    })
}