const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

//Artist CRUD
router.get('/artistAlbums/:id', adminController.getArtistAlbums); // Obtain all artist albums
router.get('/artist/:id', adminController.getSingleArtist); // Obtain a single artist
router.get('/artist', adminController.getAllArtists);   // Obtain all artists
router.post('/artist', adminController.createArtist);   // Create an artist
//router.put('/artist', adminController.updateArtist);    // Update an artist
//router.delete('/artist', adminController.deleteArtist); // Delete an artist

//Album CRUD
//router.get('/albumSongs/:id', adminController.getAlbumSongs); // Obtain all album songs
router.get('/album/:id', adminController.getSingleAlbum); // Obtain a single album
router.get('/album', adminController.getAllAlbums);   // Obtain all albums
router.post('/album', adminController.createAlbum);   // Create an album
//router.put('/album', adminController.updateArtist);    // Update an album
//router.delete('/album', adminController.deleteArtist); // Delete an album

module.exports = router;