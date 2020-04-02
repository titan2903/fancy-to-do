const router = require('express').Router()
const Todos = require('./todos');
const Users = require('./user');

router.use('/todos', Todos)

router.use('/users', Users)


module.exports = router
