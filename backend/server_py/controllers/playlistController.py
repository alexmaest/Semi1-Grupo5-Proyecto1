from models.playlistModel import PlaylistModel
from controllers.loadController import load_controller
from flask import Blueprint, jsonify, request
from typing import List

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
        playlistList: List[PlaylistModel] = playlist.getAllPlaylist_By_Usuario()
        nombreDuplicado = False

        for playlistItem in playlistList:
            if playlistItem.Nombre == Nombre:
                nombreDuplicado = True
                break  # Salir del bucle cuando se encuentra un nombre duplicado

        if nombreDuplicado:
            return jsonify({ 'message': 'playlist already exists' }), 500

        # Validación de Usuario existente
        userValidacion = PlaylistModel(None, None, None, None, None)
        responseUserValidacion = userValidacion.getById(Usuario)

        if len(responseUserValidacion) == 0:
            return jsonify({ 'message': 'user does not exist' }), 500

        # Cambios para recibir base64 en la imagen de la playlist.
        if Src is not None:
            imageUrl = load_controller.upload_image(Src)
            if imageUrl:
                playlist.Src = imageUrl

        response = playlist.save()
        return jsonify({ 'message': 'Playlist created', 'results': response  }), 200
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500