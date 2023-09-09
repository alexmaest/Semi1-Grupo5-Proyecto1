use Semi1;
SELECT * FROM Semi1.USUARIO;

INSERT INTO `Semi1`.`USUARIO`
(`Id`, `Nombre`, `Apellido`, `Src`, `Correo`, `Psw`, `Fecha_nac`)
VALUES
(6, 'admin', 'admin', 'admin.jpg', 'admin@example.com', 'password', '1990-05-15');

INSERT INTO `Semi1`.`USUARIO`
(`Id`, `Nombre`, `Apellido`, `Src`, `Correo`, `Psw`, `Fecha_nac`)
VALUES
(1, 'John', 'Doe', 'user1.jpg', 'john@example.com', 'password123', '1990-05-15'),
(2, 'Jane', 'Smith', 'user2.jpg', 'jane@example.com', 'password456', '1988-09-20'),
(3, 'Michael', 'Johnson', 'user3.jpg', 'michael@example.com', 'password789', '1995-02-10'),
(4, 'Emily', 'Brown', 'user4.jpg', 'emily@example.com', 'securepass', '1992-11-28'),
(5, 'David', 'Williams', 'user5.jpg', 'david@example.com', 'mysecretpassword', '1998-07-03');

UPDATE Semi1.USUARIO
SET Nombre = 'Maza',
    Apellido = 'Maza',
    Src = 'https://i.ytimg.com/vi/a6bRORkCt7U/maxresdefault.jpg',
    Correo = 'gigaprime@ingenieria.mx',
    Psw = 'Psw'
WHERE Id = 6;
SELECT * FROM Semi1.USUARIO;

SELECT * FROM Semi1.PLAYLIST;

-- Insertar una playlist para el usuario John Doe
INSERT INTO Semi1.PLAYLIST (Nombre, Descripcion, Src, Usuario)
VALUES ('Mi lista de reproducción 1', 'Una lista genérica', 'playlist1.jpg', 1);

-- Insertar una playlist para el usuario Jane Smith
INSERT INTO Semi1.PLAYLIST (Nombre, Descripcion, Src, Usuario)
VALUES ('Lista de éxitos', 'Las mejores canciones del año', 'playlist2.jpg', 2);

-- Insertar una playlist para el usuario Michael Johnson
INSERT INTO Semi1.PLAYLIST (Nombre, Descripcion, Src)
VALUES ('Música relajante', 'Canciones suaves para relajarse', 'playlist3.jpg', 3);

-- Insertar una playlist para el usuario Emily Brown
INSERT INTO Semi1.PLAYLIST (Nombre, Descripcion, Src, Usuario)
VALUES ('Rock clásico', 'Las mejores canciones de rock', 'playlist4.jpg', 4);

-- Insertar una playlist para el usuario NuevoNombre NuevoApellido
INSERT INTO Semi1.PLAYLIST (Nombre, Descripcion, Src, Usuario)
VALUES ('Lista personalizada', 'Una lista especial', 'playlist5.jpg', 5);

-- Insertar una playlist para el usuario Mazaaaa Mazaaaaa
INSERT INTO Semi1.PLAYLIST (Nombre, Descripcion, Src, Usuario)
VALUES ('Música favorita', 'Canciones preferidas', 'playlist6.jpg', 6);

-- Insertar una playlist para el usuario Angel Marroquín (ERROR)
INSERT INTO Semi1.PLAYLIST (Nombre, Descripcion, Src)
VALUES ('Lista de reproducción variada', 'Diferentes géneros musicales', 'playlist7.jpg');

-- Insertar una playlist para el usuario Estuardo Gabriel Son Mux (ERROR)
INSERT INTO Semi1.PLAYLIST (Nombre, Descripcion, Src, Usuario)
VALUES ('Mis canciones favoritas', 'Lo mejor de la música', 'playlist8.jpg', 100);

DELETE FROM Semi1.PLAYLIST
WHERE Usuario IS NULL;

delete FROM Semi1.PLAYLIST WHERE Id = 3;



SELECT * FROM Semi1.USUARIO;

-- Agregar la restricción de clave externa a la tabla PLAYLIST
ALTER TABLE Semi1.PLAYLIST
ADD CONSTRAINT FK_Playlist_Usuario FOREIGN KEY (Usuario) REFERENCES USUARIO(Id);

SELECT * FROM Semi1.CANCION WHERE Semi1.PLAYLIST_CANCION.Playlist = 1;
SELECT * FROM Semi1.CANCION;
select * from Semi1.PLAYLIST_CANCION;
SELECT * FROM Semi1.PLAYLIST;
SELECT * FROM Semi1.USUARIO;
SELECT * FROM Semi1.USUARIO_CANCION;

INSERT INTO `Semi1`.`PLAYLIST`
(`Nombre`, `Descripcion`, `Src`, `Usuario`)
VALUES
('Mi Playlist 1', 'Esta es mi primera lista de reproducción', 'src1.com', 1),
('Lista Rock', 'Mis canciones de rock favoritas', 'src2.com', 1),
('Clásicos', 'Las mejores canciones clásicas', 'src3.com', 1),
('Pop Hits', 'Éxitos pop del momento', 'src4.com', 1),
('Jazz Lounge', 'Música relajante de jazz', 'src5.com', 1);

INSERT INTO `Semi1`.`PLAYLIST_CANCION` (`Playlist`,`Cancion`)
VALUES (1,1),(2,1);

SELECT c.*
FROM Semi1.CANCION AS c
JOIN Semi1.PLAYLIST_CANCION AS pc ON c.Id = pc.Cancion
JOIN Semi1.PLAYLIST AS p ON pc.Playlist = p.Id
WHERE p.Id = 1;

INSERT INTO `Semi1`.`PLAYLIST`
(`Nombre`, `Descripcion`, `Src`, `Usuario`)
VALUES
('Mi Playlist 1', 'Esta es mi primera lista de reproducción', 'src1.com', 2);


ALTER TABLE Semi1.PLAYLIST_CANCION
ADD CONSTRAINT unique_playlist_cancion UNIQUE (Playlist, Cancion);

delete FROM Semi1.PLAYLIST_CANCION WHERE Id <= 13;
SELECT * FROM Semi1.PLAYLIST_CANCION;