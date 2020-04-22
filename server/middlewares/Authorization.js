// const jwt = require('jsonwebtoken')
const { Todo } = require('../models');

function authorization(req, res, next) {
    const id = req.params.id
    Todo.findOne({ where: { id: id } })
        .then((result) => {
            if (result) {
                // console.log(result.UserId)
                // console.log(req.userdata.id);
                // console.log(result);

                if (result.UserId === req.userdata.id) {
                    next()
                } else {
                    res.status(400).json({
                        message: 'error in authorization'
                    })
                }
            } else {
                res.status(404).json({ message: 'result not found' })
            }
        }).catch((err) => {
            res.status(500).json({ message: `internal server ${err}` })
        });
}

module.exports = authorization
