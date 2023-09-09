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

  likeASong(songId, albumId, artistId) {
    return new Promise((resolve, reject) => {
      db.connection.beginTransaction((err) => {
        if (err) {
          reject(err);
          return;
        }

        const checkCancionQuery = 'SELECT COUNT(*) AS count FROM USUARIO_CANCION WHERE Usuario = ? AND Cancion = ?;';
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
              const usuarioCancionQuery = 'INSERT INTO USUARIO_CANCION (Reproducciones, Usuario, Cancion) VALUES (0, ?, ?);';
              db.connection.query(usuarioCancionQuery, [this.id_user, songId], (err, result) => {
                if (err) {
                  db.connection.rollback(() => {
                    reject(err);
                  });
                } else {
                  const checkAlbumQuery = 'SELECT COUNT(*) AS count FROM USUARIO_ALBUM WHERE Usuario = ? AND Album = ?;';
                  db.connection.query(checkAlbumQuery, [this.id_user, albumId], (err, result) => {
                    if (err) {
                      db.connection.rollback(() => {
                        reject(err);
                      });
                    } else {
                      const countAlbum = result[0].count;
                      if (countAlbum > 0) {
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
                        const usuarioAlbumQuery = 'INSERT INTO USUARIO_ALBUM (Reproducciones, Usuario, Album) VALUES (0, ?, ?);';
                        db.connection.query(usuarioAlbumQuery, [this.id_user, albumId], (err, result) => {
                          if (err) {
                            db.connection.rollback(() => {
                              reject(err);
                            });
                          } else {
                            const checkArtistaQuery = 'SELECT COUNT(*) AS count FROM USUARIO_ARTISTA WHERE Usuario = ? AND Artista = ?;';
                            db.connection.query(checkArtistaQuery, [this.id_user, artistId], (err, result) => {
                              if (err) {
                                db.connection.rollback(() => {
                                  reject(err);
                                });
                              } else {
                                const countArtista = result[0].count;
                                if (countArtista > 0) {
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
                                  const usuarioArtistaQuery = 'INSERT INTO USUARIO_ARTISTA (Reproducciones, Usuario, Artista) VALUES (0, ?, ?);';
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
                              }
                            });
                          }
                        });
                      }
                    }
                  });
                }
              });
            }
          }
        });
      });
    });
  }

  unlikeASong(songId, albumId, artistId) {
    return new Promise((resolve, reject) => {
      db.connection.beginTransaction((err) => {
        if (err) {
          reject(err);
          return;
        }

        const usuarioCancionQuery = 'DELETE FROM USUARIO_CANCION WHERE Usuario = ? AND Cancion = ?;';
        db.connection.query(usuarioCancionQuery, [this.id_user, songId], (err, result) => {
          if (err) {
            db.connection.rollback(() => {
              reject(err);
            });
          } else {
            const usuarioAlbumQuery = 'DELETE FROM USUARIO_ALBUM WHERE Usuario = ? AND Album = ?;';
            db.connection.query(usuarioAlbumQuery, [this.id_user, albumId], (err, result) => {
              if (err) {
                db.connection.rollback(() => {
                  reject(err);
                });
              } else {
                const usuarioArtistaQuery = 'DELETE FROM USUARIO_ARTISTA WHERE Usuario = ? AND Artista = ?;';
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
}

module.exports = userModel;
