from database import connection

class artistModel:
    def __init__(self, id_artist, name, birthday, profilePhoto):
        self.id_artist = id_artist
        self.name = name
        self.birthday = birthday
        self.profilePhoto = profilePhoto

    def save(self):
        try:
            with connection.cursor() as db_cursor:
                query = 'INSERT INTO ARTISTA (Nombre, Fecha_nac, Src) VALUES (%s, %s, %s);'
                values = (self.name, self.birthday, self.profilePhoto)
                db_cursor.execute(query, values)
                connection.commit()
                return db_cursor.rowcount > 0
        except Exception as e:
            raise e

    def update(self):
        try:
            with connection.cursor() as db_cursor:
                query = 'UPDATE ARTISTA SET Nombre = %s WHERE Id = %s'
                values = (self.name, self.id_artist)
                db_cursor.execute(query, values)
                connection.commit()
                return db_cursor.rowcount > 0
        except Exception as e:
            raise e

    def delete(self):
        try:
            with connection.cursor() as db_cursor:
                query = 'DELETE FROM ARTISTA WHERE Id = %s;'
                db_cursor.execute(query, (self.id_artist,))
                connection.commit()
                return db_cursor.rowcount > 0
        except Exception as e:
            raise e

    def getById(self):
        try:
            query = 'SELECT * FROM ARTISTA WHERE Id = %s;'
            with connection.cursor() as db_cursor:
                db_cursor.execute(query, (self.id_artist,))
                result = db_cursor.fetchone()
                if result:
                    self.id_artist = result['Id']
                    self.name = result['Nombre']
                    self.birthday = result['Fecha_nac']
                    self.profilePhoto = result['Src']
                    artistObtained = {
                        'id_artist': self.id_artist,
                        'name': self.name,
                        'birthday': self.birthday,
                        'profilePhoto': self.profilePhoto
                    }
                    return artistObtained
                else:
                    return None
        except Exception as e:
            raise e

    def getByName(self):
        try:
            query = 'SELECT * FROM ARTISTA WHERE Nombre = %s;'
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
            query = 'SELECT * FROM ARTISTA;'
            with connection.cursor() as db_cursor:
                db_cursor.execute(query)
                results = db_cursor.fetchall()
                artistsList = []
                for result in results:
                    artist = {
                        'id_artist': result['Id'],
                        'name': result['Nombre'],
                        'birthday': result['Fecha_nac'],
                        'profilePhoto': result['Src']
                    }
                    artistsList.append(artist)
                
                return artistsList
        except Exception as e:
            raise e

    def getAllArtistAlbums(self):
        try:
            query = 'SELECT * FROM ALBUM WHERE Artista = %s;'
            with connection.cursor() as db_cursor:
                db_cursor.execute(query, (self.id_artist,))
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
