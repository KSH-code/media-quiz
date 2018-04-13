const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    title: String,
    url: String
})
schema.index({ name: 1 })
module.exports = mongoose.model('Quiz', schema)