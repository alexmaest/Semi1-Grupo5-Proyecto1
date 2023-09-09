from database import connection

class PlaylistModel:
    def __init__(self, Id, Nombre, Descripcion, Src, Usuario):
        self.Id = Id
        self.Nombre = Nombre
        self.Descripcion = Descripcion
        self.Src = Src
        self.Usuario = Usuario

    def save(self):
        try:
            with connection.cursor() as db_cursor:
                query = 'INSERT INTO PLAYLIST (Nombre, Descripcion, Src, Usuario) VALUES (%s, %s, %s, %s);'
                values = (self.Nombre, self.Descripcion, self.Src, self.Usuario)
                db_cursor.execute(query, values)
                connection.commit()
                return db_cursor.rowcount > 0
        except Exception as e:
            raise e
        
    def updateById(self):
        try:
            with connection.cursor() as db_cursor:
                query = 'UPDATE Semi1.PLAYLIST SET '
                values = []
                if self.Nombre != None:
                    query += 'Nombre = %s, '
                    values.append(self.Nombre)
                if self.Src != None:
                    query += 'Src = %s, '
                    values.append(self.Src)
                if self.Descripcion != None:
                    query += 'Descripcion = %s, '
                    values.append(self.Descripcion)
                query = query[:-2]
                query += ' WHERE Id = %s ;'
                values.append(self.Id)
                db_cursor.execute(query, values)
                connection.commit()
                return db_cursor.rowcount > 0
        except Exception as e:
                raise e

    def deleteById(self):
        try:
            with connection.cursor() as db_cursor:
                query = 'DELETE FROM Semi1.PLAYLIST WHERE Id = %s ;'
                db_cursor.execute(query, self.Id)
                connection.commit()
                return db_cursor.rowcount > 0
        except Exception as e:
            raise e
        
    def getById(self):
        try:
            with connection.cursor() as db_cursor:
                query = 'SELECT * FROM Semi1.PLAYLIST WHERE Id = %s ;'
                db_cursor.execute(query, self.Id)
                result = db_cursor.fetchone()
                if result:
                    playlistObtained = {
                        'Id': self.Id,
                        'Nombre': result['Nombre'],
                        'Descripcion': result['Descripcion'],
                        'Src': result['Src'],
                        'Usuario': result['Usuario']
                    }
                    return playlistObtained
                return None
        except Exception as e:
            raise e
    
    def getAllPlaylist_By_Usuario(self):
        try:
            with connection.cursor() as db_cursor:
                query = 'SELECT * FROM Semi1.PLAYLIST WHERE Usuario = %s ;'
                db_cursor.execute(query, self.Usuario)
                results = db_cursor.fetchall()
                playlist_List = []
                for result in results:
                    playlist = {
                        'Id': result['Id'],
                        'Nombre': result['Nombre'],
                        'Descripcion': result['Descripcion'],
                        'Src': result['Src'],
                        'Usuario': result['Usuario']
                    }
                    playlist_List.append(playlist)
                return playlist_List
        except Exception as e:
            raise e
        
    def getAll(self):
        try:
            with connection.cursor() as db_cursor:
                query = 'SELECT * FROM Semi1.PLAYLIST;'
                db_cursor.execute(query)
                results = db_cursor.fetchall()
                playlist_List = []
                for result in results:
                    playlist = {
                        'Id': result['Id'],
                        'Nombre': result['Nombre'],
                        'Descripcion': result['Descripcion'],
                        'Src': result['Src'],
                        'Usuario': result['Usuario']
                    }
                    playlist_List.append(playlist)
                return playlist_List
        except Exception as e:
            raise e
        
    def getAllSongs_By_Id_Playlist(self):
        try:
            with connection.cursor() as db_cursor:
                query = '''
                    SELECT c.*
                    FROM Semi1.CANCION AS c
                    JOIN Semi1.PLAYLIST_CANCION AS pc ON c.Id = pc.Cancion
                    JOIN Semi1.PLAYLIST AS p ON pc.Playlist = p.Id
                    WHERE p.Id = %s ;
                    '''
                db_cursor.execute(query, self.Id)
                results = db_cursor.fetchall()
                songList = []
                for result in results:
                    songList.append({
                        'Id': result['Id'],
                        'Nombre': result['Nombre'],
                        'Src_image': result['Src_image'],
                        'Src_mp3': result['Src_mp3'],
                        'Duracion': result['Duracion'],
                        'Artista': result['Artista'],
                        'Album': result['Album']
                    })
                return songList
        except Exception as e:
            raise e
        
    def addSong_To_Playlist(self, idCancion):
        try:
            with connection.cursor() as db_cursor:
                query = 'INSERT INTO Semi1.PLAYLIST_CANCION (Playlist, Cancion) VALUES (%s, %s);'
                db_cursor.execute(query, [
                    self.Id,
                    idCancion
                ])
                connection.commit()
                return db_cursor.rowcount > 0
        except Exception as e:
            raise e
        
    def deleteSong_From_Playlist(self, idCancion):
        try:
            with connection.cursor() as db_cursor:
                query = 'DELETE FROM Semi1.PLAYLIST_CANCION WHERE Playlist = %s AND Cancion = %s ;'
                db_cursor.execute(query, [self.Id, idCancion])
                return db_cursor.rowcount > 0
        except Exception as e:
            raise e