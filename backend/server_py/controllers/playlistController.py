from models.playlistModel import PlaylistModel
from controllers.loadController import load_controller
from flask import Blueprint, jsonify, request

from models.userModel import userModel

playlist_route = Blueprint('playlist_route', __name__)

@playlist_route.route('/', methods=['POST'])
def create_playlist():
    try:
        data = request.get_json()
        Nombre = data['Nombre']
        Descripcion = data['Descripcion']
        Src = data['Src']
        Usuario = data['Usuario']
        playlist = PlaylistModel(None, Nombre, Descripcion, Src, Usuario)

        # Validación de campos no nulos
        if Nombre is None or Src is None or Usuario is None:
            return jsonify({ 'message': 'missing required fields' }), 500

        # Validación de Nombre con Usuario no repetido
        playlistList = playlist.getAllPlaylist_By_Usuario()
        nombreDuplicado = False

        for playlistItem in playlistList:
            if playlistItem['Nombre'] == Nombre:
                nombreDuplicado = True
                break  # Salir del bucle cuando se encuentra un nombre duplicado

        if nombreDuplicado:
            return jsonify({ 'message': 'playlist already exists' }), 500

        # Validación de Usuario existente
        userValidacion = userModel(None, None, None, None, None, None, None)
        responseUserValidacion = userValidacion.get_by_id(Usuario)

        if len(responseUserValidacion) == 0:
            return jsonify({ 'message': 'user does not exist' }), 500

        # Cambios para recibir base64 en la imagen de la playlist.
        if Src is not None:
            imageUrl = load_controller.upload_image(Src)
            if imageUrl:
                playlist.Src = imageUrl

        result = playlist.save()
        return jsonify({ 'success':result}), 200
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500

@playlist_route.route('/', methods=['PUT'])
def updatePlaylist():
    try:
        data = request.get_json()
        Id = data["Id"]
        Nombre = data['Nombre']
        Descripcion = data['Descripcion']
        Src = data['Src']
        playlist = PlaylistModel(Id, Nombre, Descripcion, Src, None)
        if Src != None:
            imageUrl = load_controller.upload_image(Src)
            if imageUrl:
                playlist.Src = imageUrl
        
        result = playlist.updateById()
        return jsonify({ 'success':result}), 200

    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500
    
@playlist_route.route('/<id>', methods=['DELETE'])
def deletePlaylist(id):
    try:
        playlist = PlaylistModel(id, None, None, None, None)
        result = playlist.deleteById()
        return jsonify({ 'success':result}), 200

    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500
    
@playlist_route.route('/<id>', methods=['GET'])
def getById(id):
    try:
        playlist = PlaylistModel(id, None, None, None, None)
        result = playlist.getById()
        return jsonify({ 'success':result}), 200

    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500
    
@playlist_route.route('/usuario/<usuario>', methods=['GET'])
def getAllPlaylist_By_Usuario(usuario):
    try:
        playlist = PlaylistModel(None, None, None, None, usuario)
        result = playlist.getAllPlaylist_By_Usuario()
        return jsonify({ 'success':result}), 200

    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500
    
@playlist_route.route('/', methods=['GET'])
def getAllPlaylist():
    try:
        playlist = PlaylistModel(None, None, None, None, None)
        result = playlist.getAll()
        return jsonify({ 'success':result}), 200

    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500
    
@playlist_route.route('/songs/<id>', methods=['GET'])
def getAllSongs_By_Id_Playlist(id):
    try:
        playlist = PlaylistModel(id, None, None, None, None)
        result = playlist.getAllSongs_By_Id_Playlist()
        return jsonify({ 'success':result}), 200

    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500

@playlist_route.route('/addSong', methods=['POST'])
def addSongToPlaylist():
    try:
        data = request.get_json()
        Id_Playlist = data['Id_Playlist']
        Id_Song = data['Id_Song']
        playlist = PlaylistModel(Id_Playlist, None, None, None, None)
        result = playlist.addSong_To_Playlist(Id_Song)
        return jsonify({ 'success':result}), 200

    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500

@playlist_route.route('/remove/song', methods=['DELETE'])
def deleteSongFromPlaylist():
    try:
        data = request.get_json()
        Id_Playlist = data['Id_Playlist']
        Id_Song = data['Id_Song']
        playlist = PlaylistModel(Id_Playlist, None, None, None, None)
        result = playlist.deleteSong_From_Playlist(Id_Song)
        return jsonify({ 'success':result}), 200

    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500