const router = require('express').Router()
const Todos = require('../controller/Todos');
const Authentication = require('../middlewares/Authentication');
const Authorization = require('../middlewares/Authorization');

//!show all todos
router.get('/show', Todos.getTodos)

//!show one todo
router.get('/show/:id', [Authentication, Authorization], Todos.getOneTodo)

//!add todo
router.post('/create', Authentication, Todos.createTodo)

//!delete todo
router.delete('/delete/:id', [Authentication, Authorization], Todos.deleteTodo)

//!edit todo
router.put('/edit/:id', [Authentication, Authorization], Todos.updateTodo)

module.exports = router
