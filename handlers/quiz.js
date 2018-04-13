module.exports = async (req, res) => {
    const { quizId } = req.params
    res.render('quiz', {
        quizId,
        title: '퀴즈',
        isLogin: 'user' in req.session
    })
}