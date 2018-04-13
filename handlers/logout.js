const { User } = require('../models')

module.exports = async (req, res) => {
    req.session.destroy(err => {
        res.render('alert', {
            title: '성공',
            href: req.headers.referer,
            isLogin: req.session && 'user' in req.session
        })
    })
}