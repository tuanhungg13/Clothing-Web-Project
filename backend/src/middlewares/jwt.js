const jwt = require('jsonwebtoken')

const generateAccessToken = (uid, role) => {
    return jwt.sign({ _id: uid, role: role }, process.env.JWT_SECRET, { expiresIn: '1800s' });
}

const generateRefreshToken = (uid) => jwt.sign({ _id: uid }, process.env.JWT_SECRET, { expiresIn: '1d' })

module.exports = {
    generateAccessToken, generateRefreshToken
}