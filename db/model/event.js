const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    title: { type: String },
    note: { type: String },
    date: { type: Date, required: true },

    active: { type: Boolean, default: true },
    userId: { type: String, required: true },
    created: { type: Date, default: Date.now }
})

const User = mongoose.model('User', userSchema)

module.exports = User