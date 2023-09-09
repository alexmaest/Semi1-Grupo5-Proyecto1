const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/random', userController.randomSong);  // Play a random song

router.post('/search', userController.search);  // Search controller
router.post('/like', userController.like);  // Like a song
router.post('/unlike', userController.unlike);  // Unlike a song
router.get('/favoriteSongs/:userId', userController.getFavoriteSongs_By_User);  // Get favorite songs by user

module.exports = router;