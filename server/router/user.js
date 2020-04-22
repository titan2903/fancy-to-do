const router = require('express').Router()
const Users = require('../controller/User');

//!register
router.post('/register', Users.register)

//!login
router.post('/login', Users.login)

//!login by google
router.post('/google-sign-in', Users.googleSignIn)


module.exports = router
