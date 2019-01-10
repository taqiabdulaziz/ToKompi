const User = require('../models/User')
const jwt = require('jsonwebtoken')
const compare = require('../helpers/hashPw')
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
    }
}