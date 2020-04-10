const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class Users {
    static register(req, res, next) {
        const form = req.body
        User.create({
            email: form.email,
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

        User.findOne({ where: { email: req.body.email } })

            .then((result) => {
                if (result) {
                    // console.log(result, 'titan')
                    // console.log(req.body.password);
                    // console.log(result.password)
                    if (bcrypt.compareSync(req.body.password, result.password)) {
                        // console.log('masuk token');

                        let token = jwt.sign({ id: result.id, email: result.emai, role: result.rolel }, process.env.JWT_SECRET)
                        // console.log(token);

                        res.status(200).json({ token: token })
                    }
                } else {
                    res.status(400).json({ message: 'password wrong' })
                }
            }).catch((err) => {
                console.log(`error login`)
                res.status(500).json({
                    message: `internal server error`
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
                    access_token: jwt.sign(userObj, process.env.JWT_SECRET)
                })
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'error internal server'
                })
            });
    }
}


module.exports = Users

