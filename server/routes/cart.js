var express = require('express');
var router = express.Router();
var cartController = require(`../controllers/cartController`)

/* GET home page. */
router.post(`/:itemId`, cartController.addCart)
router.delete(`/:itemId`, cartController.removeCart)
router.get(`/:userId`, cartController.getCart)

module.exports = router;