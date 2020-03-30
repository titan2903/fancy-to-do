const router = require('express').Router()
const Todos = require('../controller/Todos');

router.get('/', Todos.getTodos)

router.get('/:id', Todos.getTodo)

router.post('/', Todos.createTodo)

module.exports = router
