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
                    self.id_album = result['Id']
                    self.name = result['Nombre']
                    self.description = result['Descripcion']
                    self.coverPhoto = result['Src']
                    self.artistId = result['Artista']
                    albumObtained = {
                        'id_album': self.id_album,
                        'name': self.name,
                        'description': self.description,
                        'coverPhoto': self.coverPhoto,
                        'artistId': self.artistId
                    }
                    return albumObtained
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
                albumList = []
                for result in results:
                    album = {
                        'id_album': result['Id'],
                        'name': result['Nombre'],
                        'description': result['Descripcion'],
                        'coverPhoto': result['Src'],
                        'artistId': result['Artista']
                    }
                    albumList.append(album)
                
                return albumList
        except Exception as e:
            raise e

    def getAllAlbumSongs(self):
        try:
            query = 'SELECT * FROM CANCION WHERE Album = %s;'
            with connection.cursor() as db_cursor:
                db_cursor.execute(query, (self.id_album,))
                results = db_cursor.fetchall()
                songList = []
                for result in results:
                    song = {
                        'id_song': result['Id'],
                        'name': result['Nombre'],
                        'coverPhoto': result['Src_image'],
                        'songFile': result['Src_mp3'],
                        'duration': result['Duracion'],
                        'artist': result['Artista'],
                        'album': result['Album']
                    }
                    songList.append(song)
                
                return songList
        except Exception as e:
            raise e
