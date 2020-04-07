const jwt = require('jsonwebtoken')

function authentication(req, res, next) {
    let token = req.headers.token
    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userdata = decoded
        next()
    } catch (error) {
        // console.log(error);
        throw new Error
    }
}

module.exports = authentication
