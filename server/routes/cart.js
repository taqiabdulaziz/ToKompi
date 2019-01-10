var express = require('express');
var router = express.Router();
var cartController = require(`../controllers/cartController`)

/* GET home page. */
router.post(`/:userId`, cartController.addCart)

module.exports = router;