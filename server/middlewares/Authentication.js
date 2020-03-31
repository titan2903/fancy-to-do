const jwt = require('jsonwebtoken')

function authentication(req, res, next) {
    let token = req.headers.token
    try {
        let decoded = jwt.verify(token, 'rahasia')
        req.userdata = decoded
        next()
    } catch (error) {
        console.log(error);
    }
}

module.exports = authentication
