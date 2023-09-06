const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/search', userController.search);  // Search controller
router.post('/like', userController.like);  // Like a song

module.exports = router;