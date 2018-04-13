const { User } = require('../models')

module.exports = async (req, res) => {
    const { name, password } = req.body
    const user = await User.findOne({ name })
    if (!user || user.password !== password) return res.render('alert', {
        title: '회원 정보가 일치하지 않습니다.',
        content: '아이디 또는 비밀번호가 틀렸습니다.',
        href: 'back',
        isLogin: 'user' in req.session
    })
    req.session.user = user
    req.session.save()
    res.render('alert', {
        title: '성공',
        href: req.headers.referer,
        isLogin: 'user' in req.session
    })
}