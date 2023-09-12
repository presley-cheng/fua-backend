const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    title: { type: String, required: true },
    note: { type: String, required: true },
    date: { type: String, required: true },

    active: { type: Boolean, default: true },
    userId: { type: String, required: true },
    created: { type: Date, default: Date.now }
})

const Event = mongoose.model('Event', eventSchema)
module.exports = Event