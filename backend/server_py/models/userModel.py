from database import connection

class userModel:
    def __init__(self, id_user, first_name, last_name, email, password, birthday, profile_photo):
        self.id_user = id_user
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password
        self.birthday = birthday
        self.profile_photo = profile_photo

    def save(self):
        try:
            with connection.cursor() as db_cursor:
                query = 'INSERT INTO USUARIO (Nombre, Apellido, Correo, Psw, Fecha_nac, Src) VALUES (%s, %s, %s, %s, %s, %s);'
                values = (self.first_name, self.last_name, self.email, self.password, self.birthday, self.profile_photo)
                db_cursor.execute(query, values)
                connection.commit()
                return db_cursor.rowcount > 0
        except Exception as e:
            raise e

    def update(self):
        try:
            with connection.cursor() as db_cursor:
                query = 'UPDATE Semi1.USUARIO SET '
                values = []

                # Comprobar y agregar campos no nulos
                if self.first_name is not None:
                    query += 'Nombre = %s, '
                    values.append(self.first_name)

                if self.last_name is not None:
                    query += 'Apellido = %s, '
                    values.append(self.last_name)

                if self.profile_photo is not None:
                    query += 'Src = %s, '
                    values.append(self.profile_photo)

                if self.email is not None:
                    query += 'Correo = %s, '
                    values.append(self.email)

                if self.password is not None:
                    query += 'Psw = %s, '
                    values.append(self.password)

                # Eliminar la última coma y espacio
                query = query[:-2]

                # Agregar la condición WHERE
                query += ' WHERE Id = %s ;'
                values.append(self.id_user)

                db_cursor.execute(query, values)
                connection.commit()
                return db_cursor.rowcount > 0
        except Exception as e:
            raise e

    def delete(self, user_id):
        try:
            with connection.cursor() as db_cursor:
                query = 'DELETE FROM USUARIO WHERE Id = %s;'
                db_cursor.execute(query, (user_id,))
                connection.commit()
                return db_cursor.rowcount > 0
        except Exception as e:
            raise e

    def get_by_id(self, user_id):
        try:
            with connection.cursor() as db_cursor:
                query = 'SELECT * FROM USUARIO WHERE Id = %s;'
                db_cursor.execute(query, (user_id,))
                result = db_cursor.fetchone()
                return result
        except Exception as e:
            raise e

    def get_by_email(self):
        try:
            with connection.cursor() as db_cursor:
                query = 'SELECT * FROM USUARIO WHERE Correo = %s;'
                db_cursor.execute(query, (self.email,))
                result = db_cursor.fetchone()
                return result
        except Exception as e:
            raise e

    def likeASong(self, songId, albumId, artistId):
        try:
            with connection.cursor() as db_cursor:
                db_cursor.execute("START TRANSACTION")

                checkCancionQuery = 'SELECT COUNT(*) AS count FROM USUARIO_CANCION WHERE Usuario = %s AND Cancion = %s;'
                db_cursor.execute(checkCancionQuery, (self.id_user, songId))
                countCancion = db_cursor.fetchone()['count']

                if countCancion > 0:
                    db_cursor.execute("COMMIT")
                    return False
                else:
                    usuarioCancionQuery = 'INSERT INTO USUARIO_CANCION (Reproducciones, Usuario, Cancion) VALUES (0, %s, %s);'
                    db_cursor.execute(usuarioCancionQuery, (self.id_user, songId))

                    checkAlbumQuery = 'SELECT COUNT(*) AS count FROM USUARIO_ALBUM WHERE Usuario = %s AND Album = %s;'
                    db_cursor.execute(checkAlbumQuery, (self.id_user, albumId))
                    countAlbum = db_cursor.fetchone()['count']

                    if countAlbum > 0:
                        db_cursor.execute("COMMIT")
                        return False
                    else:
                        usuarioAlbumQuery = 'INSERT INTO USUARIO_ALBUM (Reproducciones, Usuario, Album) VALUES (0, %s, %s);'
                        db_cursor.execute(usuarioAlbumQuery, (self.id_user, albumId))

                        checkArtistaQuery = 'SELECT COUNT(*) AS count FROM USUARIO_ARTISTA WHERE Usuario = %s AND Artista = %s;'
                        db_cursor.execute(checkArtistaQuery, (self.id_user, artistId))
                        countArtista = db_cursor.fetchone()['count']

                        if countArtista > 0:
                            db_cursor.execute("COMMIT")
                            return False
                        else:
                            usuarioArtistaQuery = 'INSERT INTO USUARIO_ARTISTA (Reproducciones, Usuario, Artista) VALUES (0, %s, %s);'
                            db_cursor.execute(usuarioArtistaQuery, (self.id_user, artistId))

                            db_cursor.execute("COMMIT")
                            return True

        except Exception as e:
            db_cursor.execute("ROLLBACK")
            raise e

    def unlikeASong(self, songId, albumId, artistId):
        try:
            with connection.cursor() as db_cursor:
                db_cursor.execute("START TRANSACTION")

                usuarioCancionQuery = 'DELETE FROM USUARIO_CANCION WHERE Usuario = %s AND Cancion = %s;'
                db_cursor.execute(usuarioCancionQuery, (self.id_user, songId))

                usuarioAlbumQuery = 'DELETE FROM USUARIO_ALBUM WHERE Usuario = %s AND Album = %s;'
                db_cursor.execute(usuarioAlbumQuery, (self.id_user, albumId))

                usuarioArtistaQuery = 'DELETE FROM USUARIO_ARTISTA WHERE Usuario = %s AND Artista = %s;'
                db_cursor.execute(usuarioArtistaQuery, (self.id_user, artistId))

                db_cursor.execute("COMMIT")
                return True

        except Exception as e:
            db_cursor.execute("ROLLBACK")
            raise e
