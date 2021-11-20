module.exports = (req, res, next) => {
    if (!req.files.image || !req.body.Aother || !req.body.title || !req.body.description || !req.body.text) {
        return res.redirect('/posts/new')
    }
    next()
}