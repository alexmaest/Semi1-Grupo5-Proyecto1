const PlaylistModel = require('../models/playlistModel');
const userModel = require('../models/userModel');
const loadController = require('./loadController')
class PlaylistController {
    
    async createPlaylist(req, res) {
        try {
            
            const { Nombre, Descripcion, Src, Usuario } = req.body;
            const playlist = new PlaylistModel(null, Nombre, Descripcion, Src, Usuario);
            
            //Validación de campos no nulos
            if (Nombre === null || Src === null || Usuario === null) {
                return res.status(500).json({ message: 'missing required fields' });
            }
            //Validación de Nombre con Usuario no repetido
            const playlist_List = await playlist.getAllPlaylist_By_Usuario();
            let nombreDuplicado = false;

            for (const playlistItem of playlist_List) {
                if (playlistItem.Nombre === Nombre) {
                    nombreDuplicado = true;
                    break; // Salir del bucle cuando se encuentra un nombre duplicado
                }
            }
            if (nombreDuplicado) {
                return res.status(500).json({ message: 'playlist already exists' });
            }
            
            //Validación de Usuario existente
            const userValidacion = new userModel(null, null, null, null, null, null, null);
            const responseUserValidacion = await userValidacion.getById(Usuario);
            if (responseUserValidacion.length === 0) {
                return res.status(500).json({ message: 'user does not exist' });
            }

            //Cambios para recibir base64 en la imagen de la playlist.
            if (Src != null) {
                const imageUrl = await loadController.uploadImage(Src);
                if (imageUrl) {
                    playlist.Src = imageUrl;
                }
            }

            const result = await playlist.save();
            return res.status(200).json({ success: result });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async updatePlaylist(req, res) {
        try {
            const { Id, Nombre, Descripcion, Src } = req.body;
            const playlist = new PlaylistModel(Id, Nombre, Descripcion, Src, null);
            //Cambios para recibir base64 en la imagen de la playlist.
            if (Src != null) {
                const imageUrl = await loadController.uploadImage(Src);
                if (imageUrl) {
                    playlist.Src = imageUrl;
                }
            }
            const result = await playlist.updateById();
            res.status(200).json({ success: result });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    deleteById() {
        return new Promise((resolve, reject) => {
            const deletePlaylistCancionQuery = 'DELETE FROM Semi1.PLAYLIST_CANCION WHERE Playlist = ?';
            db.connection.query(deletePlaylistCancionQuery, this.Id, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    const deletePlaylistQuery = 'DELETE FROM Semi1.PLAYLIST WHERE Id = ?';
                    db.connection.query(deletePlaylistQuery, this.Id, (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result.affectedRows > 0);
                        }
                    });
                }
            });
        });
    }

    async getPlaylistById(req, res) {
        try {
            const { id } = req.params;
            const playlist = new PlaylistModel(id);
            const result = await playlist.getById();
            res.status(200).json({ success: result });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getAllPlaylist_By_Usuario(req, res) {
        try {
            const { usuario } = req.params;
            const playlist = new PlaylistModel(null, null, null, null, usuario);
            const result = await playlist.getAllPlaylist_By_Usuario();
            res.status(200).json({ success: result });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getAll(req, res) {
        try {
            const playlist = new PlaylistModel();
            const result = await playlist.getAll();
            res.status(200).json({ success: result });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getAllSongs_By_Id_Playlist(req, res) {
        try {
            const { id } = req.params;
            const playlist = new PlaylistModel(id);
            const result = await playlist.getAllSongs_By_Id_Playlist();
            res.status(200).json({ success: result });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async addSong_To_Playlist(req, res) {
        try {
            const { Id_Playlist, Id_Song } = req.body;
            const playlist = new PlaylistModel(Id_Playlist);
            const result = await playlist.addSong_To_Playlist(Id_Song);
            res.status(200).json({ success: result });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async deleteSong_From_Playlist(req, res) {
        try {
            const { Id_Playlist, Id_Song } = req.body;
            const playlist = new PlaylistModel(Id_Playlist);
            const result = await playlist.deleteSong_From_Playlist(Id_Song);
            res.status(200).json({ success: result });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = new PlaylistController();