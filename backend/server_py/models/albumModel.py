from database import connection

class albumModel:
    def __init__(self, id_album, name, description, coverPhoto, artist):
        self.id_album = id_album
        self.name = name
        self.description = description
        self.coverPhoto = coverPhoto
        self.artist = artist

    def save(self):
        try:
            with connection.cursor() as db_cursor:
                query = 'INSERT INTO ALBUM (Nombre, Descripcion, Src, Artista) VALUES (%s, %s, %s, %s);'
                values = (self.name, self.description, self.coverPhoto, self.artist.id_artist)
                db_cursor.execute(query, values)
                connection.commit()
                return db_cursor.rowcount > 0
        except Exception as e:
            raise e

    def update(self):
        try:
            with connection.cursor() as db_cursor:
                query = 'UPDATE ALBUM SET Nombre = %s WHERE Id = %s'
                values = (self.name, self.id_album)
                db_cursor.execute(query, values)
                connection.commit()
                return db_cursor.rowcount > 0
        except Exception as e:
            raise e

    def delete(self):
        try:
            with connection.cursor() as db_cursor:
                query = 'DELETE FROM ALBUM WHERE Id = %s;'
                db_cursor.execute(query, (self.id_album,))
                connection.commit()
                return db_cursor.rowcount > 0
        except Exception as e:
            raise e

    def getById(self):
        try:
            query = 'SELECT * FROM ALBUM WHERE Id = %s;'
            with connection.cursor() as db_cursor:
                db_cursor.execute(query, (self.id_album,))
                result = db_cursor.fetchone()
                if result:
                    self.name = result['Nombre']
                    self.description = result['Descripcion']
                    self.coverPhoto = result['Src']
                    self.artistId = result['Artista']
                    return self
                else:
                    return None
        except Exception as e:
            raise e

    def getByName(self):
        try:
            query = 'SELECT * FROM ALBUM WHERE Nombre = %s;'
            with connection.cursor() as db_cursor:
                db_cursor.execute(query, (self.name,))
                result = db_cursor.fetchone()
                if result:
                    return result
                else:
                    return None
        except Exception as e:
            raise e

    def getAll(self):
        try:
            query = 'SELECT * FROM ALBUM;'
            with connection.cursor() as db_cursor:
                db_cursor.execute(query)
                results = db_cursor.fetchall()
                return results
        except Exception as e:
            raise e

    def getAllAlbumSongs(self):
        try:
            query = 'SELECT * FROM CANCION WHERE Album = %s;'
            with connection.cursor() as db_cursor:
                db_cursor.execute(query, (self.id_album,))
                results = db_cursor.fetchall()
                return results
        except Exception as e:
            raise e
