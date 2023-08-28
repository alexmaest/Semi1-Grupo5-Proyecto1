const artistModel = require('../models/artistModel');
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
}

module.exports = new adminController();