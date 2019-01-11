const User = require('../models/User')
const jwt = require('jsonwebtoken')
const compare = require('../helpers/hashPw')
const {OAuth2Client} = require('google-auth-library')
const axios = require('axios')
require('dotenv').config()

module.exports = {
    createUser: function(req, res) {
        let userData = { name, email, password, kota } = req.body
        User.create(userData)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    findUserById: function(req, res) {
        User.findById(req.params.id)
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    showAllUser: function(req, res) {
        console.log('MASUK SHOW')
        User.find({})
            .then(users => {
                res.status(200).json(users)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    updateUser: function(req, res) {
        let userData = { name, email, password, kota } = req.body
        for(let key in userData) {
            if(!userData[key]) delete userData[key]
        }
        User.findByIdAndUpdate(req.params.id, {$set: userData}, {new: true})
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    deleteUser: function(req, res) {
        User.findByIdAndDelete(req.params.id)
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    loginUser: function(req, res) {
        const secretKey = process.env.RECAPTCHA_SECRET
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`
        if(!req.body.captcha) {
            res.status(400).json({
                msg: "Please select Captcha"
            })
        } else {
            axios({
                method: 'POST',
                url: verifyUrl
            })
                .then(response => {
                    if(response.data.success === true) {
                        User.findOne({email: req.body.email})
                            .then(user => {
                                if (user) {
                                    if (compare.comparePw(req.body.password, user.password)) {
                                        res.status(200).json({
                                            token: jwt.sign({
                                                id: user.id,
                                                role: user.role,
                                                email: user.email,
                                            }, process.env.JWT_SECRET)
                                        })
                                    } else {
                                        res.status(400).json({
                                            msg: 'Wrong username / password!'
                                        })
                                    }
                                } else {
                                    res.status(400).json({
                                        msg: 'Wrong username / password!'
                                    })
                                }
                            }) 
                            .catch(err => {
                                res.status(500).json(err)
                            })
                    } else {
                        res.status(500).json(err)
                    }
                })
                .catch(err => {
                    res.status(500).json(err)
                })
        }
    },
    googleOauth: function(req, res) {
        const clientId = '460853791285-cv4u1att6v58hakiqldgnmh6ic8acd0q.apps.googleusercontent.com'
        const client = new OAuth2Client(clientId);
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: req.body.token,
                audience: clientId,  
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            User.findOne({email: payload.email})
                .then(user => {
                    if(user) {
                        res.status(200).json({
                            token: jwt.sign({
                                email: user.email,
                                name: user.name,
                                role: user.role,
                                items: user.items
                            }, process.env.JWT_SECRET),
                            user: user
                        })
                    } else {
                        let newUser = {
                            name : payload.name,
                            email: payload.email,
                            password: process.env.GOOGLE_OAUTH_PASS,
                            role: 'customer'
                        }
                        User.create(newUser)
                            .then(user => {
                                res.status(201).json({
                                    token: jwt.sign({
                                        email: user.email,
                                        name: user.name,
                                        role: user.role,
                                        items: user.items
                                    }, process.env.JWT_SECRET),
                                    user: user
                                })
                            })
                            .catch(err => {
                                res.status(500).json(err)
                            })
                    }
                })
                .catch(err => {
                    res.status(500).json(err)
                })
          }
          verify().catch(console.error);
    },
    fbOauth: function(req, res) {
        axios({
            method: 'GET',
            url: `https://graph.facebook.com/me?fields=id,name,email&access_token=${req.headers.token_fb}`
        })
            .then(fbUser => {
                User.findOne({email: fbUser.data.email})
                    .then(user => {
                        if(user) {
                            res.status(200).json({
                                token: jwt.sign({
                                    email: user.email,
                                    name: user.name,
                                    role: user.role,
                                    items: user.items
                                }, process.env.JWT_SECRET)
                            })
                        } else {
                            let newUser = {
                                name : fbUser.data.name,
                                email: fbUser.data.email,
                                password: process.env.GOOGLE_OAUTH_PASS,
                                role: 'customer'
                            }
                            User.create(newUser)
                                .then(user => {
                                    res.status(201).json({
                                        token: jwt.sign({
                                            email: user.email,
                                            name: user.name,
                                            role: user.role,
                                            items: user.items
                                        }, process.env.JWT_SECRET)
                                    })
                                })
                                .catch(err => {
                                    res.status(500).json(err)
                                })
                        }
                    })
                    .catch(err => {
                        res.status(500).json(err)
                    })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}