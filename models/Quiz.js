const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    title: String, content: String, resultType: String, result: String, link: String, categoryType: String, tag: String, userName: String, imageUrl: String
})
schema.index({ name: 1 })
module.exports = mongoose.model('Quiz', schema)