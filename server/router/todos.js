const router = require('express').Router()
const Todos = require('../controller/Todos');
const Authentication = require('../middlewares/Authentication');
const Authorisation = require('../middlewares/Authorization');

//!show all todos
router.get('/', Todos.getTodos)

//!show one todo
router.get('/:id', Todos.getOneTodo)

//!add todo
router.post('/', Authentication, Todos.createTodo)

//!delete todo
router.delete('/:id', [Authentication, Authorisation], Todos.deleteTodo)

//!edit todo
router.put('/:id', [Authentication, Authorisation], Todos.updateTodo)

module.exports = router
