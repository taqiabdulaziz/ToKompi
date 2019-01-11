var express = require('express');
var router = express.Router();
var transactionCon = require('../controllers/transactionCon')


router.get('/', transactionCon.getAll)
router.get('/:id', transactionCon.getOne)
router.post('/', transactionCon.create )
router.put('/:id', transactionCon.update)
router.delete('/:id', transactionCon.delete)


module.exports = router;

