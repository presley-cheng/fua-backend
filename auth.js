const User = require('./db/model/user')
const { getObjectId } = require('./db/connect')

async function authenticate(req, res, next) {
    const user = await User.findOne({ _id: getObjectId(req.session.userId) })
    if (!user) {
        return res.status(401).json({ error: 'Please sign in before proceeding.' })
    }

    next()
}

module.exports = authenticate