// load environmental vars
require('dotenv').config()

const express = require('express')
const app = express()
const PORT = 3000

// mongodb
const mongoose = require('mongoose')
const connectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@fua.ishplal.mongodb.net/fua-db?retryWrites=true&w=majority`
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(_ => {
        console.log('connected to mongodb')
        app.listen(PORT, () => console.log(`listening on port ${PORT}`))
    })
    .catch(err => console.error('error connecting to mongodb:', err))

const User = require('./db-model/user')

// middlewares
app.use(express.json())

// routes
app.get('/', (req, res) => {
    res.send('hello')
})

