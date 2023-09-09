// load environmental vars
require('dotenv').config()

const express = require('express')
const app = express()
const PORT = 3000

const dbConnectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@fua.ishplal.mongodb.net/?retryWrites=true&w=majority`

// middlewares
app.use(express.json())

// routes
app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
