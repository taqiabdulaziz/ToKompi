var express = require('express');
const userController = require('../controllers/userController')

var router = express.Router();

router.get('/', userController.showAllUser)
router.post('/', userController.createUser)
router.get('/:id', userController.findUserById)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router;
