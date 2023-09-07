const db = require('../database');

class songModel {
    constructor(id_song, name, coverPhoto, songFile, duration, artist, album) {
        this.id_song = id_song;
        this.name = name;
        this.coverPhoto = coverPhoto;
        this.songFile = songFile;
        this.duration = duration;
        this.artist = artist;
        this.album = album;
    }

    save() {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO CANCION (Nombre, Src_image, Src_mp3, Duracion, Artista, Album) VALUES (?, ?, ?, ?, ?, ?);';
            db.connection.query(query, [
                this.name,
                this.coverPhoto,
                this.songFile,
                this.duration,
                this.artist.id_artist,
                this.album.id_album
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
            const query = 'UPDATE CANCION SET Nombre = ?, Src_image = ?, Duracion = ?, Artista = ?, Album = ? WHERE Id = ?';
            db.connection.query(query, [this.name, this.coverPhoto, this.duration, this.artist.id_artist, this.album.id_album, this.id_song], (err, result) => {
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
            const query = 'UPDATE CANCION SET Nombre = ?, Duracion = ?, Artista = ?, Album = ? WHERE Id = ?';
            db.connection.query(query, [this.name, this.duration, this.artist.id_artist, this.album.id_album, this.id_song], (err, result) => {
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

                const deleteCancionQuery = 'DELETE FROM CANCION WHERE Id = ?';
                db.connection.query(deleteCancionQuery, [this.id_song], (err, result) => {
                    if (err) {
                        db.connection.rollback(() => {
                            reject(err);
                        });
                    } else {
                        const deleteUsuarioCancionQuery = 'DELETE FROM USUARIO_CANCION WHERE Cancion = ?';
                        db.connection.query(deleteUsuarioCancionQuery, [this.id_song], (err, result) => {
                            if (err) {
                                db.connection.rollback(() => {
                                    reject(err);
                                });
                            } else {
                                const deletePlaylistCancionQuery = 'DELETE FROM PLAYLIST_CANCION WHERE Cancion = ?';
                                db.connection.query(deletePlaylistCancionQuery, [this.id_song], (err, result) => {
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
            const query = 'SELECT * FROM CANCION WHERE Id = ?;';
            db.connection.query(query, [this.id_song], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    if (result.length > 0) {
                        this.id_song = result[0].Id;
                        this.name = result[0].Nombre;
                        this.coverPhoto = result[0].Src_image;
                        this.songFile = result[0].Src_mp3;
                        this.duration = result[0].Duracion;
                        this.artist = result[0].Artista;
                        this.album = result[0].Album;
                        const songObtained = {
                            id_song: this.id_song,
                            name: this.name,
                            coverPhoto: this.coverPhoto,
                            songFile: this.songFile,
                            duration: this.duration,
                            artist: this.artist,
                            album: this.album
                        };
                        resolve(songObtained);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    getByName() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM CANCION WHERE Nombre = ?';
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
            const query = 'SELECT * FROM CANCION;';
            db.connection.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const songList = results.map(result => ({
                        'id_song': result.Id,
                        'name': result.Nombre,
                        'coverPhoto': result.Src_image,
                        'songFile': result.Src_mp3,
                        'duration': result.Duracion,
                        'artist': result.Artista,
                        'album': result.Album
                    }));
                    resolve(songList);
                }
            });
        });
    }

    getAllAvailable(artist) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM CANCION WHERE Album IS NULL AND Artista = ?;';
            db.connection.query(query, [artist.id_artist], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const songList = results.map(result => ({
                        'id_song': result.Id,
                        'name': result.Nombre,
                        'coverPhoto': result.Src_image,
                        'songFile': result.Src_mp3,
                        'duration': result.Duracion,
                        'artist': result.Artista,
                        'album': result.Album
                    }));
                    resolve(songList);
                }
            });
        });
    }

    getByRegex(search) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT C.*, A.Nombre AS Artista, A.Id AS IdArtista, B.Nombre AS Album, B.Id AS IdAlbum
                FROM CANCION C
                INNER JOIN ALBUM B ON C.Album = B.Id
                INNER JOIN ARTISTA A ON C.Artista = A.Id
                WHERE C.Nombre REGEXP ?;
            `;
            db.connection.query(query, [search], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const songList = results.map(result => ({
                        'id_song': result.Id,
                        'name': result.Nombre,
                        'coverPhoto': result.Src_image,
                        'songFile': result.Src_mp3,
                        'duration': result.Duracion,
                        'artist': result.Artista,
                        'album': result.Album,
                        'id_artist': result.IdArtista,
                        'id_album': result.IdAlbum
                    }));
                    resolve(songList);
                }
            });
        });
    }

    getRandom() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *, A.Nombre AS Artista, A.Id AS IdArtista, B.Nombre AS Album, B.Id AS IdAlbum
                FROM CANCION C
                INNER JOIN ALBUM B ON C.Album = B.Id
                INNER JOIN ARTISTA A ON C.Artista = A.Id 
                ORDER BY RAND() LIMIT 1;
            `;
            db.connection.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    if (result.length > 0) {
                        this.id_song = result[0].Id;
                        this.name = result[0].Nombre;
                        this.coverPhoto = result[0].Src_image;
                        this.songFile = result[0].Src_mp3;
                        this.duration = result[0].Duracion;
                        this.artist = result[0].Artista;
                        this.album = result[0].Album;
                        const songObtained = {
                            id_song: this.id_song,
                            name: this.name,
                            coverPhoto: this.coverPhoto,
                            songFile: this.songFile,
                            duration: this.duration,
                            artist: this.artist,
                            album: this.album,
                            id_artist: result[0].IdArtista,
                            id_album: result[0].IdAlbum
                        };
                        resolve(songObtained);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }
}

module.exports = songModel;
