const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/artist/:id', adminController.getSingleArtist); // Obtain a single artist
router.get('/artist', adminController.getAllArtists);   // Obtain all artist
router.post('/artist', adminController.createArtist);   // Create an artist
//router.put('/artist', adminController.updateArtist);    // Update an artist
//router.delete('/artist', adminController.deleteArtist); // Delete an artist

module.exports = router;