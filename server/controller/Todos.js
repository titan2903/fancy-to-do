const {
    Todo
} = require('../models');


class Todos {
    static getTodos(req, res) {
        Todo.findAll({
                order: [
                    ['due_date', 'ASC']
                ]
            })
            .then((todos) => {
                // console.log(todos, 'data todo')
                res.status(200).json({
                    status: true,
                    data: todos
                })
            }).catch((err) => {
                // console.log(err, 'data err')
                res.status(500).json({
                    status: false,
                    message: [err.message]
                })
            });
    }

    static getOneTodo(req, res) {
        const id = req.params.id
        Todo.findOne({
                where: {
                    id: id
                }
            })
            .then((todos) => {
                if (todos) {
                    res.status(200).json({
                        status: true,
                        data: todos
                    })
                } else {
                    res.status(404).json({
                        message: 'todo not found'
                    })
                }
            }).catch((err) => {
                res.status(500).json({
                    status: false,
                    message: [err.message]
                })
            });
    }

    static createTodo(req, res) {
        const {
            title,
            description,
            status,
            due_date
        } = req.body
        // console.log(req.userdata, 'ini useerdata')
        Todo.create({
                title,
                description,
                status,
                due_date,
                UserId: req.userdata.id
            })
            .then((todos) => {
                // console.log(todos, 'result from create')
                res.status(201).json({
                    status: true,
                    data: todos
                })
            }).catch((err) => {
                res.status(500).json({
                    status: false,
                    message: [err.message]
                })
            });
    }

    static deleteTodo(req, res) {
        let id = Number(req.params.id)
        let todoDeleted;

        Todo.findOne({
                where: {
                    id: id
                }
            })
            .then((todos) => {
                if (todos) {
                    todoDeleted = todos
                    return Todo.destroy({
                        where: {
                            id: id
                        }
                    })
                } else {
                    res.status(404).json({
                        message: `todo not found`
                    })
                }
            }).then(() => {
                res.status(200).json({
                    message: `todo id: ${id} has been deleted`,
                    todoDeleted
                })
            }).catch((err) => {
                res.status(500).json({
                    status: false,
                    message: [err.message]
                })
            });
    }

    static updateTodo(req, res) {
        let id = req.params.id
        Todo.update(req.body, {
                where: {
                    id: id
                }
            })
            .then((result) => {
                if (result) {
                    res.status(200).json({
                        message: `todo id: ${id} has been updated`
                    })
                } else {
                    res.status(404).json({
                        message: 'result not found'
                    })
                }
            }).catch((err) => {
                res.status(500).json({
                    status: false,
                    message: [err.message]
                })
            });
    }
}


module.exports = Todos