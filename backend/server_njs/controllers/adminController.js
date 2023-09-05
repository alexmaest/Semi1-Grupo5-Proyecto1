const artistModel = require('../models/artistModel');
const albumModel = require('../models/albumModel');
const songModel = require('../models/songModel');
const loadController = require('./loadController')
const multer = require('multer');

class adminController {
    constructor() { }

    async createArtist(req, res) {
        try {
            const { name, birthday, profilePhoto } = req.body;
            const artist = new artistModel(null, name, birthday, null);
            const artistByName = await artist.getByName();
            if (artistByName) {
                res.status(501).json({ message: 'Artist with that name already exist' });
            } else {
                const imageUrl = await loadController.uploadImage(profilePhoto);
                if (imageUrl) {
                    artist.profilePhoto = imageUrl;
                    const artistAdded = await artist.save();
                    if (artistAdded) {
                        res.status(200).json({ message: 'Artist created' });
                    } else {
                        res.status(503).json({ message: 'Failed artist method creation' });
                    }
                } else {
                    res.status(500).json({ message: 'An error has occurred while uploading the profile photo' });
                }
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getSingleArtist(req, res) {
        try {
            const artistId = req.params.id;
            const artist = new artistModel(artistId, null, null, null);
            const artistObtained = await artist.getById();
            if (artistObtained) {
                res.status(200).json({ artist: artistObtained });
            } else {
                res.status(501).json({ message: 'The artist does not exist' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getAllArtists(req, res) {
        try {
            const artist = new artistModel(null, null, null, null);
            const allArtists = await artist.getAll();
            if (allArtists) {
                res.status(200).json({ artists: allArtists });
            } else {
                res.status(501).json({ message: 'No artists created yet' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async createAlbum(req, res) {
        try {
            const { name, description, artistId, profilePhoto } = req.body;
            const artist = new artistModel(artistId, null, null, null);
            const album = new albumModel(null, name, description, null, artist);
            const imageUrl = await loadController.uploadImage(profilePhoto);
            if (imageUrl) {
                album.coverPhoto = imageUrl;
                const albumAdded = await album.save();
                if (albumAdded) {
                    res.status(200).json({ message: 'Album created' });
                } else {
                    res.status(503).json({ message: 'Failed album method creation' });
                }
            } else {
                res.status(500).json({ message: 'An error has occurred while uploading the album cover photo' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getSingleAlbum(req, res) {
        try {
            const albumId = req.params.id;
            const album = new albumModel(albumId, null, null, null, null);
            const albumObtained = await album.getById();
            if (albumObtained) {
                res.status(200).json({ album: albumObtained });
            } else {
                res.status(501).json({ message: 'The album does not exist' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getAllAlbums(req, res) {
        try {
            const album = new albumModel(null, null, null, null, null);
            const allAlbums = await album.getAll();
            if (allAlbums) {
                res.status(200).json({ albums: allAlbums });
            } else {
                res.status(501).json({ message: 'No albums created yet' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getArtistAlbums(req, res) {
        try {
            const artistId = req.params.id;
            const artist = new artistModel(artistId, null, null, null);
            const allAlbums = await artist.getAllArtistAlbums();
            if (allAlbums) {
                res.status(200).json({ albums: allAlbums });
            } else {
                res.status(501).json({ message: 'No albums created yet' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async createSong(req, res) {
        try {
            const storage = multer.memoryStorage();
            const upload = multer({
                storage,
                limits: { fileSize: 10000000, files: 1 }
            });
            const uploadMiddleware = upload.single('track');
            uploadMiddleware(req, res, async (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Internal Server Error');
                }
                if (!req.file) {
                    return res.status(400).send('No detected file in request');
                }
                const songUrl = await loadController.uploadSong(req.file.buffer)
                if (songUrl) {
                    const { name, duration, artistId, albumId, profilePhoto } = req.body;
                    const artist = new artistModel(artistId, null, null, null);
                    const album = new albumModel(albumId, null, null, null, artist);
                    const song = new songModel(null, name, null, songUrl, duration, artist, album);
                    const imageUrl = await loadController.uploadImage(profilePhoto);
                    if (imageUrl) {
                        song.coverPhoto = imageUrl;
                        const savedSong = await song.save();
                        if (savedSong) {
                            res.status(200).json({ message: 'The song has been created' });
                        } else {
                            res.status(501).json({ message: 'The song could not be created' });
                        }
                    } else {
                        res.status(500).json({ message: 'An error has occurred while uploading the song cover photo' });
                    }
                } else {
                    res.status(500).json({ message: 'An error has occurred while uploading the song' });
                }
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getSingleSong(req, res) {
        try {
            const songId = req.params.id;
            const song = new songModel(songId, null, null, null, null, null, null);
            const songObtained = await song.getById();
            if (songObtained) {
                res.status(200).json({ song: songObtained });
            } else {
                res.status(501).json({ message: 'The album does not exist' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getAllSongs(req, res) {
        try {
            const song = new songModel(null, null, null, null, null, null);
            const allSongs = await song.getAll();
            if (allSongs) {
                res.status(200).json({ songs: allSongs });
            } else {
                res.status(501).json({ message: 'No songs created yet' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getAllAvailableSongs(req, res) {
        try {
            const idArtist = req.params.id;
            const song = new songModel(null, null, null, null, null, null);
            const artist = new artistModel(idArtist, null, null, null);
            const allSongs = await song.getAllAvailable(artist);
            if (allSongs) {
                res.status(200).json({ songs: allSongs });
            } else {
                res.status(501).json({ message: 'No songs created yet' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getAlbumSongs(req, res) {
        try {
            const albumId = req.params.id;
            const album = new albumModel(albumId, null, null, null, null);
            const allSongs = await album.getAllAlbumSongs();
            if (allSongs) {
                res.status(200).json({ songs: allSongs });
            } else {
                res.status(501).json({ message: 'No songs created yet' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async deleteSong(req, res) {
        try{
            const songId = req.params.id;
            const song = new songModel(songId, null, null, null, null, null, null);
            const songDeleted = await song.delete();
            res.status(200).json({ message: 'Song deleted' });
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }

    async deleteAlbum(req, res) {
        try{
            const albumId = req.params.id;
            const album = new albumModel(albumId, null, null, null, null);
            const albumDeleted = await album.delete();
            res.status(200).json({ message: 'Album deleted' });
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }

    async addSongToAlbum(req, res) {
        try{
            const { idAlbum, idSong } = req.body;
            const album = new albumModel(idAlbum, null, null, null, null);
            const song = new songModel(idSong, null, null, null, null, null, null);
            const songAdded = await album.addSong(song);
            res.status(200).json({ message: 'Song added to album' });
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }

    async deleteSongFromAlbum(req, res) {
        try{
            const idSong = req.params.id;
            const album = new albumModel(null, null, null, null, null);
            const song = new songModel(idSong, null, null, null, null, null, null);
            const songRemoved = await album.removeSong(song);
            res.status(200).json({ message: 'Song removed from album' });
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }

    async deleteArtist(req, res) {
        try{
            const artistId = req.params.id;
            const artist = new artistModel(artistId, null, null, null);
            const artistDeleted = await artist.delete();
            res.status(200).json({ message: 'Artist deleted' });
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new adminController();