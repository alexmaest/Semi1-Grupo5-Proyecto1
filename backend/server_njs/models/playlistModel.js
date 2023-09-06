const db = require('../database');

class playlistModel{
    constructor(Id, Nombre, Descripcion, Src, Usuario) {
        this.Id = Id;
        this.Nombre = Nombre;
        this.Descripcion = Descripcion;
        this.Src = Src;
        this.Usuario = Usuario;
    }

    save() {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO Semi1.PLAYLIST (Nombre, Descripcion, Src, Usuario) VALUES (?, ?, ?, ?);';
            db.connection.query(query, [
                this.Nombre,
                this.Descripcion,
                this.Src,
                this.Usuario
            ], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.affectedRows > 0);
                }
            });
        });
    }

    update() {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE ARTISTA SET ? WHERE Id = ?';
            db.connection.query(query, [artist.name, artist.id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.affectedRows > 0);
                }
            });
        });
    }

    delete(artistId) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM ARTISTA WHERE Id = ?';
            db.connection.query(query, artistId, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.affectedRows > 0);
                }
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
                        this.Nombre = result[0].Nombre;
                        this.birthday = result[0].Fecha_nac;
                        this.Src = result[0].Src;
                        const artistObtained = {
                            id_artist: this.id_artist,
                            name: this.Nombre,
                            birthday: this.birthday,
                            profilePhoto: this.Src
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
            db.connection.query(query, [this.Nombre], (err, result) => {
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

module.exports = playlistModel;
