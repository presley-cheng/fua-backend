const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, required: true },
    active: { type: Boolean, default: true }, // if user deleted their account, active becomes false

    username: { type: String, required: true },
    password: { type: String, required: true },

    created: { type: Date, default: Date.now }
})

const User = mongoose.model('User', userSchema)

module.exports = User