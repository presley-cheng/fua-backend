const express = require('express')
const router = express.Router()

const Event = require('../db/model/event')
const { getObjectId } = require('../db/connect')

router.get('/', async (req, res) => {
    const userId = req.session.userId
    try {
        const events = await Event.find({ userId, active: true })
        return res.status(200).json(events.map(event => ({
            id: event._id,
            title: event.title,
            note: event.note,
            date: event.date
        })))
    } catch (err) {
        console.error('error getting events:', err)
        return res.status(500).json({
            error: `Error getting events: ${err}`
        })
    }
})

router.post('/', async (req, res) => {
    const userId = req.session.userId
    const { title, note, date } = req.body

    try {
        let newEvent = new Event({ title, note, date, userId })
        newEvent = await newEvent.save()

        return res.status(200).json({
            id: newEvent._id,
            title: newEvent.title,
            note: newEvent.note,
            date: newEvent.date,
        })
    } catch (err) {
        console.error('error creating events:', err)
        return res.status(500).json({
            error: `Error creating events: ${err}`
        })
    }
})

router.put('/', async (req, res) => {

})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        await Event.findOneAndUpdate({ _id: getObjectId(id) }, { active: false })
        return res.status(200).send()
    } catch (err) {
        console.error('error creating events:', err)
        return res.status(500).json({
            error: `Error creating events: ${err}`
        })
    }
})

module.exports = router


