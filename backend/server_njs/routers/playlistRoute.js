const express = require('express');
const router = express.Router();

const PlaylistController = require('../controllers/playlistController');

//playlist CRUD
router.post('/', PlaylistController.createPlaylist);
router.put('/', PlaylistController.updatePlaylist);
router.delete('/:id', PlaylistController.deletePlaylist);
router.get('/:id', PlaylistController.getPlaylistById);
router.get('/usuario/:usuario', PlaylistController.getAllPlaylist_By_Usuario);
router.get('/', PlaylistController.getAll);
router.get('/songs/:id', PlaylistController.getAllSongs_By_Id_Playlist);
router.post('/addSong', PlaylistController.addSong_To_Playlist);
router.delete('/remove/song', PlaylistController.deleteSong_From_Playlist);

module.exports = router;