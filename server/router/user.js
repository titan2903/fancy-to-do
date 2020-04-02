const router = require('express').Router()
const Users = require('../controller/User');

//!register
router.post('/', Users.register)

//!login
router.post('/login', Users.login)

module.exports = router
