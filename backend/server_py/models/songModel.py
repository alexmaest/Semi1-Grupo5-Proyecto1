from database import connection

class songModel:
    def __init__(self, id_song, name, coverPhoto, songFile, duration, artist, album):
        self.id_song = id_song
        self.name = name
        self.coverPhoto = coverPhoto
        self.songFile = songFile
        self.duration = duration
        self.artist = artist
        self.album = album

    def save(self):
        try:
            with connection.cursor() as db_cursor:
                query = 'INSERT INTO CANCION (Nombre, Src_image, Src_mp3, Duracion, Artista, Album) VALUES (%s, %s, %s, %s, %s, %s);'
                values = (self.name, self.coverPhoto, self.songFile, self.duration, self.artist.id_artist, self.album.id_album)
                db_cursor.execute(query, values)
                connection.commit()
                return db_cursor.rowcount > 0
        except Exception as e:
            raise e

    def update(self):
        try:
            with connection.cursor() as db_cursor:
                query = 'UPDATE CANCION SET ? WHERE Id = ?';
                values = (self.id_song)
                db_cursor.execute(query, values)
                connection.commit()
                return db_cursor.rowcount > 0
        except Exception as e:
            raise e

    def delete(self):
        try:
            with connection.cursor() as db_cursor:
                query = 'DELETE FROM CANCION WHERE Id = %s;'
                db_cursor.execute(query, (self.id_song,))
                connection.commit()
                return db_cursor.rowcount > 0
        except Exception as e:
            raise e

    def getById(self):
        try:
            query = 'SELECT * FROM CANCION WHERE Id = %s;'
            with connection.cursor() as db_cursor:
                db_cursor.execute(query, (self.id_song,))
                result = db_cursor.fetchone()
                if result:
                    self.name = result['Nombre']
                    self.coverPhoto = result['Src_image']
                    self.songFile = result['Src_mp3']
                    self.duration = result['Duracion']
                    self.artist = result['Artista']
                    self.album = result['Album']
                    return self
                else:
                    return None
        except Exception as e:
            raise e

    def getByName(self):
        try:
            query = 'SELECT * FROM CANCION WHERE Nombre = %s;'
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
            query = 'SELECT * FROM CANCION;'
            with connection.cursor() as db_cursor:
                db_cursor.execute(query)
                results = db_cursor.fetchall()
                return results
        except Exception as e:
            raise e