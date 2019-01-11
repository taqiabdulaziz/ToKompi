require('dotenv').config()
const jwt = require('jsonwebtoken')
const {User} = require('../models')

module.exports = (req, res, next)=>{
  try{
    var decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)

    User
    .findOne({id: decoded.id})
    .then(user =>{
      req.user = {
        _id: user._id,
        username: user.username,
        role: user.role
      }

      next()
    })

  } catch(err){
    res
    .status(500)
    .json({msg: "internal server error"})
  }
}