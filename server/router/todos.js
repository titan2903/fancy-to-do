const router = require('express').Router()
const Todos = require('../controller/Todos');
const Authentication = require('../middlewares/Authentication');
const Authorisation = require('../middlewares/Authorization');

router.get('/', Todos.getTodos)

router.get('/:id', Todos.getTodo)

router.post('/', Authentication, Todos.createTodo)

router.delete('/:id', [Authentication, Authorisation], Todos.deleteTodo)

router.put('/:id', [Authentication, Authorisation], Todos.updateTodo)

module.exports = router
