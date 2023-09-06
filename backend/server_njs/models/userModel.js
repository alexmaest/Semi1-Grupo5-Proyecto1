const db = require('../database');

class userModel {
  constructor(id_user, firstName, lastName, email, password, birthday, profilePhoto) {
    this.id_user = id_user;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.birthday = birthday;
    this.profilePhoto = profilePhoto;
  }

  save() {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO USUARIO (Nombre, Apellido, Correo, Psw, Fecha_nac, Src) VALUES (?, ?, ?, ?, ?, ?);';
      db.connection.query(query, [
        this.firstName,
        this.lastName,
        this.email,
        this.password,
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

  update(user) {
    return new Promise((resolve, reject) => {
      let query = 'UPDATE Semi1.USUARIO SET ';
      const values = [];

      // Comprobar y agregar campos no nulos
      if (user.firstName !== null) {
        query += 'Nombre = ?, ';
        values.push(user.firstName);
      }

      if (user.lastName !== null) {
        query += 'Apellido = ?, ';
        values.push(user.lastName);
      }

      if (user.profilePhoto !== null) {
        query += 'Src = ?, ';
        values.push(user.profilePhoto);
      }

      if (user.email !== null) {
        query += 'Correo = ?, ';
        values.push(user.email);
      }

      if (user.password !== null) {
        query += 'Psw = ?, ';
        values.push(user.password);
      }

      // Eliminar la última coma y espacio
      query = query.slice(0, -2);

      // Agregar la condición WHERE
      query += ' WHERE Id = ? ;';
      values.push(user.id_user);

      db.connection.query(query, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }

  delete(userId) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM USUARIO WHERE Id = ?';
      db.connection.query(query, userId, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }

  getById(userId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM USUARIO WHERE Id = ?';
      db.connection.query(query, [userId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  getByEmail() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM USUARIO WHERE Correo = ?';
      db.connection.query(query, [this.email], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  likeASong(songId, albumId, artistId) {
    return new Promise((resolve, reject) => {
      db.connection.beginTransaction((err) => {
        if (err) {
          reject(err);
          return;
        }

        const usuarioCancionQuery = 'INSERT IGNORE INTO USUARIO_CANCION (Reproducciones, Usuario, Cancion) VALUES (0, ?, ?);';
        db.connection.query(usuarioCancionQuery, [this.id_user, songId], (err, result) => {
          if (err) {
            db.connection.rollback(() => {
              reject(err);
            });
          } else {
            const usuarioAlbumQuery = 'INSERT IGNORE INTO USUARIO_ALBUM (Reproducciones, Usuario, Album) VALUES (0, ?, ?);';
            db.connection.query(usuarioAlbumQuery, [this.id_user, albumId], (err, result) => {
              if (err) {
                db.connection.rollback(() => {
                  reject(err);
                });
              } else {
                const usuarioArtistaQuery = 'INSERT IGNORE INTO USUARIO_ARTISTA (Reproducciones, Usuario, Artista) VALUES (0, ?, ?);';
                db.connection.query(usuarioArtistaQuery, [this.id_user, artistId], (err, result) => {
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
}

module.exports = userModel;
