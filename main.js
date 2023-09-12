require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const session = require('express-session')
const PORT = 3000

const { connectDB, getObjectId } = require('./db/connect')
const bcrypt = require('bcrypt')
const authenticate = require('./auth')
const User = require('./db/model/user')

const calendarRoutes = require('./routes/calendar')

// middlewares
app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

// routes
app.post('/login', async (req, res) => {
    let { username, password } = req.body

    try {
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).json({
                error: 'Username not found. Please try another username.'
            })
        }

        const result = await bcrypt.compare(password, user.password)
        if (!result) {
            return res.status(401).json({
                error: 'Incorrect password. Please try another password.'
            })
        }

        req.session.userId = user._id.toString()
        return res.status(200).json({
            name: user.name,
            username: user.username,
            created: user.created.toString()
        })
    } catch (err) {
        console.error('error during login')
        return res.status(500).json({
            error: `Error during login: ${err}`
        })
    }
})

app.get('/logout', async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('error during logout:', err)
            return res.status(500).json({
                error: `Error during logout: ${err}`
            })
        }

        return res.status(200).send()
    })
})

app.post('/signup', async (req, res) => {
    let { name, username, password } = req.body

    try {
        const user = await User.findOne({ username })
        if (user) {
            return res.status(409).json({
                error: 'Username already exists. Please choose a different username.'
            })
        }

        password = await bcrypt.hash(password, 10)
        let newUser = new User({ name, username, password })
        newUser = await newUser.save()

        req.session.userId = newUser._id.toString()
        return res.status(200).json({
            name: newUser.name,
            username: newUser.username,
            created: newUser.created.toString()
        })
    } catch (err) {
        console.error('error during signup:', err)
        return res.status(500).json({
            error: `Error during signup: ${err}`
        })
    }
})

app.get('/user', async (req, res) => {
    const user = await User.findOne({ _id: getObjectId(req.session.userId) })
    if (!user) {
        return res.status(401).json({ error: 'Please sign in before proceeding.' })
    }

    return res.status(200).json({
        name: user.name,
        username: user.username,
        created: user.created.toString()
    })
})

// feature routes (authentication required)
app.use(authenticate)
app.use('/calendar', calendarRoutes)

// connect to mongodb then start the server
connectDB(() => app.listen(PORT, () => console.log(`listening on port ${PORT}`)))


