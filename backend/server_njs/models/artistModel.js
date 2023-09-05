const db = require('../database');

class artistModel {
    constructor(id_artist, name, birthday, profilePhoto) {
        this.id_artist = id_artist;
        this.name = name;
        this.birthday = birthday;
        this.profilePhoto = profilePhoto;
    }

    save() {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO ARTISTA (Nombre, Fecha_nac, Src) VALUES (?, ?, ?);';
            db.connection.query(query, [
                this.name,
                this.birthday,
                this.profilePhoto
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
            const query = 'UPDATE ARTISTA SET Nombre = ?, Fecha_nac = ?, Src = ? WHERE Id = ?';
            db.connection.query(query, [this.name, this.birthday, this.profilePhoto, this.id_artist], (err, result) => {
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
            const query = 'UPDATE ARTISTA SET Nombre = ?, Fecha_nac = ? WHERE Id = ?';
            db.connection.query(query, [this.name, this.birthday, this.id_artist], (err, result) => {
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

                const deleteUsuarioAlbumQuery = 'DELETE FROM USUARIO_ALBUM WHERE Album IN (SELECT Id FROM ALBUM WHERE Artista = ?)';
                db.connection.query(deleteUsuarioAlbumQuery, [this.id_artist], (err) => {
                    if (err) {
                        db.connection.rollback(() => {
                            reject(err);
                        });
                    } else {
                        const deleteUsuarioCancionQuery = 'DELETE FROM USUARIO_CANCION WHERE Cancion IN (SELECT Id FROM CANCION WHERE Artista = ?)';
                        db.connection.query(deleteUsuarioCancionQuery, [this.id_artist], (err) => {
                            if (err) {
                                db.connection.rollback(() => {
                                    reject(err);
                                });
                            } else {
                                const deletePlaylistCancionQuery = 'DELETE FROM PLAYLIST_CANCION WHERE Cancion IN (SELECT Id FROM CANCION WHERE Artista = ?)';
                                db.connection.query(deletePlaylistCancionQuery, [this.id_artist], (err) => {
                                    if (err) {
                                        db.connection.rollback(() => {
                                            reject(err);
                                        });
                                    } else {
                                        const deleteCancionQuery = 'DELETE FROM CANCION WHERE Artista = ?';
                                        db.connection.query(deleteCancionQuery, [this.id_artist], (err) => {
                                            if (err) {
                                                db.connection.rollback(() => {
                                                    reject(err);
                                                });
                                            } else {
                                                const deleteAlbumQuery = 'DELETE FROM ALBUM WHERE Artista = ?';
                                                db.connection.query(deleteAlbumQuery, [this.id_artist], (err) => {
                                                    if (err) {
                                                        db.connection.rollback(() => {
                                                            reject(err);
                                                        });
                                                    } else {
                                                        const deleteUsuarioArtistaQuery = 'DELETE FROM USUARIO_ARTISTA WHERE Artista = ?';
                                                        db.connection.query(deleteUsuarioArtistaQuery, [this.id_artist], (err) => {
                                                            if (err) {
                                                                db.connection.rollback(() => {
                                                                    reject(err);
                                                                });
                                                            } else {
                                                                const deleteArtistaQuery = 'DELETE FROM ARTISTA WHERE Id = ?';
                                                                db.connection.query(deleteArtistaQuery, [this.id_artist], (err) => {
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
                                                                                resolve(true);
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
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
            const query = 'SELECT * FROM ARTISTA WHERE Id = ?;';
            db.connection.query(query, [this.id_artist], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    if (result.length > 0) {
                        this.id_artist = result[0].Id;
                        this.name = result[0].Nombre;
                        this.birthday = result[0].Fecha_nac;
                        this.profilePhoto = result[0].Src;
                        const artistObtained = {
                            id_artist: this.id_artist,
                            name: this.name,
                            birthday: this.birthday,
                            profilePhoto: this.profilePhoto
                        };
                        resolve(artistObtained);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    getByName() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM ARTISTA WHERE Nombre = ?';
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
            const query = 'SELECT * FROM ARTISTA;';
            db.connection.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const artistsList = results.map(result => ({
                        'id_artist': result.Id,
                        'name': result.Nombre,
                        'birthday': result.Fecha_nac,
                        'profilePhoto': result.Src
                    }));
                    resolve(artistsList);
                }
            });
        });
    }

    getAllArtistAlbums() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM ALBUM WHERE Artista = ?;'
            db.connection.query(query, [this.id_artist], (err, results) => {
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
}

module.exports = artistModel;
