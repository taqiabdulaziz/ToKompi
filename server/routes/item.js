var express = require('express');
var router = express.Router();
var itemCon = require('../controllers/itemController')

router.get('/', itemCon.getAll)// bisa search by name dengan cara /item/?name=.....
router.get('/:id', itemCon.getOne)
router.post('/', itemCon.create)
router.put('/:id', itemCon.update)
router.delete('/:id', itemCon.delete)

module.exports = router