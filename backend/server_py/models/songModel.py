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

    def update_with_image(self):
        try:
            query = 'UPDATE CANCION SET Nombre = %s, Src_image = %s, Duracion = %s, Artista = %s, Album = %s WHERE Id = %s'
            values = (self.name, self.coverPhoto, self.duration, self.artist.id_artist, self.album.id_album, self.id_song)
            with connection.cursor() as db_cursor:
                db_cursor.execute(query, values)
                connection.commit()
                return db_cursor.rowcount > 0
        except Exception as e:
            raise e

    def update_without_image(self):
        try:
            query = 'UPDATE CANCION SET Nombre = %s, Duracion = %s, Artista = %s, Album = %s WHERE Id = %s'
            values = (self.name, self.duration, self.artist.id_artist, self.album.id_album, self.id_song)
            with connection.cursor() as db_cursor:
                db_cursor.execute(query, values)
                connection.commit()
                return db_cursor.rowcount > 0
        except Exception as e:
            raise e

    def delete(self):
        try:
            with connection.cursor() as db_cursor:
                db_cursor.execute('START TRANSACTION')

                deletePlaylistCancionQuery = 'DELETE FROM PLAYLIST_CANCION WHERE Cancion = %s'
                db_cursor.execute(deletePlaylistCancionQuery, (self.id_song,))
                
                deleteUsuarioCancionQuery = 'DELETE FROM REPRODUCCION_BITACORA WHERE Cancion = %s'
                db_cursor.execute(deleteUsuarioCancionQuery, (self.id_song,))

                deleteUsuarioCancionQuery = 'DELETE FROM FAVORITO WHERE Cancion = %s'
                db_cursor.execute(deleteUsuarioCancionQuery, (self.id_song,))
                
                deleteCancionQuery = 'DELETE FROM CANCION WHERE Id = %s'
                db_cursor.execute(deleteCancionQuery, (self.id_song,))
                
                db_cursor.execute('COMMIT')
                return True
        except Exception as e:
            connection.rollback()
            raise e

    def getById(self):
        try:
            query = 'SELECT * FROM CANCION WHERE Id = %s;'
            with connection.cursor() as db_cursor:
                db_cursor.execute(query, (self.id_song,))
                result = db_cursor.fetchone()
                if result:
                    self.id_song = result['Id']
                    self.name = result['Nombre']
                    self.coverPhoto = result['Src_image']
                    self.songFile = result['Src_mp3']
                    self.duration = result['Duracion']
                    self.artist = result['Artista']
                    self.album = result['Album']
                    songObtained = {
                        'id_song': self.id_song,
                        'name': self.name,
                        'coverPhoto': self.coverPhoto,
                        'songFile': self.songFile,
                        'duration': self.duration,
                        'artist': self.artist,
                        'album': self.album
                    }
                    return songObtained
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
        
    def get_all_available(self, artist):
        try:
            query = 'SELECT * FROM CANCION WHERE Album IS NULL AND Artista = %s'
            with connection.cursor() as db_cursor:
                db_cursor.execute(query, (artist.id_artist,))
                results = db_cursor.fetchall()

                song_list = [
                    {
                        'id_song': result['Id'],
                        'name': result['Nombre'],
                        'coverPhoto': result['Src_image'],
                        'songFile': result['Src_mp3'],
                        'duration': result['Duracion'],
                        'artist': result['Artista'],
                        'album': result['Album']
                    }
                    for result in results
                ]
                return song_list
        except Exception as e:
            raise e
        
    def getByRegex(self, search):
        try:
            query = """
                SELECT C.*, A.Nombre AS Artista, A.Id AS IdArtista, B.Nombre AS Album, B.Id AS IdAlbum
                FROM CANCION C
                INNER JOIN ALBUM B ON C.Album = B.Id
                INNER JOIN ARTISTA A ON C.Artista = A.Id
                WHERE C.Nombre REGEXP %s;
            """
            with connection.cursor() as db_cursor:
                db_cursor.execute(query, (search,))
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
                        'album': result['Album'],
                        'id_artist': result['IdArtista'],
                        'id_album': result['IdAlbum']
                    }
                    songList.append(song)

                return songList

        except Exception as e:
            raise e

    def get_random(self, user_id):
        try:
            query = """
                SELECT C.*, A.Nombre AS nameArtista, A.Id AS IdArtista, B.Nombre AS nameAlbum, B.Id AS IdAlbum
                FROM CANCION C
                INNER JOIN ALBUM B ON C.Album = B.Id
                INNER JOIN ARTISTA A ON C.Artista = A.Id 
                ORDER BY RAND() LIMIT 1;
            """
            with connection.cursor() as db_cursor:
                db_cursor.execute(query)
                result = db_cursor.fetchone()
                if result:
                    self.id_song = result['Id']
                    self.name = result['Nombre']
                    self.coverPhoto = result['Src_image']
                    self.songFile = result['Src_mp3']
                    self.duration = result['Duracion']
                    self.artist = result['nameArtista']
                    self.album = result['nameAlbum']
                    id_artist = result['IdArtista']
                    id_album = result['IdAlbum']

                    song_obtained = {
                        'id_song': self.id_song,
                        'name': self.name,
                        'coverPhoto': self.coverPhoto,
                        'songFile': self.songFile,
                        'duration': self.duration,
                        'artist': self.artist,
                        'album': self.album,
                        'id_artist': id_artist,
                        'id_album': id_album
                    }

                    insert_query = 'INSERT INTO REPRODUCCION_BITACORA (Usuario, Cancion) VALUES (%s, %s);'
                    db_cursor.execute(insert_query, (user_id, self.id_song))
                    connection.commit()

                    return song_obtained
                else:
                    return None
        except Exception as e:
            raise e

    def get_to_play(self, user_id):
        try:
            query = 'SELECT * FROM CANCION WHERE Id = %s;'
            with connection.cursor() as db_cursor:
                db_cursor.execute(query, (self.id_song,))
                result = db_cursor.fetchone()
                if result:
                    self.id_song = result['Id']
                    self.name = result['Nombre']
                    self.coverPhoto = result['Src_image']
                    self.songFile = result['Src_mp3']
                    self.duration = result['Duracion']
                    self.artist = result['Artista']
                    self.album = result['Album']

                    song_obtained = {
                        'id_song': self.id_song,
                        'name': self.name,
                        'coverPhoto': self.coverPhoto,
                        'songFile': self.songFile,
                        'duration': self.duration,
                        'artist': self.artist,
                        'album': self.album
                    }

                    insert_query = 'INSERT INTO REPRODUCCION_BITACORA (Usuario, Cancion) VALUES (%s, %s);'
                    db_cursor.execute(insert_query, (user_id, self.id_song))
                    connection.commit()

                    return song_obtained
                else:
                    return None
        except Exception as e:
            raise e
