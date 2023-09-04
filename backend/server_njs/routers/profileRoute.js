const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

//User CRUD
router.get('/', userController.findUser); // Obtain a single user
router.put('/', userController.updateUser); // Update a user



router.get('/artistAlbums/:id', adminController.getArtistAlbums); // Obtain all artist albums
router.get('/artist/:id', adminController.getSingleArtist); // Obtain a single artist
router.get('/artist', adminController.getAllArtists);   // Obtain all artists
router.post('/artist', adminController.createArtist);   // Create an artist
//router.put('/artist', adminController.updateArtist);    // Update an artist
//router.delete('/artist', adminController.deleteArtist); // Delete an artist


module.exports = router;