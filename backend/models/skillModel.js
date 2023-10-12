const mongoose = require('mongoose')
const Schema = mongoose.Schema

const skillSchema = new Schema({
    exe: Boolean,
    fin: Boolean,
    med: Boolean,
    com: Boolean,
    upE: Boolean,
    pub: Boolean,
    hon: Boolean,
    lea: Boolean,
    dec: Boolean,
    lis: Boolean,
    userID: String,
    tally: [{
        _id: false,
        skillNumber: Number,
        date: Date
      }]
}, { timestamps: true })

module.exports = mongoose.model('Skill', skillSchema)