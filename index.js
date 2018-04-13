const express = require('express')
const bodyParser = require('body-parser')
const app = require('easily-handle-error')(express())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mediaQuiz')

app.use((err, req, res, next) => {
    console.dir(err)
})
console.log('restart2')
app.listen(7002)