const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const app = require('easily-handle-error')(express())
const routeList = require('./route.json')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)
app.use(express.static('public'))
app.use(session({
    secret: 'alsdkjglajsdlkgjasdg',
    resave: true,
    saveUninitialized: true,
}))
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/quiz')
routeList.forEach(v => {
    const { method, page, path, handler, title } = v
    if (page)
        return app[method](path, async (req, res) => {
            res.render(page, {
                title,
                isLogin: 'user' in req.session
            })
        })
    app[method](path, require(`./handlers/${handler}`))
})
app.use((err, req, res, next) => {
    console.dir(err)
})
console.log('restart2')
app.listen(7002)