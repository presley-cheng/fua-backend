require('dotenv').config()

const mongoose = require('mongoose')
const connectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@fua.ishplal.mongodb.net/fua-db?retryWrites=true&w=majority`

function connectDB(startServer) {
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(_ => {
            console.log('connected to mongodb')
            startServer()
        })
        .catch(err => console.error('error connecting to mongodb:', err))
}

function getObjectId(str) {
    try {
        return (new mongoose.Types.ObjectId(str))
    } catch (err) {
        console.error(err)
        return null
    }
}

module.exports = {
    connectDB,
    getObjectId
}
