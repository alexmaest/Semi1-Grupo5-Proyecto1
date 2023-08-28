const artistModel = require('../models/artistModel');
const albumModel = require('../models/albumModel');
const loadController = require('./loadController')

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
            const album = new albumModel(null, name, description, null, null);
            album.artist = new artistModel(artistId, null, null, null);
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
            const album = new albumModel(albumId, null, null, null);
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
            const album = new albumModel(null, null, null, null);
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
}

module.exports = new adminController();