const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name: String,
    password: String,
    nickname: String,
    correct: Array,
    incorrect: Array
})
schema.index({ name: 1 })
module.exports = mongoose.model('User', schema)