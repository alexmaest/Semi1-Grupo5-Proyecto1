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
Fecha_nac varchar(10)
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
Usuario int,
foreign key (Usuario) references USUARIO(Id) 
);

create table PLAYLIST_CANCION(
Id int primary key auto_increment,
Playlist int,
Cancion int,
foreign key (Playlist) references PLAYLIST(Id), 
foreign key (Cancion) references CANCION(Id) 
);

create table USUARIO_CANCION(
Id int primary key auto_increment,
Reproducciones int,
Usuario int,
Cancion int,
foreign key (Usuario) references USUARIO(Id), 
foreign key (Cancion) references CANCION(Id) 
);

create table USUARIO_ALBUM(
Id int primary key auto_increment,
Reproducciones int,
Usuario int,
Album int,
foreign key (Usuario) references USUARIO(Id), 
foreign key (Album) references ALBUM(Id) 
);

create table USUARIO_ARTISTA(
Id int primary key auto_increment,
Reproducciones int,
Usuario int,
Artista int,
foreign key (Usuario) references USUARIO(Id), 
foreign key (Artista) references ARTISTA(Id) 
);