const db = require('../database');
const bcrypt = require('bcrypt');

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

  getAdmin() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM USUARIO WHERE Id = 1';
      db.connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
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

  likeASong(songId) {
    return new Promise((resolve, reject) => {
      db.connection.beginTransaction((err) => {
        if (err) {
          reject(err);
          return;
        }

        const checkCancionQuery = 'SELECT COUNT(*) AS count FROM FAVORITO WHERE Usuario = ? AND Cancion = ?;';
        db.connection.query(checkCancionQuery, [this.id_user, songId], (err, result) => {
          if (err) {
            db.connection.rollback(() => {
              reject(err);
            });
          } else {
            const countCancion = result[0].count;
            if (countCancion > 0) {
              db.connection.commit((err) => {
                if (err) {
                  db.connection.rollback(() => {
                    reject(err);
                  });
                } else {
                  resolve(false);
                }
              });
            } else {
              const usuarioCancionQuery = 'INSERT INTO FAVORITO (Usuario, Cancion) VALUES (?, ?);';
              db.connection.query(usuarioCancionQuery, [this.id_user, songId], (err, result) => {
                if (err) {
                  db.connection.rollback(() => {
                    reject(err);
                  });
                } else {
                  resolve(result.affectedRows > 0);
                }
              });
            }
          }
        });
      });
    });
  }

  unlikeASong(songId) {
    return new Promise((resolve, reject) => {
      db.connection.beginTransaction((err) => {
        if (err) {
          reject(err);
          return;
        }

        const usuarioCancionQuery = 'DELETE FROM FAVORITO WHERE Usuario = ? AND Cancion = ?;';
        db.connection.query(usuarioCancionQuery, [this.id_user, songId], (err, result) => {
          if (err) {
            db.connection.rollback(() => {
              reject(err);
            });
          } else {
            resolve(result.affectedRows > 0);
          }
        });
      });
    });
  }

  getFavoriteSongs_By_User() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT f.Id , f.Usuario , f.Cancion AS Id_Cancion ,
        c.Nombre AS Cancion , a.Nombre AS Artista , a2.Nombre AS Album
        FROM FAVORITO f  
        INNER JOIN CANCION c ON c.Id = f.Cancion 
        INNER JOIN ARTISTA a ON a.Id  = c.Artista 
        INNER JOIN ALBUM a2 ON a2.Id = c.Album 
        WHERE f.Usuario = ? ;
      `
      db.connection.query(query, this.id_user, (err, results) => {
        if (err) {
          reject(err);
        } else {
          const songList = results.map(result => ({
            'Id': result.Id,
            'Reproducciones': result.Reproducciones,
            'Usuario': result.Usuario,
            'Id_Cancion': result.Id_Cancion,
            'Cancion': result.Cancion,
            'Artista': result.Artista,
            'Album': result.Album
          }));
          resolve(songList);
        }
      });
    });
  }

  //                        *********************PARTE DE TOPS*********************

  getTopSongs_By_User() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT Cancion AS Id_Cancion, c.Nombre AS Nombre_Cancion, COUNT(*) AS Cantidad_Reproducciones
        FROM REPRODUCCION_BITACORA rb
        INNER JOIN CANCION c ON c.Id = rb.Cancion 
        WHERE rb.Usuario = ?
        GROUP BY Cancion
        ORDER BY Cantidad_Reproducciones DESC
        LIMIT 5;
      `
      db.connection.query(query, this.id_user, (err, results) => {
        if (err) {
          reject(err);
        } else {
          const songList = results.map(result => ({
            'Id_Cancion': result.Id_Cancion,
            'Nombre_Cancion': result.Nombre_Cancion,
            'Cantidad_Reproducciones': result.Cantidad_Reproducciones
          }));
          resolve(songList);
        }
      });
    });
  }  

  getTopArtists_By_User() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT a.Id AS Id_Artista, a.Nombre AS Nombre_Artista,
        SUM(rb.Cantidad_Reproducciones) AS Total_Reproducciones
        FROM ARTISTA a
        LEFT JOIN CANCION c ON a.Id = c.Artista
        LEFT JOIN (
            SELECT Usuario, Cancion, COUNT(*) AS Cantidad_Reproducciones
            FROM REPRODUCCION_BITACORA
            GROUP BY Cancion
        ) rb ON c.Id = rb.Cancion
        WHERE rb.Usuario = ?
        GROUP BY a.Id
        ORDER BY Total_Reproducciones DESC
        LIMIT 3;
      `
      db.connection.query(query, this.id_user, (err, results) => {
        if (err) {
          reject(err);
        } else {
          const artistList = results.map(result => ({
            'Id_Artista': result.Id_Artista,
            'Nombre_Artista': result.Nombre_Artista,
            'Total_Reproducciones': result.Total_Reproducciones
          }));
          resolve(artistList);
        }
      });
    });
  }

  getTopAlbums_By_User() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT a.Id AS Id_Album, a.Nombre AS Nombre_Album,
        SUM(rb.Cantidad_Reproducciones) AS Total_Reproducciones
        FROM ALBUM a 
        LEFT JOIN CANCION c ON a.Id = c.Artista
        LEFT JOIN (
            SELECT Usuario, Cancion, COUNT(*) AS Cantidad_Reproducciones
            FROM REPRODUCCION_BITACORA
            GROUP BY Cancion
        ) rb ON c.Id = rb.Cancion
        WHERE rb.Usuario = ?
        GROUP BY a.Id
        ORDER BY Total_Reproducciones DESC
        LIMIT 5;
      `
      db.connection.query(query, this.id_user, (err, results) => {
        if (err) {
          reject(err);
        } else {
          const albumList = results.map(result => ({
            'Id_Album': result.Id_Album,
            'Nombre_Album': result.Nombre_Album,
            'Total_Reproducciones': result.Total_Reproducciones
          }));
          resolve(albumList);
        }
      });
    });
  }
  
  getHistorySongs_By_User() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT rb.Usuario, c.Id AS Id_Cancion, c.Nombre AS Nombre_Cancion
        FROM REPRODUCCION_BITACORA rb 
        INNER JOIN CANCION c ON c.Id = rb.Cancion
        WHERE rb.Usuario = ?
        ORDER BY rb.Id DESC;
      `
      db.connection.query(query, this.id_user, (err, results) => {
        if (err) {
          reject(err);
        } else {
          const songList = results.map(result => ({
            'Usuario': result.Usuario,
            'Id_Cancion': result.Id_Cancion,
            'Nombre_Cancion': result.Nombre_Cancion
          }));
          resolve(songList);
        }
      });
    });
  }

  generateHash() {
      const saltRounds = 10;
      const hash = bcrypt.hashSync(this.password, saltRounds);
      return hash;
  }

  compareHash(hashedPassword) {
    console.log(this.password, hashedPassword);
    return bcrypt.compareSync(this.password, hashedPassword);
  }
}

module.exports = userModel;
