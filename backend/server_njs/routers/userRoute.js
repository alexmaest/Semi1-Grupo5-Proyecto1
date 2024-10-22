const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/play', userController.playSong);  // Play a song
router.post('/random', userController.randomSong);  // Play a random song

router.post('/search', userController.search);  // Search controller
router.post('/like', userController.like);  // Like a song
router.post('/unlike', userController.unlike);  // Unlike a song
router.get('/favoriteSongs/:userId', userController.getFavoriteSongs_By_User);  // Get favorite songs by user
router.get('/topSongs/:userId', userController.getTopSongs_By_User);
router.get('/topArtists/:userId', userController.getTopArtists_By_User);
router.get('/topAlbums/:userId', userController.getTopAlbums_By_User);
router.get('/history/:userId', userController.getHistorySongs_By_User);

module.exports = router;