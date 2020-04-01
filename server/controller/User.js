const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class Users {
    static register(req, res, next) {
        const form = req.body
        User.create({
            username: form.username,
            password: form.password,
            role: "client"
        })
            .then((user) => {
                res.status(201).json(user)
            }).catch((err) => {
                res.status(500).json({
                    message: `internal server error`
                })
            });
    }

    static login(req, res, next) {
        // console.log(req.body.username);

        User.findOne({ where: { username: req.body.username } })

            .then((result) => {
                if (result) {
                    // console.log(result, 'titan')
                    console.log(req.body.password);
                    console.log(result.password)
                    if (bcrypt.compareSync(req.body.password, result.password)) {
                        console.log('masuk token');

                        let token = jwt.sign({ id: result.id, username: result.username, role: result.role }, 'rahasia')
                        console.log(token);

                        res.status(200).json({ token: token })
                    }
                } else {
                    res.status(400).json('password wrong')
                }
            }).catch((err) => {
                console.log(`error login`)
                res.status(500).json({
                    message: `internal server error`
                })
            });
    }

}


module.exports = Users
