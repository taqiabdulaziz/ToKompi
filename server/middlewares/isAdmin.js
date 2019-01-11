

module.exports = (req, res, next)=>{
  console.log(req.user.role)
  if(req.user.role == 'admin'){
    next()
  } else{
    res
    .status(401)
    .json({msg: "user unauthorized"})
  }
}