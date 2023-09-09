const express = require('express')
const app = express()
const PORT = 3000

const connectDB = require('./db/connect')
const bcrypt = require('bcrypt')

const User = require('./db/model/user')

// middlewares
app.use(express.json())

// routes
app.get('/login', async (req, res) => {
    let { username, password } = req.body

    try {
        const user = await User.findOne({ username })
        if (!user) {
            res.status(404).json({
                error: 'Username not found. Please try another username'
            })
        }

        const result = await bcrypt.compare(password, user.password)
        if (!result) {
            res.status(401).json({
                error: 'Incorrect password. Please try another password'
            })
        }

        res.send('successfully logged in')
    } catch (err) {
        console.log('error during login')
        res.status(500).send()
    }
})

app.post('/signup', async (req, res) => {
    let { name, username, password } = req.body

    try {
        const user = await User.findOne({ username })
        if (user) {
            res.status(409).json({
                error: 'Username already exists. Please choose a different username'
            })
        }

        password = await bcrypt.hash(password, 10)
        const newUser = new User({ name, username, password })
        await newUser.save()
        res.status(200).send()
    } catch (err) {
        console.error('error during signup:', err)
        res.status(500).send()
    }
})

// connect to mongodb then start the server
connectDB(() => app.listen(PORT, () => console.log(`listening on port ${PORT}`)))


