const db = require('../database');

class PlaylistModel{
    constructor(Id, Nombre, Descripcion, Src, Usuario) {
        this.Id = Id;
        this.Nombre = Nombre;
        this.Descripcion = Descripcion;
        this.Src = Src;
        this.Usuario = Usuario;
    }

    save() {
        return new Promise((resolve, reject) => {
            //Guardar en la base de datos
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

    updateById() {
        return new Promise((resolve, reject) => {
            let query = 'UPDATE Semi1.PLAYLIST SET ';
            const values = [];

            // Comprobar y agregar campos no nulos
            if (this.Nombre !== null) {
                query += 'Nombre = ?, ';
                values.push(this.Nombre);
            }

            if (this.Src !== null) {
                query += 'Src = ?, ';
                values.push(this.Src);
            }

            if (this.Descripcion !== null) {
                query += 'Descripcion = ?, ';
                values.push(this.Descripcion);
            }
            // Eliminar la última coma y espacio
            query = query.slice(0, -2);
            
            query += ' WHERE Id = ? ;';
            values.push(this.Id);
            db.connection.query(query, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.affectedRows > 0);
                }
            });
        });
    }

    deleteById() {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM Semi1.PLAYLIST WHERE Id = ?';
            db.connection.query(query, this.Id, (err, result) => {
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
            const query = 'SELECT * FROM Semi1.PLAYLIST WHERE Id = ? ;';
            db.connection.query(query, this.Id, (err, result) => {
                if (err) {
                    reject(err);
                } else if (result.length > 0) {
                    const playlistObtained = {
                        Id: this.Id,
                        Nombre: result[0].Nombre,
                        Descripcion: result[0].Descripcion,
                        Src: result[0].Src,
                        Usuario: result[0].Usuario
                    };
                    resolve(playlistObtained);
                } else {
                    resolve(null);
                }
            });
        });
    }

    getAllPlaylist_By_Usuario() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Semi1.PLAYLIST WHERE Usuario = ?';
            db.connection.query(query, this.Usuario, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const playlist_List = results.map(result => ({
                        'Id': result.Id,
                        'Nombre': result.Nombre,
                        'Descripcion': result.Descripcion,
                        'Src': result.Src,
                        'Usuario': result.Usuario
                    }));
                    resolve(playlist_List);
                }
            });
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Semi1.PLAYLIST;';
            db.connection.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const playlist_List = results.map(result => ({
                        'Id': result.Id,
                        'Nombre': result.Nombre,
                        'Descripcion': result.Descripcion,
                        'Src': result.Src,
                        'Usuario': result.Usuario
                    }));
                    resolve(playlist_List);
                }
            });
        });
    }
    
    getAllSongs_By_Id_Playlist() {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT c.*
            FROM Semi1.CANCION AS c
            JOIN Semi1.PLAYLIST_CANCION AS pc ON c.Id = pc.Cancion
            JOIN Semi1.PLAYLIST AS p ON pc.Playlist = p.Id
            WHERE p.Id = ? ;
            `
            db.connection.query(query, this.Id, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const songList = results.map(result => ({
                        'Id': result.Id,
                        'Nombre': result.Nombre,
                        'Src_image': result.Src_image,
                        'Src_mp3': result.Src_mp3,
                        "Duracion": result.Duracion,
                        "Artista": result.Artista,
                        "Album": result.Album
                    }));
                    resolve(songList);
                }
            });
        });
    }

    addSong_To_Playlist(idCancion) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO Semi1.PLAYLIST_CANCION (Playlist, Cancion) VALUES (?, ?);';
            db.connection.query(query, [
                this.Id,
                idCancion
            ], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.affectedRows > 0);
                }
            });
        });
    }
}

module.exports = PlaylistModel;
