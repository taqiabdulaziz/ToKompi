var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', userController.loginUser)

module.exports = router;
