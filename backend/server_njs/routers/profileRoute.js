const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

//User CRUD
router.get('/:id', userController.findUser); // Obtain a single user
router.put('/', userController.updateUser); // Update a user


module.exports = router;