drop database if exists Semi1;
create database Semi1;
use Semi1;

create table USUARIO(
Id int primary key auto_increment,
Nombre varchar(50),
Apellido varchar(50),
Src varchar(100),
Correo varchar(100),
Psw varchar(10),
Fecha_nac varchar(10),
UNIQUE (Correo)
);

create table ARTISTA(
Id int primary key auto_increment,
Nombre varchar(50) not null,
Fecha_nac varchar(10),
Src varchar(100) not null
);

create table ALBUM(
Id int primary key auto_increment,
Nombre varchar(50) not null,
Descripcion varchar(100),
Src varchar(100) not null,
Artista int not null,
foreign key (Artista) references ARTISTA(Id) 
);

create table CANCION(
Id int primary key auto_increment,
Nombre varchar(50) not null,
Src_image varchar(100) not null,
Src_mp3 varchar(100) not null,
Duracion varchar(10) not null,
Artista int not null,
Album int,
foreign key (Artista) references ARTISTA(Id), 
foreign key (Album) references ALBUM(Id) 
);

create table PLAYLIST(
Id int primary key auto_increment,
Nombre varchar(50) not null,
Descripcion varchar(100),
Src varchar(100) not null,
Usuario int
);

ALTER TABLE Semi1.PLAYLIST
ADD CONSTRAINT FK_Playlist_Usuario FOREIGN KEY (Usuario) REFERENCES USUARIO(Id);

create table PLAYLIST_CANCION(
Id int primary key auto_increment,
Playlist int,
Cancion int,
foreign key (Playlist) references PLAYLIST(Id), 
foreign key (Cancion) references CANCION(Id) 
);

ALTER TABLE Semi1.PLAYLIST_CANCION
ADD CONSTRAINT unique_playlist_cancion UNIQUE (Playlist, Cancion);

create table REPRODUCCION_BITACORA(
Id int primary key auto_increment,
Cantidad int,
Usuario int,
Cancion int,
foreign key (Usuario) references USUARIO(Id), 
foreign key (Cancion) references CANCION(Id) 
);


create table FAVORITO(
Id int primary key auto_increment,
Usuario int,
Cancion int,
foreign key (Usuario) references USUARIO(Id), 
foreign key (Cancion) references CANCION(Id) 
);

