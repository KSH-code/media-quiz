const ogs = require('open-graph-scraper')
const url = require('url')
const { Quiz } = require('../models')
module.exports = async (req, res) => {
    const { tag, link, categoryType, result1, result2, result3, resultType, content, title } = req.body
    let result
    const userName = req.session.user && req.session.user.name
    if (resultType == 0) result = result1
    else if (resultType == 1) result = result2
    else if (resultType == 2) result = result3
    const imageUrl = await new Promise(resolve => {
        const options = { url: link };
        ogs(options, function (error, result) {
            let l = JSON.stringify(result).split('"url":"')[1].split('"')[0]
            if (!l.includes('http')) l = url.parse(link).host + l
            resolve(l)
        })
    })
    const quiz = await new Quiz({ title, content, resultType, result, link, categoryType, tag, userName, imageUrl }).save()
    res.redirect(`/quiz/${quiz._id}`)
}