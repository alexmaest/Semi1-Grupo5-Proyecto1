const userModel = require('../models/userModel');
const artistModel = require('../models/artistModel');
const albumModel = require('../models/albumModel');
const songModel = require('../models/songModel');
const loadController = require('./loadController')

class userController {
    constructor() { }

    async findUser(req, res) {
        try {
            const userId = req.params.id;
            const user = new userModel(null, null, null, null, null, null, null);
            const response = await user.getById(userId);
            res.status(200).json({ message: 'User found', results: response });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async updateUser(req, res) {
        try {
            const { id_user, firstName, lastName, email, password, profilePhoto } = req.body;
            const user = new userModel(id_user, firstName, lastName, email, password, null, profilePhoto);
            //Cambios para recibir base64 en la imagen de perfil
            if (profilePhoto != null) {
                const imageUrl = await loadController.uploadImage(profilePhoto);
                if (imageUrl) {
                    user.profilePhoto = imageUrl;
                }
            }
            
            const userUpdated = await user.update(user);
            if (userUpdated) {
                res.status(200).json({ message: 'User updated' });
            } else {
                res.status(500).json({ message: 'An error has occurred while uploading the User' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async search(req, res) {
        try {
            const search = req.body.search;
            const artist = new artistModel(null, null, null, null);
            const album = new albumModel(null, null, null, null, null);
            const song = new songModel(null, null, null, null, null, null, null);
            const songs = await song.getByRegex(search);
            const albums = await album.getByRegex(search);
            const artists = await artist.getByRegex(search);
            res.status(200).json({ songs: songs, albums: albums, artists: artists });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async like(req, res) {
        try {
            const { userId, songId } = req.body;
            const user = new userModel(userId, null, null, null, null, null, null);
            const likedSong = await user.likeASong(songId);
            res.status(200).json({ message: 'Song liked by user' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async unlike(req, res) {
        try {
            const { userId, songId } = req.body;
            const user = new userModel(userId, null, null, null, null, null, null);
            const unlikedSong = await user.unlikeASong(songId);
            res.status(200).json({ message: 'Song unliked by user' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async randomSong(req, res) {
        try {
            const { userId } = req.body;
            const song = new songModel(null, null, null, null, null, null, null);
            const randomSong = await song.getRandom(userId);
            res.status(200).json({ song: randomSong });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async playSong(req, res) {
        try {
            const { userId, songId } = req.body;
            const song = new songModel(songId, null, null, null, null, null, null);
            const songObtained = await song.getToPlay(userId);
            res.status(200).json({ song: songObtained });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getFavoriteSongs_By_User(req, res) {
        try {
            const { userId } = req.params;
            const user = new userModel(userId, null, null, null, null, null, null);
            const likedSongs = await user.getFavoriteSongs_By_User();
            res.status(200).json({ success: likedSongs });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getTopSongs_By_User(req, res) {
        try {
            const { userId } = req.params;
            const user = new userModel(userId, null, null, null, null, null, null);
            const topSongs = await user.getTopSongs_By_User();
            res.status(200).json({ success: topSongs });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getTopArtists_By_User(req, res) {
        try {
            const { userId } = req.params;
            const user = new userModel(userId, null, null, null, null, null, null);
            const topArtists = await user.getTopArtists_By_User();
            res.status(200).json({ success: topArtists });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getTopAlbums_By_User(req, res) {
        try {
            const { userId } = req.params;
            const user = new userModel(userId, null, null, null, null, null, null);
            const topAlbums = await user.getTopAlbums_By_User();
            res.status(200).json({ success: topAlbums });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getHistorySongs_By_User(req, res) {
        try {
            const { userId } = req.params;
            const user = new userModel(userId, null, null, null, null, null, null);
            const historySongs = await user.getHistorySongs_By_User();
            res.status(200).json({ success: historySongs });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = new userController();