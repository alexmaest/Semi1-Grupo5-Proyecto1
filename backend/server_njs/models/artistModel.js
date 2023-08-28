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

    update(artist) {
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
                        this.name = result[0].Nombre;
                        this.birthday = result[0].Fecha_nac;
                        this.profilePhoto = result[0].Src;
                        resolve(this);
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
            const query = 'SELECT * FROM ARTISTA;'
            db.connection.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

module.exports = artistModel;
