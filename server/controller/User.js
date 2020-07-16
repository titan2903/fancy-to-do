const {
    OAuth2Client
} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const {
    User
} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

class Users {
    static register(req, res, next) {
        const form = req.body
        User.create({
                email: form.email.toLowerCase(),
                password: form.password,
                role,
            })
            .then((user) => {
                res.status(201).json({
                    status: true,
                    data: user
                })
            }).catch((err) => {
                res.status(500).json({
                    status: false,
                    message: `internal server ${err}`
                })
            });
    }

    static login(req, res, next) {
        // console.log(req.body.username);

        User.findOne({
                where: {
                    email: req.body.email.toLowerCase()
                }
            })

            .then((result) => {
                if (result) {
                    // console.log(result, 'titan')
                    // console.log(req.body.password);
                    // console.log(result.password)
                    if (bcrypt.compareSync(req.body.password, result.password)) {
                        // console.log('masuk token');

                        let token = jwt.sign({
                            id: result.id,
                            email: result.email,
                            role: result.role
                        }, process.env.JWT_SECRET)
                        // console.log(token);

                        res.status(200).json({
                            status: true,
                            token: token
                        })
                    }
                } else {
                    res.status(400).json({
                        status: false,
                        message: 'password wrong'
                    })
                }
            }).catch((err) => {
                console.log(`error login`)
                res.status(500).json({
                    status: false,
                    message: `internal server ${err}`
                })
            });
    }


    static googleSignIn(req, res) {
        const token = req.body.token
        const user = {}
        client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            .then((result) => {
                const payload = result.getPayload();
                // console.log(payload)
                user.email = payload.email
                user.password = 'pass123word'
                user.role = 'client'
                return User.findOne({
                    where: {
                        email: payload.email
                    }
                })
            })
            .then((userdata) => {
                if (userdata) {
                    return userdata
                } else {
                    return User.create(user)
                }
            })
            .then((newUser) => {
                const userObj = {
                    id: newUser.id,
                    email: newUser.email,
                    role: newUser.role
                }
                res.status(200).json({
                    status: true,
                    access_token: jwt.sign(userObj, process.env.JWT_SECRET)
                })
            })
            .catch((err) => {
                res.status(500).json({
                    status: false,
                    message: `internal server ${err}`
                })
            });
    }
}


module.exports = Users