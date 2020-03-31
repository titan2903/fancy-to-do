// const jwt = require('jsonwebtoken')
const { Todo } = require('../models');

function authorisation(req, res, next) {
    const id = req.params.id
    Todo.findOne({ where: { id: id } })
        .then((result) => {
            if (result) {
                console.log(result.UserId)
                console.log(req.userdata.id);
                console.log(result);

                if (result.UserId === req.userdata.id) {
                    next()
                } else {
                    res.status(400).json('error in authorisation')
                }
            } else {
                res.status(404).json('result not found')
            }
        }).catch((err) => {
            res.status(500).json('internal server error')
        });
}

module.exports = authorisation
