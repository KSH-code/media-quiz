const { Quiz, ScoreData } = require('../models')
module.exports = async (req, res) => {
    const { quizId } = req.params
    const { result1, result2, result3, result4, result5, result6 } = req.query
    const quiz = await Quiz.findOne({ _id: quizId }).lean(true)
    const resultList1 = [result1, result2, result3]
    const resultList2 = [result4, result5, result6]
    const result11 = resultList1[quiz.resultType]
    const result22 = resultList2[quiz.resultType]
    if (!quiz) {
        return res.render('alert', {
            title: '잘못된 접근입니다.',
            isLogin: 'user' in req.session,
            href: 'back'
        })
    }
    if (quiz.resultType == 1) {
        quiz.result = quiz.result.split(',')
    }
    quiz.tag = quiz.tag.split(',').map(v => {
        return '#' + v.trim()
    }).join(' ')
    if (result11 && result22) {
        let before = quiz.result === result11, after = quiz.result === result22
        if (quiz.resultType == 1) {
            before = quiz.result.find(v => v === `(${result11})`) !== undefined
            after = quiz.result.find(v => v === `(${result22})`) !== undefined
        }
        let name = 'alisdjfoiasdgskdjblczxnlbknzlxcbknlxcbkjoadsifjadslfkjasdlfklasjdflasf'
        if (req.session.user) name = req.session.user.name
        await ScoreData.update({ quizId, userName: name }, { quizId, userName: name, before, after }, { upsert: true })
        return res.render('score', {
            title: '채점 결과',
            isLogin: 'user' in req.session,
            quiz, result11, result22
        })
    }
    res.render('quiz', {
        quizId,
        title: '문제',
        isLogin: 'user' in req.session,
        quiz
    })
}