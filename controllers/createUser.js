
module.exports = (req, res) => {
    res.render('pages/register',{
        errors: req.flash('registrationErrors')
    })
}