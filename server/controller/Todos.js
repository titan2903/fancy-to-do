const { Todo } = require('../models');


class Todos {
    static getTodos(req, res) {
        Todo.findAll()
            .then((todos) => {
                console.log(todos, 'data todo')
                res.status(200).json({ todos })
            }).catch((err) => {
                console.log(err, 'data err')
                res.status(500).json({ err })
            });
    }

    static getTodo(req, res) {
        const id = req.params.id
        Todo.findOne({ where: { id: id } })
            .then((todos) => {
                if (todos) {
                    res.status(200).json({ todos })
                } else {
                    res.status(404).json({
                        message: 'todo not found'
                    })
                }
            }).catch((err) => {
                res.status(404).json({ err })
            });
    }

    static createTodo(req, res) {
        const { title, description, status, due_date } = req.body
        Todo.create({
            title,
            description,
            status,
            due_date,
            UserId: req.params.id
        })
            .then((todos) => {
                console.log(todos, 'result from create')
                res.status(201).json({ todos })
            }).catch((err) => {
                res.status(500).json({ err })
            });
    }

    static deleteTodo(req, res) {
        let id = Number(req.params.id)
        let todoDeleted;

        Todo.findOne({ where: { id: id } })
            .then((todos) => {
                if (todos) {
                    todoDeleted = todos
                    return Todo.destroy({
                        where: { id: id }
                    })
                } else {
                    res.status(404).json({ message: `todo not found` })
                }
            }).then(() => {
                res.status(200).json({ todoDeleted })
            }).catch((err) => {
                res.status(500).json({ err })
            });
    }

    static updateTodo(req, res) {
        let id = Number(req.params.id)
        const { title, description, status, due_date } = req.body
        Todo.update({
            title,
            description,
            status,
            due_date,
            UserId: req.params.id
        }, {
            where: { id: id }
        })
            .then((todos) => {
                if (todos) {
                    res.status(200).json({ todos })
                } else {
                    res.status(404).json({ message: `todo not found` })
                }
            }).catch((err) => {
                res.status(500).json({ err })
            });
    }
}


module.exports = Todos
