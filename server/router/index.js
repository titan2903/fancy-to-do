const router = require('express').Router()
const API = require('./routerAPI');
const Todos = require('./todos');
const Users = require('./user');

router.use('/api', API)

router.use('/todos', Todos)

router.use('/users', Users)


module.exports = router
