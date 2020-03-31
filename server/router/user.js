const router = require('express').Router()
const Users = require('../controller/User');

router.post('/', Users.register)
router.post('/login', Users.login)

module.exports = router
