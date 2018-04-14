const { Quiz, User, ScoreData } = require('../models')

module.exports = async (req, res) => {
    const quizList = await Quiz.find().lean(true).sort({ _id: -1 })
    quizList.forEach(quiz => {
        quiz.tag = quiz.tag.split(',').map(v => {
            return '#' + v.trim()
        }).join(' ')
    })
    let userList = await User.find().lean(true)
    for (let i = 0; i < userList.length; i++) {
        const user = userList[i]
        let vns = 0
        let chd = 0
        const scoreData = await ScoreData.find({ userName: user.name }).lean(true)
        scoreData.forEach(v => {
            chd += 2
            vns += (v.before ? 1 : 0) + (v.after ? 1 : 0)
        })
        user.chd = chd
        user.vns = vns
        user.rank = vns * vns / chd
    }
    userList = userList.sort((a, b) => b.rank - a.rank)
    res.render('index', {
        title: '인덱스',
        isLogin: req.session && 'user' in req.session,
        quizList, userList
    })
}