// load environmental vars
const express = require('express')
const app = express()
const PORT = 3000
const connectDB = require('./db/connect')

// middlewares
app.use(express.json())

// routes
app.get('/', (req, res) => {
    res.send('hello')
})

// connect to mongodb then start server
connectDB(() => app.listen(PORT, () => console.log(`listening on port ${PORT}`)))


