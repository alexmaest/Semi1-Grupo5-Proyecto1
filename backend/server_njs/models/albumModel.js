const db = require('../database');

class albumModel {
    constructor(id_album, name, description, coverPhoto, artist) {
        this.id_album = id_album;
        this.name = name;
        this.description = description;
        this.coverPhoto = coverPhoto;
        this.artist = artist;
    }

    save() {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO ALBUM (Nombre, Descripcion, Src, Artista) VALUES (?, ?, ?, ?);';
            db.connection.query(query, [
                this.name,
                this.description,
                this.coverPhoto,
                this.artist.id_artist
            ], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.affectedRows > 0);
                }
            });
        });
    }

    updateWithImage() {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE ALBUM SET Nombre = ?, Descripcion = ?, Src = ?, Artista = ? WHERE Id = ?';
            db.connection.query(query, [this.name, this.description, this.coverPhoto, this.artist.id_artist, this.id_album], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.affectedRows > 0);
                }
            });
        });
    }

    updateWithoutImage() {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE ALBUM SET Nombre = ?, Descripcion = ?, Artista = ? WHERE Id = ?';
            db.connection.query(query, [this.name, this.description, this.artist.id_artist, this.id_album], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.affectedRows > 0);
                }
            });
        });
    }

    delete() {
        return new Promise((resolve, reject) => {
            db.connection.beginTransaction((err) => {
                if (err) {
                    reject(err);
                    return;
                }
    
                const removeAlbumFromSongQuery = 'UPDATE CANCION SET Album = NULL WHERE Album = ?';
                db.connection.query(removeAlbumFromSongQuery, [this.id_album], (err, result) => {
                    if (err) {
                        db.connection.rollback(() => {
                            reject(err);
                        });
                    } else {
                        const deleteUsuarioAlbumQuery = 'DELETE FROM USUARIO_ALBUM WHERE Album = ?';
                        db.connection.query(deleteUsuarioAlbumQuery, [this.id_album], (err, result) => {
                            if (err) {
                                db.connection.rollback(() => {
                                    reject(err);
                                });
                            } else {
                                const deleteAlbumQuery = 'DELETE FROM ALBUM WHERE Id = ?';
                                db.connection.query(deleteAlbumQuery, [this.id_album], (err, result) => {
                                    if (err) {
                                        db.connection.rollback(() => {
                                            reject(err);
                                        });
                                    } else {
                                        db.connection.commit((err) => {
                                            if (err) {
                                                db.connection.rollback(() => {
                                                    reject(err);
                                                });
                                            } else {
                                                resolve(result.affectedRows > 0);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            });
        });
    }

    getById() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM ALBUM WHERE Id = ?;';
            db.connection.query(query, [this.id_album], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    if (result.length > 0) {
                        this.id_album = result[0].Id;
                        this.name = result[0].Nombre;
                        this.description = result[0].Descripcion;
                        this.coverPhoto = result[0].Src;
                        this.artistId = result[0].Artista;
                        const albumObtained = {
                            id_album: this.id_album,
                            name: this.name,
                            description: this.description,
                            coverPhoto: this.coverPhoto,
                            artistId : this.artistId
                        };
                        resolve(albumObtained);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    getByName() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM ALBUM WHERE Nombre = ?';
            db.connection.query(query, [this.name], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    if (result.length > 0) {
                        resolve(result[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM ALBUM;'
            db.connection.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const albumsList = results.map(result => ({
                        'id_album': result.Id,
                        'name': result.Nombre,
                        'description': result.Descripcion,
                        'coverPhoto': result.Src,
                        "artistId": result.Artista
                    }));
                    resolve(albumsList);
                }
            });
        });
    }

    getAllAlbumSongs() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM CANCION WHERE Album = ?;'
            db.connection.query(query, [this.id_album], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const songList = results.map(result => ({
                        'id_song' : result.Id,
                        'name' : result.Nombre,
                        'coverPhoto' : result.Src_image,
                        'songFile' : result.Src_mp3,
                        'duration' : result.Duracion,
                        'artist' : result.Artista,
                        'album' : result.Album
                    }));
                    resolve(songList);
                }
            });
        });
    }

    addSong(song) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE CANCION SET Album = ? WHERE Id = ?';
            db.connection.query(query, [this.id_album, song.id_song], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.affectedRows > 0);
                }
            });
        });
    }

    removeSong(song) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE CANCION SET Album = NULL WHERE Id = ?';
            db.connection.query(query, [song.id_song], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.affectedRows > 0);
                }
            });
        });
    }
}

module.exports = albumModel;
