const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },

    active: { type: Boolean, default: true },
    created: { type: Date, default: Date.now }
})

const User = mongoose.model('User', userSchema)
module.exports = User