const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

//Artist CRUD
router.get('/artistAlbums/:id', adminController.getArtistAlbums); // Obtain all artist albums
router.get('/artist/:id', adminController.getSingleArtist); // Obtain a single artist
router.get('/artist', adminController.getAllArtists);   // Obtain all artists
router.post('/artist', adminController.createArtist);   // Create an artist
//router.put('/artist', adminController.updateArtist);    // Update an artist
router.delete('/artist/:id', adminController.deleteArtist); // Delete an artist

//Album CRUD
router.get('/albumSongs/:id', adminController.getAlbumSongs); // Obtain all album songs
router.get('/album/:id', adminController.getSingleAlbum); // Obtain a single album
router.get('/album', adminController.getAllAlbums);   // Obtain all albums
router.post('/album', adminController.createAlbum);   // Create an album
router.post('/album/song', adminController.addSongToAlbum);   // Add song to an album
router.delete('/album/song/:id', adminController.deleteSongFromAlbum);   // Delete song from an album
//router.put('/album', adminController.updateAlbum);    // Update an album
router.delete('/album/:id', adminController.deleteAlbum); // Delete an album

//Song CRUD
router.get('/availableSongs/:id', adminController.getAllAvailableSongs);   // Obtain all available songs from an artist
router.get('/song/:id', adminController.getSingleSong); // Obtain a single song
router.get('/song', adminController.getAllSongs);   // Obtain all songs
router.post('/song', adminController.createSong);   // Create a song
//router.put('/song', adminController.updateSong);    // Update a song
router.delete('/song/:id', adminController.deleteSong); // Delete a song

module.exports = router;