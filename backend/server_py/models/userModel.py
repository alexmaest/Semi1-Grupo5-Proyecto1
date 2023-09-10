from database import connection
import bcrypt

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

    def get_admin(self):
        try:
            with connection.cursor() as db_cursor:
                query = 'SELECT * FROM USUARIO WHERE Id = 1;'
                db_cursor.execute(query)
                result = db_cursor.fetchone()
                return result
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

    def likeASong(self, songId):
        try:
            with connection.cursor() as db_cursor:
                db_cursor.execute("START TRANSACTION")

                checkCancionQuery = 'SELECT COUNT(*) AS count FROM FAVORITO WHERE Usuario = %s AND Cancion = %s;'
                db_cursor.execute(checkCancionQuery, (self.id_user, songId))
                countCancion = db_cursor.fetchone()['count']

                if countCancion > 0:
                    db_cursor.execute("COMMIT")
                    return False
                else:
                    usuarioCancionQuery = 'INSERT INTO FAVORITO (Reproducciones, Usuario, Cancion) VALUES (0, %s, %s);'
                    db_cursor.execute(usuarioCancionQuery, (self.id_user, songId))

                    db_cursor.execute("COMMIT")
                    return True

        except Exception as e:
            db_cursor.execute("ROLLBACK")
            raise e

    def unlikeASong(self, songId):
        try:
            with connection.cursor() as db_cursor:
                db_cursor.execute("START TRANSACTION")

                usuarioCancionQuery = 'DELETE FROM FAVORITO WHERE Usuario = %s AND Cancion = %s;'
                db_cursor.execute(usuarioCancionQuery, (self.id_user, songId))

                db_cursor.execute("COMMIT")
                return True

        except Exception as e:
            db_cursor.execute("ROLLBACK")
            raise e

    def getFavoriteSongs_By_User(self):
        try:
            with connection.cursor() as db_cursor:
                query = '''
                    SELECT f.Id , f.Usuario , f.Cancion AS Id_Cancion ,
                    c.Nombre AS Cancion , a.Nombre AS Artista , a2.Nombre AS Album
                    FROM FAVORITO f  
                    INNER JOIN CANCION c ON c.Id = f.Cancion 
                    INNER JOIN ARTISTA a ON a.Id  = c.Artista 
                    INNER JOIN ALBUM a2 ON a2.Id = c.Album 
                    WHERE f.Usuario = %s ;
                    '''
                db_cursor.execute(query, self.id_user)
                results = db_cursor.fetchall()
                playlist_List = []
                for result in results:
                    playlist = {
                        'Id': result['Id'],
                        'Usuario': result['Usuario'],
                        'Id_Cancion': result['Id_Cancion'],
                        'Cancion': result['Cancion'],
                        'Artista': result['Artista'],
                        'Album': result['Album']
                    }
                    playlist_List.append(playlist)
                return playlist_List
        except Exception as e:
            raise e
        
    #                        *********************PARTE DE TOPS*********************
        
    def getTopSongs_By_User(self):
        try:
            with connection.cursor() as db_cursor:
                query = '''
                    SELECT Cancion AS Id_Cancion, c.Nombre AS Nombre_Cancion, COUNT(*) AS Cantidad_Reproducciones
                    FROM REPRODUCCION_BITACORA rb
                    INNER JOIN CANCION c ON c.Id = rb.Cancion 
                    WHERE rb.Usuario = %s
                    GROUP BY Cancion
                    ORDER BY Cantidad_Reproducciones DESC
                    LIMIT 5;
                    '''
                db_cursor.execute(query, self.id_user)
                results = db_cursor.fetchall()
                playlist_List = []
                for result in results:
                    playlist = {
                        'Id_Cancion': result['Id_Cancion'],
                        'Nombre_Cancion': result['Nombre_Cancion'],
                        'Cantidad_Reproducciones': result['Cantidad_Reproducciones']
                    }
                    playlist_List.append(playlist)
                return playlist_List
        except Exception as e:
            raise e
    
    def getTopArtists_By_User(self):
        try:
            with connection.cursor() as db_cursor:
                query = '''
                    SELECT a.Id AS Id_Artista, a.Nombre AS Nombre_Artista,
                    SUM(rb.Cantidad_Reproducciones) AS Total_Reproducciones
                    FROM ARTISTA a
                    LEFT JOIN CANCION c ON a.Id = c.Artista
                    LEFT JOIN (
                        SELECT Usuario, Cancion, COUNT(*) AS Cantidad_Reproducciones
                        FROM REPRODUCCION_BITACORA
                        GROUP BY Cancion
                    ) rb ON c.Id = rb.Cancion
                    WHERE rb.Usuario = %s
                    GROUP BY a.Id
                    ORDER BY Total_Reproducciones DESC
                    LIMIT 3;
                    '''
                db_cursor.execute(query, self.id_user)
                results = db_cursor.fetchall()
                playlist_List = []
                for result in results:
                    playlist = {
                        'Id_Artista': result['Id_Artista'],
                        'Nombre_Artista': result['Nombre_Artista'],
                        'Total_Reproducciones': result['Total_Reproducciones']
                    }
                    playlist_List.append(playlist)
                return playlist_List
        except Exception as e:
            raise e 
        
    def getTopAlbums_By_User(self):
        try:
            with connection.cursor() as db_cursor:
                query = '''
                    SELECT a.Id AS Id_Album, a.Nombre AS Nombre_Album,
                    SUM(rb.Cantidad_Reproducciones) AS Total_Reproducciones
                    FROM ALBUM a 
                    LEFT JOIN CANCION c ON a.Id = c.Artista
                    LEFT JOIN (
                        SELECT Usuario, Cancion, COUNT(*) AS Cantidad_Reproducciones
                        FROM REPRODUCCION_BITACORA
                        GROUP BY Cancion
                    ) rb ON c.Id = rb.Cancion
                    WHERE rb.Usuario = %s
                    GROUP BY a.Id
                    ORDER BY Total_Reproducciones DESC
                    LIMIT 5;
                    '''
                db_cursor.execute(query, self.id_user)
                results = db_cursor.fetchall()
                playlist_List = []
                for result in results:
                    playlist = {
                        'Id_Album': result['Id_Album'],
                        'Nombre_Album': result['Nombre_Album'],
                        'Total_Reproducciones': result['Total_Reproducciones']
                    }
                    playlist_List.append(playlist)
                return playlist_List
        except Exception as e:
            raise e
    
    def getHistorySongs_By_User(self):
        try:
            with connection.cursor() as db_cursor:
                query = '''
                    SELECT rb.Usuario, c.Id AS Id_Cancion, c.Nombre AS Nombre_Cancion
                    FROM REPRODUCCION_BITACORA rb 
                    INNER JOIN CANCION c ON c.Id = rb.Cancion
                    WHERE rb.Usuario = %s 
                    ORDER BY rb.Id DESC;
                    '''
                db_cursor.execute(query, self.id_user)
                results = db_cursor.fetchall()
                playlist_List = []
                for result in results:
                    playlist = {
                        'Usuario': result['Usuario'],
                        'Id_Cancion': result['Id_Cancion'],
                        'Nombre_Cancion': result['Nombre_Cancion']
                    }
                    playlist_List.append(playlist)
                return playlist_List
        except Exception as e:
            raise e

    def generate_hash(self):
            salt_rounds = 10
            hashed_password = bcrypt.hashpw(self.password.encode('utf-8'), bcrypt.gensalt(salt_rounds))
            return hashed_password.decode('utf-8')

    def compare_hash(self, hashed_password):
        print(self.password, hashed_password)
        return bcrypt.checkpw(self.password.encode('utf-8'), hashed_password.encode('utf-8'))