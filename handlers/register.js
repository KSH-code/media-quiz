const { User } = require('../models')

module.exports = async (req, res) => {
    const { name, nickname, password, confirmPassword } = req.body
    const isFind = await User.findOne({ name })
    if (isFind) return res.render('alert', {
        title: '에러!',
        content: '이미 존재하는 계정입니다.',
        href: '/'
    }).end()
    if (confirmPassword === password) return res.render('alert', {
        title: '에러!',
        content: '비밀번호를 다시 확인해주세요.',
        href: '/'
    }).end()
    await new User({ name, nickname, password }).save()
    res.render('alert', {
        title: '에러!',
        content: '이미 존재하는 계정입니다.',
        href: '/'
    }).end()
}