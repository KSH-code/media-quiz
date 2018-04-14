
const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    quizId: mongoose.SchemaTypes.ObjectId,
    userName: String,
    before: Boolean,
    after: Boolean
})
module.exports = mongoose.model('ScoreData', schema)